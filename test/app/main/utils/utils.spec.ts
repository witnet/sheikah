import {kvSwap} from "appMain/utils/utils"
import {ChainType} from "appMain/chain/chainType"

describe("Utils", () => {
  const prefixToChainType = {
    wit: ChainType.main,
    twit: ChainType.test
  }

  it("swap keys with values", () => {
    const swapped = kvSwap(prefixToChainType)
    expect(swapped[ChainType.main]).toEqual("wit")
    expect(swapped[ChainType.test]).toEqual("twit")
  })
})
