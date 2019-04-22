<template>
  <a-layout id="components-layout-test-top" class="layout">
    <LHeader/>
    <a-layout-content>
      <div class>
        <h2>{{ task.modelName }}</h2>

        <div class="s85">{{ task.description }}</div>

        <div class="s85 runfullwidth mt">Model Version: {{ task.model_version }}</div>

        <div v-if="isrun">
          <div class="run">
            <div class="runhalfwidth">
              <div class="s85">Loading Model File: {{ progress_loading_text }}</div>
              <a-progress :percent="progress_loading_percent" />
            </div>
            <div class="runhalfwidth">
              <div class="s85">Run Model with Tests: {{ progress_text }}</div>
              <a-progress :percent="progress_percent" />
            </div>
          </div>
        </div>

        <div class="run">
          <div v-show="getTestImage" class="runhalfwidth vc">
            <img id="testimage" :src="getTestImage" alt="Test Image" />
            <canvas class="testimage"></canvas>
            <div class="inference_label">{{ currentinference }}</div>
          </div>
          <div v-show="getBackend" class="runlog runhalfwidth">
            <div id="log" class v-html="log"></div>
            <div class="btnlog">
              <a-button id="btnlog" data-clipboard-target="#log" @click="copylog">Copy Log</a-button>
            </div>
          </div>
        </div>
        <h2 v-if="showBar" class='runfullwidth'>{{ task.modelName }} Benchmark</h2>
        <div v-if="showBar" class='run'>
          <div class="runhalfwidth">
            <a-table :columns="columns" :data-source="test_result" size="small" rowKey="id" :pagination="pagination" />
            <div class="nalabel">{{ nalabel }}</div>
          </div>
          <div class="runhalfwidth">
            <div class="bar-chart">
              <ve-histogram v-if="showBar" :data="barData" :settings="chartSettings" rowKey="id"></ve-histogram>
            </div>
          </div>
        </div>
        <div class="runbtn">
          <a-button type="primary" @click="run">Run {{ task.modelName }}</a-button>
        </div>
      </div>
    </a-layout-content>
    <LFooter />
  </a-layout>
</template>

<script>
import LHeader from '~/components/LHeader.vue'
import LFooter from '~/components/LFooter.vue'
import ClipboardJS from 'clipboard'
import MacSwitcher from '~/components/ai_mac_switcher.vue'
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
    dataIndex: 'test_result'
  }
]

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
      parameter: '',
      nalabel: '',
      showBar: false,
      currentinference: '',
      chartSettings: {
        yAxisType: ['KMB', 'percent'],
        yAxisName: ['Time (ms)', ''],
        showLine: ['Probability']
      },
      barData: {
        columns: ['test', 'wasm', 'webgl', 'sustained', 'fast', 'low'],
        rows: [
          {
            'test': 'bee_eater.jpg',
            'wasm': 0,
            'webgl': 0,
            'sustained': 0,
            'fast': 0,
            'low': 0
          }
        ]
      },
      progress: {
        value: 0,
        max: 15
      },
      progress_loading: {
        value: 0,
        max: 1
      },
      columns,
      pagination: {
        pageSize: 9,
        showSizeChanger: true,
        pageSizeOptions: ['3', '6', '9', '15', '30', '50', '100'],
        showTotal: total => `Total ${total} items`,
        showSizeChange: (current, pageSize) => this.pageSize = pageSize
      },
      test_result: [],
      log: null,
      isrun: false,
      getBackend: '',
      getTestImage: '',
      task: {
        id: 1,
        modelName: 'Mobilenet v1 (TFLite)',
        model_format_name: 'mobilenet_v1_tflite',
        backend: ['WASM', 'WebGL', 'WebML'],
        prefer: ['sustained', 'fast', 'low'],
        iteration: 4,
        framework: 'webml-polyfill.js',
        model: '../image_classification/model/mobilenet_v1_1.0_224.tflite',
        label: '../image_classification/model/labels.txt',
        description:
          'An efficient Convolutional Neural Networks for Mobile Vision Applications. Loading MobileNet model trained by ImageNet in TensorFlow Lite format, constructs and inferences it by WebML API.',
        model_version: 'v1.0_224',
        accuracy: '70.9%',
        model_size: '16.9Mb',
        paper_url: 'https://arxiv.org/pdf/1704.04861.pdf',
        test: {
          resolution: '224 x 224 px',
          image: [
            '../img/bee_eater.jpg',
            '../img/traffic_light.jpg',
            '../img/pinwheel.jpg'
          ]
        }
      }
    }
  },
  computed: {
    progress_text: function() {
      return ((this.progress.value / this.progress.max) * 100).toFixed(0) + '%'
    },
    progress_percent: function() {
      const p = Number(
        ((this.progress.value / this.progress.max) * 100).toFixed(0)
      )
      return p
    },
    progress_loading_text: function() {
      return (
        (
          (this.progress_loading.value / this.progress_loading.max) *
          100
        ).toFixed(0) + '%'
      )
    },
    progress_loading_percent: function() {
      return Number(
        (
          (this.progress_loading.value / this.progress_loading.max) *
          100
        ).toFixed(0)
      )
    }
  },
  mounted() {
    this.parameter = this.$route.params.pathMatch
    setInterval(this.getLog, 100)
    setInterval(this.getModelProgress, 100)
    this.scrollToBottom()
    this.progress.max = this.task.backend.length * this.task.test.image.length
    this.progress_loading.max = 1
    // this.getTestImage = this.task.test.image[0]
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
      this.isrun = true
      await getModelArrayBuffer(this.task.model)
      for (const item of this.task.backend) {
        let framework = this.task.framework
        if (item === 'WebML') {
          framework = 'WebML API'
          for (const p of this.task.prefer) {
            for (const image of this.task.test.image) {
              this.currentinference = ''
              this.nalabel = ''
              const configuration = {
                framework: framework,
                modelName: this.parameter,
                modelVersion: this.task.model_version,
                backend: item,
                prefer: p,
                iteration: this.task.iteration,
                model: this.task.model,
                label: this.task.label,
                image: image
              }
              this.getBackend = configuration.backend
              this.getTestImage = configuration.image
              await run(configuration)
              this.currentinference = currentinference
              this.nalabel = nalabel
              await this.timeout(500)
              this.progress.value = ++i
            }
          }
        } else {
          for (const image of this.task.test.image) {
            this.currentinference = ''
            this.nalabel = ''
            const configuration = {
              framework: framework,
              modelName: this.parameter,
              modelVersion: this.task.model_version,
              backend: item,
              prefer: '',
              iteration: this.task.iteration,
              model: this.task.model,
              label: this.task.label,
              image: image
            }
            this.getBackend = configuration.backend
            this.getTestImage = configuration.image
            await run(configuration)
            this.currentinference = currentinference
            this.nalabel = nalabel
            await this.timeout(500)
            this.progress.value = ++i
          }
        }
      }
      await clearModelArrayBuffer()
      this.test_result = testresult
      this.showBar = true

      this.barData.rows = []
      let t = {}
      t.test = 0
      t.wasm = 0
      t.webgl = 0
      t.sustained = 0
      t.fast = 0
      t.low = 0

      this.task.test.image.map(image => {
        for (const item of testresult) {
          if (item.test_case == image.split('/').pop()) {
            t.test = item.test_case
            if (item.backend.toLowerCase() == 'wasm') {
              t.wasm = item.test_result
            } else if (item.backend.toLowerCase() == 'webgl') {
              t.webgl = item.test_result
            } else if (item.backend.toLowerCase() == 'webnn sustained') {
              t.sustained = item.test_result
            } else if (item.backend.toLowerCase() == 'webnn fast') {
              t.fast = item.test_result
            } else if (item.backend.toLowerCase() == 'webnn low') {
              t.low = item.test_result
            }
          }
        }
        this.barData.rows.push(t)
        console.log(t)
        t = {}
      })
    },
    getLog: function() {
      this.log = finallog
    },
    getModelProgress: function() {
      this.progress_loading.value = modelprogress
    }
  }
}
</script>

<style scoped></style>
