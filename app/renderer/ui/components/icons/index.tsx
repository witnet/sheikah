import * as React from "react"

import { sheikahIcon } from "app/renderer/ui/components/icons/sheikah"

export interface Iprops {
  className?: string
  type: string
}

/**
 * Alert UI component which renders different types of messages with a title
 *
 * @export
 * @class Icon
 * @extends {React.Component<Iprops>}
 */
export default class Icon extends React.Component<Iprops> {

  /**
   * select svg icon by name
   *
   * @private
   * @memberof Icon
   */
  private selectIcon =  (type: string) => {
    switch (type) {
      case "sheikah":
        return sheikahIcon
      default:
        return ""
    }
  }

  // tslint:disable-next-line: completed-docs
  public render() {

    return (
      <>
        {this.selectIcon(this.props.type)}
      </>
    ) }
}