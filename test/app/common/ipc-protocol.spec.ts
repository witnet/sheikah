import * as ipc from "app/common/ipc-protocol"
import * as fixtures from "./ipc-protocol.fixtures"

describe("IPC Protocol", () => {
  describe("parseRequest", () => {
    fixtures.requests.valid.forEach((request, index: number) => {
      it(`should decode request in fixture: requests.valid[${index}]`, async () => {
        await expect(ipc.decodeRequest(request)).resolves.toEqual(request)
      })
    })

    fixtures.requests.invalid.forEach((request, index) => {
      it(`should not decode request in fixture: requests.invalid[${index}]`, async () => {
        await expect(ipc.decodeRequest(request)).rejects.toBeTruthy()
      })
    })
  })

  describe("decodeResponse", () => {
    fixtures.responses.valid.forEach((response, index) => {
      it(`should decode response in fixture: responses.valid[${index}]`, async () => {
        await expect(ipc.decodeResponse(response)).resolves.toEqual(response)
      })
    })

    fixtures.responses.invalid.forEach((response, index) => {
      it(`should not decode response for fixture: responses.invalid[${index}]`, async () => {
        await expect(ipc.decodeResponse(response)).rejects.toBeTruthy()
      })
    })
  })

  describe("request", () => {
    it("it should create a valid request", () => {
      const expected = {id: "an id", method: "a method", data: "some data"}
      expect(ipc.request("an id", "a method", "some data")).toEqual(expected)
    })
  })

  describe("okResponse", () => {
    it("it should create a valid successful response", () => {
      const expected = {status: "ok" , data: "some data"}
      expect(ipc.okResponse("some data")).toEqual(expected)
    })

    it("it should add the supplied metadata to the response", () => {
      const expected = {
        status: "ok",
        data: "some data",
        meta: {"some field": "some value"}
      }
      expect(ipc.okResponse("some data", {"some field": "some value"})).toEqual(expected)
    })
  })

  describe("errorResponse", () => {
    it("it should create a valid unsuccessful response", () => {
      const expected = {status: "error", data: "some data"}
      expect(ipc.errorResponse("some data")).toEqual(expected)
    })

    it("it should add the supplied metadata to the response", () => {
      const expected = {
        status: "error",
        data: "some data",
        meta: {"some field": "some value"}
      }
      expect(ipc.errorResponse("some data", {"some field": "some value"})).toEqual(expected)
    })
  })
})
