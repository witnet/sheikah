import * as IPCCommon from "app/lib/api/ipc/ipcCommon"
import * as fixtures from "./ipcCommonFixtures"

describe(`IPCCommon lib: validate valid method descriptors" +
  " (${fixtures.methodDescs.valid.length} test vectors)`, () => {
  fixtures.methodDescs.valid.forEach((item, index) => {
    it(`should validate method desc (${index + 1})`, () => {
      const validated = IPCCommon.isValidMethodDesc(item)
      expect(validated).toBe(true)
    })
  })
})

describe(`IPCCommon lib: not validate invalid method descriptors" +
  " (${fixtures.methodDescs.invalid.length} test vectors)`, () => {
  fixtures.methodDescs.invalid.forEach((item, index) => {
    it(`should not validate method desc (${index + 1})`, () => {
      const validated = IPCCommon.isValidMethodDesc(item)
      expect(validated).toBe(false)
    })
  })
})

describe(`IPCCommon lib: validate valid chan messages" +
  " (${fixtures.chanMessages.valid.length} test vectors)`, () => {
  fixtures.chanMessages.valid.forEach((item, index) => {
    it(`should validate chan message (${index + 1})`, () => {
      const validated = IPCCommon.isValidChanMessage(item)
      expect(validated).toBe(true)
    })
  })
})

describe(`IPCCommon lib: not validate invalid chan messages" +
  " (${fixtures.chanMessages.invalid.length} test vectors)`, () => {
  fixtures.chanMessages.invalid.forEach((item, index) => {
    it(`should not validate chan message (${index + 1})`, () => {
      const validated = IPCCommon.isValidChanMessage(item)
      expect(validated).toBe(false)
    })
  })
})

describe(`IPCCommon lib: validate valid chan requests" +
  " (${fixtures.chanRequests.valid.length} test vectors)`, () => {
  fixtures.chanRequests.valid.forEach((item, index) => {
    it(`should validate chan message (${index + 1})`, () => {
      const validated = IPCCommon.isValidChanRequest(item)
      expect(validated).toBe(true)
    })
  })
})

describe(`IPCCommon lib: not validate invalid chan requests" +
  " (${fixtures.chanRequests.invalid.length} test vectors)`, () => {
  fixtures.chanRequests.invalid.forEach((item, index) => {
    it(`should not validate chan message (${index + 1})`, () => {
      const validated = IPCCommon.isValidChanRequest(item)
      expect(validated).toBe(false)
    })
  })
})

describe(`IPCCommon lib: validate valid chan responses" +
  " (${fixtures.chanResponses.valid.length} test vectors)`, () => {
  fixtures.chanResponses.valid.forEach((item, index) => {
    it(`should validate chan message (${index + 1})`, () => {
      const validated = IPCCommon.isValidChanResponse(item)
      expect(validated).toBe(true)
    })
  })
})

describe(`IPCCommon lib: not validate invalid chan responses" +
  " (${fixtures.chanResponses.invalid.length} test vectors)`, () => {
  fixtures.chanResponses.invalid.forEach((item, index) => {
    it(`should not validate chan message (${index + 1})`, () => {
      const validated = IPCCommon.isValidChanResponse(item)
      expect(validated).toBe(false)
    })
  })
})

describe(`IPCCommon lib: convert imported handlers to map`, () => {
  it("should convert imported handlers to map in the expected format", () => {
    const methods = IPCCommon.getIPCMethodDescs(fixtures.importedIPCMethods)
    expect(methods).toMatchObject(fixtures.exportedIPCMethods)
  })
})