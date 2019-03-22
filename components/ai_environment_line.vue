<template>
  <div class="inline">
    <div
      class="inline"
      v-if="
        devicevendor.toString().length > 0 ||
          devicemodel.toString().length > 0 ||
          devicetype.toString().length > 0
      "
    >
      <span v-if="devicevendor">{{ devicevendor }}</span>
      <span v-if="devicemodel">{{ devicemodel }}</span>
      <span v-if="devicetype" class="cap">{{ devicetype }}</span>
    </div>
    <span v-if="cpuarchitecture">
      {{ cpuarchitecture.toUpperCase() }} {{ cpuhardwareconcurrency }} Cores -
    </span>
    <span v-if="devicememory">{{ devicememory }} GB -</span>
    {{ getGPU() }} - {{ os }} {{ osversion }} {{ osplatform }} -
    {{ browsername }} {{ browserversion }}
  </div>
</template>

<script>
export default {
  name: 'environment',
  head: {
    script: [
      {
        src:
          'https://cdn.jsdelivr.net/npm/ua-parser-js@0/dist/ua-parser.min.js',
        defer: true
      },
      {
        src: '../js/environment.js',
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
  mounted: function() {
    let aienv = new AIEnvironment()
    let result = aienv.result()
    this.devicevendor = result.hardware.devicevendor
      ? result.hardware.devicevendor
      : ''
    this.devicemodel = result.hardware.devicemodel
      ? result.hardware.devicemodel
      : ''
    this.devicetype = result.hardware.devicetype
      ? result.hardware.devicetype
      : ''
    this.devicememory = result.hardware.devicememory
      ? result.hardware.devicememory
      : ''
    this.cpuarchitecture = result.hardware.cpuarchitecture
    this.cpuhardwareconcurrency = result.hardware.cpuhardwareconcurrency
    this.gpu = result.hardware.gpu
    this.gpuvender = result.hardware.gpuvender

    this.os = result.software.os
    this.osversion = result.software.osversion
    this.platform = result.software.platform
    this.browsername = result.browser.name
    this.browserversion = result.browser.version
    this.enginename = result.browser.enginename
    this.engineversion = result.browser.engineversion
  },
  methods: {
    trim() {
      if (typeof String.prototype.trim === 'undefined') {
        String.prototype.trim = function() {
          return String(this).replace(/^\s+|\s+$/g, '')
        }
      }
    },
    getGPU() {
      if (this.gpu) {
        let gpu = this.gpu
        const gpucharacters = [
          '(Skylake GT2)',
          'Intel(R)',
          'vs_5_0 ps_5_0',
          'NVIDIA GeForce',
          'Mesa DRI',
          'Graphics',
          'Direct3D11',
          'ANGLE',
          'Microsoft',
          'Google',
          '(TM)',
          '(',
          ')'
        ]

        gpucharacters.forEach(item => {
          gpu = gpu.replace(item, '')
        })

        gpu = gpu.trim()
        return gpu
      } else {
        return ''
      }
    }
  },
  computed: {
    // os_and_version: function() {
    //   return this.os + ' ' + this.osversion
    // }
  },
  data() {
    return {
      devicevendor: '',
      devicemodel: '',
      devicetype: '',
      devicememory: '',
      cpuarchitecture: '',
      cpuhardwareconcurrency: '',
      gpu: '',
      gpuvender: '',
      os: '',
      osversion: '',
      osplatform: '',
      browsername: '',
      browserversion: '',
      enginename: '',
      engineversion: ''
    }
  }
}
</script>

<style scoped>
.cap {
  text-transform: capitalize;
}

.nocap {
  text-transform: none;
}

.inline {
  display: inline;
}
</style>
