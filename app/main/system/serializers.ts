import * as f from "fp-ts/lib/function"
import { Lifecycle, pureComponent } from "./lifecycle"

export type Serializer = {
  encode(value: any): Promise<string>;
  decode(text: string): Promise<any>;
}

export const json: Lifecycle<Serializer, void> = pureComponent(f.constant({
  encode: wrapPromise((v: any) => JSON.stringify(v)),
  decode: wrapPromise((t: string) => JSON.parse(t))
}))

/**
 * Helper function for wrapping functions that may throw exceptions in a Promise.
 */
function wrapPromise<A, B>(f: (a: A) => B): (a: A) => Promise<B> {
  return async (a: A) => f(a)
}
