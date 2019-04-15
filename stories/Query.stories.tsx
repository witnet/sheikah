import * as React from "react"
import { storiesOf } from "@storybook/react"
import { RadonQuery, RadonScript } from "../app/renderer/ui/components/query"

storiesOf("Radon", module)
  .add("RadonScript", () => {
    return <RadonScript radonScript={["ARRAY_COUNT", "FLOAT_MODULO", "STRING_LENGTH"]} />
  })
  .add("RadonQuery", () => {
    const retrieve = {
      notBefore: 0,
      retrieve: [
        { kind: "HTTP_GET",
          url: "https://openweathermap.org/data/2.5/weather?id=2950159&appid=b6907d289e10d714a6e88b30761fae2",
          script: [
            "STRING_PARSEJSON",
            "MIXED_TOMAP",
            [ "MAP_GET", "main" ],
            "MIXED_TOMAP",
            [ "MAP_GET", "temp" ],
            "MIXED_TOFLOAT",
          ] },
      ],
      aggregate:
        { script: [
          "ARRAY_FLATMAP",
          [ "ARRAY_FILTER", "FILTER_GT", -30 ],
          [ "ARRAY_FILTER", "FILTER_LT", 50 ],
          [ "ARRAY_FILTER", "FILTER_DEV_ABS", 2 ],
          [ "ARRAY_REDUCE", "REDUCER_AVG_MEAN" ],
        ],
        },
      consensus:
        { script: [
          "ARRAY_FLATMAP",
          [ "ARRAY_REDUCE", "REDUCE_AVG_MEAN" ],
        ] },
      deliver: [
        { kind: "HTTP_POST", url: "https://localhost:3000" },
      ],
    }
    return <RadonQuery request={retrieve} />
  }
  )
