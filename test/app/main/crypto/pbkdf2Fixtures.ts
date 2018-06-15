export const pbkdf2Data = {
  encoding: "hex",
  valid: [
    {
      password: "password",
      salt: "salt",
      iterations: 1,
      length: 20,
      expected: "867f70cf1ade02cff3752599a3a53dc4af34c7a6",
      hex: ""
    },
    {
      password: "password",
      salt: "salt",
      iterations: 2,
      length: 20,
      expected: "e1d9c16aa681708a45f5c7c4e215ceb66e011a2e",
    },
    {
      password: "password",
      salt: "salt",
      iterations: 4096,
      length: 20,
      expected: "d197b1b33db0143e018b12f3d1d1479e6cdebdcc",
    },
    {
      password: "passwordPASSWORDpassword",
      salt: "saltSALTsaltSALTsaltSALTsaltSALTsalt",
      iterations: 4096,
      length: 25,
      expected: "8c0511f4c6e597c6ac6315d8f0362e225f3c501495ba23b868",
    },
    {
      password: "pass\0word",
      salt: "sa\0lt",
      iterations: 4096,
      length: 16,
      expected: "9d9e9c4cd21fe4be24d5b8244c759665",
    }
  ]
}