import * as React from "react"

import { List } from "antd"

import OptionButton from '../button/option/index';

const styles = require("./style.scss")

export interface Iprops {
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
    const isClickable = (item: any) => item.onClick && item.text
    const defaultRenderItem = (item: any) =>
      isClickable(item)
        ? (<OptionButton text={item.text} onClick={item.onClick} className={`${this.props.classNameItem} ${styles.option}`}/>)
        : (<List.Item className={`${this.props.classNameItem} ${styles.item}`}>{item}</List.Item>)

    return (
      <List
        bordered={this.props.borderer}
        className={`${this.props.classNameList} ${styles.list}`}
        dataSource={this.props.dataSource}
        renderItem={this.props.renderItem || defaultRenderItem}
      />
    )
  }
}