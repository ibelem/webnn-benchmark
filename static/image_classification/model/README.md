Download the following model packages, then uncompress them if necessary and move the model files here:
1. [Mobilenet V1(TFlite)](http://download.tensorflow.org/models/mobilenet_v1_2018_02_22/mobilenet_v1_1.0_224.tgz)
2. [Mobilenet V1 Quant(TFlite)](http://download.tensorflow.org/models/mobilenet_v1_2018_08_02/mobilenet_v1_1.0_224_quant.tgz)
3. [Mobilenet V2(TFlite)](http://download.tensorflow.org/models/tflite_11_05_08/mobilenet_v2_1.0_224.tgz)
4. [Mobilenet V2 Quant(TFlite)](http://download.tensorflow.org/models/tflite_11_05_08/mobilenet_v2_1.0_224_quant.tgz)
5. [Inception V3(TFlite)](https://storage.googleapis.com/download.tensorflow.org/models/tflite/model_zoo/upload_20180427/inception_v3_2018_04_27.tgz)
6. [Inception V4(TFlite)](https://storage.googleapis.com/download.tensorflow.org/models/tflite/model_zoo/upload_20180427/inception_v4_2018_04_27.tgz)
7. [Squeezenet(TFlite)](https://storage.googleapis.com/download.tensorflow.org/models/tflite/model_zoo/upload_20180427/squeezenet_2018_04_27.tgz)
8. [Inception Resnet V2(TFlite)](https://storage.googleapis.com/download.tensorflow.org/models/tflite/model_zoo/upload_20180427/inception_resnet_v2_2018_04_27.tgz)
9. [Squeezenet(Onnx)](https://s3.amazonaws.com/onnx-model-zoo/squeezenet/squeezenet1.1/squeezenet1.1.onnx)
10. [Mobilenet v2(Onnx)](https://s3.amazonaws.com/onnx-model-zoo/mobilenet/mobilenetv2-1.0/mobilenetv2-1.0.onnx)
11. [Resnet-50 v1(Onnx)](https://s3.amazonaws.com/onnx-model-zoo/resnet/resnet50v1/resnet50v1.onnx)
12. [Resnet-50 v2(Onnx)](https://s3.amazonaws.com/onnx-model-zoo/resnet/resnet50v2/resnet50v2.onnx)
13. [Inception v2(Onnx)](https://s3.amazonaws.com/download.onnx/models/opset_9/inception_v2.tar.gz) (Untar it and rename `model.onnx` to `inceptionv2.onnx`)
14. [DenseNet(Onnx)](https://s3.amazonaws.com/download.onnx/models/opset_9/densenet121.tar.gz) (Untar it and rename `model.onnx` to `densenet121.onnx`)

The model files are:
```
mobilenet_v1_1.0_224.tflite
mobilenet_v1_1.0_224_quant.tflite
mobilenet_v2_1.0_224.tflite
mobilenet_v2_1.0_224_quant.tflite
inception_v3.tflite
inception_v4.tflite
squeezenet.tflite
inception_resnet_v2.tflite

squeezenet1.1.onnx
mobilenetv2-1.0.onnx
resnet50v1.onnx
resnet50v2.onnx
inceptionv2.onnx
densenet121.onnx
```

And we have provided the labels files:
```
labels1001.txt
labels1000.txt
ilsvrc2012labels.txt
```

Check out [TensorFlow Lite Models](https://www.tensorflow.org/lite/guide/hosted_models) and [ONNX models](https://github.com/onnx/models) for details.