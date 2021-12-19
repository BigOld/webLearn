## Promise

### 基本使用

#### 重要语法

`new Promise(executor)`构造函数 <span style="color:red">executor函数会直接执行为同步任务</span>

`Promise.prototype.then`方法

#### 基本编码流程

1. 创建Promise的实例对象(pending状态), 传入executor函数

2. <span style="color:red">在executor中启动异步任务</span>（定时器、ajax请求）

3. 根据异步任务的结果，做不同处理：

​		3.1 如果异步任务成功了：

​          我们调用resolve(value), 让Promise实例对象状态变为成功(fulfilled),同时指定成功的value

​		3.2 如果异步任务失败了：

​           我们调用reject(reason), 让Promise实例对象状态变为失败(rejected),同时指定失败的reason

4. 通过then方法为Promise的实例指定成功、失败的回调函数，来获取成功的value、失败的reason

> 注意：then方法所指定的：成功的回调、失败的回调，都是异步的回调。

#### 关于状态的注意点

1. 三个状态
   * pending: 未确定的------初始状态
   * fulfilled: 成功的------调用resolve()后的状态
   * rejected: 失败的-------调用reject()后的状态
2. 两种状态改变
   * pending ==> fulfilled
   *  pending ==> rejected
3. <span style="color:red">状态只能改变一次！！</span>
4. 一个promise指定多个成功/失败回调函数, 都会调用吗? <span style="color:red">都会调用</span>
   * 是个队列，会都执行，不是覆盖

```js
p.then(
  (value)=>{console.log('成功了1',value);}, //成功的回调-异步
  (reason)=>{console.log('失败了1',reason);} //失败的回调-异步
)
p.then(
  (value)=>{console.log('成功了2',value);}, //成功的回调-异步
  (reason)=>{console.log('失败了2',reason);} //失败的回调-异步
)

```

### API

#### catch

catch 其实是then 的语法糖

```js
.catch(
	reason => console.log('失败了')
)
.then(
  undefined,
	reason => console.log('失败了')
)
```

#### resolve、reject

参数value的值可能是：(1) 非Promise值  (2) Promise值

* resolve用于快速返回一个状态为fulfilled或rejected的Promise实例对象
* reject用于快速返回一个状态必为rejected的Promise实例对象

```js
const p0 = Promise.reject(-100)
const p = Promise.resolve(p0)
p.then(
  value => {console.log('成功了',value);},
  reason => {console.log('失败了',reason);}
)

const p0 = Promise.resolve(100)
const p = Promise.reject(p0)
p.then(
  value => {console.log('成功了',value);},
  reason => {console.log('失败了',reason);}
)
```

### 难点

1. then方法会返回一个新的promise对象

   Promise实例.then()返回的是一个【新的Promise实例】，它的值和状态由什么决定?

    1.简单表达: 由then()所指定的回调函数执行的结果决定

    2.详细表达:

   ​	(1)如果then所指定的回调返回的是非Promise值a:

   ​		那么【新Promise实例】状态为：成功(fulfilled), 成功的value为a

   ​	(2)如果then所指定的回调返回的是一个Promise实例p:

   ​		那么【新Promise实例】的状态、值，都与p一致

   ​	(3)如果then所指定的回调抛出异常:

   ​		那么【新Promise实例】状态为rejected, reason为抛出的那个异常

```js
const p = new Promise((resolve,reject)=>{
  setTimeout(()=>{
  	resolve('a')
	},1000)
})

p.then(
  value => {console.log('成功了1',value); 
            return Promise.reject('a')},
  reason => {console.log('失败了1',reason);}
).then(
  value => {console.log('成功了2',value);return true},
  reason => {console.log('失败了2',reason); return 100}
).then(
  value => {console.log('成功了3',value);throw 900},
  reason => {console.log('失败了3',reason); return false}
).then(
  value => {console.log('成功了4',value);return -100},
  reason => {console.log('失败了4',reason);}
)
```



```js
const p = new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve(100)
		},1000)
	})
	const x = p.then(
		value => {console.log('成功了',value);},
		reason =>{console.log('失败了',reason);}
	)
	console.log('50', x);
console.log(p === x) // false
```

2. promise错误穿透
   1. 当使用promise的then链式调用时, 可以在最后用catch指定一个失败的回调,
   2. 前面任何操作出了错误, 都会传到最后失败的回调中处理了

```js
sendAjax('https://api.apiopen.top/getJoke2',{page:1})
.then(
  value => {
    console.log('第1次请求成功了',value);
    //发送第2次请求
    return sendAjax('https://api.apiopen.top/getJoke',{page:1})
  },
		)
.then(
  value => {
    console.log('第2次请求成功了',value);
    //发送第3次请求
    return sendAjax('https://api.apiopen.top/getJoke',{page:1},3)
  },
)
.then(
  value => {console.log('第3次请求成功了',value);},
)
.catch(
  reason => {console.log(reason);}
)
```



```js
//另一个例子演示错误的穿透
const p = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    reject(-100)
  },1000)
})
p.then(
  value => {console.log('成功了1',value);return 'b'},
  reason => {throw reason}//底层帮我们补上的这个失败的回调
)
  .then(
  value => {console.log('成功了2',value);return Promise.reject(-108)},
  reason => {throw reason}//底层帮我们补上的这个失败的回调
)
  .catch(
  reason => {throw reason}
)
```

### 优势

1. 指定回调函数的方式更加灵活: 

   * 旧的: 必须在启动异步任务前指定

   * promise: 启动异步任务 => 返回promie对象 => 给promise对象绑定回调函数(甚至可以在异步任务结束后指定)

2. 支持链式调用

## async await

1. async修饰的函数
   * 函数的返回值为promise对象
   * Promise实例的结果由async函数执行的返回值决定
2. await表达式
   * await右侧的表达式一般为Promise实例对象, 但也可以是其它的值
   * 如果表达式是Promise实例对象, await后的返回值是promise成功的值
   * 如果表达式是其它值, 直接将此值作为await的返回值

### 原理

若我们使用async配合await这种写法：

1. 表面上不出现任何的回调函数

2. 但实际上底层把我们写的代码进行了加工，把回调函数“还原”回来了。

3. 最终运行的代码是依然有回调的，只是程序员没有看见。

```js
async	function demo(){
  //程序员“轻松”的写法
  const result = await p
  console.log(result);
  console.log(100);
  console.log(200);

  //浏览器翻译后的代码
  /* p.then(
			result => {
				console.log(result);
				console.log(100);
				console.log(200);
			},
		) */

}
demo()
console.log(1); // 先输出1再输出demo中的回调
```

## 宏队列和微队列

promise 为微队列，微队列优先级高于宏队列

```js
setTimeout(()=>{
  console.log('timeout1')
  Promise.resolve(5).then(
  value => console.log('成功了5')
	)
})
setTimeout(()=>{
	console.log('timeout2')
})

Promise.resolve(3).then(
	value => console.log('成功了3')
)
Promise.resolve(4).then(
	value => console.log('失败了4')
)
```

## 面试题

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok')
  }, 1000) // 当1s之后才将定时器推向宏队列
})
p.then(
	value => console.log(value),
  reason => console.log(reason)
)
```

进队列的时机：当要执行条件满足的时候才被放进宏队列或者微队列

```js
setTimeout(() => {
  console.log("0")
}, 0)
new Promise((resolve, reject) => {
  console.log("1")
  resolve()
}).then(() => {
  console.log("2")
  new Promise((resolve, reject) => {
    console.log('3')
    resolve()
  }).then((resolve, reject) => {
    console.log('4')
  }).then((resolve, reject) => {
    console.log("5")
  })
}).then((resolve, reject) => {
  console.log("6")
})
new Promise((resolve, reject) => {
  console.log("7")
  resolve()
}).then(() => {
  console.log("8")
})
```

