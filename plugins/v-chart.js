import Vue from 'vue'
// import VCharts from 'v-charts'
// import VeLine from 'v-charts/lib/line.common'
import VeHistogram from 'v-charts/lib/histogram.common.js'
import VeBar from 'v-charts/lib/bar.common.js'
import VeRing from 'v-charts/lib/ring.common.js'

// Vue.component(VeLine.name, VeLine)
Vue.component(VeHistogram.name, VeHistogram)
Vue.component(VeBar.name, VeBar)
Vue.component(VeRing.name, VeRing)
// Vue.use(VCharts)
