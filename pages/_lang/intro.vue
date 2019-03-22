<template>
  <a-layout id="components-layout-index-top" class="layout">
    <LHeader />
    <a-layout-content>
      <Intro />
    </a-layout-content>
    <LFooter />
  </a-layout>
</template>

<script>
import LHeader from '~/components/LHeader.vue'
import Intro from '~/components/Intro.vue'
import LFooter from '~/components/LFooter.vue'

export default {
  components: {
    LHeader,
    Intro,
    LFooter
  },
  head() {
    return { title: this.$t('home.title') }
  }
}
</script>

<style scoped></style>
