/* eslint-disable*/

import { h, render, Component } from 'preact'
import './css/common.scss'
import InputNumber from '../../src/InputNumber'
import '../../src/InputNumber.scss'
//
// import '../../lib/InputNumber.css'
// import InputNumber from '../../lib/InputNumber'

class Main extends Component {
  constructor (props) {
    super(props)
  }

  dealNumberChange(e) {
    const detail = e.detail
    switch (detail.state) {
      // 满11位
      case 'EQUAL':
        console.log('11未')
        break
      //从11位删
      case 'REDUCE_FIRST':
        console.log('从11位删')
        break
      // 不足11位时的删减 NORMAL
      default:
        console.log('其他输入情况')
        break
    }
  }

  render (props, state) {
    return (
      <div id="app">
        <h1>preact-手机号码组件测试</h1>
        <InputNumber onclick={this.dealNumberChange.bind(this)}/>
      </div>
    )
  }
}

render(<Main/>, document.body, document.getElementById('root'))
