import *  as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from '@storybook/addon-actions';

import { ButtonLink } from '../../app/renderer/ui/components/button';

storiesOf("ButtonLink", module)
  .add("Default", () => (
    <ButtonLink
      text="Click!"
      onClick={action('button-click')}
    />
  ))
