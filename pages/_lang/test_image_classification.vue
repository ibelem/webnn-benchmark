<template>
  <a-layout id="components-layout-index-top" class="layout">
    <LHeader />
    <a-layout-content>
      {{ parameter }}
    </a-layout-content>
    <LFooter />
  </a-layout>
</template>

<script>
import LHeader from '~/components/LHeader.vue'
import LFooter from '~/components/LFooter.vue'

export default {
  components: {
    LHeader,
    LFooter
  },
  head() {
    return { title: this.$t('home.title') }
  },
  data() {
    return {
      parameter: ''
    }
  },
  mounted() {
    this.parameter = this.$route.params.pathMatch
  }
}
</script>

<style scoped></style>
