<template>
  <div>
    <div
      v-if="devicevendor.toString().length > 0 || devicemodel.toString().length > 0 || devicetype.toString().length > 0"
    >
      <span v-if="devicevendor">{{ devicevendor }}</span>
      <span v-if="devicemodel">{{ devicemodel }}</span>
      <span v-if="devicetype" class="cap">{{ devicetype }}</span>
    </div>
    <span
      v-if="cpuarchitecture"
    >{{ cpuarchitecture.toUpperCase() }} {{ cpuhardwareconcurrency }} Cores /</span>
    <span v-if="devicememory">{{ devicememory }} GB /</span>
    {{ getGPU() }}
    <br>
    {{ os }} {{ osversion }} {{ osplatform }} / {{ browsername }} {{ browserversion }}
  </div>
</template>

<script>
export default {
  head: {
    script: [
      {
        // src: 'https://cdn.jsdelivr.net/npm/ua-parser-js@0/dist/ua-parser.min.js',
        src: '../js/ua-parser.min.js',
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
  },
  computed: {
    // os_and_version: function() {
    //   return this.os + ' ' + this.osversion
    // }
  },
  mounted: function() {
    const env = new AIEnvironment()
    const result = env.result()
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
</style>
