import { GetStateParams, GetStateResponse } from "app/common/runtimeTypes/ipc/state"
import { SubSystems } from "app/main/system"

/**
 * AppInfo handler
 */
async function getState(system: SubSystems, params: GetStateParams): Promise<GetStateResponse> {
  return system.appStateManager.state
}

export default getState
