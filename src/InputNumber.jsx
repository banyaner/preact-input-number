import Preact, { h, render, Component } from 'preact'
import './utils/raf-polyfill.js'

const PHONE_NUMBER_LENGTH = 11
export default class InputNumber extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formattedNumber: '' // 格式化后的号码
    }
    this.$input = Preact.createRef()
  }

  componentDidMount() {
    this.$input.current.addEventListener(
      'inputState',
      this.props.dealInputStateChange
    )
  }

  setCursorPosition = (elem, index, index_delta) => {
    const val = elem.value
    const len = val.length

    // 超过文本长度直接返回
    if (len < index) return
    index += index_delta
    elem.focus()
    window.requestAnimationFrame(() => {
      if (elem.setSelectionRange) {
        // 标准浏览器
        elem.setSelectionRange(index, index)
      } else {
        // IE9-
        const range = elem.createTextRange()
        range.moveStart('character', -len)
        range.moveEnd('character', -len)
        range.moveStart('character', index)
        range.moveEnd('character', 0)
        range.select()
      }
    })
  }

  dealPhoneNumber = e => {
    const elem = e.target
    let cursorPosition = elem.selectionStart
    const lastPureNumber = this.state.formattedNumber.replace(/\s+/g, '')
    let currentInputVal = e.target.value
    let currentPureNumber = currentInputVal.replace(/\D/g, '')
    let currentFormattedNumber
    // 输入含有非字符时保持不变,删除空格时需要变
    if (currentPureNumber === lastPureNumber) {
      if (e.inputType === 'insertText') {
        e.target.value = this.state.formattedNumber
        // 重置光标位置
        this.setCursorPosition(elem, cursorPosition, -1)
        return
      }
      currentInputVal =
        currentInputVal.slice(0, cursorPosition - 1) +
        currentInputVal.slice(cursorPosition, currentPureNumber.length)
      currentPureNumber = currentInputVal.replace(/\D/g, '')
      cursorPosition = cursorPosition - 1
    }
    // 新的值长度不小于11位

    if (currentPureNumber.length >= PHONE_NUMBER_LENGTH) {
      if (currentPureNumber.length > PHONE_NUMBER_LENGTH) {
        currentPureNumber = currentPureNumber.slice(0, PHONE_NUMBER_LENGTH)
        if (currentPureNumber === lastPureNumber) {
          // 保持不变
          e.target.value = this.state.formattedNumber
          this.setCursorPosition(elem, cursorPosition, -1)
          return
        }
      }
      // 发出事件
      this.dispatchEvt(
        'inputState',
        {
          detail: {
            state: 'EQUAL',
            value: currentPureNumber,
            currentNumber: currentPureNumber,
            lastNumber: lastPureNumber
          }
        },
        elem
      )
    } else if (lastPureNumber.length === PHONE_NUMBER_LENGTH) {
      // 上一次为11位
      this.dispatchEvt(
        'inputState',
        {
          detail: {
            state: 'REDUCE_FIRST',
            currentNumber: currentPureNumber,
            lastNumber: lastPureNumber
          }
        },
        elem
      )
    } else {
      // 不超过11位的输入删除
      this.dispatchEvt(
        'inputState',
        {
          detail: {
            state: 'NORMAL',
            currentNumber: currentPureNumber,
            lastNumber: lastPureNumber
          }
        },
        elem
      )
    }
    // 格式化输入 & 更新光标
    currentFormattedNumber = this.formatPhone(currentPureNumber)
    this.setState({
      formattedNumber: currentFormattedNumber
    })

    // 定位光标位置

    let index_delta = 0

    if (currentInputVal[cursorPosition - 1] == ' ') {
      // 删除时遇到空格，光标自动前进
      index_delta = -1
    } else if (
      currentPureNumber.length - lastPureNumber.length > 0 &&
      (cursorPosition === 4 || cursorPosition === 9)
    ) {
      index_delta = 1
    }
    this.setCursorPosition(e.target, cursorPosition, index_delta)
  }

  formatPhone = numberStr => {
    return numberStr
      .replace(/\s/g, '')
      .replace(/(^\d{3})(?=\d)/g, '$1 ')
      .replace(/(\d{4})(?=\d)/g, '$1 ')
  }

  dispatchEvt(name, data, elem) {
    elem.dispatchEvent(new CustomEvent(name, data))
  }

  clearNumber = () => {
    const lastPureNumber = this.state.formattedNumber.replace(/\s+/g, '')
    this.setState({
      formattedNumber: ''
    })
    if (lastPureNumber.length === PHONE_NUMBER_LENGTH) {
      this.dispatchEvt(
        'inputState',
        {
          detail: {
            state: 'REDUCE_FIRST',
            currentNumber: '',
            lastNumber: lastPureNumber
          }
        },
        this.$input.current
      )
    } else {
      this.dispatchEvt(
        'inputState',
        {
          detail: {
            state: 'NORMAL',
            currentNumber: '',
            lastNumber: lastPureNumber
          }
        },
        this.$input.current
      )
    }
  }

  render(props, state) {
    return (
      <div class="input-number input-number__wrap">
        <input
          type="tel"
          ref={this.$input}
          placeholder="请输入手机号码"
          onInput={this.dealPhoneNumber}
          autofocus
          value={state.formattedNumber}
        />
        <div
          className="input-number__clear-btn"
          onClick={this.clearNumber.bind(this)}
        />
      </div>
    )
  }
}
