import * as React from "react"

import { Popover } from "antd"
import List from '../list/index';

import ButtonDefault from '../button/default/index';

const styles = require("./style.scss")

export interface Iprops {
  className?: string
  classNameList?: string
  classNameItem?: string
  dataSource: (string | { text: any; onClick: any })[]
  borderer?: boolean
  renderItem?: any
}

/**
 * List UI component
 *
 * @export
 * @class List
 * @extends {React.Component<Iprops>}
 */

export default class DefaultList extends React.Component<Iprops> {
  // tslint:disable-next-line: completed-docs
  public render() {

    const content = (
      <List classNameList={styles.list} classNameItem={styles["list-item"]} dataSource={this.props.dataSource} borderer={false}/>
    );

    return (
      <Popover placement="bottomRight" content={content} trigger="click">
        <ButtonDefault className={`${this.props.className} ${styles.button}`} text={<><span>···</span> <i className="fa fa-angle-up"></i></>} />
      </Popover>
    )
  }
}