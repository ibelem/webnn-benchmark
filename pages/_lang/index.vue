<template>
  <a-layout id="components-layout-index-top" class="layout">
    <LHeader />
    <a-layout-content>
      <div>
        <h3 class="title">{{ $t('home.title') }}</h3>
        <div class="subtitle">{{ $t('home.introduction') }}</div>
      </div>
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
  }
}
</script>

<style scoped></style>
