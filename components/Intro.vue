<template>
  <div>
    <a-divider orientation="left">Image Classification</a-divider>
    <a-row>
      <a-col
        v-for="l in imageClassificationModels"
        :key="l.modelFormatName"
        :span="6"
      >
        <a-card hoverable>
          <template slot="actions" class="ant-card-actions">
            <a class="card-footer-item" :href="l.paperUrl" title="View paper">
              <a-icon type="file-pdf" />
            </a>
            <a
              class="card-footer-item"
              :href="l.modelFile"
              title="Download model"
            >
              <a-icon type="project" />
            </a>
            <a
              class="card-footer-item"
              :href="$i18n.path('test')"
              title="Run test"
            >
              <a-icon type="right-circle" />
            </a>
          </template>
          <a-card-meta
            :title="l.modelName.replace('(TFLite)', '').replace('(ONNX)', '')"
            :description="l.intro"
          >
            <a-avatar
              v-if="l.modelFormatName.indexOf('tflite') > -1"
              slot="avatar"
              src="../img/tf.png"
            />
            <a-avatar v-else slot="avatar" src="../img/onnx.png" />
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>

    <a-divider orientation="left">Person/Object Detection</a-divider>
    <a-row>
      <a-col
        v-for="l in objectDetectionModels"
        :key="l.modelFormatName"
        :span="6"
      >
        <a-card hoverable>
          <template slot="actions" class="ant-card-actions">
            <a class="card-footer-item" :href="l.paperUrl" title="View paper">
              <a-icon type="file-pdf" />
            </a>
            <a
              class="card-footer-item"
              :href="l.modelFile"
              title="Download model"
            >
              <a-icon type="project" />
            </a>
            <a
              class="card-footer-item"
              :href="$i18n.path('test')"
              title="Run test"
            >
              <a-icon type="right-circle" />
            </a>
          </template>
          <a-card-meta
            :title="l.modelName.replace('(TFLite)', '').replace('(ONNX)', '')"
            :description="l.intro"
          >
            <a-avatar
              v-if="l.modelFormatName.indexOf('tflite') > -1"
              slot="avatar"
              src="../img/tf.png"
            />
            <a-avatar v-else slot="avatar" src="../img/onnx.png" />
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>

    <a-divider orientation="left">Semantic Segmentation</a-divider>
    <a-row>
      <a-col
        v-for="l in semanticSegmentationModels"
        :key="l.modelFormatName"
        :span="6"
      >
        <a-card hoverable>
          <template slot="actions" class="ant-card-actions">
            <a class="card-footer-item" :href="l.paperUrl" title="View paper">
              <a-icon type="file-pdf" />
            </a>
            <a
              class="card-footer-item"
              :href="l.modelFile"
              title="Download model"
            >
              <a-icon type="project" />
            </a>
            <a
              class="card-footer-item"
              :href="$i18n.path('test')"
              title="Run test"
            >
              <a-icon type="right-circle" />
            </a>
          </template>
          <a-card-meta
            :title="l.modelName.replace('(TFLite)', '').replace('(ONNX)', '')"
            :description="l.intro"
          >
            <a-avatar
              v-if="l.modelFormatName.indexOf('tflite') > -1"
              slot="avatar"
              src="../img/tf.png"
            />
            <a-avatar v-else slot="avatar" src="../img/onnx.png" />
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>

    <a-divider orientation="left">Skeleton Detection</a-divider>
    <a-row>
      <a-col
        v-for="l in humanPoseEstimationModels"
        :key="l.modelFormatName"
        :span="6"
      >
        <a-card hoverable>
          <template slot="actions" class="ant-card-actions">
            <a class="card-footer-item" :href="l.paperUrl" title="View paper">
              <a-icon type="file-pdf" />
            </a>
            <a
              class="card-footer-item"
              :href="l.modelFile"
              title="Download model"
            >
              <a-icon type="project" />
            </a>
            <a
              class="card-footer-item"
              :href="$i18n.path('test')"
              title="Run test"
            >
              <a-icon type="right-circle" />
            </a>
          </template>
          <a-card-meta
            :title="l.modelName.replace('(TFLite)', '').replace('(ONNX)', '')"
            :description="l.intro"
          >
            <a-avatar
              v-if="l.modelFormatName.indexOf('tflite') > -1"
              slot="avatar"
              src="../img/tf.png"
            />
            <a-avatar v-else slot="avatar" src="../img/onnx.png" />
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>

    <a-divider orientation="left">Facial Landmark Detection A</a-divider>
    <a-row>
      <a-col
        v-for="l in faceDetectionModels"
        :key="l.modelFormatName"
        :span="6"
      >
        <a-card hoverable>
          <template slot="actions" class="ant-card-actions">
            <a class="card-footer-item" :href="l.paperUrl" title="View paper">
              <a-icon type="file-pdf" />
            </a>
            <a
              class="card-footer-item"
              :href="l.modelFile"
              title="Download model"
            >
              <a-icon type="project" />
            </a>
            <a
              class="card-footer-item"
              :href="$i18n.path('test')"
              title="Run test"
            >
              <a-icon type="right-circle" />
            </a>
          </template>
          <a-card-meta
            :title="l.modelName.replace('(TFLite)', '').replace('(ONNX)', '')"
            :description="l.intro"
          >
            <a-avatar
              v-if="l.modelFormatName.indexOf('tflite') > -1"
              slot="avatar"
              src="../img/tf.png"
            />
            <a-avatar v-else slot="avatar" src="../img/onnx.png" />
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>

    <a-divider orientation="left">Facial Landmark Detection B</a-divider>
    <a-row>
      <a-col
        v-for="l in facialLandmarkDetectionModels"
        :key="l.modelFormatName"
        :span="6"
      >
        <a-card hoverable>
          <template slot="actions" class="ant-card-actions">
            <a class="card-footer-item" :href="l.paperUrl" title="View paper">
              <a-icon type="file-pdf" />
            </a>
            <a
              class="card-footer-item"
              :href="l.modelFile"
              title="Download model"
            >
              <a-icon type="project" />
            </a>
            <a
              class="card-footer-item"
              :href="$i18n.path('test')"
              title="Run test"
            >
              <a-icon type="right-circle" />
            </a>
          </template>
          <a-card-meta
            :title="l.modelName.replace('(TFLite)', '').replace('(ONNX)', '')"
            :description="l.intro"
          >
            <a-avatar
              v-if="l.modelFormatName.indexOf('tflite') > -1"
              slot="avatar"
              src="../img/tf.png"
            />
            <a-avatar v-else slot="avatar" src="../img/onnx.png" />
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>

    <a-divider orientation="left">Super Resolution</a-divider>
    <a-row>
      <a-col
        v-for="l in superResolutionModels"
        :key="l.modelFormatName"
        :span="6"
      >
        <a-card hoverable>
          <template slot="actions" class="ant-card-actions">
            <a class="card-footer-item" :href="l.paperUrl" title="View paper">
              <a-icon type="file-pdf" />
            </a>
            <a
              class="card-footer-item"
              :href="l.modelFile"
              title="Download model"
            >
              <a-icon type="project" />
            </a>
            <a
              class="card-footer-item"
              :href="$i18n.path('test')"
              title="Run test"
            >
              <a-icon type="right-circle" />
            </a>
          </template>
          <a-card-meta
            :title="l.modelName.replace('(TFLite)', '').replace('(ONNX)', '')"
            :description="l.intro"
          >
            <a-avatar
              v-if="l.modelFormatName.indexOf('tflite') > -1"
              slot="avatar"
              src="../img/tf.png"
            />
            <a-avatar v-else slot="avatar" src="../img/onnx.png" />
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex'
export default {
  data() {
    return {}
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
  methods: {}
}
</script>

<style scoped></style>
