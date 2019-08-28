import { storiesOf } from '@storybook/vue'
import Card from '@/components/card/Card.vue'
import TemplateCard from '@/components/card/TemplateCard'

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
    data() {
      return {
        headerStyles: {
          alignItems: 'center',
          background: '$sheikah-gradient',
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
  .add('template', () => ({
    components: { TemplateCard },
    data() {
      return {
        options: [
          {
            label: 'Edit',
            action: () => {},
          },
          {
            label: 'Deploy',
            action: () => {},
          },
          {
            label: 'Delete',
            action: () => {},
          },
        ],
      }
    },
    template: `
    <TemplateCard>
    <template v-slot:title>
      Template
    </template>
    <template v-slot:description>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </template>
    </TemplateCard>`,
  }))
