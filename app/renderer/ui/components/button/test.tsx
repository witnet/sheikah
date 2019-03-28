import * as React from "react"
import * as enzyme from "enzyme"
import * as Adapter from "enzyme-adapter-react-16"
import { Button } from "./index"
import { Button as AntdButton } from "antd"

enzyme.configure({ adapter: new Adapter() })

describe("<Button /> rendering", () => {
  it("should render the button wrapper correctly with no props", () => {
    const tree = enzyme.shallow(
      <Button />
    )
    expect(tree).toMatchSnapshot()
  })

  it("should render antd button correctly with no props", () => {
    const tree = enzyme.shallow(
      <AntdButton />,
      { disableLifecycleMethods: true }
    )
    expect(tree).toMatchSnapshot()
  })

  it("should not render any <button> when operator is passed via props", () => {
    const tree = enzyme.shallow(<Button/>)
    expect(tree.find("button")).toHaveLength(0)
  })

  it("should call mock function when button is clicked", () => {
    const mockFunction = jest.fn()
    const tree = enzyme.shallow(
      <Button onClick={mockFunction}/>
    )
    tree.simulate("click")
    expect(mockFunction).toHaveBeenCalled()
  })

  it("should check if the button is disabled", () => {
    const tree = enzyme.shallow(
      <Button disabled={false}/>
    )
    expect(tree.prop("disabled")).toBe(false)
  })

  it("should check the type of button it is", () => {
    const tree = enzyme.mount(
      <Button type="action" />
    )
    expect(tree.prop("action"))
  })

  it("should check the type of button it is", () => {
    const actionType = enzyme.mount(
      <Button type="default" />
    )
    expect(actionType.prop("default"))

    const defaultType = enzyme.mount(
      <Button type="action" />
    )
    expect(defaultType.prop("action"))

    const linkType = enzyme.mount(
      <Button type="link" />
    )
    expect(linkType.prop("link"))

    const navigationType = enzyme.mount(
      <Button type="navigation"/>
    )
    expect(navigationType.prop("navigation"))

    const optionType = enzyme.mount(
      <Button type="option"/>
    )
    expect(optionType.prop("option"))
  })
})
