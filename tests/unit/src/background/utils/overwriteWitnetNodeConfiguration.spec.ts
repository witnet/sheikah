import fs from 'fs-extra'

import { overwriteWitnetNodeConfiguration } from '../../../../../src/background/utils/overwriteWitnetNodeConfiguration'

afterEach(() => {
  jest.restoreAllMocks()
})

describe('overwriteConfigFile', () => {
  it('Should overwrite config only if there is an old witnet node ip', () => {
    jest.spyOn(fs, 'writeFileSync').mockImplementation()
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true)
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementation(
        () =>
          'string from toml \nnode_url = ["public_node_url_old","public_node_url4"]',
      )
    overwriteWitnetNodeConfiguration(false, {
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

  it('Should overwrite config if there is only one old witnet node ip', () => {
    jest.spyOn(fs, 'writeFileSync').mockImplementation()
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true)
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementation(
        () => 'string from toml \nnode_url = "public_node_url_old"',
      )
    overwriteWitnetNodeConfiguration(false, {
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

  it('Should not overwrite if there is no old nodes in the config file', () => {
    jest.spyOn(fs, 'writeFileSync').mockImplementation()
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true)
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementation(() => 'node_url = "public_node_url_personal"')
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

  it("Should handle error if read file doesn't exists", () => {
    jest.spyOn(fs, 'writeFileSync').mockImplementation()
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true)
    jest.spyOn(fs, 'readFileSync').mockImplementation()

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
