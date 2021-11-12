import fs from 'fs-extra'

import { overwriteWalletConfigFile } from '../../../../../src/background/utils/overwriteWalletConfigFile'

afterEach(() => {
  jest.restoreAllMocks()
})

describe('overwriteConfigFile', () => {
  it('Should overwrite the configuration file according to the parameters given', () => {
    jest.spyOn(fs, 'writeFileSync').mockImplementation()
    jest
      .spyOn(fs, 'readFileSync')
      .mockImplementation(() => 'node_url = "127.0.0.1:21338"')

    overwriteWalletConfigFile({
      sheikahPath: 'sheikah_path',
      publicNodeUrls: ['public_node_url1', 'public_node_url2'],
      witnetConfigFileName: 'witnet_config_file_name',
    })

    expect(fs.readFileSync).toBeCalledWith(
      'sheikah_path/witnet_config_file_name',
    )
    expect(fs.writeFileSync).toBeCalledWith(
      'sheikah_path/witnet_config_file_name',
      'node_url = ["public_node_url1","public_node_url2"]\n',
    )
  })

  it("Should handle error if read file doesn't exists", () => {
    jest.spyOn(fs, 'writeFileSync').mockImplementation()
    jest.spyOn(fs, 'readFileSync').mockImplementation()

    overwriteWalletConfigFile({
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
