import { ExternalFinalKey, FinalKeyMetadata } from "app/common/runtimeTypes/storage/wallets"

/**
 * Payment request status according to the funds received
 */
export type FundedStatus = "pending" | "partially funded" | "funded" | "overfunded"

/**
 * Payment request status according to the expiration status
 */
export type ExpiredStatus = "expired" | "not expired" | "unknown"

/**
 * Payment request UI action
 */
export interface Action {
  text: string,
  onClick: Function,
}

/**
 * Computed payment request type
 */
export interface ComputedPaymentRequest {
  // Expiration status
  expiredStatus: ExpiredStatus,

  // Funded status
  fundedStatus: FundedStatus,

  // Funds (in WITs)
  funds: number,

  // Address
  address: string,

  // Optional metadata
  metadata?: FinalKeyMetadata,

  // Actions
  actions: Array<Action>,
}

/**
 * Type to represent an array of payment requests (as represented in the UI)
 */
export type ComputedPaymentRequests = Array<ComputedPaymentRequest>

/**
 * Function to build a computed payment request from an external final key
 */
export function buildComputedPaymentRequest(
  fk: ExternalFinalKey,
  address: string,
  funds: number,
  actions?: Array<Action>
) {
  // Check funds
  const fundedStatus = computeFundedStatus(
    funds,
    fk.metadata && fk.metadata.requestedAmount
  )

  // Check expiration date
  const expiredStatus = computeExpiredStatus(
    fundedStatus,
    fk.metadata && fk.metadata.expirationDate
  )

  return {
    expiredStatus,
    fundedStatus,
    funds,
    address,
    metadata: fk.metadata,
    actions,
  }
}

/**
 * Function to get payment request funded status
 */
function computeFundedStatus(
  funds: number,
  requestedAmount?: number
): FundedStatus {
  return (
    (funds === 0)
      // No funds were received => PENDING
      ? "pending"
      // Funds were received...
      : (!requestedAmount)
        // and no amount was requested => FUNDED
        ? "funded"
        // , an amount was requested...
        : (funds === requestedAmount)
          // and the requested amount equals the funds => FUNDED
          ? "funded"
          // , the requested amount is different from the funds received...
          : (funds > requestedAmount)
            // and it is greater => OVERFUNDED
            ? "overfunded"
            // and it is smaller => PARTIALLY FUNDED
            : "partially funded"
  )
}

/**
 * Function to get payment request expiration status
 */
function computeExpiredStatus(
  fundedStatus: FundedStatus,
  expirationDate?: number
): ExpiredStatus {
  const nowTs = Math.floor(Date.now() / 1000)

  return (
    (!expirationDate)
      // There is no expiration date => UNKNOWN
      ? "unknown"
      // There is an expiration date...
      : (nowTs < expirationDate)
        // and it has not come yet => NOT EXPIRED
        ? "not expired"
        // , the expiration date has already come...
        : (fundedStatus !== "pending")
          // but some funds were received => UNKNOWN
          ? "unknown"
          // and no funds were received => EXPIRED
          : "expired"
  )
}
