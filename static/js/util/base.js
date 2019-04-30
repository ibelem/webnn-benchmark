let nnPolyfill, nnNative
if (navigator.ml.isPolyfill) {
  nnNative = null
  nnPolyfill = navigator.ml.getNeuralNetworkContext()
} else {
  nnNative = navigator.ml.getNeuralNetworkContext()
  nnPolyfill = navigator.ml_polyfill.getNeuralNetworkContext()
}

const preferMap = {
  MPS: 'sustained',
  BNNS: 'fast',
  sustained: 'SUSTAINED_SPEED',
  fast: 'FAST_SINGLE_ANSWER',
  low: 'LOW_POWER'
}

const getOS = () => {
  const userAgent = window.navigator.userAgent
  const platform = window.navigator.platform
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
  const iosPlatforms = ['iPhone', 'iPad', 'iPod']
  let os = null

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS'
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS'
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows'
  } else if (/Android/.test(userAgent)) {
    os = 'Android'
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux'
  }

  return os
}

const currentOS = getOS()
const eager = false
const supportedOps = new Set()

const getNativeAPI = preferString => {
  // if you are going to modify the backend name, please change the
  // `backendEnums` in the `getDefaultSupportedOps` below
  const apiMapping = {
    Android: {
      sustained: 'NN',
      fast: 'NN',
      low: 'NN'
    },
    Windows: {
      sustained: 'clDNN',
      fast: 'mklDNN'
    },
    Linux: {
      sustained: 'clDNN',
      fast: 'mklDNN'
    },
    'Mac OS': {
      fast: 'BNNS',
      sustained: 'MPS'
    }
  }
  return apiMapping[currentOS][preferString]
}

const getDefaultSupportedOps = (backend, prefer) => {
  if (prefer === 'none' && backend !== 'WebML') {
    // if `prefer` is none, all ops should only run in polyfill
    return new Set()
  }

  // backend enums are defined in the `getNativeAPI` above
  const backendEnums = { NN: 0, MPS: 1, BNNS: 2, clDNN: 3, mklDNN: 4 }
  const supportedTable = {
    ADD: [true, true, true, true, false],
    ATROUS_CONV_2D: [false, false, false, true, true],
    ATROUS_DEPTHWISE_CONV_2D: [false, false, false, true, true],
    AVERAGE_POOL_2D: [true, true, true, true, true],
    CONCATENATION: [true, true, true, true, true],
    CONV_2D: [true, true, true, true, true],
    DEPTHWISE_CONV_2D: [true, true, false, true, true],
    FULLY_CONNECTED: [true, true, true, true, true],
    MAX_POOL_2D: [true, true, true, true, true],
    MUL: [true, true, true, true, false],
    RESHAPE: [true, true, true, true, true],
    RESIZE_BILINEAR: [true, false, true, true, false],
    SOFTMAX: [true, true, true, true, true]
  }

  const nn = navigator.ml.getNeuralNetworkContext()
  const supportedOps = new Set()
  const backendId = backendEnums[getNativeAPI(prefer)]
  for (const opName in supportedTable) {
    if (supportedTable[opName][backendId]) {
      supportedOps.add(nn[opName])
    }
  }
  return supportedOps
}

const operationTypes = {
  // Operation types.
  0: 'ADD',
  1: 'AVERAGE_POOL_2D',
  2: 'CONCATENATION',
  3: 'CONV_2D',
  4: 'DEPTHWISE_CONV_2D',
  5: 'DEPTH_TO_SPACE',
  6: 'DEQUANTIZE',
  7: 'EMBEDDING_LOOKUP',
  8: 'FLOOR',
  9: 'FULLY_CONNECTED',
  10: 'HASHTABLE_LOOKUP',
  11: 'L2_NORMALIZATION',
  12: 'L2_POOL_2D',
  13: 'LOCAL_RESPONSE_NORMALIZATION',
  14: 'LOGISTIC',
  15: 'LSH_PROJECTION',
  16: 'LSTM',
  17: 'MAX_POOL_2D',
  18: 'MUL',
  19: 'RELU',
  20: 'RELU1',
  21: 'RELU6',
  22: 'RESHAPE',
  23: 'RESIZE_BILINEAR',
  24: 'RNN',
  25: 'SOFTMAX',
  26: 'SPACE_TO_DEPTH',
  27: 'SVDF',
  28: 'TANH',
  29: 'BATCH_TO_SPACE_ND',
  37: 'TRANSPOSE',
  65: 'MAXIMUM',
  10003: 'ATROUS_CONV_2D',
  10004: 'ATROUS_DEPTHWISE_CONV_2D'
}

const getUrlParams = prop => {
  const params = {}
  const search = decodeURIComponent(
    window.location.href.slice(window.location.href.indexOf('?') + 1)
  )
  const definitions = search.split('&')

  definitions.forEach((val, key) => {
    const parts = val.split('=', 2)
    params[parts[0]] = parts[1]
  })

  return prop && prop in params ? params[prop] : params
}

const getPreferParam = () => {
  // workaround for using MPS backend on Mac OS by visiting URL with 'prefer=sustained'
  // workaround for using BNNS backend on Mac OS by visiting URL with 'prefer=fast'
  // use 'sustained' as default for Mac OS
  let prefer = 'sustained'
  const parameterStr = window.location.search.substr(1)
  const reg = new RegExp('(^|&)prefer=([^&]*)(&|$)', 'i')
  const r = parameterStr.match(reg)
  if (r != null) {
    prefer = unescape(r[2])
    if (prefer !== 'fast' && prefer !== 'sustained') {
      prefer = 'invalid'
    }
  }

  return prefer
}

const getPrefer = backend => {
  const nn = navigator.ml.getNeuralNetworkContext()
  let prefer = nn.PREFER_FAST_SINGLE_ANSWER
  if (currentOS === 'Mac OS' && backend === 'WebML') {
    const urlPrefer = getPreferParam()
    if (urlPrefer === 'sustained') {
      prefer = nn.PREFER_SUSTAINED_SPEED
    } else if (urlPrefer === 'fast') {
      prefer = nn.PREFER_FAST_SINGLE_ANSWER
    }
  }
  return prefer
}

const getPreferCode = (backend, prefer) => {
  let preferCode
  const nn = navigator.ml.getNeuralNetworkContext()
  if (prefer === 'sustained') {
    preferCode = nn.PREFER_SUSTAINED_SPEED
  } else if (prefer === 'fast') {
    preferCode = nn.PREFER_FAST_SINGLE_ANSWER
  } else if (prefer === 'low') {
    preferCode = nn.PREFER_LOW_POWER
  } else {
    preferCode = nn.PREFER_FAST_SINGLE_ANSWER
  }
  return preferCode
}

const getSearchParamsPrefer = () => {
  const searchParams = new URLSearchParams(location.search)
  return searchParams.has('prefer') ? searchParams.get('prefer') : ''
}

const getSearchParamsBackend = () => {
  const searchParams = new URLSearchParams(location.search)
  return searchParams.has('b') ? searchParams.get('b') : ''
}
const getSearchParamsModel = () => {
  const searchParams = new URLSearchParams(location.search)
  if (searchParams.has('m') && searchParams.has('t')) {
    return searchParams.get('m') + '_' + searchParams.get('t')
  } else {
    return ''
  }
}
