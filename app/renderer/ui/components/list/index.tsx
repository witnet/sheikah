import * as React from "react"
import { List } from "antd"

import { ButtonOption } from "app/renderer/ui/components/button"
import EmptyState from "app/renderer/ui/components/emptyState"

const styles = require("./style.scss")

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isClickableOption = (item: any) => item.onClick && item.text

export interface DefaultListProps {
  borderer?: boolean,
  classNameItem?: string,
  classNameList?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSource: Array<(string | { text: any, onClick: any } | any)>,
  emptyIcon?: string,
  emptyText?: string,
  grid?: {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
