import path from 'path'
import fs from 'fs-extra'

// Replace witnet nodes urls in witnet configuration file
export function overwriteWitnetNodeConfiguration({
  sheikahPath,
  witnetConfigFileName,
  publicNodeUrls,
}: {
  sheikahPath: string
  witnetConfigFileName: string
  publicNodeUrls: Array<string>
}) {
  try {
    fs.writeFileSync(
      path.join(sheikahPath, witnetConfigFileName),

      fs
        .readFileSync(path.join(sheikahPath, witnetConfigFileName))
        .toString()
        .replace(
          'node_url = "127.0.0.1:21338"',
          `node_url = ${JSON.stringify(publicNodeUrls)}\n`.replace("'", ''),
        )
        .replace('52.166.178.145:21338', `20.126.70.77:21338`),
    )
  } catch (error) {
    console.log('Error overwriting configuration file')
  }
}

export default overwriteWitnetNodeConfiguration
