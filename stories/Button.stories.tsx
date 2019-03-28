import * as React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { Button } from "../app/renderer/ui/components/button"

storiesOf("Button", module)
  .add("Action", () => (
    <Button type="action" onClick={action("button-click")}>
      action button
    </Button>
  ))
