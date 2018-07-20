import { hardened } from "app/main/crypto/keyPath"

export const pathsToString = {
  valid: [
    {
      path: "m/44'/0'/0'/0",
      expected: [hardened(44), hardened(0), hardened(0), 0]
    },
    {
      path: "/44'/0'/0'/0",
      expected: [hardened(44), hardened(0), hardened(0), 0]
    },
    {
      path: "44'/0'/0'/0",
      expected: [hardened(44), hardened(0), hardened(0), 0]
    },
    {path: "m/44/0'/0'/0", expected: [44, hardened(0), hardened(0), 0]},
    {path: "m", expected: []},
    {path: "", expected: []},
  ],
  invalid: [
    {path: "aa/1/2/3"},
    {path: "1/'2/3"},
  ]
}

export const stringFromPath = {
  valid: [
    {
      path: [hardened(44), hardened(0), hardened(0), 0],
      expected: "m/44'/0'/0'/0"
    },
    {path: [44, hardened(0), hardened(0), 0], expected: "m/44/0'/0'/0"},
    {path: [44, hardened(0), 0, hardened(0)], expected: "m/44/0'/0/0'"}
  ]
}