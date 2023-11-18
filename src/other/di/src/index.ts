import "reflect-metadata";
import { ContainerV1,ContainerV2 } from "../di";
import {
  Student
} from "../others/students";


const testReflectMetadata = document.getElementById("testReflectMetadata")!
const testContainerV1 = document.getElementById("testContainerV1")!
const testContainerV2 = document.getElementById("testContainerV2")!


testReflectMetadata.addEventListener("click", () => {
  class C {
    @Reflect.metadata("aaa", { aaa: "test" })
    method() {
    }
  }

  let obj = new C();
  let metadataValue = Reflect.getMetadata("aaa", obj, "method");

  console.log("metadataValue", metadataValue)
})



testContainerV1.addEventListener("click", () => {
  const container = new ContainerV1();
  const student = container.resolve(Student);
  const res = student.gotoSchool();
  console.log(res)
})

testContainerV2.addEventListener("click", () => {
  const container = new ContainerV2();
  container.register({
    token: Transportation,
    useClass: Bicycle
  });
  const student = container.resolve(Student);
  return student.gotoSchool();
})
