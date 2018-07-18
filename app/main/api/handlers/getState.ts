import { asObject } from "app/common/runtimeTypes"
import { SubSystems } from "app/main/system"
import { AppState } from "app/common/runtimeTypes/ipc/state"

/**
 * AppInfo handler
 */
async function getState(system: SubSystems, params: any) {
  return asObject(system.appStateManager.state, AppState)
}

export default getState
