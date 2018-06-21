import * as React from "react"
import { RouteComponentProps } from "react-router"

import Wrapper from '../components/wrapper/index';
// import List from '../components/list/index';

const styles = require("./style.scss")

/**
 * Sigup page UI component
 *
 * @export
 * @class TestPage
 * @extends {React.Component<RouteComponentProps<any>, void>}
 */

export class TestPage extends React.Component<RouteComponentProps<any>, void> {
  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    const data = [
      {
        text: 'Option 1',
        onClick: () => console.log('CLICKED 1')
      },
      {
        text: 'Option 2',
        onClick: () => console.log('CLICKED 2')
      },
      {
        text: 'Option 3',
        onClick: () => console.log('CLICKED 3')
      }
    ];

    // Wrapper test
    return (
      <div className={styles.externalLayout}>
        <Wrapper title="PENDING" caption="2 transactions" actions={data} />
      </div>
    )

    /* return (
      <div className={styles.externalLayout}>
        <List dataSource={data}/>
      </div>
    ) */
  }
}

export default (
  TestPage as any as React.StatelessComponent<RouteComponentProps<any>>
)