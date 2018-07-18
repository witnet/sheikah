import * as React from "react"

import { ButtonDefault } from "app/renderer/ui/components/button"
import List from "app/renderer/ui/components/list"
import { Popover } from "antd"

const styles = require("./style.scss")

export interface Iprops {
  className?: string
  classNameList?: string
  classNameItem?: string
  dataSource: Array<(string | { text: any; onClick: any })>
  borderer?: boolean
  renderItem?: any
}

/**
 * Popover UI component
 *
 * @export
 * @class Popover
 * @extends {React.Component<Iprops>}
 */

export default class DefaultPopover extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {

    const content = (
      <List
        classNameList={styles.list}
        classNameItem={styles["list-item"]}
        dataSource={this.props.dataSource}
        borderer={false}
      />
    )

    return (
      <Popover placement="bottomRight" content={content} trigger="click">
        <ButtonDefault className={`${this.props.className} ${styles.button}`} >
          <span>···</span> <i className="fa fa-angle-up" />
        </ButtonDefault>
      </Popover>
    )
  }
}

export { DefaultPopover as Popover }