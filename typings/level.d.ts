declare module "level" {

  import {LevelUp} from "levelup"

  const level: (
    location: string,
    options?: object,
    callback?: (error: Error, db: any) => void
  ) => LevelUp

  export = level

}