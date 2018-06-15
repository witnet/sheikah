import * as IPCMethods from "appCommon/methods"
import * as fixtures from "./methodsFixtures"

describe(`IPCMethods lib: validate valid method descriptors" +
  " (${fixtures.methodDescs.valid.length} test vectors)`, () => {
  fixtures.methodDescs.valid.forEach((item, index) => {
    it(`should validate method desc (${index + 1})`, () => {
      const validated = IPCMethods.isValidMethodDesc(item)
      expect(validated).toBe(true)
    })
  })
})

describe(`IPCMethods lib: not validate invalid method descriptors" +
  " (${fixtures.methodDescs.invalid.length} test vectors)`, () => {

  fixtures.methodDescs.invalid.forEach((item, index) => {
    it(`should not validate method desc (${index + 1})`, () => {
      const validated = IPCMethods.isValidMethodDesc(item)
      expect(validated).toBe(false)
    })
  })
})

describe(`IPCMethods lib: convert async imported handlers to map`, () => {
  it("should convert imported async handlers to map in the expected" +
    " format", () => {
    const methods = IPCMethods.getMethodDescs(fixtures.importedIPCMethods,
      IPCMethods.MethodType.Async)
    expect(methods).toMatchObject(fixtures.exportedAsyncIPCMethods)
  })
})

describe(`IPCMethods lib: convert sync imported handlers to map`, () => {
  it("should convert imported sync handlers to map in the expected format", () => {
    const methods = IPCMethods.getMethodDescs(fixtures.importedIPCMethods,
      IPCMethods.MethodType.Sync)
    expect(methods).toMatchObject(fixtures.exportedSyncIPCMethods)
  })
})