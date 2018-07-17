import {newMnemonics} from "app/main/api/handlers"
import {asRuntimeType} from "app/common/runtimeTypes"
import {NewMnemonicsResponse} from "app/common/runtimeTypes/storage/wallets"

describe("NewMnemonics Handler", () => {

  it("should return a non-empty mnemonics as response", async () => {
    const system = {
      appStateManager: {
        update: () => undefined
      }
    }

    const result = await newMnemonics(system, {})

    // Check that the return value is an unconsolidated wallet
    const mnemonicsResponse = asRuntimeType(result, NewMnemonicsResponse)

    // Check that new mnemonic response contains a non-empty string
    expect(mnemonicsResponse.mnemonics).toBeTruthy()
  })

  it("should have called the app state manager update function", async () => {
    const updateMock = jest.fn()
    const system = {
      appStateManager: {
        update: updateMock
      }
    }

    // Check that updateMock function has been called once
    await newMnemonics(system, {})
    expect(updateMock.mock.calls.length).toBe(1)
  })

  it("should have called update() with the unconsolidated wallet with mnemonics", async () => {
    const updateMock = jest.fn()
    const system = {
      appStateManager: {
        update: updateMock
      }
    }

    const result = await newMnemonics(system, {})

    // Check that updateMock function has been called with an unconsolidatedWallet as argument
    expect("unconsolidatedWallet" in updateMock.mock.calls[0][0]).toBeTruthy()

    // Check that updateMock function update was called with the same mnemonics
    expect(updateMock.mock.calls[0][0].unconsolidatedWallet).toBe(result)
  })

})
