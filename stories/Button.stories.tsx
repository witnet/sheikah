import *  as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import { ButtonDefault, ButtonLink, ButtonOption } from '../app/renderer/ui/components/button';

storiesOf("Button", module)
  .add("Basic", () => (
    <ButtonDefault
      text="Click!"
      onClick={action('button-click')}
    />
  ))

  .add("Link", () => (
    <ButtonLink
      text="Click!"
      onClick={action('button-click')}
    />
  ))

  .add("Option basic", () => (
    <ButtonOption
      text="Default Option Button"
      onClick={action('button-click')}
    />
  ))

  .add("Option Recommended", () => (
    <ButtonOption
      text="Default Option Button"
      recommended={true}
      onClick={action('button-click')}
    />
  ))
