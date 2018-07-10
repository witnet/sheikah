import *  as React from "react";
import { storiesOf } from "@storybook/react";

import { ButtonDefault } from '../../app/renderer/ui/components/button';

storiesOf("Demo", module).add("Example", () => (
  <ButtonDefault text="Button" />
));
