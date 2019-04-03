import { ApiClient, ApiMethod, MethodArgs } from "./"
import { CreateDataRequestParams, GenericAPIError, DataRequest, JsonRT } from "../../common/runtimeTypes/wallet"
import { asRuntimeType } from "app/common/runtimeTypes"

export function createDataRequest(
  client: ApiClient<ApiMethod, MethodArgs>,
  params: CreateDataRequestParams): Promise<JsonRT> {
  return client
    .request("createDataRequest", params)
    .then(handleCreateDataRequestResponse)
    .catch(handleCreateDataRequestError)
}

function handleCreateDataRequestResponse(response: {dataRequest: DataRequest }): DataRequest {
  return asRuntimeType(response.dataRequest, DataRequest)
}

function handleCreateDataRequestError(error: GenericAPIError): GenericAPIError {
  return asRuntimeType(error, GenericAPIError)
}
