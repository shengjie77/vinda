import * as faker from 'faker'
import { Cloneable, cloneProperty } from 'src/base/types'

class Value extends Cloneable {
  @cloneProperty()
  public val: number = 0
}

class Foo extends Cloneable {
  @cloneProperty()
  public numberProp: number = 0

  @cloneProperty()
  public boolProp: boolean = false

  @cloneProperty()
  public strProp: string = ''

  @cloneProperty()
  public cloneProp: Value = new Value()
}

describe('Cloneable', () => {
  test('number property', () => {
    const foo = new Foo()
    foo.numberProp = faker.datatype.number()

    const clonedFoo = foo.clone()

    expect(clonedFoo.numberProp).toBe(foo.numberProp)
  })

  test('boolean property', () => {
    const foo = new Foo()
    foo.boolProp = true

    const clonedFoo = foo.clone()

    expect(clonedFoo.boolProp).toBe(foo.boolProp)
  })

  test('string property', () => {
    const foo = new Foo()
    foo.strProp = faker.datatype.string(10)

    const clonedFoo = foo.clone()

    expect(clonedFoo.strProp).toBe(foo.strProp)
  })

  test('cloneable property', () => {
    const foo = new Foo()
    foo.cloneProp.val = faker.datatype.number()

    const clonedFoo = foo.clone()

    expect(clonedFoo.cloneProp.val).toBe(foo.cloneProp.val)
  })
})
