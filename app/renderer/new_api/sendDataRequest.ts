import { ApiClient, ApiMethod, MethodArgs } from "./"
import { SendDataRequestParams, GenericAPIError } from "../../common/runtimeTypes/wallet"
import { asRuntimeType } from "app/common/runtimeTypes"

export function sendDataRequest(client: ApiClient<ApiMethod, MethodArgs>, params: SendDataRequestParams): Promise<any> {
  return client
    .request("sendDataRequest", params)
    .then(handleSendDataRequestResponse)
    .catch(handleSendDataRequestError)
}

function handleSendDataRequestResponse(response: true): boolean {
  return response
}

function handleSendDataRequestError(error: any): GenericAPIError {
  return asRuntimeType(error, GenericAPIError)
}
