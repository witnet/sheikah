import { constant } from "fp-ts/lib/function"
import { pureSubsystem } from "app/main/lifecycle"
import { jsonSerializer } from "app/common/serializers"

export const jsonSubSystem = pureSubsystem(constant(jsonSerializer))