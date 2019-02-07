import { jsonFixtures } from "./json.fixtures"
import { jsonSerializer } from "app/common/serializers"

describe("JsonSerializer", () => {
  jsonFixtures.valid.forEach(({ value, serialized }, index) => {
    it(`should serialize object #${index}`, async () => {
      const _serialized = await jsonSerializer.serialize(value)
      expect(_serialized).toEqual(serialized)
    })
    it(`should deserialize object #${index}`, async () => {
      const deserialized = await jsonSerializer.deserialize(serialized)
      expect(deserialized).toEqual(value)
    })
  })

  jsonFixtures.invalid.forEach(({ serialized, error }, index) => {
    it(`should fail to deserialize non-JSON input #${index}`, async () => {
      jsonSerializer.deserialize(serialized).catch((e) => {
        expect(e).toEqual(error)
      })
    })
  })
})
