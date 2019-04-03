import { ApiClient, ApiMethod, MethodArgs } from "./"
import { SendVTTParams, GenericAPIError, JsonRT } from "../../common/runtimeTypes/wallet"
import { asRuntimeType } from "app/common/runtimeTypes"

export function sendVTT(
  client: ApiClient<ApiMethod, MethodArgs>,
  params: SendVTTParams): Promise<JsonRT> {
  return client
    .request("sendVTT", params)
    .then(handleSendVTTRresponse)
    .catch(handleSendVTTSError)
}

// TODO: Change boolean to Transaction type
function handleSendVTTRresponse(response: true): boolean {
  return response
}

function handleSendVTTSError(error: GenericAPIError): GenericAPIError {
  return asRuntimeType(error, GenericAPIError)
}
