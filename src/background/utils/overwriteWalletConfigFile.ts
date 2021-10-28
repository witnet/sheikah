import fs from 'fs-extra'
import path from 'path'

// Overwrite wallet config file only when new version is downloaded
export default function overwriteWalletConfigFile({ sheikahPath, witnetConfigFileName, publicNodeUrl }) {
  fs.writeFileSync(
    path.join(sheikahPath, witnetConfigFileName),

    fs
      .readFileSync(path.join(sheikahPath, witnetConfigFileName))
      .toString()
      .replace(
        'node_url = "127.0.0.1:21338"',
        `node_url = "${publicNodeUrl}"\n`,
      ),
  )
}