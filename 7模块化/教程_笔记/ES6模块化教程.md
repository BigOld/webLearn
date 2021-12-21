## ES6模块化教程
#### 1.编写自定义模块

- 建立文件结构：

  ```
  -src
  	-module1.js
  	-module2.js
  	-module3.js
  	-module4.js
  	-app.js
  ```

- module1.js，使用分别暴露

  ```js
  //module1中，我们使用【分别暴露】
  export const data = 'atguigu'
  export const msg = '你好，0826！'
  
  export function showData(){
  	console.log('我是module1中的showData函数',data);
  }
  
  export function showMsg(){
  	console.log('我是module1中的showMsg函数',msg);
  }
  ```

- module2.js，使用统一暴露

  ```js
  /* 
  	module1中，我们使用【统一暴露】
  */
  
  let arr = [1,3,5,7,9]
  let person = {name:'tom',age:18}
  
  function showArr(){
  	console.log('module2中的数组为：',arr);
  }
  function showPerson(){
  	console.log('module2中的人为：',person);
  }
  
  //统一暴露showArr、showPerson
  //export {showArr,showPerson}
  
  //统一暴露showArr、showPerson并重命名
  export {showArr as a,showPerson as b}
  
  ```

- module3.js，使用默认暴露

  ```js
  /* 
  	module3中，我们使用【默认暴露】
  */
  const schoolInfo = {
  	name:'尚硅谷',
  	address:'北七家镇-宏福科技园',
  	subject:'前端·大数据·java'
  }
  
  export default schoolInfo
  ```

- module4.js，各种暴露方式混用

  ```js
  /*
  * module4中各种暴露同时使用
  * */
  
  //分别暴露
  export let date = '2020年11月20日'
  export function showRandom() {
    console.log(Math.random);
  }
  
  //统一暴露
  let str = 'hello,atguigu'
  let dog = {name:'旺财',age:4}
  export {str,dog}
  
  //默认暴露
  export default ['刺激战场','穿越火线','王者农药']
  ```

#### 2.下载第三方模块

- 执行命令（以uniq为例）：

  ```
  npm i uniq
  ```

#### 3.主文件引入

- app.js引入各个模块

  ```js
  //在es6的模块化规范中，用哪一种方式引入，取决于用何种方式暴露的。
  
  //引入【分别暴露】的模块方法1
  import {data,msg,showData,showMsg} from './module1'
  
  //引入【分别暴露】的模块方法2
  import * as obj from './module1'
  
  //引入【统一暴露】的模块方法1
  import {showArr,showPerson} from './module2'
  
  //引入【统一暴露】的模块方法2
  import * as obj from './module2'
  
  //引入【默认暴露】的模块
  import module3 from './module3'
  
  //引入module4，module4里用了多种暴露的方式
  import games,{date,showRandom,str,dog} from './module4'
  
  //引入uniq第三方模块
  import uniq from 'uniq'
  ```

>`import { data,msg,showData,showMsg } from './module1'`这个<span style="color:red">不是解构赋值</span>
>
>`const { data } = obj` 才是

#### 4.准备相关依赖包（为编译代码做准备）

- 全局安装：babel-cli、Browserify，执行命令如下：

  ```
  npm install babel-cli browserify -g 
  ```

  * 局部安装：babel-preset-es2015

  ```
  npm install babel-preset-es2015
  ```
- 定义.babelrc文件 

  ```json
  {
    "presets": ["es2015"]
  }
  ```

#### 5.编译代码

  * 进入目录，使用Babel将ES6编译为ES5代码 : 

    ```
    babel ./src -d ./build
    ```

  * 继续使用Browserify编译上一步的js : 

    ```
    browserify ./build/app.js -o ./build/index.js
    ```
#### 6.页面中引入测试

```html
 <script type="text/javascript" src="./build/index.js"></script>
```

