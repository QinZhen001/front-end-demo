## 前端监控页面崩溃

[http://jasonjl.me/blog/2015/06/21/taking-action-on-browser-crashes/](http://jasonjl.me/blog/2015/06/21/taking-action-on-browser-crashes/)



在网页 onload 事件设置一个 pending 状态，beforeunload 事件下改变这个 pending 状态为 exit，如果二次访问这个页面，onload 里获取的状态是 pending,则判断网页上一次发生 Crash，否则为正常关闭。

但是这个状态存在 sessionStorage 里面合适吗？如果用户关闭了页面，sessionStorage 值就会丢失。



------



**心跳检测**的方式实现：



1. 页面 B 每 5S 给自己的 Service Worker 发送一次心跳，记录一个状态 running 并更新时间戳。正常关闭的时候通知 Service Worker 清除这个状态。
2. 如果网页 Crash 了，running 将不会被清除，且时间戳也不会再更新。Service Worker 每 10s 查看一遍时间戳，如果发现“状态是 running 且 时间戳有一段时间未更新了”，则说明这个网页 B 发生崩溃了。











### 在Chrome上模拟崩溃

1. 转到您要崩溃的页面
2. 将此粘贴到您的网址“ chrome://crash”中
3. 按Enter

 