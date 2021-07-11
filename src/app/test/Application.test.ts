import { Application } from 'src/app/Application'

describe.skip('test', () => {
  test('cc', () => {
    const app = Application.create()
    expect(app instanceof Application).toBeTruthy()
  })
})
