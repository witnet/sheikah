import *  as React from "react";
import { storiesOf } from "@storybook/react";

import { ButtonOption } from '../../app/renderer/ui/components/button';

storiesOf("ButtonOption", module)
  .add("Default", () => (
    <ButtonOption text="Default Option Button" />
  ))
  .add("Recommended", () => (
    <ButtonOption text="Default Option Button" recommended={true} />
  ))
