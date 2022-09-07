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
  const replacement = `node_url = ${JSON.stringify(publicNodeUrls)}\n`
    .replace("'", '')
    .trim()
  const nodeUrlUntilCharacter = (character: string) =>
    new RegExp('node_url =([^;]*)' + character)
  try {
    fs.writeFileSync(
      path.join(sheikahPath, witnetConfigFileName),
      fs
        .readFileSync(path.join(sheikahPath, witnetConfigFileName))
        .toString()
        .replace(nodeUrlUntilCharacter('"'), replacement)
        .replace(nodeUrlUntilCharacter(']'), replacement),
    )
  } catch (error) {
    console.log('Error overwriting configuration file', error)
  }
}

export default overwriteWitnetNodeConfiguration
