<template>
  <div>
    <section class="container">
      <div>
        <nav class="Header__Menu">
          <NuxtLink :to="$i18n.path('')" class="Header__Link" exact>
            {{ $t('links.home') }}
          </NuxtLink>
          <NuxtLink :to="$i18n.path('about')" class="Header__Link" exact>
            {{ $t('links.about') }}
          </NuxtLink>
          <NuxtLink v-if="$i18n.locale === 'en'" :to="`/zh` + $route.fullPath" class="Header__Link" active-class="none" exact>
            {{ $t('links.chinese') }}
          </NuxtLink>
          <NuxtLink v-else :to="$route.fullPath.replace(/^\/[^\/]+/, '')" class="Header__Link" active-class="none" exact>
            {{ $t('links.english') }}
          </NuxtLink>
        </nav>
        <logo />
        <h4 class="title">
          {{ $t('home.title') }}
        </h4>
        <h5 class="subtitle">
          {{ $t('home.introduction') }}
        </h5>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Logo,
    Footer
  },
  head() {
    return { title: this.$t('home.title') }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 30px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 22px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
