const cache = {}
let _num = 0

function getCacheFile(url) {
  if (cache[url]) {
    return cache[url]
  }
  return undefined
}

function setCacheFile(name, file) {
  cache[name] = file
}

// 耗时操作
async function downloadToFile(name) {
  console.log("downloadToFile 执行了 " + ++_num)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new File([], name))
    }, 3000)
  })
}

// async function downloadAndCache1(url) {
//   let file = getCacheFile(url);
//   if (!file) {
//     file = await downloadToFile(url);
//     setCacheFile(url, file);
//   }
//   return file;
// }

// // downloadToFile 会执行多次
// //（这样纸并不好，应该只执行一次downloadToFile，之后从cache中获取）
// downloadAndCache1("1111");
// downloadAndCache1("1111");
// downloadAndCache1("1111");
// downloadAndCache1("1111");
// downloadAndCache1("1111");

// ---------------------------------------------------------

const semaphore = new Semaphore()

async function downloadAndCache2(url) {
  await semaphore.acquire(url)

  // This block continues once a lock on url is acquired.
  // multiple simulataneous downloads for unique url values.
  let file = getCacheFile(url)
  try {
    if (!file) {
      file = await downloadToFile(url)
      setCacheFile(url, file)
    }
  } catch (err) {
    console.error(err)
  } finally {
    semaphore.release(url)
  }

  return file
}

// 只执行一次downloadToFile，之后从cache中获取
downloadAndCache2("1111")
downloadAndCache2("1111")
downloadAndCache2("1111")
downloadAndCache2("1111")
downloadAndCache2("1111")
