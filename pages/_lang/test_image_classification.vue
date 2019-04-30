<template>
  <a-layout id="components-layout-test-top" class="layout">
    <LHeader/>
    <a-layout-content>
      <div class="full">
        <h2>{{ model.modelName }}</h2>
        <div class="s85">{{ model.intro }}</div>
        <div class="s85 runfullwidth atag mt mb">
          <a-tag color="pink" v-if="model.modelVersion">Version: {{ model.modelVersion }}</a-tag>
          <a-tag color="pink" v-if="model.modelSize">Size: {{ model.modelSize }}</a-tag>

          <a-popover placement="top" v-if="model.top1Accuracy">
            <template slot="content">
              Computed using the
              <a
                href="https://github.com/tensorflow/tensorflow/tree/master/tensorflow/lite/tools/accuracy/ilsvrc"
              >TFLite accuracy tool</a>.
            </template>
            <template slot="title">
              <span>Model Accuracy</span>
            </template>
            <a-tag color="pink">Top 1 Accuracy: {{ model.top1Accuracy }}</a-tag>
          </a-popover>

          <a-popover placement="top" v-if="model.top5Accuracy">
            <template slot="content">
              Computed using the
              <a
                href="https://github.com/tensorflow/tensorflow/tree/master/tensorflow/lite/tools/accuracy/ilsvrc"
              >TFLite accuracy tool</a>.
            </template>
            <template slot="title">
              <span>Model Accuracy</span>
            </template>
            <a-tag color="pink">Top 5 Accuracy: {{ model.top5Accuracy }}</a-tag>
          </a-popover>

          <a-popover placement="top" v-if="model.tfLitePerformance">
            <template slot="content">Benchmarked on Pixel-2 using single thread large core.</template>
            <template slot="title">
              <span>Performance</span>
            </template>
            <a-tag color="pink">TFLite Performance: {{ model.tfLitePerformance }}</a-tag>
          </a-popover>

          <!-- <a-popover placement="top" v-if="model.tensorflowPerformance">
            <template slot="content">Benchmarked on Pixel-2 using single thread large core.</template>
            <template slot="title">
              <span>Performance</span>
            </template>
            <a-tag color="pink">Tensorflow Performance: {{ model.tensorflowPerformance }}</a-tag>
          </a-popover>
          -->
        </div>

        <div class="s85 runfullwidth mt mb option">
          <a-alert
            v-if="backendalert"
            class="mt"
            message="No backend selected, stop the testing."
            type="warning"
            closable
          />
          <div class="options">
            <a-popover placement="top">
              <template slot="content" class="pop">
                <p>
                  WASM: Compiled Tensorflow Lite C++ kernels to WebAssembly format
                  <br>WebGL: Tensorflow.js WebGL kernel
                  <br>WebNN Sustained: Prefer maximizing the throughput of successive frames, for example when processing successive frames coming from the camera.
                  <br>WebNN Fast: Prefer returning a single answer as fast as possible, even if this causes more power consumption.
                  <br>WebNN Low: Prefer executing in a way that minimizes battery drain. This is desirable for compilations that will be executed often.
                </p>
              </template>
              <template slot="title" class="pop">
                <span>Backend</span>
              </template>
              <span class="optiontitle">Backend</span>
            </a-popover>
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
            <a-slider :min="2" :max="500" v-model="iterations" :tooltipVisible="slidertooltip" />
            <a-input-number :min="2" :max="500" :step="1" v-model="iterations"/>
          </div>
          <div class="options">
            <span class="optiontitle">Tests</span>
            <div class="optionbackend">
              <a-checkbox-group
                :options="testPlainOptions"
                v-model="testCheckedList"
                @change="testOnChange"
              />
            </div>
             
          </div>
        </div>

        <div v-if="showbar && test_result.length > 0">
          <h3 class="runfullwidth mb">{{ model.modelName }} Benchmark</h3>
          <div class="run">
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
                <ve-histogram v-if="showbar" :data="histogramdata" :settings="chartSettings"></ve-histogram>
              </div>
            </div>
          </div>
        </div>

        <div v-if="showbar && wasmsubgraph.length > 0 && backendCheckedList.indexOf('WASM') >-1">
          <h3 class="runfullwidth mb">{{ model.modelName }} Subgraph Operators Benchmark (WASM)</h3>
          <div class="run">
            <div class="runhalfwidth">
              <a-table
                :columns="wasmsubgraphcolumns"
                :data-source="wasmsubgraph"
                size="small"
                rowKey="id"
                :pagination="wasmsubgraphpagination"
                @change="wasmsubgraphOnChange"
              />
            </div>
            <div class="runhalfwidth">
              <div class="bar-chart">
                <ve-ring
                  v-if="showbar && wasmsubgraphtime"
                  :data="wasmsubgraphtime"
                  :settings="wasmsubgraphtimeSettings"
                ></ve-ring>
              </div>
            </div>
          </div>
        </div>

        <div v-if="isrun" class="mb">
          <div class="run mt">
            <div class="runhalfwidth">
              <div class="s85">Loading Model File: {{ progressLoadingText }}</div>
              <a-progress :percent="progressLoadingPercent"/>
            </div>
            <div class="runhalfwidth">
              <div class="s85">Run Model with Tests: {{ progressText }}</div>
              <a-progress :percent="progressPercent"/>
            </div>
          </div>
        </div>

        <div class="run">
          <div v-show="testimage" class="runhalfwidth vc">
            <img id="testimage" :src="testimage" alt="Test Image" />
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

        <div class="runbtn mt">
          <a-button type="primary" @click="run">Run {{ model.modelName }}</a-button>
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
  clearModelArrayBuffer,
  cleanTestResult
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

const wasmsubgraphcolumns = [
  {
    title: 'Operator',
    dataIndex: 'ops'
  },
  {
    title: 'Inference Time (ms)',
    dataIndex: 'time',
    sorter: (a, b) => a.time - b.time
  }
]

const backendPlainOptions = ['WASM', 'WebGL']
const backendDefaultCheckedList = ['WASM', 'WebGL']
const preferPlainOptions = ['Sustained', 'Fast', 'Low']
const preferDefaultCheckedList = ['Sustained']
const testPlainOptions = ['Bee-eater', 'Traffic Light', 'Pinwheel']
const testDefaultCheckedList = ['Bee-eater', 'Traffic Light']

function onChange(pagination, sorter) {
  // console.log('params', pagination, sorter)
}

function wasmsubgraphOnChange(wasmsubgraphpagination, sorter) {
  // console.log('params', wasmsubgraphpagination, sorter)
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
        src: '../js/util/protobuf.min.js',
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
      },
      {
        src: '../js/util/onnx/onnx.js',
        defer: true
      },
      {
        src: '../js/util/onnx/OnnxModelUtils.js',
        defer: true
      },
      {
        src: '../js/util/onnx/OnnxModelImporter.js',
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
      wasmsubgraph: [],
      wasmsubgraphtime: {
        columns: ['ops', 'time']
      },
      wasmsubgraphtimeSettings: {
        dimension: 'ops',
        metrics: 'time',
        legendLimit: 20,
        radius: [60, 100],
        offsetY: 220
      },
      slidertooltip: false,
      iterations: 3,
      isnn: false,
      testCheckedList: testDefaultCheckedList,
      testIndeterminate: true,
      testPlainOptions,
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
      wasmsubgraphcolumns,
      wasmsubgraphpagination: {
        pageSize: 9,
        showSizeChanger: true,
        pageSizeOptions: ['9', '25', '50', '100', '500', '1000'],
        showTotal: total => `Total ${total} items`,
        showSizeChange: (current, pageSize) => (this.pageSize = pageSize)
      },
      test_result: [],
      log: null,
      isrun: false,
      getbackend: '',
      testimage: ''
    }
  },
  computed: {
    testCheckedListLength: function() {
      return this.testCheckedList.length
    },
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
        ((this.loadingprogress.value / this.loadingprogress.max) * 100).toFixed(
          0
        ) + '%'
      )
    },
    progressLoadingPercent: function() {
      return Number(
        ((this.loadingprogress.value / this.loadingprogress.max) * 100).toFixed(
          0
        )
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
    this.progress.max = this.realCheckedBackendLength * this.testCheckedListLength
    this.loadingprogress.max = 1
    this.isWebNN()
    if (this.isnn) {
      this.preferDisabled = false
    } else {
      this.preferDisabled = true
      this.preferCheckedList = []
    }
    this.updateBarColumn(),
    this.testimage = this.testImageSrc(this.testCheckedList[0])
  },
  updated: function() {
    this.scrollToBottom()
  },
  destoryed() {
    clearInterval(this.getModelProgress)
    clearInterval(this.getLog)
  },
  methods: {
    testImageSrc: function(name) {
      return `../img/${name.replace(' ', '_').toLowerCase()}.jpg`
    },
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
      // console.log(this.histogramdata.columns)
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
    subGraph: function(backend) {
      if (backend === 'WASM') {
        console.log('++++++++++++++++++++++++')
        let subgraphitem = {}
        let i = 1
        window.console.debug = msg => {
          console.log(msg)
          if (msg.indexOf('Subgraph 0') > -1 && msg.indexOf('WASM') > -1) {
            const s = msg
              .replace('Subgraph 0	 (WASM):', '')
              .replace('{', '')
              .replace('}', '')
              .replace(' ms', '')
            subgraphitem.id = i
            subgraphitem.ops = s.split('-')[1].trim()
            subgraphitem.time = Number(s.split('-')[0].trim())
            this.wasmsubgraph.push(subgraphitem)
            subgraphitem = {}
            i++
          }
        }
        console.log('==== wasmsubgraph ====')
        console.log(this.wasmsubgraph)
        i = 1
      }
    },
    wasmSubgraphTime: function() {
      const objArr = this.wasmsubgraph
      // first, convert data into a Map with reduce
      const counts = objArr.reduce((prev, curr) => {
        const count = prev.get(curr.ops) || 0
        prev.set(curr.ops, curr.time + count)
        return prev
      }, new Map())
      // then, map your counts object back to an array
      const reducedObjArr = [...counts].map(([ops, value]) => {
        const time = Number(value).toFixed(2)
        return { ops, time }
      })
      return reducedObjArr
    },
    run: async function() {
      this.showbar = false
      let i = 0
      let idvalue = 1
      this.test_result = []
      cleanTestResult()

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
          for (const image of this.testCheckedList) {

            this.currentinference = ''
            this.nalabel = ''
            const configuration = {
              id: idvalue,
              model: this.model,
              modelFormatName: this.modelFormatName,
              backend: item,
              prefer: '',
              iteration: this.iterations,
              // model: this.taskModeFile,
              // label: this.taskLabelFile,
              image: this.testImageSrc(image)
            }
            this.getbackend = configuration.backend
            this.testimage = this.testImageSrc(image)
            await run(configuration)
            this.subGraph(item)
            this.wasmsubgraphtime.rows = this.wasmSubgraphTime()
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
          for (const image of this.testCheckedList) {
            this.currentinference = ''
            this.nalabel = ''
            const configuration = {
              id: idvalue,
              model: this.model,
              modelFormatName: this.modelFormatName,
              backend: 'WebML',
              prefer: p,
              iteration: this.iterations,
              // model: this.taskModeFile,
              // label: this.taskLabelFile,
              image: this.testImageSrc(image)
            }
            this.getbackend = configuration.backend
            this.testimage = this.testImageSrc(image)
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

      this.testCheckedList.map(image => {
        let id = 1
        for (const item of testresult) {
          if (item.test_case.indexOf(image.replace(' ', '_').toLowerCase())>-1) {
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
    wasmsubgraphOnChange,
    testOnChange: function(testCheckedList) {
      this.testIndeterminate =
        !!testCheckedList.length &&
        testCheckedList.length < testPlainOptions.length
      this.progress.max = this.realCheckedBackendLength * this.testCheckedListLength
      if(this.testCheckedList[0]) {
        this.testimage = this.testImageSrc(this.testCheckedList[0])
      }
    },
    backendOnChange: function(backendCheckedList) {
      this.backendIndeterminate =
        !!backendCheckedList.length &&
        backendCheckedList.length < backendPlainOptions.length
      this.progress.max = this.realCheckedBackendLength * this.testCheckedListLength
      this.updateBarColumn()
    },
    preferOnChange: function(preferCheckedList) {
      this.preferIndeterminate =
        !!preferCheckedList.length &&
        preferCheckedList.length < preferPlainOptions.length
      this.progress.max = this.realCheckedBackendLength * this.testCheckedListLength
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
