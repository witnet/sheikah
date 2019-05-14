import * as React from 'react'
import './style.scss'

/**
 * Button UI component
 *
 * @export
 * @class Button
 * @extends {React.Component}
 */

export default class Button extends React.Component {
  render() {
    return (
      <button className={this.props.className} style={this.props.style}>
        {this.props.children}
      </button>
    )
  }
}
