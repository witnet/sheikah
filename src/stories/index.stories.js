/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

import BaseCard from '@/components/BaseCard'
import NavigationCard from '@/components/NavigationCard'
import Button from '@/components/Button.vue'

storiesOf('BaseCard', module)
  .add('Simple', () => ({
    components: { BaseCard },
    template: '<BaseCard>Hello Card!</BaseCard>',
  }))
  .add('Title', () => ({
    components: { BaseCard },
    template: '<BaseCard title="This is a Card with Title">Hello Card!</BaseCard>',
  }))
  .add('Navigation Card', () => ({
    components: { NavigationCard },
    template: '<NavigationCard title="This is a Card with Title" text="Lorem ipsum dolor sit amet consectetur, adipisicing elit.">Hello Card!</NavigationCard>',
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
