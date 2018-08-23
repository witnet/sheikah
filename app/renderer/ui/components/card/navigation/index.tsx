import * as React from "react"

import { Card } from "antd"

import { ButtonNavigation } from "app/renderer/ui/components/button"

const styles = require("./style.scss")

export interface Iprops {
  className?: string
  nextStep?: any
  previousStep?: any
  title?: string
  backText?: string
  nextText?: string
}

/**
 * Card with navigation UI component
 *
 * @export
 * @class NavigationCard
 * @extends {React.Component<Iprops>}
 */

export default class NavigationCard extends React.Component<Iprops> {

  /**
   * For the sake of accessibility, this event handler function captures Enter key pressing and
   * artificially calls nextStep just as if the Next button was clicked.
   */
  private handleKeyUp = (event: { keyCode: number }) => {
    if (event.keyCode === 13) {
      this.props.nextStep()
    }
  }

  // tslint:disable-next-line: completed-docs
  public render() {
    const cardStyle = `${this.props.className} ${styles.card}`

    return (
      <div className={cardStyle} onKeyUp={this.handleKeyUp}>
        <Card title={this.props.title}>
          <div className={styles.content}>
            {this.props.children}
          </div>
          <div className={styles.navigation}>
            <ButtonNavigation
              text={this.props.backText ? this.props.backText : "Back"}
              onClick={this.props.previousStep}
            />
            <ButtonNavigation
              text={this.props.nextText ? this.props.nextText : "Next"}
              onClick={this.props.nextStep}
            />
          </div>
        </Card>
      </div>
    )
  }
}