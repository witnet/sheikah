/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import RadonQuery from '@/components/RadonQuery'
import Store from '@/store'

storiesOf('RadonQuery', module)
  .add('RadonQuery', () => ({
    components: { RadonQuery },
    data () {
      const radRequest = {
        retrieve: [
          {
            url: '',
            kind: 'HTTP_GET',
            script: [[0x56, 0]],
          },
        ],
        aggregate: {
          script: [0x43, 0x74, [0x61, 'weather'], 0x74, [0x61, 'temp'], 0x72],
        },
        consensus: {
          script: [0x43, 0x74, [0x61, 'weather'], 0x74, [0x61, 'temp'], 0x72],
        },
      }
      return { radRequest }
    },
    store: Store,
    template: `<RadonQuery :radRequest="radRequest" />`,
  }))
