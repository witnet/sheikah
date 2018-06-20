import * as React from "react"
import { RouteComponentProps } from "react-router"

// import Wrapper from '../components/wrapper/index';
import List from '../components/list/index';

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
    /*
    // Wrapper test
    return (
      <div className={styles.externalLayout}>
        <Wrapper title="PENDING" caption="2 transactions" />
      </div>
    )*/
    const data = [
      {
        text: 'Racing car sprays burning fuel into crowd.',
        onClick: () => console.log('CLICKED')
      },
      'Japanese princess to wed commoner.',
      'Australian walks 100km after outback crash.',
      'Man charged over missing wedding girl.',
      'Los Angeles battles huge wildfires.',
    ];

    return (
      <div className={styles.externalLayout}>
        <List dataSource={data}/>
      </div>
    )
  }
}

export default (
  TestPage as any as React.StatelessComponent<RouteComponentProps<any>>
)