/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import Input from '@/components/Input'

storiesOf('Input', module)
  .add('default', () => ({
    components: { Input },
    template: '<Input placeholder="Placeholder" />',
  }))
  .add('Big', () => ({
    components: { Input },
    template: '<Input type="big" />',
  }))
  .add('Underlined', () => ({
    components: { Input },
    template: '<Input type="underlined" />',
  }))
