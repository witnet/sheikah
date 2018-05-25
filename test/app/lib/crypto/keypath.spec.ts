import * as KeyPath from "app/lib/crypto/keyPath"

describe("key path", () => {
  const hardened = KeyPath.hardened
  it("should parse string-formatted derivation paths", () => {
    expect( KeyPath.fromString("m/44'/0'/0'/0"))
      .toMatchObject([hardened(44), hardened(0), hardened(0), 0])
    expect( KeyPath.fromString("/44'/0'/0'/0"))
      .toMatchObject([hardened(44), hardened(0), hardened(0), 0])
    expect( KeyPath.fromString("44'/0'/0'/0"))
      .toMatchObject([hardened(44), hardened(0), hardened(0), 0])
    expect( KeyPath.fromString("m/44/0'/0'/0"))
      .toMatchObject([44, hardened(0), hardened(0), 0])
    expect( KeyPath.fromString("m"))
      .toMatchObject([])
    expect( KeyPath.fromString(""))
      .toMatchObject([])
    expect(() => KeyPath.fromString("aa/1/2/3")).toThrow()
    expect(() => KeyPath.fromString("1/'2/3")).toThrow()
  })
  it("should convert to string derivation path", () => {
    expect(KeyPath.toString([hardened(44), hardened(0), hardened(0), 0]))
      .toBe("m/44'/0'/0'/0")
    expect("m/44'/0'/0'/0")
      .toBe(KeyPath.toString([hardened(44), hardened(0), hardened(0), 0]))
    expect(KeyPath.toString([hardened(44), hardened(0), hardened(0), 0]))
      .toBe( "m/44'/0'/0'/0")
    expect(KeyPath.toString([44, hardened(0), hardened(0), 0]))
      .toBe( "m/44/0'/0'/0")
  })
})