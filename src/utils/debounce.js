export default function (fun, time) {
  // console.log('防抖',time)
  let timer = null
  return function () {
    if(timer) {
      // 清除计时器
      clearTimeout(timer)
      // 重新计时
      timer = setTimeout(fun, time)
    }
    timer = setTimeout(() =>{ // 箭头函数的this指向vue实例
      // console.log(this)
      // console.log(arguments)
      fun.apply(this,arguments) // 改变this指向，传参
      // fun(arguments)
    }, time)
  }
}