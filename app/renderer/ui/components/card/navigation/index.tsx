import * as React from "react"

import { Card } from "antd"

import { ButtonNavigation } from "app/renderer/ui/components/button"

const styles = require("./style.scss")

export interface Iprops {
  className?: string
  nextStep?: any
  previousStep?: any
  title: string
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

    return (
      <div className={this.props.className}>
        <Card title={this.props.title}>
          <div className={styles.content}>
            {this.props.children}
          </div>
          <div className={styles.navigation}>
            <ButtonNavigation text="Back" onClick={this.props.previousStep} />
            <ButtonNavigation text="Next" onClick={this.props.nextStep} />
          </div>
        </Card>
      </div>
    )
  }
}