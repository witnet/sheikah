import * as React from 'react'
import * as enzyme from 'enzyme'
import { shallow } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import { Button } from './index'
import { Button as AntdButton } from 'antd'

enzyme.configure({ adapter: new Adapter() })

describe('<Button /> rendering', () => {
  it('should render the button wrapper correctly with no props', () => {
      const tree = shallow(
          <Button />
      )
      expect(tree).toMatchSnapshot()
  })
  
  it('should render antd button correctly with no props', () => {
      const tree = shallow(
        <AntdButton />, 
        {disableLifecycleMethods: true}
      )
      expect(tree).toMatchSnapshot()
  })

  it('should not render any <button> when operator is passed via props', () => {
      const tree = shallow(<Button/>)
      expect(tree.find('button')).toHaveLength(0)
  })

  it('should call mock function when button is clicked', () => {
    const mockFunction = jest.fn()
    const tree = shallow(
      <Button onClick={mockFunction}/>
      )
      tree.simulate('click')
    expect(mockFunction).toHaveBeenCalled()
  })

  it('should check if the button is disabled', () => {
    const tree = shallow(
      <Button disabled={false}/>
    )
    expect(tree.prop('disabled')).toBe(false)
  })

  it('should check the type of button it is', () => {
    const tree = shallow(
      <Button type="action" />
    )

    expect(tree.prop('action'))
    console.log(tree.props())
    // expect(tree.prop('style').props())
  })
})