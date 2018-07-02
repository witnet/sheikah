import Cipher from "app/main/ciphers"
import Persister from "app/main/persisters"
import { Hasher } from "app/main/hashers"
import { Serializer } from "app/common/serializers"

/**
 * A generic class that ties together all the pieces of a storage subsystem (serializer, cipher and
 * backend) and implements the data flow for getting and putting data from/into the store.
 */
export default class Storage<KeyOut, Data, Serialized, Ciphered> {

  constructor(
    private keyHasher: Hasher<string, KeyOut>,
    private serializer: Serializer<Data, Serialized>,
    private cipher: Cipher<Serialized, Ciphered>,
    private persister: Persister<KeyOut, Ciphered>) { }

  /**
   * Storage closing function.
   * This is used to tell the storage backend to close/free all file descriptors when shutting down
   * the application.
   */
  public close = async (): Promise<void> => this.persister.close()

  /**
   * Get the value identified by a certain key from the storage.
   * @param key
   */
  public get = async (key: string): Promise<Data> => {
    return Promise.resolve(key)
      .then(this.keyHasher)
      .then(this.persister.get)
      .then(this.cipher.decrypt)
      .then(this.serializer.deserialize)
  }

  /**
   * Put some value in the storage, identified by a certain key.
   * @param key
   * @param value
   */
  public put = async (key: string, value: Data): Promise<void> => {
    return Promise.all([
      Promise.resolve(key)
        .then(this.keyHasher),
      Promise.resolve(value)
        .then(this.serializer.serialize)
        .then(this.cipher.encrypt)
    ])
      .then((args) => this.persister.put.apply(this, args))
  }

}