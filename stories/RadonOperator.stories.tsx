import * as React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { RadonType } from "../app/renderer/radon"
import { RadonOperator } from "../app/renderer/ui/components/radonOperator"
storiesOf("RadonOperator", module)
  .add("Array", () => (
    <RadonOperator inputType={RadonType.Array} />
  ))
  .add("Boolean", () => (
    <RadonOperator inputType={RadonType.Boolean} />
  ))
  .add("Float", () => (
    <RadonOperator inputType={RadonType.Float} />
  ))
  .add("Int", () => (
    <RadonOperator inputType={RadonType.Int} />
  ))
  .add("Map", () => (
    <RadonOperator inputType={RadonType.Map} />
  ))
  .add("Mixed", () => (
    <RadonOperator inputType={RadonType.Mixed} />
  ))
  // .add("Null", () => (
  //   <RadonOperator inputType={RadonType.Null} />
  // ))
  .add("Result", () => (
    <RadonOperator inputType={RadonType.Result} />
  ))
  .add("String", () => (
    <RadonOperator inputType={RadonType.String} />
  ))
