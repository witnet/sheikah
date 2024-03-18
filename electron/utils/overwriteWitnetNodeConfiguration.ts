import path from 'path'
import fs from 'fs-extra'
import {
  SHEIKAH_PATH,
  WITNET_CONFIG_FILE_NAME,
  URLS_PUBLIC_WITNET_NODES,
  LEGACY_CONFIGURATION_WITNET_NODE_IPS,
} from '../constants'
import { existIntersection } from './existIntersection'

const nodeUrlConfigRegex = /node_url =([^;]*)]|node_url =([^;]*)"/

const nodeUrlsRegex = /g\[([^;]*)\]|"([^;]*)"/

type NodeConfig = {
  sheikahPath: string
  witnetConfigFileName: string
  publicNodeUrls: Array<string>
  oldWitnetNodes: Array<string>
}

const defaultConfig = {
  sheikahPath: SHEIKAH_PATH,
  witnetConfigFileName: WITNET_CONFIG_FILE_NAME,
  publicNodeUrls: URLS_PUBLIC_WITNET_NODES,
  oldWitnetNodes: LEGACY_CONFIGURATION_WITNET_NODE_IPS,
}

// Replace witnet nodes urls in witnet configuration file
export function overwriteWitnetNodeConfiguration(
  force: Boolean = false,
  config: NodeConfig = defaultConfig,
) {
  const {
    sheikahPath,
    witnetConfigFileName,
    publicNodeUrls,
    oldWitnetNodes,
  }: NodeConfig = config
  try {
    const existFile = fs.existsSync(
      path.join(sheikahPath, witnetConfigFileName),
    )
    if (!existFile) {
      console.log(`File ${sheikahPath}/${witnetConfigFileName} not found`)
      return
    }
    const configFile = fs
      .readFileSync(path.join(sheikahPath, witnetConfigFileName))
      .toString()
    // match full node_url config line
    const nodeUrlConfigLine: string =
      configFile.match(nodeUrlConfigRegex)?.[0] || ''
    // match node urls within the node_url config line
    const currentNodeUrls: string =
      nodeUrlConfigLine.match(nodeUrlsRegex)?.[0] || ''
    const configNodeIps: Array<string> | undefined = currentNodeUrls
      .replaceAll(' ', '')
      .replaceAll('"', '')
      .split(',')
    if (
      force ||
      (configNodeIps &&
        existIntersection({
          oldWitnetNodes: oldWitnetNodes,
          currentNodeConfiguration: configNodeIps,
        }))
    ) {
      const replacement = `node_url = ${JSON.stringify(publicNodeUrls)}\n`
        .replace("'", '')
        .trim()
      fs.writeFileSync(
        path.join(sheikahPath, witnetConfigFileName),
        configFile.replace(nodeUrlConfigRegex, replacement),
      )
    }
  } catch (error) {
    console.log('Error overwriting configuration file', error)
  }
}

export default overwriteWitnetNodeConfiguration
