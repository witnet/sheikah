import { ApiClient, ApiMethod, MethodArgs } from "./"
import { SendDataRequestParams, GenericAPIError, JsonRT } from "../../common/runtimeTypes/wallet"
import { asRuntimeType } from "../../../app/common/runtimeTypes"

export function sendDataRequest(
  client: ApiClient<ApiMethod, MethodArgs>,
  params: SendDataRequestParams): Promise<JsonRT> {
  return client
    .request("sendDataRequest", params)
    .then(handleSendDataRequestResponse)
    .catch(handleSendDataRequestError)
}

function handleSendDataRequestResponse(response: true): boolean {
  return response
}

function handleSendDataRequestError(error: GenericAPIError): GenericAPIError {
  return asRuntimeType(error, GenericAPIError)
}
