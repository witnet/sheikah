import * as React from "react"
import { storiesOf } from "@storybook/react"
import { RadonQuery } from "../app/renderer/ui/components/query"

storiesOf("RadonQuery", module)
  .add("RadonQuery", () => {
    const retrieve = {
      notBefore: 0,
      retrieve: [
        { kind: "HTTP_GET",
          url: "https://openweathermap.org/data/2.5/weather?id=2950159&appid=b6907d289e10d714a6e88b30761fae2",
          script: [
            0x43,
            0x74,
            [ 0x61, "main" ],
            0x74,
            [ 0x61, "temp" ],
            0x72,
          ],
        }],
      aggregate:
        { script: [
          0x53,
          [ 0x52, 0x00, -30 ],
          [ 0x52, 0x01, 50 ],
          [ 0x52, 0x03, 2 ],
          [ 0x56, 0x03 ],
        ],
        },
      consensus:
        { script: [
          0x53,
          [ 0x56, 0x03 ],
        ] },
      deliver: [
        { kind: "HTTP_POST", url: "https://localhost:3000" },
      ],
    }

    return <RadonQuery request={retrieve} />
  }
  )
