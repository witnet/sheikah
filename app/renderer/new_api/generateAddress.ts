import { ApiClient, ApiMethod, MethodArgs } from "./"
import { Address, GenericAPIError, GenerateAddressParams } from "../../common/runtimeTypes/wallet"
import { asRuntimeType } from "app/common/runtimeTypes"

export function generateAddress(
  client: ApiClient<ApiMethod, MethodArgs>,
  params: GenerateAddressParams) {
  return client
    .request("generateAddress", params)
    .then(handleGenerateAddressResponse)
    .catch(handleGenerateAddressError)
}

function handleGenerateAddressResponse(response: { address: Address }): Address {
  return asRuntimeType(response.address, Address)
}

function handleGenerateAddressError(error: GenericAPIError): GenericAPIError {
  return asRuntimeType(error, GenericAPIError)
}
