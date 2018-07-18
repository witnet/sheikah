import * as React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { ButtonDefault, ButtonLink, ButtonOption } from "../app/renderer/ui/components/button"

storiesOf("Button", module)
  .add("Basic", () => (
    <ButtonDefault onClick={action("button-click")}>
      Click!
    </ButtonDefault>
  ))

  .add("Link", () => (
    <ButtonLink onClick={action("button-click")}>
      Click!
    </ButtonLink>

  ))

  .add("Option basic", () => (
    <ButtonOption onClick={action("button-click")}>
      Default Option Button
    </ButtonOption>
  ))

  .add("Option Recommended", () => (
    <ButtonOption
      recommended={true}
      onClick={action("button-click")}
    >
      Default Option Button
    </ButtonOption>
  ))
