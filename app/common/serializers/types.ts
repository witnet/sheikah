export type Serializer<A, B> = {
  encode(value: A): Promise<B>;
  decode(serialized: B): Promise<A>;
}
