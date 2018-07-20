import { AppStateManager } from "app/main/appState"
import { pureSubsystem } from "app/main/lifecycle"

/**
 * App state subsystem.
 * This simply initializes and returns an app state manager.
 */

export const appStateSubSystem = pureSubsystem(() => new AppStateManager())
