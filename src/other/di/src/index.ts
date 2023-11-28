import "reflect-metadata";
import { ContainerV1, ContainerV2 } from "../di";
import {
  Student,
  StudentWithAbstraction,
  StudentWithLazyInstance
} from "../others/students";
import {
  Bicycle,
  Car,
  Transportation,
  ITransportation
} from "../others/transportations";

const testReflectMetadata = document.getElementById("TestReflectMetadata")!
const testContainerV1 = document.getElementById("TestContainerV1")!
const testContainerV2 = document.getElementById("TestContainerV2")!
const containerV2_Factory = document.getElementById("ContainerV2_Factory")!
const containerV2_Abstract = document.getElementById("ContainerV2_Abstract")!
const containerV2_Lazy = document.getElementById("ContainerV2_Lazy")!

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
  const res = student.gotoSchool();
  console.log(res)
})


containerV2_Factory.addEventListener("click", () => {
  const container = new ContainerV2();
  let weekday = Math.round(Math.random() * 10);
  container.register({
    token: Transportation,
    useFactory: (c) => {
      console.log("containerV2: ", c)
      if (weekday > 5) {
        return c.resolve(Car);
      } else {
        return c.resolve(Bicycle);
      }
    }
  });
  const student = container.resolve(Student);
  const res = student.gotoSchool();
  console.log(res)
})


containerV2_Abstract.addEventListener("click", () => {
  const container = new ContainerV2();
  let weekday = Math.round(Math.random() * 10);
  container.register({
    token: ITransportation,
    useFactory: (c) => {
      if (weekday > 5) {
        return c.resolve(Car);
      } else {
        return c.resolve(Bicycle);
      }
    }
  });
  const student = container.resolve(StudentWithAbstraction);
  const res = student.gotoSchool();

  console.log(res)
})


containerV2_Lazy.addEventListener("click", () => {
  const container = new ContainerV2();
  let weekday = Math.round(Math.random() * 10);
  container.register({
    token: ITransportation,
    useFactory: (c) => {
      if (weekday > 5) {
        return c.resolve(Car);
      } else {
        return c.resolve(Bicycle);
      }
    }
  });
  const student = container.resolve(StudentWithLazyInstance);
  console.log("Log before gotoSchool");
  const res = student.gotoSchool();

  console.log(res)
})
