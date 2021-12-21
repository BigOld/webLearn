## CommonJs模块化教程
#### 1.编写自定义模块

  * module1.js
    ```js
    //使用module.exports暴露一个加法函数
    module.exports = function increment(a,b){
    	console.log(a+b);
    }
    ```
    
  * module2.js
    ```js
    //使用exports.xxxx暴露一个减法函数、再暴露一个乘法函数
    exports.decrement = function (a,b){
    	console.log(a-b);
    } 
    exports.mul = function (a,b){
    	console.log(a*b);
    } 
    ```
    
  * module3.js
    ```js
    //使用module.exports暴露一个对象
    module.exports = {
    	data:'atguigu',
    	demo(){
    		console.log('module3---demo1');
    	}
    }
    ```
#### 2.下载第三方模块

- 执行命令：

  ```
  npm i uniq
  ```

#### 3.主文件引入模块

  - app.js 

    ```js
    const module1 = require('./module1')
    const module2 = require('./module2')
    const {data,demo} = require('./module3')
    const uniq = require('uniq')
    
    module1(1,2)
    module2.decrement(3,4)
    module2.mul(5,6)
    demo()
    console.log(data);
    const result = uniq([1,2,3,4,4,4,3,5,8,8,9,7,6,10,11])
    console.log(result);
    ```

#### 4.运行app.js

  1. 【在Node环境下运行】，直接使用命令: 

      ```
      node app.js
      ```

  2. 【在浏览器环境下运行】，需要如下操作：
      * 全局安装Browserify

        ```
        npm install browserify -g
        ```

      * 编译指定文件

        ```
        browserify a.js -o build.js 
        ```

      * html页面中引入build.js 