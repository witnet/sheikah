import { ChainType } from "app/common/chain/chainType"
import { kvSwap } from "app/common/utils"

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
