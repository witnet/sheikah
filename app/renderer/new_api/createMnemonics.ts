import { ApiClient, ApiMethod, MethodArgs } from "./"
import { GenericAPIError, CreateMnemonicsParams, Mnemonics, JsonRT } from "../../common/runtimeTypes/wallet"
import { asRuntimeType } from "app/common/runtimeTypes"

export function createMnemonics(
  client: ApiClient<ApiMethod, MethodArgs>,
  params: CreateMnemonicsParams): Promise<JsonRT> {
  return client
    .request("createMnemonics", params)
    .then(handleCreateMnemonicsResponse)
    .catch(handleCreateMnemonicsError)
}

function handleCreateMnemonicsResponse(response: { mnemonics: Mnemonics }): Mnemonics {
  return asRuntimeType(response, Mnemonics)
}

function handleCreateMnemonicsError(error: GenericAPIError): GenericAPIError {
  return asRuntimeType(error, GenericAPIError)
}
