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
    {{ gpu }}
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
        defer: false
      },
      {
        src: '../js/environment.js',
        defer: false
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
  mounted: function() {
    /* global AIEnvironment */
    /* eslint no-undef: "error" */

    const aienv = new AIEnvironment()
    const result = aienv.result()
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
    this.gpu = result.hardware.compactgpu
    this.gpuvender = result.hardware.gpuvender

    this.os = result.software.os
    this.osversion = result.software.osversion
    this.platform = result.software.platform
    this.browsername = result.browser.name
    this.browserversion = result.browser.version
    this.enginename = result.browser.enginename
    this.engineversion = result.browser.engineversion
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
