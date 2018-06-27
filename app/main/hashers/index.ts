/**
 * All hasher functions must abide by this type contract
 */
export type Hasher<A, B> = (input: A) => Promise<B>