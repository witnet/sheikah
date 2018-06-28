/* tslint:disable:no-string-throw */
import { jsonSerializer as json } from "app/common/serializers"
import * as api from "app/renderer/api"
import { ipcRendererFactory } from "test/__stubs__/ipcRenderer"
import { jsonSerializer } from "test/__stubs__/serializers"

describe("api", () => {
  describe("defaultMessageHandler", () => {
    it("should error if message is not valid Json", async () => {
      return expect(api.defaultMessageHandler(json, "not valid json")).rejects.toBeTruthy()
    })

    it("should error if message is not valid Response", async () => {
      const message = JSON.stringify({
        someField: "some value"
      })

      return expect(api.defaultMessageHandler(json, message)).rejects.toBeTruthy()
    })

    it("should error if response is not successful", async () => {
      const message = JSON.stringify({
        jsonrpc: "2.0",
        id: "123",
        error: { code: -1, message: "Some error" }
      })

      return expect(api.defaultMessageHandler(json, message)).rejects.toBeTruthy()
    })

    it("should succeed if response is successful", async () => {
      const message = JSON.stringify({
        jsonrpc: "2.0",
        id: "123",
        result: 123
      })

      return expect(api.defaultMessageHandler(json, message)).resolves.toEqual(123)
    })
  })

  describe("client", () => {
    it("should be created with default options", () => {
      const client = new api.Client()

      expect(client.options).toBe(api.defaultOptions)
    })

    it("should let you override options", () => {
      const client = new api.Client().withOptions({ timeout: 123123 })

      expect(client.options.timeout).toBe(123123)
    })

    describe("request", () => {
      const messageHandler = jest.fn()
      messageHandler.mockResolvedValue("some response")

      const options = {
        ...api.defaultOptions,
        timeout: 0,
        idGen: () => "some generated id",
        json: jsonSerializer,
        ipc: ipcRendererFactory(),
        messageHandler
      }
      const client = new api.Client(options)

      it("should send the correct request", async () => {
        const expected = {
          jsonrpc: "2.0",
          id: "some generated id",
          method: "someMethod",
          params: [1, 2, 3]
        }
        await client.request("someMethod", 1, 2, 3)

        expect(messageHandler).toBeCalledWith(jsonSerializer, expected)
      })

      it("should timeout if server does not respond in time", async () => {
        const expected = {
          message: "[IPC Renderer] Client request someMethod timed out",
          name: "TimeoutError"
        }
        const options = {
          ipc: ipcRendererFactory({ fair: false })
        }
        const timeoutClient = client.withOptions(options)

        const error = await timeoutClient.request("someMethod").catch((e) => e)

        expect(error).toEqual(expected)
        expect(options.ipc.listener()).toBeUndefined()
      })

      it("should return value from server", async () => {
        const response = await client.request("someMethod")
        expect(response).toBe("some response")
      })

      it("should cleanup listeners on success", async () => {
        await client.request("someMethod")
        expect(options.ipc.listener()).toBeUndefined()
      })

      it("should cleanup listeners on error", async () => {
        const errorClient = client.withOptions({
          json: {
            ...jsonSerializer,
            async serialize(x: any) {
              throw "kaboom!"
            }
          }
        })

        const error = await errorClient.request("someMethod").catch((e) => e)

        expect(error).toBe("kaboom!")
        expect(options.ipc.listener()).toBeUndefined()
      })
    })

    describe("notify", () => {
      const messageHandler = jest.fn()
      messageHandler.mockResolvedValue(undefined)

      const options = {
        ...api.defaultOptions,
        timeout: 0,
        idGen: () => "some generated id",
        json: jsonSerializer,
        ipc: ipcRendererFactory(),
        messageHandler
      }
      const client = new api.Client(options)

      it("should send the correct notification", async () => {
        const expected = {
          jsonrpc: "2.0",
          method: "someMethod",
          params: [1, 2, 3]
        }
        const clientWithHandler = client.withOptions({
          ipc: ipcRendererFactory()
        })
        clientWithHandler.options.ipc.once("chan", messageHandler)
        await clientWithHandler.notify("someMethod", 1, 2, 3)

        expect(messageHandler).toBeCalledWith("event", expected)
      })

      it("should not wait for a response", async () => {
        await client.notify("someMethod")

        expect(options.ipc.listener()).toBeUndefined()
      })
    })
  })
})
