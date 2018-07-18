import * as React from "react"
import { List } from "antd"

import { ButtonOption } from "app/renderer/ui/components/button"

const styles = require("./style.scss")

const isClickableOption = (item: any) => item.onClick && item.text

export interface Iprops {
  grid?: {}
  classNameList?: string
  classNameItem?: string
  dataSource: Array<(string | { text: any; onClick: any } | any)>
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

  /**
   * Method that create a clickable option to list
   *
   * @private
   * @param {*} item
   * @returns
   * @memberof DefaultList
   */
  private createClickableOption = (item: any) => {
    return (
      <ButtonOption
        onClick={item.onClick}
        className={`${this.props.classNameItem} ${styles.option}`}
      >
        {item.text}
      </ButtonOption>
      )
  }

  /**
   * Method that create a not clickable option to list
   *
   * @private
   * @param {*} item
   * @returns
   * @memberof DefaultList
   */
  private createStaticOption = (item: any) => {
    return (
      this.props.renderItem
        ? <this.props.renderItem {...item}/>
        : (<List.Item className={`${this.props.classNameItem} ${styles.item}`} />)
    )
  }

  /**
   * Method that creates the item which will be rendered
   *
   * @private
   * @param {*} item
   * @returns
   * @memberof DefaultList
   */
  private createRenderItem = (item: any) => {
    return isClickableOption(item)
      ? this.createClickableOption(item)
      : this.createStaticOption(item)
  }

  // tslint:disable-next-line: completed-docs
  public render() {
    return (
      <List
        grid={this.props.grid}
        bordered={this.props.borderer}
        className={`${this.props.classNameList} ${styles.list}`}
        dataSource={this.props.dataSource}
        renderItem={this.createRenderItem}
      />
    )
  }
}

export { DefaultList as List }