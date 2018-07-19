import log from "app/common/logging"
import { Serializer } from "app/common/serializers"
import { Cipher } from "app/main/ciphers"
import { Hasher } from "app/main/hashers"
import { Persister } from "app/main/persisters"

/**
 * A generic class that ties together all the pieces of a storage subsystem (serializer, cipher and
 * backend) and implements the data flow for getting and putting data from/into the store.
 */
export class Storage<KeyOut, Data, Serialized, Ciphered> {

  /**
   * The logtag is used in log lines to identify which storage is writing the logs.
   */
  private logtag: string

  constructor(
    private keyHasher: Hasher<string, KeyOut>,
    private serializer: Serializer<Data, Serialized>,
    private cipher: Cipher<Serialized, Ciphered>,
    private persister: Persister<KeyOut, Ciphered>) {

    this.logtag = `[${this.constructor.name} (${this.cipher.constructor.name}+`
      + `${this.persister.constructor.name})]`
  }

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
    log.debug(`${this.logtag}: getting "${key}"`)

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
    log.debug(`${this.logtag}: putting "${key}\nValue: ${JSON.stringify(value)}"`)

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
