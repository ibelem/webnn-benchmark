<template>
  <a-layout id="components-layout-test-top" class="layout">
    <LHeader/>
    <MacSwitcher/>
    <a-layout-content>
      <div class>
        <h2 class>{{ parameter }}</h2>

        <div class>{{ task.description }}</div>

        <div v-if="getBackend" class>
          <div v-if="task.model_version">Model Version: {{ task.model_version }}</div>
          <div class="run">
            <div class="runhalfwidth">
              <div class>Loading Model File: {{ progress_loading_text }}</div>
              <a-progress :percent="progress_loading_percent"/>
            </div>
            <div class="runhalfwidth">
              <div class>Run Model with Tests: {{ progress_text }}</div>
              <a-progress :percent="progress_percent"/>
            </div>
          </div>
        </div>

        <div class="run">
          <div v-show="getTestImage" class="runhalfwidth">
            <img id="testimage" :src="getTestImage" alt="Test Image">
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
        <div v-if="showBar" class>
          <div class>
              <a-table :columns="columns" :data-source="test_result" size="small"/>
              <div class>{{ nalabel }}</div>
          </div>
          <div class>
            <div class="bar-chart">
              <ve-histogram v-if="showBar" :data="barData" :settings="chartSettings" class="cmh"></ve-histogram>
            </div>
          </div>
        </div>
        <div class="runbtn">
          <a-button type="primary" @click="run">Run {{ task.name }}</a-button>
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
import MacSwitcher from '~/components/ai_mac_switcher.vue'
import {
  finallog,
  modelprogress,
  currentinference,
  testresult,
  bardata,
  run,
  nalabel
  // getModelArrayBuffer,
  // clearModelArrayBuffer
} from '~/static/js/main.js'

const columns = [
  {
    title: 'Backend',
    dataIndex: 'backend'
  },
  {
    title: 'Prefer',
    dataIndex: 'prefer'
  },
  {
    title: 'Test',
    dataIndex: 'test_case'
  },
  {
    title: 'Probability',
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
    LFooter,
    MacSwitcher
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
        yAxisName: ['ms', ''],
        showLine: ['Probability']
      },
      barData: {
        columns: ['Test Image', 'WASM Polyfill', 'WebGL Polyfill', 'WebML'],
        rows: [
          {
            'Test Image': 'bee_eater.jpg',
            'WASM Polyfill': 0,
            'WebGL2 Polyfill': 0,
            WebML: 0
          }
        ]
      },
      progress: {
        value: 0,
        max: 9
      },
      progress_loading: {
        value: 0,
        max: 1
      },
      columns,
      test_result: [],
      log: null,
      getBackend: '',
      getTestImage: '',
      task: {
        id: 1,
        model_format_name: 'mobilenet_v1_tflite',
        backend: ['WASM', 'WebGL'],
        prefer: ['sustained'],
        iteration: 4,
        framework: 'webml-polyfill.js',
        model: '../image_classification/model/mobilenet_v1_1.0_224.tflite',
        label: '../image_classification/model/labels.txt',
        // "model": 'https://aimark.nos-eastchina1.126.net/model/mobilenet/mobilenet_v1_1.0_224.tflite',
        // "label": 'https://aimark.nos-eastchina1.126.net/model/mobilenet/labels.txt',
        name: 'Image Classification (MobileNet V1)',
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
        },
        platform: ['android', 'windows', 'linux'],
        browser: ['chrome', 'firefox']
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
    this.getTestImage = this.task.test.image[0]
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
      // await getModelArrayBuffer(this.task.model)
      for (const item of this.task.backend) {
        for (const image of this.task.test.image) {
          this.currentinference = ''
          this.nalabel = ''
          let framework = this.task.framework
          if (item == 'WebML') {
            framework = 'WebML API'
          }
          const configuration = {
            framework: framework,
            modelName: this.parameter,
            modelVersion: this.task.model_version,
            backend: item,
            prefer: this.task.prefer,
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
      // await clearModelArrayBuffer()
      this.test_result = testresult
      this.showBar = true

      this.barData.rows = []
      let t = {}
      t['Test Image'] = 0
      t['WASM Polyfill'] = 0
      t['WebGL Polyfill'] = 0
      t.WebML = 0

      this.task.test.image.map(image => {
        for (const item of testresult) {
          if (item.test_case == image.split('/').pop()) {
            t['Test Image'] = item.test_case
            if (item.backend.toLowerCase() == 'wasm') {
              t['WASM Polyfill'] = item.test_result
            } else if (item.backend.toLowerCase() == 'webgl') {
              t['WebGL Polyfill'] = item.test_result
            } else if (item.backend.toLowerCase() == 'webml') {
              t.WebML = item.test_result
            }
          }
        }
        this.barData.rows.push(t)
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
