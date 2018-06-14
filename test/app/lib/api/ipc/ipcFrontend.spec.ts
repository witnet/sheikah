import * as IPCCommon from "app/lib/api/ipc/ipcCommon"
import * as IPCFrontend from "app/lib/api/ipc/ipcFrontend"
import {MockedIpcRenderer} from "../../../../../app/lib/api/ipc/mockedIpcRenderer"

describe(`IPCFrontend lib: function to create chan requests`, () => {
  it(`should create valid chan requests`, () => {
    const chanRequest: IPCCommon.ChanRequest = IPCFrontend.buildChanRequest("test-msg", "test")
    expect(IPCCommon.isValidChanRequest(chanRequest)).toBe(true)
  })
})

describe(`IPCFrontend lib: function to send async messages`, () => {
  MockedIpcRenderer.send = jest.fn()

  it(`should reject the promise after TO when no handlers are defined`, async () => {
    expect.assertions(1)

    return expect(IPCFrontend.sendAsyncRequest("test-msg", "test", MockedIpcRenderer, 0))
      .rejects.toBeInstanceOf(Error)
  })

  it(`should leave the pending requests map empty after TO`, async () => {
    expect.assertions(1)

    return expect(IPCFrontend.sendAsyncRequest("test-msg", "test", MockedIpcRenderer, 0)
      .catch((error) => IPCFrontend.getNumPendingRequests()))
      .resolves.toBe(0)
  })

  it(`should have called the ipc renderer send function`, () => {
    expect(MockedIpcRenderer.send).toHaveBeenCalledTimes(2)
  })
})
