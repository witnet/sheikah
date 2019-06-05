/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import BaseCard from '@/components/BaseCard'
import NavigationCard from '@/components/NavigationCard'

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
