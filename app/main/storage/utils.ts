import * as mkdirp from "mkdirp"
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
export const ensurePath = async (path: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    mkdirp(path, (error: ErrnoException, made: mkdirp.Made) => {
      if (error) {
        reject(error)
      } else {
        resolve(true)
      }
    })
  })
}