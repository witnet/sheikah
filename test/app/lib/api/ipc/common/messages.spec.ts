import * as IPCMessages from "app/lib/api/ipc/common/messages"
import * as fixtures from "./messagesFixtures"

describe(`IPCMessages lib: validate valid channel messages" +
  " (${fixtures.channelMessages.valid.length} test vectors)`, () => {
  fixtures.channelMessages.valid.forEach((item, index) => {
    it(`should validate channel message (${index + 1})`, () => {
      const validated = IPCMessages.isChannelMsg(item) && IPCMessages.isValidChannelMsg(item)
      expect(validated).toBe(true)
    })
  })
})

describe(`IPCMessages lib: not validate invalid channel messages" +
  " (${fixtures.channelMessages.invalid.length} test vectors)`, () => {
  fixtures.channelMessages.invalid.forEach((item, index) => {
    it(`should not validate channel message (${index + 1})`, () => {
      const validated = IPCMessages.isChannelMsg(item) && IPCMessages.isValidChannelMsg(item)
      expect(validated).toBe(false)
    })
  })
})

describe(`IPCMessages lib: validate valid channel requests" +
  " (${fixtures.channelRequests.valid.length} test vectors)`, () => {
  fixtures.channelRequests.valid.forEach((item, index) => {
    it(`should validate channel request (${index + 1})`, () => {
      const validated = IPCMessages.isValidChannelReq(item)
      expect(validated).toBe(true)
    })
  })
})

describe(`IPCMessages lib: not validate invalid channel requests" +
  " (${fixtures.channelRequests.invalid.length} test vectors)`, () => {
  fixtures.channelRequests.invalid.forEach((item, index) => {
    it(`should not validate channel request (${index + 1})`, () => {
      const validated = IPCMessages.isValidChannelReq(item)
      expect(validated).toBe(false)
    })
  })
})

describe(`IPCMessages lib: validate valid successful channel responses" +
  " (${fixtures.successChannelResponses.valid.length} test vectors)`, () => {
  fixtures.successChannelResponses.valid.forEach((item, index) => {
    it(`should validate successful channel response (${index + 1})`, () => {
      const validated = IPCMessages.isValidChannelRes(item)
      expect(validated).toBe(true)
    })
  })
})

describe(`IPCMessages lib: not validate invalid successful channel responses" +
  " (${fixtures.successChannelResponses.invalid.length} test vectors)`, () => {
  fixtures.successChannelResponses.invalid.forEach((item, index) => {
    it(`should not validate successful channel response (${index + 1})`, () => {
      const validated = IPCMessages.isValidChannelRes(item)
      expect(validated).toBe(false)
    })
  })
})

describe(`IPCMessages lib: validate valid error channel responses" +
  " (${fixtures.errorChannelResponses.valid.length} test vectors)`, () => {
  fixtures.errorChannelResponses.valid.forEach((item, index) => {
    it(`should validate error channel response (${index + 1})`, () => {
      const validated = IPCMessages.isValidChannelRes(item)
      expect(validated).toBe(true)
    })
  })
})

describe(`IPCMessages lib: not validate invalid error channel responses" +
  " (${fixtures.errorChannelResponses.invalid.length} test vectors)`, () => {
  fixtures.errorChannelResponses.invalid.forEach((item, index) => {
    it(`should not validate error channel response (${index + 1})`, () => {
      const validated = IPCMessages.isValidChannelRes(item)
      expect(validated).toBe(false)
    })
  })
})

describe(`IPCMessages lib: function to create channel requests`, () => {
  it(`should create valid channel requests`, () => {
    const channelReq = IPCMessages.buildChannelReq(1, "test-msg", "test")
    expect(IPCMessages.isChannelReq(channelReq) &&
      IPCMessages.isValidChannelReq(channelReq)).toBe(true)
  })
})

describe(`IPCMessages lib: function to create successful channel responses`, () => {
  it(`should create valid successful channel responses`, () => {
    const successChannelRes = IPCMessages.buildSuccessChannelRes(1, "test-msg", "test")
    expect(IPCMessages.isSuccessChannelRes(successChannelRes) &&
      IPCMessages.isValidChannelRes(successChannelRes)).toBe(true)
  })
})

describe(`IPCMessages lib: function to create error channel responses`, () => {
  it(`should create valid error channel responses`, () => {
    const errorChannelRes = IPCMessages.buildErrorChannelRes(1, "test-msg",
      IPCMessages.ChannelErrCode.ErrUnknownMethod, "test-desc")
    expect(IPCMessages.isErrorChannelRes(errorChannelRes) &&
      IPCMessages.isValidChannelRes(errorChannelRes)).toBe(true)
  })
})
