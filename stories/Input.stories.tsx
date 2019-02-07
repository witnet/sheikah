import * as React from "react"
import { storiesOf } from "@storybook/react"
import {
  InputBig, DefaultInput, InputUnderlined, InputCheck, SwitchSelector,
} from "../app/renderer/ui/components/input"

storiesOf("Input", module)
  .add("Big", () => (
    <InputBig />
  ))

  .add("Default", () => (
    <DefaultInput />
  ))

  .add("Underlined", () => (
    <InputUnderlined />
  ))
  .add("Checkbox", () => (
    <InputCheck />
  ))

  .add("Switch", () => (
    <SwitchSelector />
  ))
