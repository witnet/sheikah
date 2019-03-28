import * as React from "react"

import { Card } from "antd"

import { Button } from "app/renderer/ui/components/button"

const styles = require("./style.scss")

export interface NavigationCardProps {
  className?: string,
  nextStep?: any,
  previousStep?: any,
  title?: string,
  backText?: string,
  nextText?: string,
}

/**
 * Card with navigation UI component
 *
 * @export
 * @class NavigationCard
 * @extends {React.Component<NavigationCardProps>}
 */

export default class NavigationCard extends React.Component<NavigationCardProps> {
  /**
   * For the sake of accessibility, this event handler function captures Enter key pressing and
   * artificially calls nextStep just as if the Next button was clicked.
   */
  private handleKeyUp = (event: { keyCode: number }) => {
    if (event.keyCode === 13) {
      this.props.nextStep()
    }
  }

  public render() {
    const cardStyle = `${this.props.className} ${styles.card}`

    return (
      <div className={cardStyle} onKeyUp={this.handleKeyUp}>
        <Card title={this.props.title}>
          <div className={styles.content}>
            {this.props.children}
          </div>
          <div className={styles.navigation}>
            <Button
              type="navigation"
              onClick={this.props.previousStep}
            >
              {this.props.backText ? this.props.backText : "Back"}
            </Button>
            <Button
              type="navigation"
              onClick={this.props.nextStep}
            >
              {this.props.nextText ? this.props.nextText : "Next"}
            </Button>>
          </div>
        </Card>
      </div>
    )
  }
}
