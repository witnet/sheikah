declare module "hydration" {

  export const dehydrate: (object: object) => string

  export const hydrate: (string: string) => object

}