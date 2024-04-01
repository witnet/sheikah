require('dotenv').config()
import { notarize } from '@electron/notarize'

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context

  // skip notarization for no macOS platforms
  if (electronPlatformName !== 'darwin') {
    return
  }

  // Skip notarization when SIGN env is false
  if (
    !process.env.SIGN ||
    process.env.SIGN === 'false' ||
    process.env.SIGN === '0'
  ) {
    return
  }

  const appName = context.packager.appInfo.productFilename

  return await notarize({
    appBundleId: 'io.witnet.sheikah',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLEID,
    appleIdPassword: process.env.APPLEIDPASS,
  })
}
