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
 * @class Cardnavigation
 * @extends {React.Component<Iprops>}
 */

export default class Cardnavigation extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {
    const cardStyle = `${this.props.className} ${styles.card}`

    return (
      <div className={cardStyle}>
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
              selected={true}
            />
          </div>
        </Card>
      </div>
    )
  }
}