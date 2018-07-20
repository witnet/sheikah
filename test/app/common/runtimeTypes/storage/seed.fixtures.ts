import { Seed } from "app/common/runtimeTypes/storage/wallets"

export const seedBuffer = [253, 212, 6, 199, 228, 105, 138, 96, 205, 64, 58, 21, 125, 87,
  24, 169, 248, 76, 224, 102, 117, 60, 13, 18, 16, 111, 125, 35, 14, 32, 103, 217, 132, 52, 79,
  252, 129, 156, 251, 90, 149, 141, 67, 195, 99, 113, 1, 224, 86, 107, 156, 221, 48, 157, 171,
  70, 221, 233, 234, 254, 72, 40, 18, 55]

export const masterSecret = seedBuffer.slice(0, 32)

export const chainCode = seedBuffer.slice(32, 64)

export const seed: Seed = {
  masterSecret,
  chainCode
}

export const encodedSeed = {
  masterSecret: "fdd406c7e4698a60cd403a157d5718a9f84ce066753c0d12106f7d230e2067d9",
  chainCode: "84344ffc819cfb5a958d43c3637101e0566b9cdd309dab46dde9eafe48281237"
}

export const wrongSeed: Seed = {
  masterSecret: [423, 34],
  chainCode: [534, 5432]
}

export const wrongEncodedSeed = {
  masterSecret: "Hello",
  chainCode: "World"
}