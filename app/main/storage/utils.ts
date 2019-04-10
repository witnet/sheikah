import * as mkdirp from "mkdirp"
// eslint-disable-next-line no-undef
import ErrnoException = NodeJS.ErrnoException

/**
 * The Utils module contains storage-related helper functions
 */

/**
 * Checks asynchronously if a certain directory exist. If it does not, creates the directory and
 * all missing parents in the path. This is equivalent to `mkdir -p` in POSIX.
 * @param {string} path
 * @returns {Promise<any>}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ensurePath = async (path: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
    mkdirp(path, (error: ErrnoException, made: mkdirp.Made) => {
      if (error) {
        reject(error)
      } else {
        resolve(true)
      }
    })
  })
}
