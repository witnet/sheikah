import Vue from 'vue'
import Counter from '@/components/sections/Counter.vue'
import { shallow } from "vue-test-utils"

describe("Counter.vue", () => {
  it("increments count when button is clicked", () => {
    const wrapper = shallow(Counter)
    wrapper.find("button").trigger("click")
    expect(wrapper.find("#counter").text()).to.equal("1")
  })
})