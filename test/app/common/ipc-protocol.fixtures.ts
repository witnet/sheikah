/* tslint:disable:no-null-keyword */
export const requests = {
  valid: [
    { jsonrpc: "2.0", method: "sum" },
    { jsonrpc: "2.0", id: null, method: "sum" },
    { jsonrpc: "2.0", id: "123", method: "sum" },
    { jsonrpc: "2.0", id: 123, method: "sum" },
    { jsonrpc: "2.0", id: 123, method: "sum", params: [1, 2, 3] }
  ],

  invalid: [
    { jsonrpc: "2.0" },
    { jsonrpc: "3.0", method: "sum" },
    { jsonrpc: "2.0", id: true, method: "sum" },
    { jsonrpc: "2.0", id: 123, method: 123 },
    { jsonrpc: "2.0", method: "sum", params: "1 2 3" },
    // This is a valid request in JSON-RPC, but since all requests are going to be behind a function
    // signature wich is translated always into a list of parameters, we are forbidding this type
    // of requests to make the implementation simpler
    { jsonrpc: "2.0", id: 123, method: "sum", params: { a: 1, b: 2, c: 3 } }
  ]
}

export const responses = {
  valid: [
    { jsonrpc: "2.0", id: null, result: null },
    { jsonrpc: "2.0", id: "123", error: { code: 123, message: "..." } },
    { jsonrpc: "2.0", id: "123", error: { code: 123, message: "...", data: {} } },
    { jsonrpc: "2.0", id: 123, result: 123 },
  ],

  invalid: [
    { jsonrpc: "2.0", id: null },
    { jsonrpc: "2.0", result: null },
    { jsonrpc: "2.0", id: "123", error: 123 },
    { jsonrpc: "2.0", id: null, error: {} },
    { jsonrpc: "2.0", id: null, error: { code: "123", message: "..." } },
    { jsonrpc: "2.0", id: null, error: { code: "123", message: 123 } }
  ]
}

export const requestFactory = [
  [
    ["sum"],
    { jsonrpc: "2.0", method: "sum" }
  ],
  [
    ["sum", "123"],
    { jsonrpc: "2.0", id: "123", method: "sum" }
  ],
  [
    ["sum", "123", []],
    { jsonrpc: "2.0", id: "123", method: "sum", params: [] }
  ]
]

export const notificationsFactory = [
  [
    ["sum"],
    { jsonrpc: "2.0", method: "sum" }
  ],
  [
    ["sum", []],
    { jsonrpc: "2.0", method: "sum", params: [] }
  ]
]

export const successResponseFactory = [
  [
    ["result", 123],
    { jsonrpc: "2.0", result: "result", id: 123 }
  ],
  [
    [123, "id"],
    { jsonrpc: "2.0", result: 123, id: "id" }
  ]
]

export const errorResponseFactory = [
  [
    [{ code: 123, message: "error" }, 123],
    { jsonrpc: "2.0", error: { code: 123, message: "error" }, id: 123 }
  ],
  [
    [{ code: 123, message: "error", data: {} }, 123],
    { jsonrpc: "2.0", error: { code: 123, message: "error", data: {} }, id: 123 }
  ]
]
