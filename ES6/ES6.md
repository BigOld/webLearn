## ES6

### let

* 没有<span style="color:red">变量提升</span>的问题
* 不允许重复声明
* 块作用域
* 不影响作用域链

```javascript
function fn(){
	let dance = '精武门';
		function b(){
      console.log(dance);
    }
  b();
}
fn();
```

### const

* 声明的时候一定要赋初始值
* 常量的名称一般为 『大写』  潜规则
* 不能修改常量的值
* 不允许重复声明
* 块儿级作用域(同let)
* 可以修改数组和对象等引用类型的元素

> 变量可有用let，引用类型用count声明

### 解构赋值

### 模板字符串(反引号)

### 对象的简化写法

```javascript
let name = '尚硅谷';
let pos = '北京';
let change = function(){
  console.log('改变');
}

const atguigu = {
  name,
  pos,
  change,
  improve(){
  	console.log('提升');
  }
}
```

### 箭头函数

* 不能使用arguments
* this的值为静态的
* 简写
  * 形参有且只有一个，不用谢小括号
  * 当代码只有一条语句的时候不用写花括号，return 也不能写

### 参数默认值

```javascript
// 与解构赋值结合使用   结构赋值的形式先后顺序不影响
function connect({host="127.0.0.1", port, pass, dbname}){
  console.log(host);
  console.log(port);
  console.log(pass);
  console.log(dbname);
}

connect({
  port: 27017,
  pass: 'root',
  dbname: 'project'
});
```

### rest参数 （代替arguments）

```javascript
function main(...args){
  //1. 使用 arguments 获取实参
  console.log(arguments); // {}
  //2. rest 参数
  console.log(args); // [1,5,10,20,25]
}
main(1,5,10,20,25)
function fn(a,b,...args){ // args 放到最后
  console.log(a);
  console.log(b);
  console.log(args);
}
fn(1,2,3,4,5,6,7);
```

> 参数个数不确定

### 扩展运算符（...）

> Rest参数的逆运算，rest将参数变成一个数组
>
> 可以展开实现Iterator接口的数据

```javascript
// 应用
// 1. 数组合并
const kuaizi = ['肖央','王太利'];
const chuanqi = ['曾毅','玲花'];
const zuhe = [...kuaizi, ...chuanqi]

// 2.新数组克隆
const jinhua = ['e','g','m'];//
const s = [...jinhua,'x','y','z'];
console.log(s);

// 3.将伪数组转为真正的数组
const divs = document.querySelectorAll('div'); // 类型为nodelist
const result = [...divs];
```

### Synbol、迭代器

```javascript
for(let v of s2){
	console.log(v);
}
```



面向对象思想

### Set、Map

> 支持迭代器iterator遍历

```javascript
const s2 = new Set([1,5,9,13,17,1,5]) // 去重
```

### 对象

Class

* 构造方法不是必须的constructor
* 构造方法只能有一个

> 静态成员属于类而不属于实例对象

#### 对象的扩展

```javascript
//1. 判断两个值是否完全相等  ===  Object.is
let n = 100;
let n2 = 200;
console.log(Object.is(n, n2));
console.log(Object.is(NaN, NaN));// NaN === NaN 只能用is
//2. Object.assign 对象的合并
// 重名直接覆盖前面的属性
const A = {
  name: 'ATGUIGU'
}

const B = {
  pos: ["北京",'上海','深圳'],
  name: '尚硅谷'
}

const C = {
  name: 'at-guigu'
}

const res = Object.assign(A, B, C);
console.log(res === A); // true 添加到A对象上
console.log(A);
```

### 浅拷贝深拷贝（面试）

#### 浅拷贝

对于数组中的对象元素都是浅拷贝

* concat
* slice
* 扩展运算符

```javascript
let arr = [{name:'atguigu'},2,3,4];
let newArr = [...arr];
newArr[0].name = '尚硅谷';
console.log(arr)
console.log(newArr)
```

对象

```javascript
const school = {
  name: "尚硅谷",
  pos: ['北京','上海','深圳']
}

const newSchool = Object.assign({}, school);

// newSchool.name = 'atguigu';
newSchool.pos[0] = 'beijing';

console.log(school);
console.log(newSchool);
```

#### 深拷贝

1. 用JSON实现 `JSON.stringify()` 和`JSON.parse()` 
   * 但是不能复制方法
2. 递归实现

```javascript
function deepClone(data){
  //创建一个容器  typeof
  // console.log(typeof data);
  let container;
  //判断
  let type = getDataType(data);// Object Array
  if(type === 'Object'){
    container = {};
  }
  if(type === 'Array'){
    container = [];
  }
  //遍历数据  for...in
  for(let i in data){
    //获取键值的类型
    let type = getDataType(data[i]);// Array
    //判断
    if(type === 'Array' || type==='Object'){
      //????  递归调用 deepClone 即可
      container[i] = deepClone(data[i]);
    }else{
      //如果键值为非引用类型数据  则『直接复制』
      container[i] = data[i];
    }
  }
  //container
  return container;
}

//待克隆的数据
const school = {
  name: '尚硅谷',
  pos: ['北京','上海','深圳'],
  founder: {
    name: '刚哥'
  },
  change: function(){
    console.log('改变');
  }
}
//调用函数完成深拷贝
const newSchool = deepClone(school);

newSchool.pos[0] = 'beijing';
console.log(school);
console.log(newSchool);



//封装一个函数 用来获取数据的类型
function getDataType(data){
  return Object.prototype.toString.call(data).slice(8, -1);
}
```



