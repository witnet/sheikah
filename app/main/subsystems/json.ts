import { constant } from "fp-ts/lib/function"
import { pureComponent } from "app/main/lifecycle"
import { jsonSerializer } from "app/common/serializers"

export const json = pureComponent(constant(jsonSerializer))
