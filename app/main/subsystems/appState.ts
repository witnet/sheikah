import { AppStateManager } from "app/main/appState"
import { dummyStop, Lifecycle } from "app/main/lifecycle"
import { AppStateS } from "app/main/system"

/**
 * App state subsystem.
 * This simply initializes and returns an app state manager.
 */
export class AppStateSubSystem implements Lifecycle<AppStateManager, AppStateS> {

  /**
   * A reference to the app state manager object itself.
   */
  private manager: AppStateManager

  /**
   * Life cycle start function.
   * Instantiates and returns a new app state manager.
   */
  public async start() {
    this.manager = new AppStateManager()

    return this.manager
  }

  /**
   * Life cycle stop function.
   * Does nothing.
   * @type {() => Promise<void>}
   */
  public stop = dummyStop

}
