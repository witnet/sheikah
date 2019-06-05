/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import MyButton from '../components/MyButton.vue'

storiesOf('Button', module)
  .add('with text', () => ({
    components: { MyButton },
    template: '<my-button @click="action">Hello Button</my-button>',
    methods: { action: action('clicked') },
  }))
  .add('with JSX', () => ({
    components: { MyButton },
    render () {
      return <my-button onClick={this.action}>With JSX</my-button>
    },
    methods: { action: linkTo('Button', 'with some emoji') },
  }))
  .add('with some emoji', () => ({
    components: { MyButton },
    template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
    methods: { action: action('clicked') },
  }))
  .add('Positive', () => ({
    components: { Button },
    template: '<Button type="positive" @click="action">Hello Button</Button>',
    methods: { action: action('clicked') },
  }))
storiesOf('Card', module)
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
