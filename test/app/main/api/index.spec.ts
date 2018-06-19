import * as api from "app/main/api"
import {syntheticEvent} from "test/__stubs__/event"

const system = {
  json: {
    encode: async (v: any) => JSON.stringify(v),
    decode: async (m: string) => JSON.parse(m)
  }
}

describe("API", () => {
  describe("asyncListenerFactory", () => {
    it("should return a handler", () => {
      expect(api.asyncListenerFactory(system, {})).toBeInstanceOf(Function)
    })

    describe("handler", () => {
      it("should pass the system and message as params to the handler", async () => {
        const handlerMock = jest.fn()
        const routes = {"some channel": handlerMock}
        const handler = api.asyncListenerFactory(system, routes)
        const event = syntheticEvent()
        const data = {"some field": "some value"}
        const request = JSON.stringify({
          id: "some id",
          method: "some channel",
          data
        })

        await handler(event, request)

        expect(handlerMock.mock.calls.length).toBe(1)
        expect(handlerMock.mock.calls[0][0]).toMatchObject(system)
        expect(handlerMock.mock.calls[0][1]).toMatchObject(data)
      })
    })

    it("should call event.sender.send with the data returned by the handler", async () => {
      const send = jest.fn()
      const routes = {"some channel": async () => "some response"}
      const handler = api.asyncListenerFactory(system, routes)
      const event = syntheticEvent({send})

      const request = JSON.stringify({
        id: "some id",
        method: "some channel",
        data: {}
      })

      await handler(event, request)

      expect(send.mock.calls.length).toBe(1)
      expect(JSON.parse(send.mock.calls[0][0]).data).toBe("some response")
    })

    it("should call event.sender.send with the meta taken from the request", async () => {
      const send = jest.fn()
      const routes = {"some channel": async () => "some response"}
      const handler = api.asyncListenerFactory(system, routes)
      const event = syntheticEvent({send})

      const request = JSON.stringify({
        id: "some id",
        method: "some channel",
        data: {}
      })
      const expected = {id: "some id", method: "some channel"}

      await handler(event, request)

      expect(send.mock.calls.length).toBe(1)
      expect(JSON.parse(send.mock.calls[0][0]).meta).toEqual(expected)
    })
  })
})
