import callApi from "./helpers/callApi";

/**
 * Note: Limited to 1,000 items
 */
export default async function getDepositHistory(
  options: {
    symbol?: string;
  } = {}
): Promise<
  Array<{
    timestamp: Date;
    symbol: string;
    amount: number;
    fee: number;
  }>
> {
  const response = await callApi<
    Array<{
      timestamp: number;
      symbol: string;
      amount: string;
      address: string;
      paymentId?: string;
      txId?: string;
      fee: string;
    }>
  >({
    method: "GET",
    path: "/depositHistory",
    query: {
      ...options,
      limit: "1000",
    },
  });

  return response.map((deposit) => ({
    timestamp: new Date(deposit.timestamp),
    symbol: deposit.symbol,
    amount: parseFloat(deposit.amount),
    fee: parseFloat(deposit.fee),
  }));
}
