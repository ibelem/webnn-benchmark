<template>
  <ve-histogram
    v-if="showBar"
    :data="chartData"
    :settings="chartSettings"
  ></ve-histogram>
</template>

<script>
export default {
  data() {
    this.chartSettings = {
      yAxisType: ['KMB', 'percent'],
      yAxisName: ['ms', ''],
      showLine: ['Probability']
    }
    return {
      showBar: false,
      chartData: {
        columns: ['Image', 'WASM', 'WebGL2', 'WebML'],
        rows: [
          {
            Image: 'bee',
            WASM: 1393,
            WebGL2: 1093,
            WebML: 93
          },
          {
            Image: 'net',
            WASM: 3530,
            WebGL2: 3230,
            WebML: 103
          },
          {
            Image: 'chess',
            WASM: 2923,
            WebGL2: 2623,
            WebML: 193
          }
        ]
      }
    }
  },
  mounted() {
    this.showBar = true
  }
}
</script>
