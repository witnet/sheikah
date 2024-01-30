import fs from 'fs-extra'
import { describe, expect, test, vi, afterEach } from 'vitest'

import { overwriteWitnetNodeConfiguration } from '../../../../../electron/walletManager'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('overwriteConfigFile', () => {
  test('Should overwrite the configuration with a single url according to the parameters given', () => {
    vi.spyOn(fs, 'writeFileSync').mockImplementation
    vi.spyOn(fs, 'readFileSync').mockImplementation(
      () => 'node_url = "public_node_url3"',
    )

    overwriteWitnetNodeConfiguration({
      sheikahPath: 'sheikah_path',
      publicNodeUrls: ['public_node_url1', 'public_node_url2'],
      witnetConfigFileName: 'witnet_config_file_name',
    })

    expect(fs.readFileSync).toBeCalledWith(
      'sheikah_path/witnet_config_file_name',
    )
    expect(fs.writeFileSync).toBeCalledWith(
      'sheikah_path/witnet_config_file_name',
      // eslint-disable-next-line no-useless-escape
      `node_url = [\"public_node_url1\",\"public_node_url2\"]`,
    )
  })

  test('Should overwrite the configuration with several nodes according to the parameters given', () => {
    vi.spyOn(fs, 'writeFileSync').mockImplementation
    vi.spyOn(fs, 'readFileSync').mockImplementation(
      () => 'node_url = "public_node_url3","public_node_url4"',
    )

    overwriteWitnetNodeConfiguration({
      sheikahPath: 'sheikah_path',
      publicNodeUrls: ['public_node_url1', 'public_node_url2'],
      witnetConfigFileName: 'witnet_config_file_name',
      oldWitnetNodes: ['public_node_url_old'],
    })
    expect(fs.readFileSync).toBeCalledWith(
      'sheikah_path/witnet_config_file_name',
    )
    expect(fs.writeFileSync).toBeCalledWith(
      'sheikah_path/witnet_config_file_name',
      `string from toml \nnode_url = [\"public_node_url1\",\"public_node_url2\"]`,
    )
  })

  test("Should handle error if read file doesn't exists", () => {
    vi.spyOn(fs, 'writeFileSync').mockImplementation
    vi.spyOn(fs, 'readFileSync').mockImplementation

    overwriteWitnetNodeConfiguration(false, {
      sheikahPath: 'sheikah_path',
      publicNodeUrls: ['public_node_url1', 'public_node_url2'],
      witnetConfigFileName: 'witnet_config_file_name',
      oldWitnetNodes: ['public_node_url_old'],
    })

    expect(fs.readFileSync).toBeCalledWith(
      'sheikah_path/witnet_config_file_name',
    )
    expect(fs.writeFileSync).not.toBeCalled()
  })
})
