import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from '../src/components/button/default'

const margin = {
  margin: 5,
}
storiesOf('Buttons', module).add('Buttons', () => (
  <div>
    <Button className="button" onClick={action('clicked')} style={margin}>
      Default Button
    </Button>
    <Button
      className="button button-primary"
      onClick={action('clicked')}
      style={margin}
    >
      Primary Button
    </Button>
    <Button
      className="button button-dashed"
      onClick={action('clicked')}
      style={margin}
    >
      Dashed Button
    </Button>
    <Button
      className="button button-danger"
      onClick={action('clicked')}
      style={margin}
    >
      Danger Button
    </Button>
    <Button
      className="button button-positive"
      onClick={action('clicked')}
      style={margin}
    >
      Positive Button
    </Button>
  </div>
))
