import *  as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import { ButtonDefault } from '../../app/renderer/ui/components/button';

storiesOf("ButtonDefault", module)
  .add("Default", () => (
    <ButtonDefault
      text="Click!"
      onClick={action('button-click')}
    />
  ))
