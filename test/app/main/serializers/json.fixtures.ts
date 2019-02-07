const errorFactory = (errorName: string, message: string): Error => {
  const error = new Error(message)
  error.name = errorName

  return error
}

export const jsonFixtures = {
  valid: [
    {
      value: {
        number: 1337,
        string: "Hello World",
        array: [1337, "Hello World", { foo: "bar" }],
        object: {
          foo: "bar",
        },
      },
      serialized: "{\"number\":1337,\"string\":\"Hello World\",\"array\":[1337,\"Hello World\"," +
        "{\"foo\":\"bar\"}],\"object\":{\"foo\":\"bar\"}}",
    },
  ],
  invalid: [
    {
      serialized: "",
      error: errorFactory("SyntaxError", "Unexpected end of JSON input"),
    },
    {
      serialized: "{\"",
      error: errorFactory("SyntaxError", "Unexpected end of JSON input"),
    },
    {
      serialized: "{'",
      error: errorFactory("SyntaxError", "Unexpected token ' in JSON at position 1"),
    },
  ],
}
