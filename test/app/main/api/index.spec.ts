import * as api from "app/main/api"
import { InvalidParamsError, ErrCodes, replyChannel } from "app/common/ipc-protocol"
import { syntheticEvent } from "test/__stubs__/event"

describe("API", () => {
  const system = {}

  describe("asyncListenerFactory", () => {
    it("should return a handler", () => {
      expect(api.asyncListenerFactory(system, {})).toBeInstanceOf(Function)
    })

    describe("handler", () => {
      it("should return an error if request json cannot be parsed", async () => {
        const senderMock = jest.fn()
        const asyncHandler = api.asyncListenerFactory(system, {})
        const event = syntheticEvent({ send: senderMock })
        const message = "invalid request"
        const expectedResponse = {
          error: { code: ErrCodes.ParseError },
        }

        await asyncHandler(event, message)

        expect(JSON.parse(senderMock.mock.calls[0][1])).toMatchObject(expectedResponse)
      })

      it("should return an error if request object is not valid", async () => {
        const senderMock = jest.fn()
        const asyncHandler = api.asyncListenerFactory(system, {})
        const event = syntheticEvent({ send: senderMock })
        const request = JSON.stringify({})
        const expectedResponse = {
          error: { code: ErrCodes.InvalidRequest },
        }

        await asyncHandler(event, request)

        expect(JSON.parse(senderMock.mock.calls[0][1])).toMatchObject(expectedResponse)
      })

      it("should return an error if request method has no handler", async () => {
        const senderMock = jest.fn()
        const asyncHandler = api.asyncListenerFactory(system, {})
        const event = syntheticEvent({ send: senderMock })
        const request = JSON.stringify({ jsonrpc: "2.0", method: "ping" })
        const expectedResponse = {
          error: { code: ErrCodes.MethodNotFound },
        }

        await asyncHandler(event, request)

        expect(JSON.parse(senderMock.mock.calls[0][1])).toMatchObject(expectedResponse)
      })

      it("should return an error if request params are not accepted by handler", async () => {
        const senderMock = jest.fn()
        const handler = async (sys: any, params: any) => {
          throw new InvalidParamsError("invalid params!")
        }
        const asyncHandler = api.asyncListenerFactory(system, { ping: handler })
        const event = syntheticEvent({ send: senderMock })
        const request = JSON.stringify({ jsonrpc: "2.0", method: "ping" })
        const expectedResponse = {
          error: { code: ErrCodes.InvalidParams },
        }

        await asyncHandler(event, request)

        expect(JSON.parse(senderMock.mock.calls[0][1])).toMatchObject(expectedResponse)
      })

      it("should return an error if an Error occurs within handler", async () => {
        const senderMock = jest.fn()
        const handler = async (sys: any, params: any) => { throw new Error("kaboom!") }
        const asyncHandler = api.asyncListenerFactory(system, { ping: handler })
        const event = syntheticEvent({ send: senderMock })
        const request = JSON.stringify({ jsonrpc: "2.0", method: "ping" })
        const expectedResponse = {
          error: { code: ErrCodes.InternalError },
        }

        await asyncHandler(event, request)

        expect(JSON.parse(senderMock.mock.calls[0][1])).toMatchObject(expectedResponse)
      })

      it("should call the handler and send response using sender.send", async () => {
        const handlerMock = jest.fn()
        const senderMock = jest.fn()
        const routes = { sum: handlerMock }
        const asyncHandler = api.asyncListenerFactory(system, routes)
        const event = syntheticEvent({ send: senderMock })
        const request = JSON.stringify({
          jsonrpc: "2.0",
          id: "some id",
          method: "sum",
          params: [1, 2, 3],
        })
        const expectedResponse = {
          jsonrpc: "2.0",
          id: "some id",
          result: null,
        }

        await asyncHandler(event, request)

        expect(senderMock).toBeCalledWith(
          replyChannel(expectedResponse.id),
          JSON.stringify(expectedResponse)
        )
        expect(handlerMock).toBeCalledWith(system, [1, 2, 3])
      })
    })
  })
})
