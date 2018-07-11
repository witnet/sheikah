import *  as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from '@storybook/addon-actions';

import { ButtonOption } from '../../app/renderer/ui/components/button';

storiesOf("ButtonOption", module)
  .add("Default", () => (
    <ButtonOption
      text="Default Option Button"
      onClick={action('button-click')}
    />
  ))
  .add("Recommended", () => (
    <ButtonOption
      text="Default Option Button"
      recommended={true}
      onClick={action('button-click')}
    />
  ))
