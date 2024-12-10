import { ref } from 'vue'

export function useSubmittingEffect() {
  const text = ref('') // タイプライタ用テキスト
  const showCursor = ref(true) // カーソルの点滅を制御

  const fullText = 'Submitting...'

  // タイプライタ用のテキスト生成
  const generateText = () => {
    fullText.split('').forEach((char, index) => {
      setTimeout(() => {
        text.value += char
      }, index * 100) // 各文字が100msごとに追加される
    })
  }

  // アニメーションスタート
  const startEffect = () => {
    generateText()
  }

  return { text, showCursor, startEffect }
}
