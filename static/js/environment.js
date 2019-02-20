/*
    Min Zhang
*/

const uaparser = new UAParser()
const uaresult = uaparser.getResult()
let canvasE, gl, glVender, glRenderer, debugInfo

const getCanvas = () => {
  if (canvasE == null) {
    canvasE = document.createElement('canvas')
  }
  return canvasE
}

const getGl = () => {
  if (gl == null) {
    gl = getCanvas().getContext('experimental-webgl')
  }
  return gl
}

const getGlVender = () => {
  if (glVender == null) {
    debugInfo = getGl().getExtension('WEBGL_debug_renderer_info')
    // Return the VENDOR string of the underlying graphics driver
    glVender =
      debugInfo == null
        ? 'unknown'
        : getGl().getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
  }
  return glVender
}

const getGlRenderer = () => {
  if (glRenderer == null) {
    debugInfo = getGl().getExtension('WEBGL_debug_renderer_info')
    // Return the RENDERER string of the underlying graphics driver
    glRenderer =
      debugInfo == null
        ? 'unknown'
        : getGl().getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
  }
  return glRenderer
}

const getScreenWidth = () => {
  return screen.width * (window.devicePixelRatio || 1)
}

const getScreenHeight = () => {
  return screen.height * (window.devicePixelRatio || 1)
}

// Return the number of logical processors available to run threads on the user's computer
const getHardwareConcurrency = () => {
  if (navigator.hardwareConcurrency) {
    return navigator.hardwareConcurrency
  }
  return undefined
}

// Return the amount of device memory in gigabytes.
// This value is an approximation given by rounding to the nearest power of 2
// and dividing that number by 1024.
// Device-Memory Client Hint header and JS API will only be available to HTTPS secure contexts
const getDeviceMemory = () => {
  if (navigator.deviceMemory) {
    return navigator.deviceMemory
  }
  return undefined
}

const getTouchSupport = () => {
  let maxTouchPoints = 0
  let touchEvent = false
  if (typeof navigator.maxTouchPoints !== 'undefined') {
    maxTouchPoints = navigator.maxTouchPoints
  } else if (typeof navigator.msMaxTouchPoints !== 'undefined') {
    maxTouchPoints = navigator.msMaxTouchPoints
  }
  try {
    document.createEvent('TouchEvent')
    touchEvent = true
  } catch (_) {}
  const touchStart = 'ontouchstart' in window
  return [maxTouchPoints, touchEvent, touchStart]
}

const getTimezoneOffsetInHours = () => {
  const d = new Date()
  return (d.getTimezoneOffset() > 0 ? '-' : '+') + d.getTimezoneOffset() / -60
}

const AIEnvironment = function() {
  this.hardware = () => {
    return {
      devicevendor: uaresult.device.vendor,
      devicemodel: uaresult.device.model,
      devicetype: uaresult.device.type,
      cpuarchitecture: uaresult.cpu.architecture,
      cpuhardwareconcurrency: getHardwareConcurrency(),
      gpuvender: getGlVender(),
      gpu: getGlRenderer(),
      devicememory: getDeviceMemory(),
      screenwidth: getScreenWidth(),
      screenheight: getScreenHeight(),
      screenavailablewidth: screen.availWidth,
      screenavailableheight: screen.availHeight,
      screencolordepth: screen.colorDepth,
      screenpixeldepth: screen.pixelDepth,
      devicepixelratio: window.devicePixelRatio
    }
  }

  this.software = () => {
    return {
      os: uaresult.os.name,
      osversion: uaresult.os.version,
      platform: navigator.platform,
      timezone: getTimezoneOffsetInHours()
    }
  }

  this.browser = () => {
    return {
      name: uaresult.browser.name,
      version: uaresult.browser.version,
      major: uaresult.browser.major,
      language: navigator.language,
      enginename: uaresult.engine.name,
      engineversion: uaresult.engine.version,
      useragent: navigator.userAgent
    }
  }

  this.result = () => {
    return {
      hardware: this.hardware(),
      software: this.software(),
      browser: this.browser()
    }
  }
}
