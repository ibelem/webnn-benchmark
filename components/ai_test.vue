<template>
  <section>
    <h2 class="has-text-primary is-size-5-desktop is-size-6-mobile is-size-5-tablet mb">Tests: Image Classification</h2>
    <div class="columns">
      <div v-for="task in tasks" v-if="task.category=='Image Classification' && task.id < 10" :key="task.id" class="column is-mobile is-one-third-tablet is-one-third-desktop is-one-quarter-widescreen is-one-quarter-fullhd">
        <b-collapse class="card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">
              {{ task.name }}
            </p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
              </b-icon>
            </a>
          </div>
          <div class="card-content">
            <div class="content lh">
              {{ task.description }}
              <ul>
                <li>Neural Network: {{ task.model_name }} {{ task.model_version }}</li>
                <li>Model Size: {{ task.model_size }}</li>
                <li>Image Resolution: {{ task.test.resolution }}</li>
                <li>Accuracy: {{ task.accuracy }}</li>
                <li>Backend: <span v-for="(b, index) in task.backend" :key="index">{{ b }} </span> </li>
              </ul>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" :href="task.paper_url">Paper</a>
            <a class="card-footer-item" :href="task.model">Model</a>
          </footer>
          <footer class="card-footer">
            <a class='card-footer-item button is-primary-gradient' :href="'../test/'+ task.url">Run Test</a>
          </footer>
        </b-collapse>
      </div>
    </div>
  
    <h2 class="has-text-primary is-size-5-desktop is-size-6-mobile is-size-5-tablet mb">Tests: Object Detection</h2>
    <div class="columns">
      <div v-for="task in tasks" v-if="task.category=='Object Detection'" :key="task.id" class="column is-mobile is-one-third-tablet is-one-third-desktop is-one-quarter-widescreen is-one-quarter-fullhd">
        <b-collapse class="card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">
              {{ task.name }}
            </p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
              </b-icon>
            </a>
          </div>
          <div class="card-content">
            <div class="content lh">
              {{ task.description }}
              <ul>
                <li>Neural Network: {{ task.model_name }} {{ task.model_version }}</li>
                <li>Model Size: {{ task.model_size }}</li>
                <li>Image Resolution: {{ task.test.resolution }}</li>
                <li>Accuracy: {{ task.accuracy }}</li>
                <li>Backend: <span v-for="(b, index) in task.backend" :key="index">{{ b }} </span> </li>
              </ul>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" :href="task.paper_url">Paper</a>
            <a class="card-footer-item" :href="task.model">Model</a>
          </footer>
          <footer class="card-footer">
            <a class='card-footer-item button is-primary-gradient' :href="'../test/'+ task.url">Run Test</a>
          </footer>
        </b-collapse>
      </div>
    </div>
  
    <h2 class="has-text-primary is-size-5-desktop is-size-6-mobile is-size-5-tablet mb">Tests: Human Pose Estimation</h2>
    <div class="columns">
      <div v-for="task in tasks" v-if="task.category=='Human Pose Estimation'" :key="task.id" class="column is-mobile is-one-third-tablet is-one-third-desktop is-one-quarter-widescreen is-one-quarter-fullhd">
        <b-collapse class="card">
          <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">
              {{ task.name }}
            </p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
              </b-icon>
            </a>
          </div>
          <div class="card-content">
            <div class="content lh">
              {{ task.description }}
              <ul>
                <li>Neural Network: {{ task.model_name }} {{ task.model_version }}</li>
                <li>Model Size: {{ task.model_size }}</li>
                <li>Image Resolution: {{ task.test.resolution }}</li>
                <li>Accuracy: {{ task.accuracy }}</li>
                <li>Backend: <span v-for="(b, index) in task.backend" :key="index">{{ b }} </span> </li>
              </ul>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" :href="task.paper_url">Paper</a>
            <a class="card-footer-item" :href="task.model">Model</a>
          </footer>
          <footer class="card-footer">
            <a class='card-footer-item button is-primary-gradient' :href="'../test/'+ task.url">Run Test</a>
          </footer>
        </b-collapse>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    methods: {
      run: function(task) {
        console.log(task.id);
      }
    },
    data() {
      return {
        tasks: [{
            "id": 1,
            "category": 'Image Classification',
            "name": 'MobileNet V1',
            "model_name": 'MobileNet',
            "url": 'MobileNet',
            "backend": ['WASM', 'WebGL2', 'WebML'],
            "iteration": 4,
            "framework": "webml-polyfill.js",
            "model": '../model/mobilenet/mobilenet_v1_1.0_224.tflite',
            "label": '../model/mobilenet/labels.txt',
            "description": 'An efficient Convolutional Neural Networks for Mobile Vision Applications. Loading MobileNet model trained by ImageNet in TensorFlow Lite format, constructs and inferences it by WebML API.',
            "model_version": 'v1.0',
            "accuracy": '89.9%',
            "model_size": '16.9Mb',
            "paper_url": 'https://arxiv.org/pdf/1704.04861.pdf',
            'test': {
              'resolution': '224 x 224 px',
              'image': ['../img/mobilenet/bee_eater.jpg', '../img/mobilenet/traffic_light.jpg', '../img/mobilenet/pinwheel.jpg']
            },
            "platform": [
              'android',
              'windows',
              'linux'
            ],
            "browser": [
              'chrome',
              'firefox'
            ]
          },
          {
            "id": 2,
            "category": 'Image Classification',
            "name": 'MobileNet V2',
            "model_name": 'MobileNet',
            "url": 'MobileNet2',
            "backend": ['WASM', 'WebGL2', 'WebML'],
            "iteration": 4,
            "framework": "webml-polyfill.js",
            "model": '../model/mobilenet/mobilenet_v2_1.0_224.tflite',
            "label": '../model/mobilenet/labels.txt',
            "description": 'MobileNetV2 improves the state of the art performance of mobile models. Loading MobileNet model v2.0 trained by ImageNet in TensorFlow Lite format, constructs and inferences it by WebML API. ',
            "model_version": 'v2.0',
            "accuracy": '91.0%',
            "model_size": '14.0Mb',
            "paper_url": 'https://arxiv.org/abs/1801.04381',
            'test': {
              'resolution': '224 x 224 px',
              'image': ['../img/mobilenet/bee_eater.jpg', '../img/mobilenet/traffic_light.jpg', '../img/mobilenet/pinwheel.jpg']
            }
          },
          {
            "id": 3,
            "category": 'Image Classification',
            "name": 'SqueezeNet',
            "model_name": 'SqueezeNet',
            "url": 'SqueezeNet',
            "backend": ['WASM', 'WebGL2', 'WebML'],
            "iteration": 4,
            "framework": "webml-polyfill.js",
            "model": '../model/squeezenet/model.onnx',
            "label": '../model/squeezenet/labels.json',
            "description": 'A light-weight CNN providing Alexnet level accuracy with 50X fewer parameters. Loading SqueezeNet model trained by ImageNet in ONNX format, constructs and inferences it by WebML API.',
            "model_version": 'v1.1',
            "accuracy": '79.12%',
            "model_size": '5.0Mb',
            "paper_url": 'https://arxiv.org/abs/1602.07360',
            'test': {
              'resolution': '224 x 224 px',
              'image': ['../img/squeezenet/jeep.jpg', '../img/squeezenet/wallaby.jpg', '../img/squeezenet/panda.jpg']
            }
          },
          {
            "id": 4,
            "category": 'Image Classification',
            "name": 'Inception V3',
            "model_name": 'Inception',
            "url": 'Inception3',
            "backend": ['WASM', 'WebGL2', 'WebML'],
            "iteration": 4,
            "framework": "webml-polyfill.js",
            "model": '../model/inception/inception_v3.tflite',
            "label": '../model/inception/labels.txt',
            // "model": 'https://aimark.nos-eastchina1.126.net/model/inception/inception_v3.tflite',
            // "label": 'https://aimark.nos-eastchina1.126.net/model/inception/labels.txt',
            "description": 'Inception-v3 is trained for the ImageNet Large Visual Recognition Challenge. Loading Inception-v3 model trained by ImageNet in TensorFlow Lite format, constructs and inferences it by WebML API.',
            "model_version": 'v3',
            "accuracy": '93.8%',
            "model_size": '95.3Mb',
            "paper_url": 'http://arxiv.org/abs/1512.00567',
            'test': {
              'resolution': '224 x 224 px',
              'image': ['../img/mobilenet/bee_eater.jpg', '../img/mobilenet/traffic_light.jpg', '../img/mobilenet/pinwheel.jpg']
            }
          },
          {
            "id": 5,
            "category": 'Object Detection',
            "name": 'SSD MobileNet',
            "model_name": 'SSDMobileNet',
            "url": 'SSDMobileNet',
            "backend": ['WASM', 'WebGL2', 'WebML'],
            "iteration": 4,
            "framework": "webml-polyfill.js",
            "model": '../model/ssd_mobilenet/ssd_mobilenet.tflite',
            "label": '../model/ssd_mobilenet/coco_labels_list.txt',
            // "model": 'https://aimark.nos-eastchina1.126.net/model/ssd_mobilenet/ssd_mobilenet.tflite',
            // "label": 'https://aimark.nos-eastchina1.126.net/model/ssd_mobilenet/coco_labels_list.txt',
            "description": 'SSD (Single Shot MultiBox Detector) is an unified framework for object detection with a single network. Loading SSD MobileNet model (converted from Tensorflow SSD MobileNet model) trained by COCO in TensorFlow Lite format, constructs and inferences it by WebML API.',
            "model_version": 'v1',
            "accuracy": '70.9%',
            "model_size": '27.3Mb',
            "paper_url": 'https://arxiv.org/abs/1801.04381',
            'test': {
              'resolution': '300 x 300 px',
              'image': ['../img/mobilenet/bee_eater.jpg', '../img/mobilenet/traffic_light.jpg', '../img/mobilenet/pinwheel.jpg']
            }
          },
          // {
          //   "id": 5,
          //   "category": 'Object Recognition / Classification',
          //   "name": 'Image (TensorFlow.js)',
          //   "model_name": 'MobileNet',
          //   "url": 'TensorFlow',
          //   "backend": ['WebGL', 'WebML'],
          //   "iteration": 4,
          //   "framework": "webml-polyfill.js",
          //   "model": 'https://aimark.nos-eastchina1.126.net/model/tf/google/optimized_model.pb',
          //   "label": 'https://aimark.nos-eastchina1.126.net/model/tf/google/weights_manifest.json',
          //   "description": 'TensorFlow.js is a JavaScript library for training and deploying ML models in the browser. Loading a pretrained TensorFlow SavedModel into the browser and run inference through TensorFlow.js.',
          //   "model_version": 'v1.0',
          //   "accuracy": '89.9%',
          //   "model_size": '16.9Mb',
          //   "paper_url": 'https://arxiv.org/pdf/1704.04861.pdf',
          //   'test': {
          //     'resolution': '224 x 224 px',
          //     'image': ['../img/mobilenet/bee_eater.jpg', '../img/mobilenet/traffic_light.jpg', '../img/mobilenet/pinwheel.jpg']
          //   }
          //   },
          {
            "id": 6,
            "category": 'Human Pose Estimation',
            "name": 'PoseNet',
            "model_name": 'PoseNet',
            "url": 'PoseNet',
            "backend": ['WASM', 'WebGL2', 'WebML'],
            "iteration": 4,
            "model": 'https://github.com/tensorflow/tfjs-models/tree/master/posenet',
            "label": '../model/posenet/',
            "description": 'PoseNet is a machine learning model that allows for Real-time Human Pose Estimation which can be used to estimate either a single pose or multiple poses. This task loads a pretrained PoseNet model, constructs and infers it by WebML API.',
            "model_version": 'v1.101',
            "accuracy": '66.5%',
            "model_size": '13.3Mb',
            "paper_url": 'https://arxiv.org/abs/1803.08225',
            'test': {
              'resolution': '513 x 513 px',
              'image': ['../img/posenet/tennis_in_crowd.jpg']
            }
          },
        ]
      }
    }
  };
</script>


<style scoped>
  .card {
    font-size: 0.95rem;
    margin-bottom: 1.0rem;
  }
  
  .card-header-title {
    height: 3rem;
  }
  
  .lh {
    max-height: 20rem;
    height: 18rem;
    overflow-y: auto;
    overflow-x: hidden;
  }
  
  .rl {
    display: flex;
    flex-direction: row;
    flex-flow: row-reverse;
  }
  
  .rl i {
    margin: 0 0 0 0.5rem;
    color: rgba(0, 0, 0, 0.6);
  }
  
  .rl i:hover {
    color: rgba(0, 0, 0, 1.0);
  }
  
  .il {
    display: inline-block;
  }
  
  .is-primary-gradient {
    color: rgba(255, 255, 255, 1.0);
    background: linear-gradient(30deg, rgba(222, 12, 101, 0.7), rgba(222, 12, 101, 0.9));
    padding: 1.5rem 0 1.5rem 0;
  }
  
  .is-primary-gradient:hover {
    background: linear-gradient(30deg, rgba(222, 12, 101, 0.8), rgba(222, 12, 101, 1.0));
  }
  
  footer .button {
    border: 0px solid transparent;
  }
</style>