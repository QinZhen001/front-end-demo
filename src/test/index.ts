
class A {
  aaa: string

  constructor() {
    this.aaa = "aaa"
  }
}


class B extends A {
  bbb: string
  constructor() {
    super()
    this.bbb = "bbb"
  }
}

const test = () => {}

class C extends test {}
