<template>
  <div>
    <section class="container">
      <div>
        <Nav />
        <logo />
        <h4 class="title">
          {{ $t('home.title') }}
        </h4>
        <h5 class="subtitle">
          {{ $t('home.introduction') }}
        </h5>
      </div>
    </section>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Nav from '~/components/Nav.vue'
// import Footer from '~/components/Footer.vue'

export default {
  components: {
    Logo,
    Nav
    // Footer
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
