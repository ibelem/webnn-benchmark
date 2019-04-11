<template>
  <a-layout id="components-layout-index-top" class="layout">
    <LHeader />
    <a-layout-content>
      <Tests />
    </a-layout-content>
    <LFooter />
  </a-layout>
</template>

<script>
import LHeader from '~/components/LHeader.vue'
import Tests from '~/components/Tests.vue'
import LFooter from '~/components/LFooter.vue'

export default {
  components: {
    LHeader,
    Tests,
    LFooter
  },
  head() {
    return { title: this.$t('home.title') }
  }
}
</script>

<style scoped></style>
