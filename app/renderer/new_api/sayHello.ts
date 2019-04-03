import { ApiClient, ApiMethod, MethodArgs } from "./"
import { SayHelloParams, JsonRT, GenericAPIError } from "../../common/runtimeTypes/wallet"
import { asRuntimeType } from "app/common/runtimeTypes"

export function sayHello(
  client: ApiClient<ApiMethod, MethodArgs>,
  params: SayHelloParams): Promise<JsonRT> {
  return client
    .request("say_hello", params)
    .then(handleSayHelloResponse)
    .catch(handleSayHelloError)
}

function handleSayHelloResponse(params: JsonRT): SayHelloParams {
  return asRuntimeType(params, SayHelloParams)
}

function handleSayHelloError(error: GenericAPIError): GenericAPIError {
  return asRuntimeType(error, GenericAPIError)
}
