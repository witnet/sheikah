import * as React from "react"

import { Switch } from "antd"

export interface Iprops {
    checked?: boolean
    onChange?: (e: any) => void 
    // change type

}

export default class SwitchSelector extends React.Component<Iprops> {
    public render(){
        return(
            <Switch
                checked={this.props.checked}
                onChange={this.props.onChange}
                disabled={this.props.disabled}
            />
        )
    }
}