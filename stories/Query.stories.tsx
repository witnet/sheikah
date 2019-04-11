import * as React from "react"
import { storiesOf } from "@storybook/react"
import { radonQuery } from "../app/renderer/ui/components/query"

storiesOf("radonQuery", module)
  .add("radonquery", () => (
    radonQuery
  ))

  
