import * as React from "react"

import { List } from "antd"

import OptionButton from '../button/option/index';
//import PendingTransaction from '../transaction/pending/index';

const styles = require("./style.scss")

export interface Iprops {
  grid?: {} | undefined
  classNameList?: string
  classNameItem?: string
  dataSource: (string | { text: any; onClick: any } | any)[]
 // dataSource: (string | { text: any; onClick: any })[]
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
    const ListItem = this.props.renderItem;
    const isClickable = (item: any) => item.onClick && item.text
    const renderItem = (item: any) => {
      return isClickable(item)
        ? (
          <OptionButton
            text={item.text}
            onClick={item.onClick}
            className={`${this.props.classNameItem} ${styles.option}`}/>
          )
        : (
          this.props.renderItem
            ? <ListItem {...item}/>
            :(<List.Item className={`${this.props.classNameItem} ${styles.item}`}></List.Item>)
        )
      }
    return (
      <List
        grid={this.props.grid}
        bordered={this.props.borderer}
        className={`${this.props.classNameList} ${styles.list}`}
        dataSource={this.props.dataSource}
        renderItem={renderItem}
      />
    )
  }
}