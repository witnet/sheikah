import { storiesOf } from '@storybook/vue'
import Balances from '@/components/Balances'

storiesOf('Balances', module).add('default', () => ({
  components: { Balances },
  template:
    '<Balances available="3.141592" timelocked="3.141592" unconfirmed="3.141592" total="3.141592" />',
}))
