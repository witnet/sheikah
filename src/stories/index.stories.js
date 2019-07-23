/* eslint-disable import/no-extraneous-dependencies */
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/vue'

import Button from '@/components/Button'
import Card from '@/components/card/Card.vue'
import NavigationCard from '@/components/card/NavigationCard'

storiesOf('Card', module)
  .add('basic', () => ({
    components: { Card },
    template: '<Card>Hello Card!</Card>',
  }))
  .add('with title', () => ({
    components: { Card },
    template: '<Card title="Title">Card!</Card>',
  }))

  .add('with header', () => ({
    components: { Card },
    data () {
      return {
        headerStyles: {
          alignItems: 'center',
          background: 'linear-gradient(to right, #722ed1, #1a6cfb)',
          display: 'flex',
          fontSize: '18px',
          fontWeight: '100',
          height: '100px',
          padding: '0 20px',
        },
      }
    },
    template: `
      <Card width="400" height="300" >
        <template v-slot:header>
          <div v-bind:style="{ ...headerStyles }">
            Header
          </div>
        </template>
        Card!
      </Card>
    `,
  }))

storiesOf('NavigationCard', module)
  .add('basic', () => ({
    components: { NavigationCard },
    template: `
      <NavigationCard nextText="Next" previousText="Previous">
        This is a navigation card
      </NavigationCard>
    `,
  }))

  .add('with header', () => ({
    components: { NavigationCard },
    data () {
      return {
        headerStyles: {
          alignItems: 'center',
          background: 'linear-gradient(to right, #722ed1, #1a6cfb)',
          display: 'flex',
          fontSize: '18px',
          fontWeight: '100',
          height: '100px',
          padding: '0 20px',
        },
      }
    },
    template: `
      <NavigationCard title="Tittle" nextText="Next" previousText="Previous">
        This is a navigation card with header
      </NavigationCard>
    `,
  }))

storiesOf('Button', module)
  .add('Default', () => ({
    components: { Button },
    template: '<Button type="default" @click="action">Hello Button</Button>',
    methods: { action: action('clicked') },
  }))
  .add('Primary', () => ({
    components: { Button },
    template: '<Button type="primary" @click="action">Hello Button</Button>',
    methods: { action: action('clicked') },
  }))
  .add('Danger', () => ({
    components: { Button },
    template: '<Button type="danger" @click="action">Hello Button</Button>',
    methods: { action: action('clicked') },
  }))
  .add('Dashed', () => ({
    components: { Button },
    template: '<Button type="dashed" @click="action">Hello Button</Button>',
    methods: { action: action('clicked') },
  }))
  .add('Positive', () => ({
    components: { Button },
    template: '<Button type="positive" @click="action">Hello Button</Button>',
    methods: { action: action('clicked') },
  }))
