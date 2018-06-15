import * as IPCFrontend from "app/lib/api/ipc/frontend/ipcFrontend"
import {mockedIpcRenderer} from "app/lib/api/ipc/frontend/mockedIpcRenderer"

describe(`IPCFrontend lib: function to send async messages`, () => {
  mockedIpcRenderer.send = jest.fn()

  it(`should reject the promise after TO when no handlers are defined`, async () => {
    expect.assertions(1)

    return expect(IPCFrontend.sendAsyncRequest("test-msg", "test", mockedIpcRenderer, 0))
      .rejects.toBeInstanceOf(Error)
  })

  it(`should leave the pending requests map empty after TO`, async () => {
    expect.assertions(1)

    return expect(IPCFrontend.sendAsyncRequest("test-msg", "test", mockedIpcRenderer, 0)
      .catch((error) => IPCFrontend.getNumPendingRequests()))
      .resolves.toBe(0)
  })

  it(`should have called the ipc renderer send function`, () => {
    expect(mockedIpcRenderer.send).toHaveBeenCalledTimes(2)
  })
})
