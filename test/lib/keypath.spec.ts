import {KeyPath} from "../../app/lib/keyPath"

describe("key path", () => {
  const hardened = KeyPath.hardened
  it("should parse string-formatted derivation paths", () => {
    expect( KeyPath.fromString("m/44'/0'/0'/0"))
      .toMatchObject(new KeyPath([hardened(44), hardened(0), hardened(0), 0]))
    expect( KeyPath.fromString("/44'/0'/0'/0"))
      .toMatchObject(new KeyPath([hardened(44), hardened(0), hardened(0), 0]))
    expect( KeyPath.fromString("44'/0'/0'/0"))
      .toMatchObject(new KeyPath([hardened(44), hardened(0), hardened(0), 0]))
    expect( KeyPath.fromString("m/44/0'/0'/0"))
      .toMatchObject(new KeyPath([44, hardened(0), hardened(0), 0]))
    expect( KeyPath.fromString("m"))
      .toMatchObject(new KeyPath())
    expect( KeyPath.fromString(""))
      .toMatchObject(new KeyPath())
    expect(() => KeyPath.fromString("aa/1/2/3")).toThrow()
    expect(() => KeyPath.fromString("1/'2/3")).toThrow()
  })
})