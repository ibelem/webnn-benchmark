'use strict'
const tfliteModel = [
  'mobilenet_v1_tflite',
  'mobilenet_v1_quant_tflite',
  'mobilenet_v2_tflite',
  'mobilenet_v2_quant_tflite',
  'inception_v3_tflite',
  'inception_v4_tflite',
  'squeezenet_tflite',
  'inception_resnet_v2_tflite'
]

const ssdModel = [
  'ssd_mobilenet_v1_tflite',
  'ssd_mobilenet_v1_quant_tflite',
  'ssd_mobilenet_v2_tflite',
  'ssd_mobilenet_v2_quant_tflite',
  'ssdlite_mobilenet_v2_tflite',
  'tiny_yolov2_coco_tflite',
  'tiny_yolov2_voc_tflite'
]

const onnxModel = [
  'squeezenet_onnx',
  'mobilenet_v2_onnx',
  'resnet_v1_onnx',
  'resnet_v2_onnx',
  'inception_v2_onnx',
  'densenet_onnx'
]

const segmentationModel = [
  'deeplab_mobilenet_v2_224_tflite',
  'deeplab_mobilenet_v2_224_atrous_tflite',
  'deeplab_mobilenet_v2_257_tflite',
  'deeplab_mobilenet_v2_257_atrous_tflite',
  'deeplab_mobilenet_v2_321_tflite',
  'deeplab_mobilenet_v2_321_atrous_tflite',
  'deeplab_mobilenet_v2_513_tflite',
  'deeplab_mobilenet_v2_513_atrous_tflite'
]

let consoledebug = []

let imageElement = null
let canvasElement = null
let poseCanvas = null
const segCanvas = null
let bkPoseImageSrc = null
let pnConfigDic = null

const getSelectedOps = () => {
  // todo
}

const loadUrl = (url, binary) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open('GET', url, true)
    if (binary) {
      request.responseType = 'arraybuffer'
    }
    request.addEventListener("progress", (evt) => {
      if (evt.lengthComputable) {
        const percentComplete = evt.loaded / evt.total
        modelprogress = percentComplete
      }
    }, false)
    request.onload = (ev) => {
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
    const modelFormatName = this.configuration.modelFormatName
    if (
      tfliteModel.indexOf(modelFormatName) !== -1 ||
      onnxModel.indexOf(modelFormatName) !== -1
    ) {
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
    } else if (modelFormatName === 'posenet') {
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
    } else if (ssdModel.indexOf(modelFormatName) !== -1) {
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
    } else if (segmentationModel.indexOf(modelFormatName) !== -1) {
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
    if (this.model._backend != 'WebML') {
      this.model._compilation._preparedModel.dumpProfilingResults()
      // this.model._compilation._preparedModel._deleteAll()
    }
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

    const configModelName = this.configuration.modelFormatName
    const currentModel = this.configuration.model

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
      tfliteModel.indexOf(configModelName) !== -1 ||
      onnxModel.indexOf(configModelName) !== -1
    ) {
      this.inputTensor = new typedArray(
        currentModel.inputSize.reduce((a, b) => a * b)
      )
      this.outputTensor = new typedArray(currentModel.outputSize)
      drawContent = imageElement
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + drawContent.src)
      dwidth = width
      dheight = height
    } else if (ssdModel.indexOf(configModelName) !== -1) {
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
    } else if (segmentationModel.indexOf(configModelName) !== -1) {
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
    const modelFormatName = this.configuration.modelFormatName
    const prefer = this.configuration.prefer.toLowerCase()
    if (tfliteModel.indexOf(modelFormatName) !== -1) {
      const model = this.configuration.model
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
    } else if (onnxModel.indexOf(modelFormatName) !== -1) {
      const model = this.configuration.model
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
    } else if (ssdModel.indexOf(modelFormatName) !== -1) {
      const model = this.configuration.model
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
    } else if (modelFormatName === 'posenet') {
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
    } else if (segmentationModel.indexOf(modelFormatName) !== -1) {
      const model = this.configuration.model
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
let testresult = []
let bardata = []

let bar1 = []
let bar2 = []
let bar3 = []

const cleanTestResult = () => {
  testresult = []
}

const run = async (configuration) => {
  const logger = new Logger()
  logger.group('Benchmark')

  try {
    // let configuration = {framework: "webml-polyfill.js", backend: "WASM", modelFormatName: "mobilenet", iteration: 4};

    logger.group('Environment Information')
    logger.log(`${'UserAgent'.padStart(12)}: ${navigator.userAgent || '(N/A)'}`)
    logger.log(`${'Platform'.padStart(12)}: ${navigator.platform || '(N/A)'}`)
    logger.groupEnd()

    logger.group('Configuration')
    lh.add('Configuration')
    Object.keys(configuration).forEach(key => {
      if (configuration[key]) {
        if (key == 'model') {
          logger.log(`${key.padStart(12)}: ${configuration[key].modelName} / ${configuration[key].modelSize}`)
          lh.add(`&nbsp;&nbsp;${key}: ${configuration[key].modelName} / ${configuration[key].modelSize}`)
        } else if (key == 'backend') {
          logger.log(`${key.padStart(12)}: ${configuration[key].replace('WebML','WebNN')}`)
          lh.add(`&nbsp;&nbsp;${key}: ${configuration[key].replace('WebML','WebNN')}`)
        } else {
          logger.log(`${key.padStart(12)}: ${configuration[key]}`)
          lh.add(`&nbsp;&nbsp;${key}: ${configuration[key]}`)
        }
      }
    })
    logger.groupEnd()
    lh.add(`<div></div>`)
    logger.group('Run')
    lh.add(`Run`)
    const benchmark = new WebMLJSBenchmark()
    console.log('>>>>>>>>>>>>>>>>>>>>' + benchmark)
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
      `[${configuration.modelFormatName} + ${
      configuration.backend
      }] Elapsed time: ${summary.computeResults.mean.toFixed(
        2
      )}+-${summary.computeResults.std.toFixed(2)} [ms]`
    )
    lh.add(
      `&nbsp;&nbsp; [${
      configuration.modelFormatName
      } + ${
      configuration.backend
      }] Elapsed time: ${summary.computeResults.mean.toFixed(
        2
      )}+-${summary.computeResults.std.toFixed(2)} [ms]`
    )

    if (summary.decodeResults !== null) {
      logger.log(
        `[${configuration.modelFormatName} + ${
        configuration.backend
        }] Decode time: ${summary.decodeResults.mean.toFixed(
          2
        )}+-${summary.decodeResults.std.toFixed(2)} [ms]`
      )
      lh.add(
        `&nbsp;&nbsp; [${
        configuration.modelFormatName
        } + ${
        configuration.backend
        }] Decode time: ${summary.decodeResults.mean.toFixed(
          2
        )}+-${summary.decodeResults.std.toFixed(2)} [ms]`
      )
    }

    const d = {}
    d.id = configuration.id
    d.name = configuration.model.modelName
    // d.model = configuration.modelFormatName
    d.model_version = configuration.modelVersion
    d.backend = configuration.backend
    if (configuration.backend === 'WebML') {
      d.backend = configuration.prefer
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
      configuration.modelFormatName
      } + ${configuration.backend}] ` + err
    )

    const d = {}
    d.id = configuration.id
    d.name = configuration.model.modelName
    // d.model = configuration.modelFormatName
    d.model_version = configuration.modelVersion
    d.backend = configuration.backend
    if (configuration.backend === 'WebML') {
      d.backend = configuration.prefer
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
  clearModelArrayBuffer,
  cleanTestResult
}
