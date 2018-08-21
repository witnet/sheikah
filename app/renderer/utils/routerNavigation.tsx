import { History } from "history"

/**
 * Function to handle react router navigation
 *
 * @param {History} history
 * @param {string} route
 * @returns {void}
 */
function navigateTo (history: History, route: string): void {
  if (history.location.pathname === route) {
    history.replace(route)
  } else {
    history.push(route)
  }
}

/**
 * Wrapper of navigateTo to be passed as a prop
 *
 * @param {History} history
 * @param {string} route
 * @returns {() => void}
 */
function lazyNavigateTo (history: History, route: string): () => void {
  return  () => { navigateTo(history, route) }
}

export {
  lazyNavigateTo,
  navigateTo,
}
