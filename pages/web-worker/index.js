var i = 0;

function timedCount() {
  i = i + 1;

  console.log("window 对象为:", typeof window);
  console.log("global 对象为:", typeof global);
  console.log("self 对象为：", self);

  var root =
    (typeof window == "object" && window.window == window && window) ||
    (typeof global == "object" && global.global == global && globa0l);

  console.log("root", root);
  postMessage(i);
  setTimeout("timedCount()", 500);
}

timedCount();
