import * as React from "react"
import { List } from "antd"

import { Button } from "app/renderer/ui/components/button"
import EmptyState from "app/renderer/ui/components/emptyState"

const styles = require("./style.scss")

const isClickableOption = (item: any) => item.onClick && item.text

export interface DefaultListProps {
  borderer?: boolean,
  classNameItem?: string,
  classNameList?: string,
  dataSource: Array<(string | { text: any, onClick: any } | any)>,
  emptyIcon?: string,
  emptyText?: string,
  grid?: {},
  renderItem?: any,
}

/**
 * List UI component
 *
 * @export
 * @class List
 * @extends {React.Component<DefaultListProps>}
 */

export default class DefaultList extends React.Component<DefaultListProps> {
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
      <Button
        type="option"
        onClick={item.onClick}
        className={`${this.props.classNameItem} ${styles.option}`}
      >
        {item.text}
      </Button>
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
        ? <this.props.renderItem {...item} />
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

  public render() {
    return this.props.dataSource.length
      ? (
        <List
          grid={this.props.grid}
          bordered={this.props.borderer}
          className={`${this.props.classNameList} ${styles.list}`}
          dataSource={this.props.dataSource}
          renderItem={this.createRenderItem}
        />
      )
      : (
        <EmptyState
          iconName={this.props.emptyIcon || "generic"}
          text={this.props.emptyText}
        />
      )
  }
}

export { DefaultList as List }
