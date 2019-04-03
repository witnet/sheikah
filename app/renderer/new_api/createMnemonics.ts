import { ApiClient, ApiMethod, MethodArgs } from "./"
import { GenericAPIError, CreateMnemonicsParams, Mnemonics } from "../../common/runtimeTypes/wallet"
import { asRuntimeType } from "app/common/runtimeTypes"

export function createMnemonics(client: ApiClient<ApiMethod, MethodArgs>, params: CreateMnemonicsParams): Promise<any> {
  return client
    .request("createMnemonics", params)
    .then(handleCreateMnemonicsResponse)
    .catch(handleCreateMnemonicsError)
}

function handleCreateMnemonicsResponse(response: { mnemonics: Mnemonics }): Mnemonics {
  return asRuntimeType(response, Mnemonics)
}

function handleCreateMnemonicsError(error: any): GenericAPIError {
  return asRuntimeType(error, GenericAPIError)
}
