/* tslint:disable:no-null-keyword */
import * as ipc from "app/common/ipc-protocol"
import * as fixtures from "./ipc-protocol.fixtures"

describe("IPC Protocol (implementation of Json-RPC 2.0 )", () => {
  describe("isNotification", () => {
    it("should return true if request is of type notification", () => {
      const request = { jsonrpc: ipc.jsonrpc, method: "someMethod" }
      expect(ipc.isNotification(request)).toBe(true)
    })

    it("should return false if request is not of type notification", () => {
      const request = { id: null, jsonrpc: ipc.jsonrpc, method: "someMethod" }
      expect(ipc.isNotification(request)).toBe(false)
    })
  })

  describe("decodeRequest", () => {
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

  describe("encodeRequest", () => {
    fixtures.requests.valid.forEach((request, index: number) => {
      it(`should encode request in fixture: requests.valid[${index}]`, async () => {
        const result = await ipc.decodeRequest(request)
        expect(ipc.encodeRequest(result)).toEqual(request)
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

  describe("encodeResponse", () => {
    fixtures.responses.valid.forEach((response, index: number) => {
      it(`should encode response in fixture: responses.valid[${index}]`, async () => {
        const result = await ipc.decodeResponse(response)
        expect(ipc.encodeResponse(result)).toEqual(response)
      })
    })
  })

  describe("request", () => {
    fixtures.requestFactory.forEach(([args, expected], index) => {
      it(`should create a request for fixture: requestFactory[${index}]`, () => {
        expect(ipc.request.apply(null, args)).toEqual(expected)
      })
    })
  })

  describe("notification", () => {
    fixtures.notificationsFactory.forEach(([args, expected], index) => {
      it(`should create a notification for fixture: notificationsFactory[${index}]`, () => {
        expect(ipc.notification.apply(null, args)).toEqual(expected)
      })
    })
  })

  describe("successResponse", () => {
    fixtures.successResponseFactory.forEach(([args, expected], index) => {
      it(`should create a response for fixture: successResponseFactory[${index}]`, () => {
        expect(ipc.successResponse.apply(null, args)).toEqual(expected)
      })
    })
  })

  describe("errorResponse", () => {
    fixtures.errorResponseFactory.forEach(([args, expected], index) => {
      it(`should create a response for fixture: errorResponseFactory[${index}]`, () => {
        expect(ipc.errorResponse.apply(null, args)).toEqual(expected)
      })
    })
  })
})
