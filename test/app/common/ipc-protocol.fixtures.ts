export const requests = {
  valid: [
    { id: "1", method: "test-msg", data: "test-data" }
  ],

  invalid: [
    { id: 1, method: "test-msg", data: "test-data" }
  ]
}

export const responses = {
  valid: [
    { status: "ok", data: "test-data" },
    { status: "ok", data: "test-data", meta: {id: "1", method: "test-msg"} },
    { status: "error", data: "test-data" },
    { status: "error", data: "test-data", meta: {id: "1", method: "test-msg"} },
    { status: "error", data: "test-data", meta: {id: "1", method: "test-msg", data: {}} },
    { status: "ok", data: "test-desc", unknow: "unknown field" },
  ],

  invalid: [
    { status: "not a status" },
    { status: "not a status", data: "test-data" },
    { status: "error", data: "test-desc", meta: "not valid meta" }
  ]
}
