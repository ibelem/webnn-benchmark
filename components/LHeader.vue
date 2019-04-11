<template>
  <a-layout-header>
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
        <NuxtLink
          slot="title"
          :to="$i18n.path('tests')"
          class="submenu-title-wrapper"
        >
          {{ $t('links.tests') }}
        </NuxtLink>

        <a-sub-menu title="Image Classification">
          <a-menu-item
            v-for="l in this.$store.state.intro.imageClassificationModels"
            :key="l.modelFormatName"
          >
            <nuxt-link :to="'../image_classification/' + l.modelFormatName">
              {{ l.modelName }}
            </nuxt-link>
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu title="Object Detection">
          <a-menu-item
            v-for="l in this.$store.state.intro.objectDetectionModels"
            :key="l.modelFormatName"
          >
            <nuxt-link :to="'../object_detection/' + l.modelFormatName">
              {{ l.modelName }}
            </nuxt-link>
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu title="Semantic Segmentation">
          <a-menu-item
            v-for="l in this.$store.state.intro.semanticSegmentationModels"
            :key="l.modelFormatName"
          >
            <nuxt-link :to="'../semantic_segmentation/' + l.modelFormatName">
              {{ l.modelName }}
            </nuxt-link>
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu title="Skeleton Detection">
          <a-menu-item
            v-for="l in this.$store.state.intro.humanPoseEstimationModels"
            :key="l.modelFormatName"
          >
            <nuxt-link :to="'../skeleton_detection/' + l.modelFormatName">
              {{ l.modelName }}
            </nuxt-link>
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu title="Facial Landmark Detection">
          <a-menu-item
            v-for="l in this.$store.state.intro.faceDetectionModels"
            :key="l.modelFormatName"
          >
            <nuxt-link
              :to="'../facial_landmark_detection/' + l.modelFormatName"
            >
              {{ l.modelName }}
            </nuxt-link>
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu title="Super Resolution">
          <a-menu-item
            v-for="l in this.$store.state.intro.superResolutionModels"
            :key="l.modelFormatName"
          >
            <nuxt-link :to="'../super_resolution/' + l.modelFormatName">
              {{ l.modelName }}
            </nuxt-link>
          </a-menu-item>
        </a-sub-menu>
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
  </a-layout-header>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data() {
    return {
      current: ['home'],
      tests: ''
    }
  },
  computed: {
    imageClassificationModels() {
      return this.$store.state.intro.imageClassificationModels
    },
    objectDetectionModels() {
      return this.$store.state.intro.objectDetectionModels
    },
    semanticSegmentationModels() {
      return this.$store.state.intro.semanticSegmentationModels
    },
    humanPoseEstimationModels() {
      return this.$store.state.intro.humanPoseEstimationModels
    },
    faceDetectionModels() {
      return this.$store.state.intro.faceDetectionModels
    },
    facialLandmarkDetectionModels() {
      return this.$store.state.intro.facialLandmarkDetectionModels
    },
    superResolutionModels() {
      return this.$store.state.intro.superResolutionModels
    }
  },
  mounted() {}
}
</script>

<style scope></style>
