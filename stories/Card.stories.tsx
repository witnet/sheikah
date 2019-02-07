import * as React from "react"
import { action } from "@storybook/addon-actions"
import { storiesOf } from "@storybook/react"
import { CardDefault, NavigationCard } from "../app/renderer/ui/components/card"

storiesOf("Card", module)
  .add("Basic", () => (
    <CardDefault title="TITLE">
      <p>I</p>
      <p>am</p>
      <p>a</p>
      <p>card</p>
    </CardDefault>
  ))
  .add("Navigation", () => (
    <div style={{ width: 500 }}>
      <NavigationCard
        title="Card With Navigation"
        nextStep={action("Clicked next step")}
        previousStep={action("Clicked previous step")}
      >
        <p>I</p>
        <p>am</p>
        <p>the</p>
        <p>content</p>
      </NavigationCard>
    </div>
  ))
