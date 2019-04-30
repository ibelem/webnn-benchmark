export const state = () => ({
  imageClassificationModels: [
    {
      modelName: 'Mobilenet v1 (TFLite)',
      modelFormatName: 'mobilenet_v1_tflite',
      modelSize: '16.9MB',
      modelVersion: '1.0 224',
      top1Accuracy: '71.0%',
      top5Accuracy: '89.9%',
      tfLitePerformance: '160.1ms',
      tensorflowPerformance: '224.3ms',
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
      modelName: 'Mobilenet v2 (TFLite)',
      modelFormatName: 'mobilenet_v2_tflite',
      modelSize: '14.0MB',
      modelVersion: '1.0 224',
      top1Accuracy: '71.8%',
      top5Accuracy: '90.6%',
      tfLitePerformance: '117ms',
      tensorflowPerformance: '',
      inputSize: [224, 224, 3],
      outputSize: 1001,
      modelFile: '../image_classification/model/mobilenet_v2_1.0_224.tflite',
      labelsFile: '../image_classification/model/labels1001.txt',
      preOptions: {
        mean: [127.5, 127.5, 127.5],
        std: [127.5, 127.5, 127.5]
      },
      intro:
        'MobileNet v2 improves the state of the art performance of mobile models.',
      paperUrl: 'https://arxiv.org/abs/1801.04381'
    },
    {
      modelName: 'Inception v3 (TFLite)',
      modelFormatName: 'inception_v3_tflite',
      modelSize: '95.3MB',
      modelVersion: '3',
      top1Accuracy: '77.9%',
      top5Accuracy: '93.8%',
      tfLitePerformance: '1433ms',
      tensorflowPerformance: '1522ms',
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
      modelVersion: '4',
      top1Accuracy: '80.1%',
      top5Accuracy: '95.1%',
      tfLitePerformance: '2986ms',
      tensorflowPerformance: '3139ms',
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
      modelVersion: '',
      top1Accuracy: '49.0%',
      top5Accuracy: '72.9%',
      tfLitePerformance: '224ms',
      tensorflowPerformance: '255ms',
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
      modelVersion: '2',
      top1Accuracy: '77.5%',
      top5Accuracy: '94.0%',
      tfLitePerformance: '2731ms',
      tensorflowPerformance: '2926ms',
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
  ],

  objectDetectionModels: [
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
  ],

  humanPoseEstimationModels: [
    {
      modelName: 'PoseNet',
      modelFormatName: 'posenet_tflite',
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
  ],

  semanticSegmentationModels: [
    {
      modelName: 'Deeplab 224 (TFLite)',
      modelFormatName: 'deeplab_mobilenet_v2_224_tflite',
      modelSize: '9.5MB',
      modelFile:
        '../semantic_segmentation/model/deeplab_mobilenetv2_224.tflite',
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
      modelFile:
        '../semantic_segmentation/model/deeplab_mobilenetv2_257.tflite',
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
      modelFile:
        '../semantic_segmentation/model/deeplab_mobilenetv2_321.tflite',
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
      modelFile:
        '../semantic_segmentation/model/deeplab_mobilenetv2_513.tflite',
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
  ],

  superResolutionModels: [
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
  ],

  faceDetectionModels: [
    {
      modelName: 'SSD MobileNet v1 (TFlite)',
      modelFormatName: 'ssd_mobilenetv1_face_tflite',
      modelSize: '22.0MB',
      type: 'SSD',
      modelFile:
        '../facial_landmark_detection/model/ssd_mobilenetv1_face.tflite',
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
      modelFile:
        '../facial_landmark_detection/model/ssd_mobilenetv2_face.tflite',
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
  ],

  facialLandmarkDetectionModels: [
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
})

export const mutations = {}
