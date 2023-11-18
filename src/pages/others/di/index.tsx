import "reflect-metadata";

const testReflectMetadata = () => {
  class C {
    @Reflect.metadata("aaa", { aaa: "test" })
    method() {
    }
  }

  let obj = new C();
  let metadataValue = Reflect.getMetadata("aaa", obj, "method");

  console.log("metadataValue", metadataValue)
}







const DIDecorator = () => {

  testReflectMetadata()

  return <div>
    {/* <div>
      <select id="version_select" value="ByHandle">
        <option value="ByHandle">ByHandle</option>
        <option value="ContainerV1">ContainerV1</option>
        <option value="ContainerV2">ContainerV2</option>
        <option value="ContainerV2_Factory">ContainerV2_Factory</option>
        <option value="ContainerV2_Abstract">ContainerV2_Abstract</option>
        <option value="ContainerV2_Lazy">ContainerV2_Lazy</option>
        <option value="Family_Error">Family_Error</option>
        <option value="Family_Abstract">Family_Abstract</option>
        <option value="Family_Lazy">Family_Lazy</option>
      </select>
      <select id="weekday_select" value="7">
        <option value="1">星期一</option>
        <option value="2">星期二</option>
        <option value="3">星期三</option>
        <option value="4">星期四</option>
        <option value="5">星期五</option>
        <option value="6">星期六</option>
        <option value="7">星期七</option>
      </select>
    </div>
    <p>
      <button id="student_btn">上学</button>
    </p>
    <p>
      <span id="weekday_status">On Monday:</span>
      <span id="student_result"></span>
    </p> */}
  </div>
}


export default DIDecorator

