import { newMnemonics } from "app/main/api/handlers"
import { AppStateManager } from "app/main/appState"
import { asRuntimeType } from "app/common/runtimeTypes"
import { NewMnemonicsSuccess } from "app/common/runtimeTypes/storage/wallets"

jest.mock("app/main/crypto/mnemonic", () => {
  return {
    generate: () => "some mnemonic",
  }
})

describe("NewMnemonics Handler", () => {
  it("should return a non-empty mnemonics as response", async () => {
    const system = {
      appStateManager: new AppStateManager(),
    }

    // Call the new mnemonics handler and wait for the response
    const result = await newMnemonics(system, {})

    // Check that the return value is a new mnemonics response runtime type
    const mnemonicsResponse = asRuntimeType(result, NewMnemonicsSuccess)

    // Check that new mnemonic response contains a kind success
    expect(mnemonicsResponse.kind).toBe("SUCCESS")

    // Check that new mnemonic response contains a non-empty string
    expect(mnemonicsResponse.mnemonics).toBe("some mnemonic")
  })

  it("should call state manager's update with generated mnemonic", async () => {
    const system = {
      appStateManager: new AppStateManager(),
    }
    const expectedMnemonic = { mnemonics: "some mnemonic" }

    // Check that updateMock function has been called once
    expect(system.appStateManager.state.unconsolidatedWallet).toBeUndefined()
    await newMnemonics(system, {})
    expect(system.appStateManager.state.unconsolidatedWallet).toEqual(expectedMnemonic)
  })
})
