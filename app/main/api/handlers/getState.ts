import { asObject } from "app/common/runtimeTypes"
import { AppState } from "app/main/appState"
import { SubSystems } from "app/main/system"

/**
 * AppInfo handler
 */
async function getState(system: SubSystems, params: any) {
  return asObject(system.appStateManager.state, AppState)
}

export default getState
