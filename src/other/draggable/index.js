// https://juejin.im/post/6855129007852093453

let dragging = false;
let position = null;

let dragging1 = false;
let position1 = null;

const xxx = document.getElementById("xxx");
const item = document.getElementById("item");

xxx.addEventListener("mousedown", (e) => {
  dragging = true;
  position = [e.clientX, e.clientY];
});

// 注意这里是document
document.addEventListener("mousemove", (e) => {
  if (!dragging) {
    return null;
  }
  const x = e.clientX;
  const y = e.clientY;

  const deltaX = x - position[0];
  const deltaY = y - position[1];

  const left = parseInt(xxx.style.left || 0);
  const top = parseInt(xxx.style.top || 0);

  xxx.style.left = left + deltaX + "px";
  xxx.style.top = top + deltaY + "px";

  position = [x, y];
});

document.addEventListener("mouseup", function (e) {
  dragging = false;
});

// --------------------------------------------------

// item.addEventListener("mousedown", (e) => {
//   dragging1 = true;
//   position1 = [e.clientX, e.clientY];
// });

// const wrapper = document.getElementsByClassName("wrapper")[0];
// const rect = wrapper.getBoundingClientRect();

// const { width: itemWidth, height: itemHeight } = item.getBoundingClientRect();

// // 注意这里是wrapper
// wrapper.addEventListener("mousemove", (e) => {
//   if (!dragging1) {
//     return null;
//   }
//   const x = e.clientX;
//   const y = e.clientY;

//   const deltaX = x - position1[0];
//   const deltaY = y - position1[1];

//   let left = parseInt(item.offsetLeft || 0);
//   let top = parseInt(item.offsetTop || 0);


//   const finalX = left + deltaX;
//   const finalY = top + deltaY;
//   console.log(finalX, finalY);
//   debugger

//   // 限制item在wrapper中
//   // if (left < rect.left) {
//   //   left = rect.left;
//   // } else if (left > rect.right - itemWidth) {
//   //   left = rect.right - itemWidth;
//   // }

//   // if (top < rect.top) {
//   //   top = rect.top;
//   // } else if (top > rect.top - itemHeight) {
//   //   top = rect.top - itemHeight;
//   // }

//   item.style.left = finalX + "px";
//   item.style.top = finalY + "px";

//   position = [x, y];

//   // e.stopPropagation();
// });

// wrapper.addEventListener("mouseup", (e) => {
//   dragging1 = false;
//   debugger
// });
