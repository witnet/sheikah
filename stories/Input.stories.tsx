import *  as React from "react";
import { storiesOf } from "@storybook/react";
import { InputBig, InputDefault, InputUnderlined } from '../app/renderer/ui/components/input';

storiesOf("Input", module)
  .add("Big", () => (
    <InputBig />
  ))

  .add("Default", () => (
    <InputDefault />
  ))

  .add("Underlined", () => (
    <InputUnderlined />
  ))
