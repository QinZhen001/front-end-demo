// 创建一个AudioWorklet处理器
class PCMProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const input = inputs[0] // 获取输入音频数据
    const output = outputs[0] // 获取输出音频数据
    console

    // console.log("input:", input.length)

    console.log("inputs1:", input[0])
    // console.log("inputs2:", input[0].length)
    // console.log("inputs3:", input[0].length)

    // console.log("inputs:", inputs)
    // console.log("outputs:", outputs)
    // for (let channel = 0; channel < input.length; ++channel) {
    //   const inputBuffer = input[channel] // 获取输入音频的每个通道
    //   const outputBuffer = output[channel] // 获取输出音频的每个通道
    //   for (let i = 0; i < inputBuffer.length; ++i) {
    //     // 处理PCM数据（此处示例为将PCM数据降低一半音量）
    //     outputBuffer[i] = inputBuffer[i] * 0.5
    //   }
    // }

    // this.port.postMessage({
    //   inputs,
    // })

    return true
  }
}

registerProcessor("pcm-processor", PCMProcessor)
