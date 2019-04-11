<template>
  <div>
    <a-divider orientation="left">Image Classification</a-divider>
    <a-row>
      <a-col
        v-for="l in this.$store.state.intro.imageClassificationModels"
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
              :href="'image_classification/' + l.modelFormatName"
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
        v-for="l in this.$store.state.intro.objectDetectionModels"
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
              :href="'object_detection/' + l.modelFormatName"
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
        v-for="l in this.$store.state.intro.semanticSegmentationModels"
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
              :href="'semantic_segmentation/' + l.modelFormatName"
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
        v-for="l in this.$store.state.intro.humanPoseEstimationModels"
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
              :href="'skeleton_detection/' + l.modelFormatName"
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
        v-for="l in this.$store.state.intro.faceDetectionModels"
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
              :href="'facial_landmark_detection/' + l.modelFormatName"
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
        v-for="l in this.$store.state.intro.facialLandmarkDetectionModels"
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
              :href="'facial_landmark_detection/' + l.modelFormatName"
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
        v-for="l in this.$store.state.intro.superResolutionModels"
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
              :href="'super_resolution/' + l.modelFormatName"
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
  computed: {},
  methods: {}
}
</script>

<style scoped></style>
