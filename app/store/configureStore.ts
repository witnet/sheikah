const configureStore: any =
  (process.env.NODE_ENV === "production")
    ? require("./configureStore.production")
    : require("./configureStore.development")

export = configureStore
