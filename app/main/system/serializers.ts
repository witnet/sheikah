import * as f from "fp-ts/lib/function"
import { Lifecycle, pureComponent } from "./lifecycle"

export type Serializer = {
  encode(value: any): Promise<string>;
  decode(text: string): Promise<any>;
}

export const json: Lifecycle<Serializer, void> = pureComponent(f.constant({
  encode: async (v: any) => JSON.stringify(v),
  decode: async (t: string) => JSON.parse(t)
}))
