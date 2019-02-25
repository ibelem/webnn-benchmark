<template>
  <div class="contaner">
    <nuxt-link class="navbar-item" to="/">
      <Logo />
    </nuxt-link>
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="home">
        <NuxtLink :to="$i18n.path('')">
          {{ $t('links.home') }}
        </NuxtLink>
      </a-menu-item>
      <a-menu-item key="benchmark" disabled>
        Benchmark
      </a-menu-item>
      <a-sub-menu>
        <span slot="title" class="submenu-title-wrapper">
          Tests
        </span>
        <a-menu-item-group title="TensorflowLite Format">
          <a-menu-item key="test:1">
            MobileNet v1
          </a-menu-item>
          <a-menu-item key="test:2">
            MobileNet v2
          </a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="ONNX Format">
          <a-menu-item key="test:3">
            SqueezeNet
          </a-menu-item>
          <a-menu-item key="test:4">
            Option 4
          </a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-menu-item key="ranking" disabled>
        Ranking
      </a-menu-item>
      <a-menu-item key="about">
        <NuxtLink :to="$i18n.path('about')">
          {{ $t('links.about') }} 
        </NuxtLink>
      </a-menu-item>
      <a-menu-item key="login">
        <NuxtLink :to="$i18n.path('login')">
          {{ $t('login.login') }}
        </NuxtLink>
      </a-menu-item>
      <a-menu-item key="locale">
        <NuxtLink v-if="$i18n.locale === 'en'" :to="`/zh` + $route.fullPath">
          {{ $t('links.chinese') }}
        </NuxtLink>
        <NuxtLink v-else :to="$route.fullPath.replace(/^\/[^\/]+/, '')">
          {{ $t('links.english') }}
        </NuxtLink>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data() {
    return {
      current: ['home']
    }
  }
}
</script>

<style scope>
.ant-menu-horizontal {
  border-bottom: none;
  text-align: right;
}

@media only screen and (max-width: 768px) {
  .ant-layout-header {
    padding: 0 24px;
  }
  .ant-menu-horizontal {
    text-align: left;
  }
}
</style>
