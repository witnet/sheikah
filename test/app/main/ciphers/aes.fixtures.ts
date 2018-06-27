const aesFixtures = {
  pbkdPassword: "password",
  iv: Buffer.from("e4204c0c665f108708dccadff50baf71", "hex"),
  salt: Buffer.from("dbfa400dd71b9311e4a04b7f896f24fdb21b9cd1fc8d4fe0380d2ea51bca4c68", "hex"),
  plainText: Buffer.from("message"),
  cipherText: Buffer.from("e4204c0c665f108708dccadff50baf71cb0107839ea5adbd4104e0b7418c1926dbfa40" +
    "0dd71b9311e4a04b7f896f24fdb21b9cd1fc8d4fe0380d2ea51bca4c68", "hex")
}

export default aesFixtures