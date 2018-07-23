import { constant } from "fp-ts/lib/function"
import { pureSubsystem } from "app/main/lifecycle"
import createJsonAesLevelStorage from "app/main/storage/jsonAesLevel"

export const storageSubsystem = pureSubsystem(constant(createJsonAesLevelStorage))