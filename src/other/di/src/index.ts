

document.querySelector("#testReflectMetadata")?.addEventListener("click", () => {
  class C {
    @Reflect.metadata("aaa", { aaa: "test" })
    method() {
    }
  }

  let obj = new C();
  let metadataValue = Reflect.getMetadata("aaa", obj, "method");

  console.log("metadataValue", metadataValue)
})
