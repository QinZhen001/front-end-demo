# curry
[https://juejin.im/post/5e37e16f51882526b9725011](https://juejin.im/post/5e37e16f51882526b9725011)


简单实现柯里化


```javascript
function volume(length, width, height) {
	return function(width) {
    	return function(height) {
         return length * width * height;
			}
	}
}
let len200 = volume(200);
len200(100)(200);
len200(150)(100);
len200(50)(80);
volume(100)(50)(60);
```


如上，通过实现一个len200函数我们统一处理长度为200的长方体的体积，这就实现了**参数复用**。






