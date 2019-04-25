<template>
  <a-layout id="components-layout-test-top" class="layout">
    <LHeader/>
    <a-layout-content>
      <div class='full'>
        <h2>{{ model.modelName }}</h2>

        <div class="s85">{{ model.intro }}</div>

        <div class="s85 runfullwidth atag mt bt">
          <a-tag color="pink">Version: {{ task.model_version }}</a-tag>
          <a-tag color="pink">Size: {{ model.modelSize }}</a-tag>
          <a-tag color="pink">Accuracy: {{ task.accuracy }}</a-tag>
        </div>

        <div class="s85 runfullwidth bt option">
          <a-alert
            v-if="backendalert"
            class="bt"
            message="No backend selected, stop the testing."
            type="warning"
            closable
          />
          <div class="options">
            <span class="optiontitle">Backend</span>
            <div class="optionbackend">
              <a-checkbox-group
                :options="backendPlainOptions"
                v-model="backendCheckedList"
                @change="backendOnChange"
              />
              <a-checkbox-group
                :options="preferPlainOptions"
                v-model="preferCheckedList"
                @change="preferOnChange"
                :disabled="preferDisabled"
              />
            </div>
          </div>
          <div class="options">
            <span class="optiontitle">Iterations</span>
            <a-slider :min="2" :max="300" v-model="iterations" :tooltipVisible="slidertooltip" />
            <a-input-number :min="2" :max="300" :step="1" v-model="iterations" />
          </div>
        </div>

        <div v-if="isrun">
          <div class="run">
            <div class="runhalfwidth">
              <div class="s85">Loading Model File: {{ progressLoadingText }}</div>
              <a-progress :percent="progressLoadingPercent" />
            </div>
            <div class="runhalfwidth">
              <div class="s85">Run Model with Tests: {{ progressText }}</div>
              <a-progress :percent="progressPercent" />
            </div>
          </div>
        </div>

        <div class="run">
          <div v-show="gettestimage" class="runhalfwidth vc">
            <img id="testimage" :src="gettestimage" alt="Test Image">
            <canvas class="testimage"></canvas>
            <div class="inference_label">{{ currentinference }}</div>
          </div>
          <div v-show="getbackend" class="logsection runlog runhalfwidth">
            <div id="log" class v-html="log"></div>
            <div class="btnlog">
              <a-button id="btnlog" data-clipboard-target="#log" @click="copylog">Copy Log</a-button>
            </div>
          </div>
        </div>
        <h2 v-if="showbar" class="runfullwidth">{{ model.modelName }} Benchmark</h2>
        <div v-if="showbar" class="run">
          <div class="runhalfwidth">
            <a-table
              :columns="columns"
              :data-source="test_result"
              size="small"
              rowKey="id"
              :pagination="pagination"
              @change="onChange"
            />
            <div class="nalabel">{{ nalabel }}</div>
          </div>
          <div class="runhalfwidth">
            <div class="bar-chart">
              <ve-histogram v-if="showbar" :data="histogramdata" :settings="chartSettings" rowKey="id"></ve-histogram>
            </div>
          </div>
        </div>
        <div class="runbtn mt">
          <a-button type="primary" @click="run">Run {{ task.modelName }}</a-button>
        </div>
      </div>
    </a-layout-content>
    <LFooter/>
  </a-layout>
</template>

<script>
import LHeader from '~/components/LHeader.vue'
import LFooter from '~/components/LFooter.vue'
import ClipboardJS from 'clipboard'
import {
  finallog,
  modelprogress,
  currentinference,
  testresult,
  bardata,
  run,
  nalabel,
  getModelArrayBuffer,
  clearModelArrayBuffer
} from '~/static/js/main.js'

const columns = [
  {
    title: 'Backend',
    dataIndex: 'backend'
  },
  {
    title: 'Test',
    dataIndex: 'test_case'
  },
  {
    title: 'Best Probability',
    dataIndex: 'probability'
  },
  {
    title: 'Inference Time (ms)',
    dataIndex: 'test_result',
    sorter: (a, b) => a.test_result - b.test_result
  }
]

const backendPlainOptions = ['WASM', 'WebGL']
const backendDefaultCheckedList = ['WASM', 'WebGL']
const preferPlainOptions = ['Sustained', 'Fast', 'Low']
const preferDefaultCheckedList = ['Sustained']

function onChange(pagination, sorter) {
  console.log('params', pagination, sorter)
}

export default {
  name: 'Mobilenet',
  components: {
    LHeader,
    LFooter
  },
  head: {
    script: [
      {
        src: '../js/webnn/webml-polyfill.js',
        defer: true
      },
      {
        src: '../js/util/base.js',
        defer: true
      },
      {
        src: '../js/util/flatbuffers.js',
        defer: true
      },
      {
        src: '../js/util/tflite/schema/schema_generated.js',
        defer: true
      },
      {
        src: '../js/util/tflite/TfLiteModelUtils.js',
        defer: true
      },
      {
        src: '../js/util/tflite/TFliteModelImporter.js',
        defer: true
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: ''
      }
    ]
  },
  data() {
    return {
      slidertooltip: true,
      iterations: 3,
      isnn: false,
      backendCheckedList: backendDefaultCheckedList,
      backendIndeterminate: true,
      backendPlainOptions,
      preferCheckedList: preferDefaultCheckedList,
      preferIndeterminate: true,
      preferPlainOptions,
      preferDisabled: false,
      backendalert: false,
      modelFormatName: '',
      model: '',
      nalabel: '',
      showbar: false,
      currentinference: '',
      chartSettings: {
        yAxisType: ['KMB', 'percent'],
        yAxisName: ['ms', ''],
        showLine: ['Probability']
      },
      histogramdata: {
        columns: ['Test', 'WASM', 'WebGL', 'Sustained', 'Fast']
      },
      progress: {
        value: 0,
        max: 15
      },
      loadingprogress: {
        value: 0,
        max: 1
      },
      columns,
      pagination: {
        pageSize: 9,
        showSizeChanger: true,
        pageSizeOptions: [
          '3',
          '6',
          '9',
          '12',
          '15',
          '30',
          '90',
          '180',
          '360',
          '720',
          '2880'
        ],
        showTotal: total => `Total ${total} items`,
        showSizeChange: (current, pageSize) => (this.pageSize = pageSize)
      },
      test_result: [],
      log: null,
      isrun: false,
      getbackend: '',
      gettestimage: '',
      task: {
        id: 1,
        modelName: 'Mobilenet v1 (TFLite)',
        description:
          'An efficient Convolutional Neural Networks for Mobile Vision Applications. Loading MobileNet model trained by ImageNet in TensorFlow Lite format, constructs and inferences it by WebML API.',
        model_version: 'v1.0_224',
        accuracy: '70.9%',
        model_size: '16.9MB',
        paper_url: 'https://arxiv.org/pdf/1704.04861.pdf',
        test: {
          image: [
            '../img/bee_eater.jpg',
            // '../img/traffic_light.jpg',
            '../img/pinwheel.jpg'
          ]
        }
      }
    }
  },
  computed: {
    backendCheckedListLength: function() {
      return this.backendCheckedList.length
    },
    preferCheckedListLength: function() {
      return this.preferCheckedList.length
    },
    realCheckedBackendLength: function() {
      return this.backendCheckedList.length + this.preferCheckedList.length
    },
    progressText: function() {
      return ((this.progress.value / this.progress.max) * 100).toFixed(0) + '%'
    },
    progressPercent: function() {
      const p = Number(
        ((this.progress.value / this.progress.max) * 100).toFixed(0)
      )
      return p
    },
    progressLoadingText: function() {
      return (
        (
          (this.loadingprogress.value / this.loadingprogress.max) *
          100
        ).toFixed(0) + '%'
      )
    },
    progressLoadingPercent: function() {
      return Number(
        (
          (this.loadingprogress.value / this.loadingprogress.max) *
          100
        ).toFixed(0)
      )
    },
    getModel: function() {
      const model = this.$store.state.intro.imageClassificationModels.filter(
        f => f.modelFormatName == this.modelFormatName
      )
      return model[0]
    }
  },
  mounted() {
    setTimeout(() => {
      this.slidertooltip = false
    }, 500)
    this.modelFormatName = this.$route.params.pathMatch
    this.model = this.getModel
    setInterval(this.getLog, 100)
    setInterval(this.getModelProgress, 100)
    this.scrollToBottom()
    this.progress.max =
      this.realCheckedBackendLength * this.task.test.image.length
    this.loadingprogress.max = 1
    // this.gettestimage = this.task.test.image[0]
    this.isWebNN()
    if (this.isnn) {
      this.preferDisabled = false
    } else {
      this.preferDisabled = true
      this.preferCheckedList = []
    }
    this.updateBarColumn()
  },
  updated: function() {
    this.scrollToBottom()
  },
  destoryed() {
    clearInterval(this.getModelProgress)
    clearInterval(this.getLog)
  },
  methods: {
    timeout: function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    uniqueList: function(array) {
      const r = []
      for (let i = 0, l = array.length; i < l; i++) {
        for (let j = i + 1; j < l; j++)
          if (JSON.stringify(array[i]) == JSON.stringify(array[j])) j = ++i
        r.push(array[i])
      }
      return r
    },
    updateBarColumn: function() {
      this.histogramdata.columns = [].concat(
        'Test',
        this.backendCheckedList,
        this.preferCheckedList
      )
      console.log(this.histogramdata.columns)
    },
    scrollToBottom: function() {
      this.$nextTick(() => {
        const container = this.$el.querySelector('#log')
        container.scrollTop = container.scrollHeight
      })
    },
    copylog: function() {
      new ClipboardJS('#btnlog')
      this.$message.success('Log has been copied to clipboard')
    },
    run: async function() {
      let i = 0
      let idvalue = 1
      this.test_result = []

      if (
        this.backendCheckedListLength == 0 &&
        this.preferCheckedListLength == 0
      ) {
        this.backendalert = true
        return
      }

      this.isrun = true
      await getModelArrayBuffer(this.model.modelFile)

      if (this.backendCheckedListLength > 0) {
        console.log(this.backendCheckedList)
        for (const item of this.backendCheckedList) {
          for (const image of this.task.test.image) {
            this.currentinference = ''
            this.nalabel = ''
            const configuration = {
              id: idvalue,
              model: this.model,
              modelFormatName: this.modelFormatName,
              modelVersion: this.task.model_version,
              backend: item,
              prefer: '',
              iteration: this.iterations,
              // model: this.taskModeFile,
              // label: this.taskLabelFile,
              image: image
            }
            this.getbackend = configuration.backend
            this.gettestimage = configuration.image
            await run(configuration)
            this.currentinference = currentinference
            this.nalabel = nalabel
            await this.timeout(500)
            this.progress.value = ++i
            idvalue++
          }
        }
      }
      if (this.preferCheckedListLength > 0) {
        console.log(this.preferCheckedList)
        for (const p of this.preferCheckedList) {
          for (const image of this.task.test.image) {
            this.currentinference = ''
            this.nalabel = ''
            const configuration = {
              id: idvalue,
              model: this.model,
              modelFormatName: this.modelFormatName,
              modelVersion: this.task.model_version,
              backend: 'WebML',
              prefer: p,
              iteration: this.iterations,
              // model: this.taskModeFile,
              // label: this.taskLabelFile,
              image: image
            }
            this.getbackend = configuration.backend
            this.gettestimage = configuration.image
            await run(configuration)
            this.currentinference = currentinference
            this.nalabel = nalabel
            await this.timeout(500)
            this.progress.value = ++i
            idvalue++
          }
        }
      }
      idvalue = 1
      await clearModelArrayBuffer()
      this.test_result = testresult
      this.showbar = true

      this.histogramdata.rows = []
      let t = {}
      t.id = 1
      t.Test = 0
      t.WASM = 0
      t.WebGL = 0
      t.Sustained = 0
      t.Fast = 0
      t.Low = 0

      this.task.test.image.map(image => {
        let id = 1
        for (const item of testresult) {
          if (item.test_case == image.split('/').pop()) {
            t.id = id
            t.Test = item.test_case
            if (item.backend.toLowerCase() == 'wasm') {
              t.WASM = item.test_result
            } else if (item.backend.toLowerCase() == 'webgl') {
              t.WebGL = item.test_result
            } else if (item.backend.toLowerCase() == 'sustained') {
              t.Sustained = item.test_result
            } else if (item.backend.toLowerCase() == 'fast') {
              t.Fast = item.test_result
            } else if (item.backend.toLowerCase() == 'low') {
              t.Low = item.test_result
            }
            id++
          }
        }
        this.histogramdata.rows.push(t)
        console.log('>>>>>>>>>>>>>>>histogramdata')
        console.log(t)
        t = {}
        id = 1
      })
    },
    getLog: function() {
      this.log = finallog
    },
    getModelProgress: function() {
      this.loadingprogress.value = modelprogress
    },
    onChange,
    backendOnChange: function(backendCheckedList) {
      this.backendIndeterminate =
        !!backendCheckedList.length &&
        backendCheckedList.length < backendPlainOptions.length
      this.progress.max =
        this.realCheckedBackendLength * this.task.test.image.length
      this.updateBarColumn()
    },
    preferOnChange: function(preferCheckedList) {
      this.preferIndeterminate =
        !!preferCheckedList.length &&
        preferCheckedList.length < preferPlainOptions.length
      this.progress.max =
        this.realCheckedBackendLength * this.task.test.image.length
      this.updateBarColumn()
    },
    isWebNN: function() {
      if (navigator.ml && navigator.ml.getNeuralNetworkContext()) {
        if (!navigator.ml.isPolyfill) {
          this.isnn = true
        } else {
          this.isnn = false
        }
      } else {
        this.isnn = false
      }
    }
  }
}
</script>

<style scoped></style>
