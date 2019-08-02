/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import RadonStage from '@/components/RadonStage'

storiesOf('RadonStage', module)
  .add('Retrieve', () => ({
    components: { RadonStage },
    template: '<RadonStage :retrieve="[{script: []}]"/>',
  }))
