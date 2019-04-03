import { ApiClient, ApiMethod, MethodArgs } from "./"
import { SayHelloParams, SayHelloResponse, JsonRT, GenericAPIError } from "../../common/runtimeTypes/wallet"
import { asRuntimeType } from "app/common/runtimeTypes"

export function sayHello(client: ApiClient<ApiMethod, MethodArgs>, params: SayHelloParams): Promise<any> {
  return client
    .request("say_hello", params)
    .then(handleSayHelloResponse)
    .catch(handleSayHelloError)
}

function handleSayHelloResponse(params: JsonRT): SayHelloResponse {
  return asRuntimeType(params, SayHelloResponse)
}

function handleSayHelloError(error: any): GenericAPIError {
  return asRuntimeType(error, GenericAPIError)
}
