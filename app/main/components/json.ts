import { constant } from "fp-ts/lib/function"
import { json as jsonSerializer } from "app/common/serializers"
import { pureComponent } from "app/main/lifecycle"

export const json = pureComponent(constant(jsonSerializer))
