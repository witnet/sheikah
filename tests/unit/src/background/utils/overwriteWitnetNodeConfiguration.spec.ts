import fs from 'fs-extra'

import { overwriteWitnetNodeConfiguration } from '../../../../../src/background/utils/overwriteWitnetNodeConfiguration'

afterEach(() => {
  jest.restoreAllMocks()
})

describe('overwriteConfigFile', () => {
  it('Should overwrite the configuration with a single url according to the parameters given', () => {
    jest.spyOn(fs, 'writeFileSync').mockImplementation()
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementation(() => 'node_url = "public_node_url3"')

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

  it('Should overwrite the configuration with several nodes according to the parameters given', () => {
    jest.spyOn(fs, 'writeFileSync').mockImplementation()
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementation(
        () => 'node_url = ["public_node_url3","public_node_url4"]',
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

  it("Should handle error if read file doesn't exists", () => {
    jest.spyOn(fs, 'writeFileSync').mockImplementation()
    jest.spyOn(fs, 'readFileSync').mockImplementation()

    overwriteWitnetNodeConfiguration({
      sheikahPath: 'sheikah_path',
      publicNodeUrls: ['public_node_url1', 'public_node_url2'],
      witnetConfigFileName: 'witnet_config_file_name',
    })

    expect(fs.readFileSync).toBeCalledWith(
      'sheikah_path/witnet_config_file_name',
    )
    expect(fs.writeFileSync).not.toBeCalled()
  })
})
