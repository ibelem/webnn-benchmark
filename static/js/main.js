'use strict'
const tfliteModelArray = [
  'mobilenet_v1_tflite',
  'mobilenet_v1_quant_tflite',
  'mobilenet_v2_tflite',
  'mobilenet_v2_quant_tflite',
  'inception_v3_tflite',
  'inception_v4_tflite',
  'squeezenet_tflite',
  'inception_resnet_v2_tflite'
]

const ssdModelArray = [
  'ssd_mobilenet_v1_tflite',
  'ssd_mobilenet_v1_quant_tflite',
  'ssd_mobilenet_v2_tflite',
  'ssd_mobilenet_v2_quant_tflite',
  'ssdlite_mobilenet_v2_tflite',
  'tiny_yolov2_coco_tflite',
  'tiny_yolov2_voc_tflite'
]

const onnxModelArray = [
  'squeezenet_onnx',
  'mobilenet_v2_onnx',
  'resnet_v1_onnx',
  'resnet_v2_onnx',
  'inception_v2_onnx',
  'densenet_onnx'
]

const segmentationModelArray = [
  'deeplab_mobilenet_v2_224_tflite',
  'deeplab_mobilenet_v2_224_atrous_tflite',
  'deeplab_mobilenet_v2_257_tflite',
  'deeplab_mobilenet_v2_257_atrous_tflite',
  'deeplab_mobilenet_v2_321_tflite',
  'deeplab_mobilenet_v2_321_atrous_tflite',
  'deeplab_mobilenet_v2_513_tflite',
  'deeplab_mobilenet_v2_513_atrous_tflite'
]

const imageClassificationModels = [
  {
    modelName: 'Mobilenet v1 (TFLite)',
    modelFormatName: 'mobilenet_v1_tflite',
    modelSize: '16.9MB',
    inputSize: [224, 224, 3],
    outputSize: 1001,
    modelFile: '../image_classification/model/mobilenet_v1_1.0_224.tflite',
    labelsFile: '../image_classification/model/labels1001.txt',
    preOptions: {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5]
    },
    intro:
      'An efficient Convolutional Neural Networks for Mobile Vision Applications.',
    paperUrl: 'https://arxiv.org/pdf/1704.04861.pdf'
  },
  {
    modelName: 'Mobilenet v1 Quant (TFLite)',
    modelFormatName: 'mobilenet_v1_quant_tflite',
    isQuantized: true,
    modelSize: '4.3MB',
    inputSize: [224, 224, 3],
    outputSize: 1001,
    modelFile:
      '../image_classification/model/mobilenet_v1_1.0_224_quant.tflite',
    labelsFile: '../image_classification/model/labels1001.txt',
    intro: 'Quantized version of Mobilenet v1',
    paperUrl: 'https://arxiv.org/pdf/1712.05877.pdf'
  },
  {
    modelName: 'Mobilenet v2 (TFLite)',
    modelFormatName: 'mobilenet_v2_tflite',
    modelSize: '14.0MB',
    inputSize: [224, 224, 3],
    outputSize: 1001,
    modelFile: '../image_classification/model/mobilenet_v2_1.0_224.tflite',
    labelsFile: '../image_classification/model/labels1001.txt',
    preOptions: {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5]
    },
    intro:
      'MobileNetV2 improves the state of the art performance of mobile models.',
    paperUrl: 'https://arxiv.org/abs/1801.04381'
  },
  {
    modelName: 'Mobilenet v2 Quant (TFLite)',
    modelFormatName: 'mobilenet_v2_quant_tflite',
    isQuantized: true,
    modelSize: '6.9MB',
    inputSize: [224, 224, 3],
    outputSize: 1001,
    modelFile:
      '../image_classification/model/mobilenet_v2_1.0_224_quant.tflite',
    labelsFile: '../image_classification/model/labels1001.txt',
    postOptions: {
      softmax: true
    },
    intro: 'Quantized version of Mobilenet v2',
    paperUrl: 'https://arxiv.org/abs/1806.08342'
  },
  {
    modelName: 'Inception v3 (TFLite)',
    modelFormatName: 'inception_v3_tflite',
    modelSize: '95.3MB',
    inputSize: [299, 299, 3],
    outputSize: 1001,
    modelFile: '../image_classification/model/inception_v3.tflite',
    labelsFile: '../image_classification/model/labels1001.txt',
    preOptions: {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5]
    },
    intro:
      'Inception-v3 is trained for the ImageNet Large Visual Recognition Challenge.',
    paperUrl: 'http://arxiv.org/abs/1512.00567'
  },
  {
    modelName: 'Inception v4 (TFLite)',
    modelFormatName: 'inception_v4_tflite',
    modelSize: '170.7MB',
    inputSize: [299, 299, 3],
    outputSize: 1001,
    modelFile: '../image_classification/model/inception_v4.tflite',
    labelsFile: '../image_classification/model/labels1001.txt',
    preOptions: {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5]
    },
    intro:
      'Inception architecture that has been shown to achieve very good performance at relatively low computational cost.',
    paperUrl: 'https://arxiv.org/abs/1602.07261'
  },
  {
    modelName: 'Squeezenet (TFLite)',
    modelFormatName: 'squeezenet_tflite',
    modelSize: '5.0MB',
    inputSize: [224, 224, 3],
    outputSize: 1001,
    modelFile: '../image_classification/model/squeezenet.tflite',
    labelsFile: '../image_classification/model/labels1001.txt',
    preOptions: {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5]
    },
    intro:
      'A light-weight CNN providing Alexnet level accuracy with 50X fewer parameters.',
    paperUrl: 'https://arxiv.org/abs/1602.07360'
  },
  {
    modelName: 'Inception Resnet v2 (TFLite)',
    modelFormatName: 'inception_resnet_v2_tflite',
    modelSize: '121.0MB',
    inputSize: [299, 299, 3],
    outputSize: 1001,
    modelFile: '../image_classification/model/inception_resnet_v2.tflite',
    labelsFile: '../image_classification/model/labels1001.txt',
    preOptions: {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5]
    },
    postOptions: {
      softmax: true
    },
    intro:
      'Inception architecture that has been shown to achieve very good performance at relatively low computational cost, and training with residual connections accelerates the training of Inception networks significantly. There is also some evidence of residual Inception networks outperforming similarly expensive Inception networks without residual connections.',
    paperUrl: 'https://arxiv.org/abs/1602.07261'
  },
  {
    modelName: 'Squeezenet (ONNX)',
    modelFormatName: 'squeezenet_onnx',
    modelSize: '5.0MB',
    modelFile: '../image_classification/model/squeezenet1.1.onnx',
    labelsFile: '../image_classification/model/labels1000.txt',
    inputSize: [224, 224, 3],
    outputSize: 1000,
    preOptions: {
      // https://github.com/onnx/models/tree/master/models/image_classification/squeezenet#preprocessing
      mean: [0.485, 0.456, 0.406],
      std: [0.229, 0.224, 0.225],
      norm: true
    },
    postOptions: {
      softmax: true
    },
    intro:
      'A light-weight CNN providing Alexnet level accuracy with 50X fewer parameters.',
    paperUrl: 'https://arxiv.org/abs/1602.07360'
  },
  {
    modelName: 'Mobilenet v2 (ONNX)',
    modelFormatName: 'mobilenet_v2_onnx',
    modelSize: '14.2MB',
    modelFile: '../image_classification/model/mobilenetv2-1.0.onnx',
    labelsFile: '../image_classification/model/labels1000.txt',
    inputSize: [224, 224, 3],
    outputSize: 1000,
    preOptions: {
      // https://github.com/onnx/models/tree/master/models/image_classification/mobilenet#preprocessing
      mean: [0.485, 0.456, 0.406],
      std: [0.229, 0.224, 0.225],
      norm: true
    },
    postOptions: {
      softmax: true
    },
    intro:
      'MobileNetV2 improves the state of the art performance of mobile models.',
    paperUrl: 'https://arxiv.org/abs/1801.04381'
  },
  {
    modelName: 'Resnet v1 (ONNX)',
    modelFormatName: 'resnet_v1_onnx',
    modelSize: '102.6MB',
    modelFile: '../image_classification/model/resnet50v1.onnx',
    labelsFile: '../image_classification/model/labels1000.txt',
    inputSize: [224, 224, 3],
    outputSize: 1000,
    preOptions: {
      // https://github.com/onnx/models/tree/master/models/image_classification/resnet#preprocessing
      mean: [0.485, 0.456, 0.406],
      std: [0.229, 0.224, 0.225],
      norm: true
    },
    postOptions: {
      softmax: true
    },
    intro:
      'A residual learning framework to ease the training of networks that are substantially deeper than those used previously. This result won the 1st place on the ILSVRC 2015 classification task.',
    paperUrl: 'https://arxiv.org/abs/1512.03385'
  },
  {
    modelName: 'Resnet v2 (ONNX)',
    modelFormatName: 'resnet_v2_onnx',
    modelSize: '102.4MB',
    modelFile: '../image_classification/model/resnet50v2.onnx',
    labelsFile: '../image_classification/model/labels1000.txt',
    inputSize: [224, 224, 3],
    outputSize: 1000,
    preOptions: {
      // https://github.com/onnx/models/tree/master/models/image_classification/resnet#preprocessing
      mean: [0.485, 0.456, 0.406],
      std: [0.229, 0.224, 0.225],
      norm: true
    },
    postOptions: {
      softmax: true
    },
    intro:
      'Deep residual networks have emerged as a family of extremely deep architectures showing compelling accuracy and nice convergence behaviors. It reports improved results using a 1001-layer ResNet on CIFAR-10 (4.62% error) and CIFAR-100, and a 200-layer ResNet on ImageNet.',
    paperUrl: 'https://arxiv.org/abs/1603.05027'
  },
  {
    modelName: 'Inception v2 (ONNX)',
    modelFormatName: 'inception_v2_onnx',
    modelSize: '45.0MB',
    modelFile: '../image_classification/model/inceptionv2.onnx',
    labelsFile: '../image_classification/model/ilsvrc2012labels.txt',
    inputSize: [224, 224, 3],
    outputSize: 1000,
    intro:
      'Inception-v2 is trained for the ImageNet Large Visual Recognition Challenge.',
    paperUrl: 'https://arxiv.org/abs/1512.00567'
  },
  {
    modelName: 'Densenet (ONNX)',
    modelFormatName: 'densenet_onnx',
    modelSize: '32.7MB',
    modelFile: '../image_classification/model/densenet121.onnx',
    labelsFile: '../image_classification/model/labels1000.txt',
    inputSize: [224, 224, 3],
    outputSize: 1000,
    preOptions: {
      // mean and std should also be in BGR order
      mean: [0.406, 0.456, 0.485],
      std: [0.225, 0.224, 0.229],
      norm: true,
      channelScheme: 'BGR'
    },
    postOptions: {
      softmax: true
    },
    intro:
      'Dense Convolutional Network (DenseNet) connects each layer to every other layer in a feed-forward fashion. DenseNets have several compelling advantages: they alleviate the vanishing-gradient problem, strengthen feature propagation, encourage feature reuse, and substantially reduce the number of parameters. ',
    paperUrl: 'https://arxiv.org/abs/1608.06993'
  }
]

const objectDetectionModels = [
  {
    modelName: 'SSD MobileNet v1 (TFLite)',
    modelFormatName: 'ssd_mobilenet_v1_tflite',
    modelSize: '27.3MB',
    modelFile: '../object_detection/model/ssd_mobilenet_v1.tflite',
    labelsFile: '../object_detection/model/coco_classes.txt',
    type: 'SSD',
    box_size: 4,
    num_classes: 91,
    num_boxes: 1083 + 600 + 150 + 54 + 24 + 6,
    margin: [1, 1, 1, 1],
    inputSize: [300, 300, 3],
    preOptions: {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5]
    },
    intro:
      'SSD (Single Shot MultiBox Detector) is an unified framework for object detection with a single network. Loading SSD MobileNet model (converted from Tensorflow SSD MobileNet model) trained by COCO in TensorFlow Lite format, constructs and inferences it by WebML API.',
    paperUrl: 'https://arxiv.org/abs/1803.08225'
  },
  {
    modelName: 'SSD MobileNet v1 Quant (TFLite)',
    modelFormatName: 'ssd_mobilenet_v1_quant_tflite',
    isQuantized: true,
    modelSize: '6.9MB',
    modelFile: '../object_detection/model/ssd_mobilenet_v1_quant.tflite',
    labelsFile: '../object_detection/model/coco_classes.txt',
    type: 'SSD',
    box_size: 4,
    num_classes: 91,
    num_boxes: 1083 + 600 + 150 + 54 + 24 + 6,
    margin: [1, 1, 1, 1],
    inputSize: [300, 300, 3],
    intro: 'Quantized version of SSD Mobilenet v1',
    paperUrl: 'https://arxiv.org/pdf/1712.05877.pdf'
  },
  {
    modelName: 'SSD MobileNet v2 (TFLite)',
    modelFormatName: 'ssd_mobilenet_v2_tflite',
    modelSize: '67.3MB',
    modelFile: '../object_detection/model/ssd_mobilenet_v2.tflite',
    labelsFile: '../object_detection/model/coco_classes.txt',
    type: 'SSD',
    box_size: 4,
    num_classes: 91,
    num_boxes: 1083 + 600 + 150 + 54 + 24 + 6,
    margin: [1, 1, 1, 1],
    inputSize: [300, 300, 3],
    preOptions: {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5]
    },
    intro:
      'SSD MobileNet V2 is slower than SSD Mobilenet V1, but has higher accuracy.',
    paperUrl: 'https://arxiv.org/abs/1801.04381'
  },
  {
    modelName: 'SSD MobileNet v2 Quant (TFLite)',
    modelFormatName: 'ssd_mobilenet_v2_quant_tflite',
    isQuantized: true,
    modelSize: '6.2MB',
    modelFile: '../object_detection/model/ssd_mobilenet_v2_quant.tflite',
    labelsFile: '../object_detection/model/coco_classes.txt',
    type: 'SSD',
    box_size: 4,
    num_classes: 91,
    num_boxes: 1083 + 600 + 150 + 54 + 24 + 6,
    margin: [1, 1, 1, 1],
    inputSize: [300, 300, 3],
    intro: 'Quantized version of SSD Mobilenet v2',
    paperUrl: 'https://arxiv.org/abs/1806.08342'
  },
  {
    modelName: 'SSDLite MobileNet v2 (TFLite)',
    modelFormatName: 'ssdlite_mobilenet_v2_tflite',
    modelSize: '17.9MB',
    modelFile: '../object_detection/model/ssdlite_mobilenet_v2.tflite',
    labelsFile: '../object_detection/model/coco_classes.txt',
    type: 'SSD',
    box_size: 4,
    num_classes: 91,
    num_boxes: 1083 + 600 + 150 + 54 + 24 + 6,
    margin: [1, 1, 1, 1],
    inputSize: [300, 300, 3],
    preOptions: {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5]
    },
    intro:
      'SSDLite MobileNet V2 is an upgraded version of SSD MobileNet V2. Compared with SSD Mobilenet V2, SSDLite Mobilenet V2 is much faster, and almost has no loss of the accuracy.',
    paperUrl: 'https://arxiv.org/abs/1801.04381'
  },
  {
    modelName: 'Tiny Yolo v2 COCO (TFLite)',
    modelFormatName: 'tiny_yolov2_coco_tflite',
    modelSize: '44.9MB',
    modelFile: '../object_detection/model/tiny_yolov2_coco.tflite',
    labelsFile: '../object_detection/model/coco_classes_part.txt',
    type: 'YOLO',
    num_classes: 80,
    margin: [1, 1, 1, 1],
    inputSize: [416, 416, 3],
    outputSize: 1 * 13 * 13 * 425,
    anchors: [
      0.57273,
      0.677385,
      1.87446,
      2.06253,
      3.33843,
      5.47434,
      7.88282,
      3.52778,
      9.77052,
      9.16828
    ],
    preOptions: {
      norm: true
    },
    intro:
      'Tiny YOLO is based off of the Darknet reference network and is much faster but less accurate than the normal YOLO model. And this model is trained by COCO dataset.',
    paperUrl: 'https://arxiv.org/abs/1612.08242'
  },
  {
    modelName: 'Tiny Yolo v2 VOC (TFLite)',
    modelFormatName: 'tiny_yolov2_voc_tflite',
    modelSize: '63.4MB',
    modelFile: '../object_detection/model/tiny_yolov2_voc.tflite',
    labelsFile: '../object_detection/model/pascal_classes.txt',
    type: 'YOLO',
    num_classes: 20,
    margin: [1, 1, 1, 1],
    inputSize: [416, 416, 3],
    outputSize: 1 * 13 * 13 * 125,
    anchors: [1.08, 1.19, 3.42, 4.41, 6.63, 11.38, 9.42, 5.11, 16.62, 10.52],
    preOptions: {
      norm: true
    },
    intro:
      'Tiny YOLO is based off of the Darknet reference network and is much faster but less accurate than the normal YOLO model. And this model is trained by VOC dataset.',
    paperUrl: 'https://arxiv.org/abs/1612.08242'
  }
]

const humanPoseEstimationModels = [
  {
    modelName: 'PoseNet',
    modelFormatName: 'posenet',
    modelSize: '13.3MB',
    modelFile: '../skeleton_detection/model/mobilenet_v1_101',
    inputSize: [513, 513, 3],
    preOptions: {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5]
    },
    intro:
      'PoseNet is a machine learning model that allows for Real-time Human Pose Estimation which can be used to estimate either a single pose or multiple poses.',
    paperUrl: 'https://arxiv.org/abs/1803.08225'
  }
]

const semanticSegmentationModels = [
  {
    modelName: 'Deeplab 224 (TFLite)',
    modelFormatName: 'deeplab_mobilenet_v2_224_tflite',
    modelSize: '9.5MB',
    modelFile: '../semantic_segmentation/model/deeplab_mobilenetv2_224.tflite',
    labelsFile: '../semantic_segmentation/model/labels.txt',
    inputSize: [224, 224, 3],
    outputSize: [224, 224, 21],
    preOptions: {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5]
    },
    intro:
      'DeepLab is a state-of-art deep learning model for semantic image segmentation, where the goal is to assign semantic labels (e.g., person, dog, cat and so on) to every pixel in the input image.',
    paperUrl: 'https://arxiv.org/abs/1802.02611'
  },
  {
    modelName: 'Deeplab 224 Atrous (TFLite)',
    modelFormatName: 'deeplab_mobilenet_v2_224_atrous_tflite',
    modelSize: '8.4MB',
    modelFile:
      '../semantic_segmentation/model/deeplab_mobilenetv2_224_dilated.tflite',
    labelsFile: '../semantic_segmentation/model/labels.txt',
    inputSize: [224, 224, 3],
    outputSize: [224, 224, 21],
    preOptions: {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5]
    },
    intro:
      'Equivalent to the model above (without dilated suffix) but only available on platforms that natively support atrous convolution.',
    paperUrl: 'https://arxiv.org/abs/1802.02611'
  },
  {
    modelName: 'Deeplab 257 (TFLite)',
    modelFormatName: 'deeplab_mobilenet_v2_257_tflite',
    modelSize: '9.5MB',
    modelFile: '../semantic_segmentation/model/deeplab_mobilenetv2_257.tflite',
    labelsFile: '../semantic_segmentation/model/labels.txt',
    inputSize: [257, 257, 3],
    outputSize: [257, 257, 21],
    preOptions: {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5]
    },
    intro:
      'DeepLab is a state-of-art deep learning model for semantic image segmentation, where the goal is to assign semantic labels (e.g., person, dog, cat and so on) to every pixel in the input image.',
    paperUrl: 'https://arxiv.org/abs/1802.02611'
  },
  {
    modelName: 'Deeplab 257 Atrous (TFLite)',
    modelFormatName: 'deeplab_mobilenet_v2_257_atrous_tflite',
    modelSize: '8.4MB',
    modelFile:
      '../semantic_segmentation/model/deeplab_mobilenetv2_257_dilated.tflite',
    labelsFile: '../semantic_segmentation/model/labels.txt',
    inputSize: [257, 257, 3],
    outputSize: [257, 257, 21],
    preOptions: {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5]
    },
    intro:
      'Equivalent to the model above (without dilated suffix) but only available on platforms that natively support atrous convolution.',
    paperUrl: 'https://arxiv.org/abs/1802.02611'
  },
  {
    modelName: 'Deeplab 321 (TFLite)',
    modelFormatName: 'deeplab_mobilenet_v2_321_tflite',
    modelSize: '9.5MB',
    modelFile: '../semantic_segmentation/model/deeplab_mobilenetv2_321.tflite',
    labelsFile: '../semantic_segmentation/model/labels.txt',
    inputSize: [321, 321, 3],
    outputSize: [321, 321, 21],
    preOptions: {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5]
    },
    intro:
      'DeepLab is a state-of-art deep learning model for semantic image segmentation, where the goal is to assign semantic labels (e.g., person, dog, cat and so on) to every pixel in the input image.',
    paperUrl: 'https://arxiv.org/abs/1802.02611'
  },
  {
    modelName: 'Deeplab 321 Atrous (TFLite)',
    modelFormatName: 'deeplab_mobilenet_v2_321_atrous_tflite',
    modelSize: '8.4MB',
    modelFile:
      '../semantic_segmentation/model/deeplab_mobilenetv2_321_dilated.tflite',
    labelsFile: '../semantic_segmentation/model/labels.txt',
    inputSize: [321, 321, 3],
    outputSize: [321, 321, 21],
    preOptions: {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5]
    },
    intro:
      'Equivalent to the model above (without dilated suffix) but only available on platforms that natively support atrous convolution.',
    paperUrl: 'https://arxiv.org/abs/1802.02611'
  },
  {
    modelName: 'Deeplab 513 (TFLite)',
    modelFormatName: 'deeplab_mobilenet_v2_513_tflite',
    modelSize: '9.5MB',
    modelFile: '../semantic_segmentation/model/deeplab_mobilenetv2_513.tflite',
    labelsFile: '../semantic_segmentation/model/labels.txt',
    inputSize: [513, 513, 3],
    outputSize: [513, 513, 21],
    preOptions: {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5]
    },
    intro:
      'DeepLab is a state-of-art deep learning model for semantic image segmentation, where the goal is to assign semantic labels (e.g., person, dog, cat and so on) to every pixel in the input image.',
    paperUrl: 'https://arxiv.org/abs/1802.02611'
  },
  {
    modelName: 'Deeplab 513 Atrous (TFLite)',
    modelFormatName: 'deeplab_mobilenet_v2_513_atrous_tflite',
    modelSize: '8.4MB',
    modelFile:
      '../semantic_segmentation/model/deeplab_mobilenetv2_513_dilated.tflite',
    labelsFile: '../semantic_segmentation/model/labels.txt',
    inputSize: [513, 513, 3],
    outputSize: [513, 513, 21],
    preOptions: {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5]
    },
    intro:
      'Equivalent to the model above (without dilated suffix) but only available on platforms that natively support atrous convolution.',
    paperUrl: 'https://arxiv.org/abs/1802.02611'
  }
]

const superResolutionModels = [
  {
    modelName: 'SRGAN 96x4 (TFLite)',
    modelFormatName: 'srgan_96_4_tflite',
    modelSize: '6.1MB',
    inputSize: [96, 96, 3],
    outputSize: [384, 384, 3],
    scale: 4,
    modelFile: '../super_resolution/model/srgan_96_4.tflite',
    intro:
      'Photo-realistic single image Super-Resolution using a generative adversarial network.',
    paperUrl: 'https://arxiv.org/abs/1609.04802'
  },
  {
    modelName: 'SRGAN 128x4 (TFLite)',
    modelFormatName: 'srgan_128_4_tflite',
    modelSize: '6.1MB',
    inputSize: [128, 128, 3],
    outputSize: [512, 512, 3],
    scale: 4,
    modelFile: '../super_resolution/model/srgan_128_4.tflite',
    intro:
      'Photo-realistic single image Super-Resolution using a generative adversarial network.',
    paperUrl: 'https://arxiv.org/abs/1609.04802'
  }
]

const faceDetectionModels = [
  {
    modelName: 'SSD MobileNet v1 (TFlite)',
    modelFormatName: 'ssd_mobilenetv1_face_tflite',
    modelSize: '22.0MB',
    type: 'SSD',
    modelFile: '../facial_landmark_detection/model/ssd_mobilenetv1_face.tflite',
    box_size: 4,
    num_classes: 2,
    num_boxes: 1083 + 600 + 150 + 54 + 24 + 6,
    margin: [1.2, 1.2, 0.8, 1.1],
    inputSize: [300, 300, 3],
    preOptions: {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5]
    },
    intro:
      'SSD Mobilenet V1 Face is based on SSD Mobilenet V1 model structure, and is trained by Tensorflow Object Detection API with WIDER_FACE dataset for face detection task.',
    paperUrl: 'https://arxiv.org/abs/1803.08225'
  },
  {
    modelName: 'SSD MobileNet v2 (TFlite)',
    modelFormatName: 'ssd_mobilenetv2_face_tflite',
    modelSize: '18.4MB',
    type: 'SSD',
    modelFile: '../facial_landmark_detection/model/ssd_mobilenetv2_face.tflite',
    box_size: 4,
    num_classes: 2,
    num_boxes: 1083 + 600 + 150 + 54 + 24 + 6,
    margin: [1.2, 1.2, 0.8, 1.1],
    inputSize: [300, 300, 3],
    preOptions: {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5]
    },
    intro:
      'SSD Mobilenet V2 Face is based on SSD Mobilenet V2 model structure, and is trained by Tensorflow Object Detection API with WIDER_FACE dataset for face detection task.',
    paperUrl: 'https://arxiv.org/abs/1801.04381'
  },
  {
    modelName: 'SSDLite MobileNet v2 (TFlite)',
    modelFormatName: 'ssdlite_mobilenetv2_face_tflite',
    modelSize: '12.1MB',
    type: 'SSD',
    modelFile:
      '../facial_landmark_detection/model/ssdlite_mobilenetv2_face.tflite',
    box_size: 4,
    num_classes: 2,
    num_boxes: 1083 + 600 + 150 + 54 + 24 + 6,
    margin: [1.2, 1.2, 0.8, 1.1],
    inputSize: [300, 300, 3],
    preOptions: {
      mean: [127.5, 127.5, 127.5],
      std: [127.5, 127.5, 127.5]
    },
    intro:
      'SSDLite Mobilenet V2 Face is based on SSDLite Mobilenet V2 model structure, and is trained by Tensorflow Object Detection API with WIDER_FACE dataset for face detection task.',
    paperUrl: 'https://arxiv.org/abs/1801.04381'
  },
  {
    modelName: 'Tiny Yolo v2 (TFlite)',
    modelFormatName: 'tiny_yolov2_face_tflite',
    modelSize: '44.1MB',
    modelFile: '../facial_landmark_detection/model/tiny_yolov2_face.tflite',
    type: 'YOLO',
    margin: [1.15, 1.15, 0.6, 1.15],
    inputSize: [416, 416, 3],
    outputSize: 1 * 13 * 13 * 30,
    anchors: [
      0.57273,
      0.677385,
      1.87446,
      2.06253,
      3.33843,
      5.47434,
      7.88282,
      3.52778,
      9.77052,
      9.16828
    ],
    preOptions: {
      norm: true
    },
    intro:
      'Tiny YOLO V2 Face is based off the Darknet reference network and trained with WIDER_FACE dataset for face detection task.',
    paperUrl: 'https://arxiv.org/abs/1612.08242'
  }
]

const facialLandmarkDetectionModels = [
  {
    modelName: 'DAN (TFlite)',
    modelFormatName: 'face_landmark_tflite',
    modelSize: '29.4MB',
    modelFile: '../facial_landmark_detection/model/face_landmark.tflite',
    inputSize: [128, 128, 3],
    outputSize: 136,
    intro: 'Converted from a pre-trained Deep Alignment Network',
    paperUrl: 'https://arxiv.org/abs/1612.08242'
  }
]

let supportedModels = []
supportedModels = supportedModels.concat(
  imageClassificationModels,
  objectDetectionModels,
  humanPoseEstimationModels,
  semanticSegmentationModels
)

let imageElement = null
let canvasElement = null
let poseCanvas = null
const segCanvas = null
let bkPoseImageSrc = null
let pnConfigDic = null

function getModelDicItem(modelFormatName) {
  for (const model of supportedModels) {
    if (model.modelFormatName === modelFormatName) {
      return model
    }
  }
}

function getSelectedOps() {
  // todo
}

const loadUrl = (url, binary) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open('GET', url, true)
    if (binary) {
      request.responseType = 'arraybuffer'
    }
    request.addEventListener("progress", function (evt) {
      if (evt.lengthComputable) {
        const percentComplete = evt.loaded / evt.total
        modelprogress = percentComplete
      }
    }, false)
    request.onload = function (ev) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          resolve(request.response)
        } else {
          reject(
            new Error('Failed to load ' + url + ' status: ' + request.status)
          )
        }
      }
    }
    request.send()
  })
}

const getModelArrayBuffer = async (url) => {
  // console.log(">>>>>>>> Start to load model")
  arrayBuffer = await loadUrl(url, true)
  // console.log(">>>>>>>> Model loaded");
}

const clearModelArrayBuffer = async () => {
  // console.log(">>>>>>>>" + arrayBuffer);
  arrayBuffer = null
  // console.log(">>>>>>>>" + arrayBuffer);
  // console.log(">>>>>>>> Model ArrayBuffer cleared");
}

class Logger {
  constructor() {
    this.indent = 0
  }
  time(message) {
    console.time(message)
  }
  timeEnd(message) {
    console.timeEnd(message)
  }
  log(message) {
    console.log(message)
  }
  error(err) {
    console.error(err)
  }
  group(name) {
    console.group(name)
    this.log('')
    this.indent++
  }
  groupEnd() {
    console.groupEnd()
    this.indent--
  }
}

class LoggerHTML {
  constructor() { }
  add(message) {
    finallog = finallog + message + '<br>'
  }
  fill() {
    // let ele = document.querySelector('#log');
    // ele.innerHTML = finallog;
    // ele.scrollTop =ele.scrollHeight;
  }
}

const lh = new LoggerHTML()

let finallog = ''
let modelprogress = 0
let probability = null
let currentinference
let posenetbase64
let nalabel
let arrayBuffer

class Benchmark {
  constructor() {
    this.summary = null
  }
  async runAsync(configuration) {
    this.configuration = configuration
    console.log(configuration)
    await this.setupAsync()
    const results = await this.executeAsync()
    await this.finalizeAsync()
    return {
      computeResults: this.summarize(results.computeResults),
      decodeResults: this.summarize(results.decodeResults)
    }
  }
  /**
   * Setup model
   * @returns {Promise<void>}
   */
  async setupAsync() {
    throw Error('Not Implemented')
  }

  async loadImage(canvas, width, height) {
    const ctx = canvas.getContext('2d')
    const image = new Image()
    const promise = new Promise((resolve, reject) => {
      image.crossOrigin = ''
      image.onload = () => {
        canvas.width = width
        canvas.height = height
        canvas.setAttribute('width', width)
        canvas.setAttribute('height', height)
        ctx.drawImage(image, 0, 0, width, height)
        resolve(image)
      }
    })
    image.src = imageElement.src
    return promise
  }

  async executeAsync() {
    let computeResults = []
    let decodeResults = []
    const modelName = this.configuration.modelName
    if (
      tfliteModelArray.indexOf(modelName) !== -1 ||
      onnxModelArray.indexOf(modelName) !== -1
    ) {
      console.log('***************' + modelName)
      for (let i = 0; i < this.configuration.iteration; i++) {
        this.onExecuteSingle(i)
        await new Promise(resolve => requestAnimationFrame(resolve))
        const tStart = performance.now()
        await this.executeSingleAsync()
        this.deQuantizeParams = this.model._deQuantizeParams
        const elapsedTime = performance.now() - tStart
        this.printPredictResult()
        computeResults.push(elapsedTime)
      }
    } else if (modelName === 'posenet') {
      let singlePose = null
      for (let i = 0; i < this.configuration.iteration; i++) {
        this.onExecuteSingle(i)
        await new Promise(resolve => requestAnimationFrame(resolve))
        const tStart = performance.now()
        await this.executeSingleAsyncPN()
        const elapsedTime = performance.now() - tStart
        computeResults.push(elapsedTime)
        const dstart = performance.now()
        singlePose = decodeSinglepose(
          sigmoid(this.heatmapTensor),
          this.offsetTensor,
          toHeatmapsize(this.scaleInputSize, this.outputStride),
          this.outputStride
        )
        const decodeTime = performance.now() - dstart
        console.log('Decode time:' + decodeTime)
        decodeResults.push(decodeTime)
      }
      // draw canvas by last result
      await this.loadImage(poseCanvas, imageElement.width, imageElement.height)
      const ctx = poseCanvas.getContext('2d')
      const scaleX = poseCanvas.width / this.scaleWidth
      const scaleY = poseCanvas.height / this.scaleHeight
      singlePose.forEach(pose => {
        if (pose.score >= this.minScore) {
          drawKeypoints(pose.keypoints, this.minScore, ctx, scaleX, scaleY)
          drawSkeleton(pose.keypoints, this.minScore, ctx, scaleX, scaleY)
        }
      })
      bkPoseImageSrc = imageElement.src
      imageElement.src = poseCanvas.toDataURL()
    } else if (ssdModelArray.indexOf(modelName) !== -1) {
      if (this.ssdModelType === 'SSD') {
        let outputBoxTensor, outputClassScoresTensor
        for (let i = 0; i < this.configuration.iteration; i++) {
          this.onExecuteSingle(i)
          await new Promise(resolve => requestAnimationFrame(resolve))
          const tStart = performance.now()
          await this.executeSingleAsyncSSDMN()
          const elapsedTime = performance.now() - tStart
          computeResults.push(elapsedTime)
          if (this.isQuantized) {
            ;[
              outputBoxTensor,
              outputClassScoresTensor
            ] = this.deQuantizeOutputTensor(
              this.outputBoxTensor,
              this.outputClassScoresTensor,
              this.model._deQuantizeParams
            )
          } else {
            outputBoxTensor = this.outputBoxTensor
            outputClassScoresTensor = this.outputClassScoresTensor
          }
          const dstart = performance.now()
          decodeOutputBoxTensor({}, outputBoxTensor, this.anchors)
          const decodeTime = performance.now() - dstart
          console.log('Decode time:' + decodeTime)
          decodeResults.push(decodeTime)
        }
        const [totalDetections, boxesList, scoresList, classesList] = NMS(
          {},
          outputBoxTensor,
          outputClassScoresTensor
        )
        poseCanvas.setAttribute('width', imageElement.width)
        poseCanvas.setAttribute('height', imageElement.height)
        visualize(
          poseCanvas,
          totalDetections,
          imageElement,
          boxesList,
          scoresList,
          classesList,
          this.labels
        )
      } else {
        let decode_out
        for (let i = 0; i < this.configuration.iteration; i++) {
          this.onExecuteSingle(i)
          await new Promise(resolve => requestAnimationFrame(resolve))
          const tStart = performance.now()
          await this.executeSingleAsyncSSDMN()
          const elapsedTime = performance.now() - tStart
          computeResults.push(elapsedTime)

          const dstart = performance.now()
          decode_out = decodeYOLOv2(
            { nb_class: this.numClasses },
            this.outputTensor[0],
            this.anchors
          )
          const decodeTime = performance.now() - dstart
          console.log('Decode time:' + decodeTime)
          decodeResults.push(decodeTime)
        }
        const boxes = getBoxes(decode_out, this.ssdModelMargin)
        poseCanvas.setAttribute('width', imageElement.width)
        poseCanvas.setAttribute('height', imageElement.height)
        drawBoxes(imageElement, poseCanvas, boxes, this.labels)
      }
      bkPoseImageSrc = imageElement.src
      imageElement.src = poseCanvas.toDataURL()
    } else if (segmentationModelArray.indexOf(modelName) !== -1) {
      for (let i = 0; i < this.configuration.iteration; i++) {
        this.onExecuteSingle(i)
        await new Promise(resolve => requestAnimationFrame(resolve))
        const tStart = performance.now()
        await this.executeSingleAsync()
        const elapsedTime = performance.now() - tStart
        computeResults.push(elapsedTime)
      }
      const imWidth = imageElement.naturalWidth
      const imHeight = imageElement.naturalHeight
      const resizeRatio = Math.max(
        Math.max(imWidth, imHeight) / this.inputSize[0],
        1
      )
      const scaledWidth = Math.floor(imWidth / resizeRatio)
      const scaledHeight = Math.floor(imHeight / resizeRatio)
      const renderer = new Renderer(segCanvas)
      renderer.setup()
      renderer.uploadNewTexture(imageElement, [scaledWidth, scaledHeight])
      renderer.drawOutputs({
        data: this.outputTensor,
        outputShape: this.outputSize,
        labels: this.labels
      })
      bkPoseImageSrc = imageElement.src
      imageElement.src = segCanvas.toDataURL()
    }
    if (this.model._backend !== 'WebML')
      this.model._compilation._preparedModel.dumpProfilingResults()
    return { computeResults: computeResults, decodeResults: decodeResults }
  }
  /**
   * Execute model
   * @returns {Promise<void>}
   */
  async executeSingleAsync() {
    throw Error('Not Implemented')
  }
  /**
   * Execute PoseNet model
   * @returns {Promise<void>}
   */
  async executeSingleAsyncPN() {
    throw Error('Not Implemented')
  }
  /**
   * Execute SSD MobileNet model
   * @returns {Promise<void>}
   */
  async executeSingleAsyncSSDMN() {
    throw Error('Not Implemented')
  }
  /**
   * Finalize
   * @returns {Promise<void>}
   */
  async finalizeAsync() { }
  summarize(results) {
    if (results.length !== 0) {
      results.shift() // remove first run, which is regarded as "warming up" execution
      const d = results.reduce(
        (d, v) => {
          d.sum += v
          d.sum2 += v * v
          return d
        },
        {
          sum: 0,
          sum2: 0
        }
      )
      const mean = d.sum / results.length
      const std = Math.sqrt(
        (d.sum2 - results.length * mean * mean) / (results.length - 1)
      )
      return {
        configuration: this.configuration,
        mean: mean,
        std: std,
        results: results
      }
    } else {
      return null
    }
  }
  onExecuteSingle(iteration) { }
}
class WebMLJSBenchmark extends Benchmark {
  constructor() {
    super(...arguments)
    this.inputTensor = null
    // outputTensor only for mobilenet and squeezenet
    this.inputSize = null
    this.outputTensor = null
    this.outputSize = null

    // only for posenet
    this.modelVersion = null
    this.outputStride = null
    this.scaleFactor = null
    this.minScore = null
    this.scaleWidth = null
    this.scaleHeight = null
    this.scaleInputSize = null
    this.heatmapTensor = null
    this.offsetTensor = null

    // only for ssd mobilenet
    this.outputBoxTensor = null
    this.outputClassScoresTensor = null
    this.deQuantizedOutputBoxTensor = null
    this.deQuantizedOutputClassScoresTensor = null
    this.deQuantizeParams = null
    this.anchors = null
    this.ssdModelType
    this.ssdModelMargin
    this.numClasses

    this.isQuantized = false

    this.model = null
    this.labels = null
  }
  async loadModelAndLabels(model) {
    // const arrayBuffer = await loadUrl(model.modelFile, true)
    const bytes = new Uint8Array(arrayBuffer)
    const text = await loadUrl(model.labelsFile)
    return {
      bytes: bytes,
      text: text
    }
  }

  async setInputOutput() {
    imageElement = document.querySelector('#testimage')
    canvasElement = document.querySelector('canvas.testimage')
    poseCanvas = document.querySelector('#poseCanvas')

    const configModelName = this.configuration.modelName
    const currentModel = getModelDicItem(configModelName)

    console.log(this.configuration.modelName)
    console.log(currentModel)

    let width = currentModel.inputSize[1]
    let height = currentModel.inputSize[0]
    let dwidth
    let dheight
    const channels = currentModel.inputSize[2]
    const preOptions = currentModel.preOptions || {}
    const mean = preOptions.mean || [0, 0, 0, 0]
    const std = preOptions.std || [1, 1, 1, 1]
    const norm = preOptions.norm || false
    const channelScheme = preOptions.channelScheme || 'RGB'
    const imageChannels = 4 // RGBA
    let drawContent

    this.isQuantized = currentModel.isQuantized || false
    let typedArray

    if (this.isQuantized) {
      typedArray = Uint8Array
    } else {
      typedArray = Float32Array
    }

    if (
      tfliteModelArray.indexOf(configModelName) !== -1 ||
      onnxModelArray.indexOf(configModelName) !== -1
    ) {
      this.inputTensor = new typedArray(
        currentModel.inputSize.reduce((a, b) => a * b)
      )
      this.outputTensor = new typedArray(currentModel.outputSize)
      drawContent = imageElement
      dwidth = width
      dheight = height
    } else if (ssdModelArray.indexOf(configModelName) !== -1) {
      if (bkPoseImageSrc !== null) {
        // reset for rerun with same image
        imageElement.src = bkPoseImageSrc
      }
      this.outputTensor = []
      this.ssdModelType = currentModel.type
      this.ssdModelMargin = currentModel.margin
      this.numClasses = currentModel.num_classes
      if (currentModel.type === 'SSD') {
        if (this.isQuantized) {
          this.deQuantizedOutputBoxTensor = new Float32Array(
            currentModel.num_boxes * currentModel.box_size
          )
          this.deQuantizedOutputClassScoresTensor = new Float32Array(
            currentModel.num_boxes * currentModel.num_classes
          )
        }
        this.inputTensor = new typedArray(
          currentModel.inputSize.reduce((a, b) => a * b)
        )
        this.outputBoxTensor = new typedArray(
          currentModel.num_boxes * currentModel.box_size
        )
        this.outputClassScoresTensor = new typedArray(
          currentModel.num_boxes * currentModel.num_classes
        )
        this.prepareoutputTensor(
          this.outputBoxTensor,
          this.outputClassScoresTensor
        )
        this.anchors = generateAnchors({})
      } else {
        // YOLO
        this.inputTensor = new typedArray(
          currentModel.inputSize.reduce((a, b) => a * b)
        )
        this.anchors = currentModel.anchors
        this.outputTensor = [new typedArray(currentModel.outputSize)]
      }
      drawContent = imageElement
      dwidth = width
      dheight = height
    } else if (segmentationModelArray.indexOf(configModelName) !== -1) {
      if (bkPoseImageSrc !== null) {
        // reset for rerun with same image
        imageElement.src = bkPoseImageSrc
      }
      this.inputTensor = new typedArray(
        currentModel.inputSize.reduce((a, b) => a * b)
      )
      this.outputTensor = new typedArray(
        currentModel.outputSize.reduce((a, b) => a * b)
      )
      this.inputSize = currentModel.inputSize
      this.outputSize = currentModel.outputSize
      height = this.inputSize[0]
      width = this.inputSize[1]
      const imWidth = imageElement.naturalWidth
      const imHeight = imageElement.naturalHeight
      // assume deeplab_out.width == deeplab_out.height
      const resizeRatio = Math.max(Math.max(imWidth, imHeight) / width, 1)
      drawContent = imageElement
      dwidth = Math.floor(imWidth / resizeRatio)
      dheight = Math.floor(imHeight / resizeRatio)
    } else if (configModelName === 'posenet') {
      if (bkPoseImageSrc !== null) {
        // reset for rerun with same image
        imageElement.src = bkPoseImageSrc
      }
      if (pnConfigDic === null) {
        // Read modelVersion outputStride scaleFactor minScore from json file
        const posenetConfigURL = './posenetConfig.json'
        const pnConfigText = await loadUrl(posenetConfigURL)
        pnConfigDic = JSON.parse(pnConfigText)
      }
      this.modelVersion = Number(pnConfigDic.modelVersion)
      this.outputStride = Number(pnConfigDic.outputStride)
      this.scaleFactor = Number(pnConfigDic.scaleFactor)
      this.minScore = Number(pnConfigDic.minScore)

      this.scaleWidth = getValidResolution(
        this.scaleFactor,
        width,
        this.outputStride
      )
      this.scaleHeight = getValidResolution(
        this.scaleFactor,
        height,
        this.outputStride
      )
      this.inputTensor = new typedArray(
        this.scaleWidth * this.scaleHeight * channels
      )
      this.scaleInputSize = [1, this.scaleWidth, this.scaleHeight, channels]

      let HEATMAP_TENSOR_SIZE
      if (
        (this.modelVersion == 0.75 || this.modelVersion == 0.5) &&
        this.outputStride == 32
      ) {
        HEATMAP_TENSOR_SIZE = product(toHeatmapsize(this.scaleInputSize, 16))
      } else {
        HEATMAP_TENSOR_SIZE = product(
          toHeatmapsize(this.scaleInputSize, this.outputStride)
        )
      }
      const OFFSET_TENSOR_SIZE = HEATMAP_TENSOR_SIZE * 2
      this.heatmapTensor = new typedArray(HEATMAP_TENSOR_SIZE)
      this.offsetTensor = new typedArray(OFFSET_TENSOR_SIZE)
      // prepare canvas for predict
      const poseCanvasPredict = document.getElementById('poseCanvasPredict')
      drawContent = await this.loadImage(poseCanvasPredict, width, height)
      width = this.scaleWidth
      height = this.scaleHeight
      dwidth = width
      dheight = height
    }

    canvasElement.setAttribute('width', width)
    canvasElement.setAttribute('height', height)
    const canvasContext = canvasElement.getContext('2d')
    canvasContext.drawImage(drawContent, 0, 0, dwidth, dheight)
    let pixels = canvasContext.getImageData(0, 0, width, height).data
    if (norm) {
      pixels = new Float32Array(pixels).map(p => p / 255)
    }

    if (channelScheme === 'RGB') {
      // NHWC layout
      for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
          for (let c = 0; c < channels; ++c) {
            const value =
              pixels[y * width * imageChannels + x * imageChannels + c]
            this.inputTensor[y * width * channels + x * channels + c] =
              (value - mean[c]) / std[c]
          }
        }
      }
    } else if (channelScheme === 'BGR') {
      // NHWC layout
      for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
          for (let c = 0; c < channels; ++c) {
            const value =
              pixels[
              y * width * imageChannels +
              x * imageChannels +
              (channels - c - 1)
              ]
            this.inputTensor[y * width * channels + x * channels + c] =
              (value - mean[c]) / std[c]
          }
        }
      }
    } else {
      throw new Error(`Unknown color channel scheme ${channelScheme}`)
    }
  }

  prepareoutputTensor(outputBoxTensor, outputClassScoresTensor) {
    const outH = [1083, 600, 150, 54, 24, 6]
    const boxLen = 4
    const classLen = 91
    let boxOffset = 0
    let classOffset = 0
    let boxTensor
    let classTensor
    for (let i = 0; i < 6; ++i) {
      boxTensor = outputBoxTensor.subarray(
        boxOffset,
        boxOffset + boxLen * outH[i]
      )
      classTensor = outputClassScoresTensor.subarray(
        classOffset,
        classOffset + classLen * outH[i]
      )
      this.outputTensor[2 * i] = boxTensor
      this.outputTensor[2 * i + 1] = classTensor
      boxOffset += boxLen * outH[i]
      classOffset += classLen * outH[i]
    }
  }

  deQuantizeOutputTensor(
    outputBoxTensor,
    outputClassScoresTensor,
    quantizedParams
  ) {
    const outH = [1083, 600, 150, 54, 24, 6]
    const boxLen = 4
    const classLen = 91
    let boxOffset = 0
    let classOffset = 0
    let boxTensor, classTensor
    let boxScale, boxZeroPoint, classScale, classZeroPoint
    let dqBoxOffset = 0
    let dqClassOffset = 0
    for (let i = 0; i < 6; ++i) {
      boxTensor = outputBoxTensor.subarray(
        boxOffset,
        boxOffset + boxLen * outH[i]
      )
      classTensor = outputClassScoresTensor.subarray(
        classOffset,
        classOffset + classLen * outH[i]
      )
      boxScale = quantizedParams[2 * i].scale
      boxZeroPoint = quantizedParams[2 * i].zeroPoint
      classScale = quantizedParams[2 * i + 1].scale
      classZeroPoint = quantizedParams[2 * i + 1].zeroPoint
      for (let j = 0; j < boxTensor.length; ++j) {
        this.deQuantizedOutputBoxTensor[dqBoxOffset] =
          boxScale * (boxTensor[j] - boxZeroPoint)
        ++dqBoxOffset
      }
      for (let j = 0; j < classTensor.length; ++j) {
        this.deQuantizedOutputClassScoresTensor[dqClassOffset] =
          classScale * (classTensor[j] - classZeroPoint)
        ++dqClassOffset
      }
      boxOffset += boxLen * outH[i]
      classOffset += classLen * outH[i]
    }
    return [
      this.deQuantizedOutputBoxTensor,
      this.deQuantizedOutputClassScoresTensor
    ]
  }

  async setupAsync() {
    await this.setInputOutput()
    const backend = this.configuration.backend.replace('native', 'WebML')
    const modelName = this.configuration.modelName
    const prefer = this.configuration.prefer
    if (tfliteModelArray.indexOf(modelName) !== -1) {
      const model = getModelDicItem(modelName)
      const resultTflite = await this.loadModelAndLabels(model)
      this.labels = resultTflite.text.split('\n')
      const flatBuffer = new flatbuffers.ByteBuffer(resultTflite.bytes)
      const rawModel = tflite.Model.getRootAsModel(flatBuffer)
      const postOptions = model.postOptions || {}
      const kwargs = {
        rawModel: rawModel,
        backend: backend,
        prefer: prefer,
        softmax: postOptions.softmax || false
      }
      this.model = new TFliteModelImporter(kwargs)
    } else if (onnxModelArray.indexOf(modelName) !== -1) {
      const model = getModelDicItem(modelName)
      const resultONNX = await this.loadModelAndLabels(model)
      this.labels = resultONNX.text.split('\n')
      console.log(`labels: ${this.labels}`)
      const err = onnx.ModelProto.verify(resultONNX.bytes)
      if (err) {
        throw new Error(`Invalid model ${err}`)
      }
      const rawModel = onnx.ModelProto.decode(resultONNX.bytes)
      const postOptions = model.postOptions || {}
      const kwargs = {
        rawModel: rawModel,
        backend: backend,
        prefer: prefer,
        softmax: postOptions.softmax || false
      }
      this.model = new OnnxModelImporter(kwargs)
    } else if (ssdModelArray.indexOf(modelName) !== -1) {
      const model = getModelDicItem(modelName)
      const resultTflite = await this.loadModelAndLabels(model)
      this.labels = resultTflite.text.split('\n')
      const flatBuffer = new flatbuffers.ByteBuffer(resultTflite.bytes)
      const rawModel = tflite.Model.getRootAsModel(flatBuffer)
      const kwargs = {
        rawModel: rawModel,
        backend: backend,
        prefer: prefer
      }
      this.model = new TFliteModelImporter(kwargs)
    } else if (modelName === 'posenet') {
      const modelArch = ModelArch.get(this.modelVersion)
      const smType = 'Singleperson'
      const cacheMap = new Map()
      const useAtrousConv = false // Default false, NNAPI and BNNS don't support AtrousConv
      this.model = new PoseNet(
        modelArch,
        this.modelVersion,
        useAtrousConv,
        this.outputStride,
        this.scaleInputSize,
        smType,
        cacheMap,
        backend,
        prefer
      )
    } else if (segmentationModelArray.indexOf(modelName) !== -1) {
      const model = getModelDicItem(modelName)
      const resultTflite = await this.loadModelAndLabels(model)
      this.labels = resultTflite.text.split('\n')
      const flatBuffer = new flatbuffers.ByteBuffer(resultTflite.bytes)
      const rawModel = tflite.Model.getRootAsModel(flatBuffer)
      const kwargs = {
        rawModel: rawModel,
        backend: backend,
        prefer: prefer
      }
      this.model = new TFliteModelImporter(kwargs)
    }
    let supportedOps = getSelectedOps()
    await this.model.createCompiledModel()
  }
  printPredictResult() {
    probability = null
    const probs = Array.from(this.outputTensor)
    const indexes = probs.map((prob, index) => [prob, index])
    const sorted = indexes.sort((a, b) => {
      if (a[0] === b[0]) {
        return 0
      }
      return a[0] < b[0] ? -1 : 1
    })
    sorted.reverse()
    let prob
    for (let i = 0; i < 3; ++i) {
      if (this.isQuantized) {
        prob =
          this.deQuantizeParams[0].scale *
          (sorted[i][0] - this.deQuantizeParams[0].zeroPoint)
      } else {
        prob = sorted[i][0]
        const index = sorted[i][1]
        lh.add(`&nbsp;&nbsp;&nbsp;&nbsp; Label: ${this.labels[index]}, probability: ${(prob * 100).toFixed(2)}%`)
        if (i == 0) {
          probability = `${this.labels[index]}, ${(prob * 100).toFixed(2)}%`
          currentinference = probability
        }
      }
      const index = sorted[i][1]
      console.log(
        `label: ${this.labels[index]}, probability: ${(prob * 100).toFixed(2)}%`
      )
    }
  }
  async executeSingleAsync() {
    let result
    result = await this.model.compute([this.inputTensor], [this.outputTensor])
    console.log(`compute result: ${result}`)
  }
  async executeSingleAsyncSSDMN() {
    let result
    result = await this.model.compute([this.inputTensor], this.outputTensor)
    console.log(`compute result: ${result}`)
  }
  async executeSingleAsyncPN() {
    let result
    result = await this.model.computeSinglePose(
      this.inputTensor,
      this.heatmapTensor,
      this.offsetTensor
    )
    console.log(`compute result: ${result}`)
  }
  async finalizeAsync() {
    this.inputTensor = null
    this.outputTensor = null
    this.modelVersion = null
    this.outputStride = null
    this.scaleFactor = null
    this.minScore = null
    this.scaleWidth = null
    this.scaleHeight = null
    this.scaleInputSize = null
    this.heatmapTensor = null
    this.offsetTensor = null
    this.outputBoxTensor = null
    this.outputClassScoresTensor = null
    this.deQuantizedOutputBoxTensor = null
    this.deQuantizedOutputClassScoresTensor = null
    this.deQuantizeParams = null
    this.anchors = null
    this.model = null
    this.labels = null
  }
}
// ---------------------------------------------------------------------------------------------------
//
// Main
//
const BenchmarkClass = {
  'webml-polyfill.js': WebMLJSBenchmark,
  'WebML API': WebMLJSBenchmark
}

let testresult = []
let bardata = []

let bar1 = []
let bar2 = []
let bar3 = []

async function run(configuration) {
  const logger = new Logger()
  logger.group('Benchmark')

  try {
    // let configuration = {framework: "webml-polyfill.js", backend: "WASM", modelName: "mobilenet", iteration: 4};

    logger.group('Environment Information')
    logger.log(`${'UserAgent'.padStart(12)}: ${navigator.userAgent || '(N/A)'}`)
    logger.log(`${'Platform'.padStart(12)}: ${navigator.platform || '(N/A)'}`)
    logger.groupEnd()

    logger.group('Configuration')
    lh.add('Configuration')
    Object.keys(configuration).forEach(key => {
      if (configuration[key]) {
        logger.log(`${key.padStart(12)}: ${configuration[key]}`)
        lh.add(`&nbsp;&nbsp;${key}: ${configuration[key]}`)
      }
    })
    logger.groupEnd()
    lh.add(`<div></div>`)
    logger.group('Run')
    lh.add(`Run`)
    const benchmark = new BenchmarkClass[configuration.framework]()
    console.log(benchmark)
    benchmark.onExecuteSingle = i => {
      logger.log(`Iteration: ${i + 1} / ${configuration.iteration}`)
      lh.add(
        `&nbsp;&nbsp; Iteration: ${i + 1} / ${configuration.iteration}`
      )
    }
    const summary = await benchmark.runAsync(configuration)
    logger.groupEnd()
    lh.add(`<div></div>`)
    logger.group('Result')
    lh.add(`Result`)

    logger.log(
      `[${configuration.modelName} + ${
      configuration.backend
      }] Elapsed time: ${summary.computeResults.mean.toFixed(
        2
      )}+-${summary.computeResults.std.toFixed(2)} [ms]`
    )
    lh.add(
      `&nbsp;&nbsp; [${
      configuration.modelName
      } + ${
      configuration.backend
      }] Elapsed time: ${summary.computeResults.mean.toFixed(
        2
      )}+-${summary.computeResults.std.toFixed(2)} [ms]`
    )

    if (summary.decodeResults !== null) {
      logger.log(
        `[${configuration.modelName} + ${
        configuration.backend
        }] Decode time: ${summary.decodeResults.mean.toFixed(
          2
        )}+-${summary.decodeResults.std.toFixed(2)} [ms]`
      )
      lh.add(
        `&nbsp;&nbsp; [${
        configuration.modelName
        } + ${
        configuration.backend
        }] Decode time: ${summary.decodeResults.mean.toFixed(
          2
        )}+-${summary.decodeResults.std.toFixed(2)} [ms]`
      )
    }

    const d = {}
    d.id = configuration.id
    d.name = configuration.name
    d.model = configuration.modelName
    d.model_version = configuration.modelVersion
    d.backend = configuration.backend
    if (configuration.backend === 'WebML') {
      d.backend = configuration.backend.replace('WebML', 'WebNN') + ' ' + configuration.prefer
    }
    d.test_case = configuration.image.split('/').pop()
    d.test_result = summary.computeResults.mean.toFixed(2)
    if (summary.decodeResults !== null) {
      d.decode_result = summary.decodeResults.mean.toFixed(2)
    } else {
      d.decode_result = 'N/A'
    }
    d.probability = probability
    d.test_unit = 'ms'
    testresult.push(d)

    logger.groupEnd()
    lh.add(`<div></div>`)

    switch (d.backend.toLowerCase()) {
      case 'wasm':
        bar1.push(d.test_result)
        break
      case 'webgl':
        bar2.push(d.test_result)
        break
      case 'webml':
        bar3.push(d.test_result)
        break
    }
  } catch (err) {
    logger.error(err)
    lh.add(
      `&nbsp;&nbsp; [${
      configuration.modelName
      } + ${configuration.backend}] ` + err
    )

    const d = {}
    d.id = configuration.id
    d.name = configuration.name
    d.model = configuration.modelName
    d.model_version = configuration.modelVersion
    d.backend = configuration.backend
    if (configuration.backend === 'WebML') {
      d.backend = configuration.backend.replace('WebML', 'WebNN') + ' ' + configuration.prefer
    }
    d.test_case = configuration.image.split('/').pop()
    d.test_result = 'N/A (*)'
    d.decode_result = 'N/A'
    d.probability = 'N/A'
    d.test_unit = 'ms'
    testresult.push(d)

    currentinference = 'N/A'
    nalabel = "N/A (*): Your browser doesn't support WebNN API with current prefer option"

    lh.add(`<div></div>`)

    switch (d.backend.toLowerCase()) {
      case 'wasm':
        bar1.push(0)
        break
      case 'webgl':
        bar2.push(0)
        break
      case 'webml':
        bar3.push(0)
        break
    }
  }
  logger.groupEnd()
  lh.fill()

  // if (location.pathname.indexOf('benchmark') < 0 && testresult.length > 9) {
  //   testresult = testresult.slice(9)
  // }

  console.log(testresult)
}

export {
  finallog,
  modelprogress,
  run,
  testresult,
  bardata,
  currentinference,
  posenetbase64,
  nalabel,
  getModelArrayBuffer,
  clearModelArrayBuffer
}
