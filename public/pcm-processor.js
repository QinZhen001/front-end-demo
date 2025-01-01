// 创建一个AudioWorklet处理器
// ,处于AudioWorkletGlobalScope上下文中， 并且最后运行于Web Audio rending thread上

class PCMProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    // inputs    输入音频数据
    // outputs   输出音频数据
    // parameters  输入参数

    this.port.postMessage({
      inputs,
    })

    return true
  }
}

registerProcessor("pcm-processor", PCMProcessor)
