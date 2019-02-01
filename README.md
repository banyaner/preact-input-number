# **preact-input-number**

preact 11 位手机号码格式化(格式化为'xxx xxxx xxxx')组件。

# 一、使用

## 安装

```
npm install preact-input-number
```

### 引用到项目中

```
import { h, render, Component } from 'preact'
import InputNumber from 'preact-input-number'
import 'preact-input-number/lib/InputNumber.css' //默认的css，遵循BEM规范

class Main extends Component {
  constructor (props) {
    super(props)
  }

  dealNumberChange(e) {
    const detail = e.detail
    switch (detail.state) {
      // 刚满11位
      case 'EQUAL':
        console.log('11未')
        break
      //从11位时进行删除时
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
```

# 开发

## 热更新 demo

```bash
npm run dev
```

## 打包 demo

```bash
npm run build
```

# 发布到 npm

发布前先完成所有代码的 commit。然后执行

```
npm run publish
```

该命令会生成组件编译后的代码带 lib 文件夹，同时生成一个发版的 commit 和 tag 及更新 package.json 的版本（参考 standard-version）。然后推送到 npm 上

# 二、 功能介绍

## eslint+prettier

1. 使用 prettier 格式化代码
2. 支持在热加载页面上显示 eslint 结果
   如果要取消在页面显示 eslint 结果，方法：
   ```js
   // webpack.dev.js
   ...
       devServer: {
       overlay: false,
       hot: true, // Tell the dev-server we're using HMR
       ...
   },
   ...
   ```
3. 自定义规则添加在 .eslintrc.js 的'rules'中，不建议修改

### 关于 prettier 的几点说明

1. eslint 配合 prettier 时无法格式化 css 文件

单独使用 prettier 时是可以的。个人认为是插件写的有问题。
所以，目前 css 的格式化请通过编辑器集成的 prettier 来实现，或者集成其他工具。倾向于前者。
[在 webstorm 设置 prettier 的方法](https://prettier.io/docs/en/webstorm.html)

2. prietter 格式化的范围

- prettier 可以格式化如下文件：
- JavaScript, including ES2017
- JSX
- Angular
- Vue
- Flow
- TypeScript
- CSS, Less, and SCSS
- HTML
- JSON
- GraphQL
- Markdown, including GFM and MDX
- YAML
  所以，强烈建议折佣 webstorm 配置 prettier，更好的格式化你的代码。

## proxy

如果你的页面请求接口时涉及到跨域，可以使用接口 proxy 来设置接口转发。
设置方法：
package.json 中的 proxy 字段

例如，如下这个配置会将对"/api/users"接口的房网重定向到http://t.c.m.163.com/api/users。
[查看更多配置方法](https://webpack.js.org/configuration/dev-server/#devserver)。

```js
{
  "proxy": {
    "/api/users": {
      "target": "http://t.c.m.163.com"
    }
  }
  ...
}

```
