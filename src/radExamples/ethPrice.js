import * as Witnet from 'witnet-requests'

// Retrieves USD price of eth from the BitStamp API
const bitstamp = new Witnet.Source(
  'https://www.bitstamp.net/api/v2/ticker/ethusd/',
)
  .parseJSONMap() // Parse a `Map` from the retrieved `String`
  .getFloat('last') // Get the `Float` value associated to the `last` key
  .multiply(1000)
  .round()

// Retrieves USD price of eth from the coincap API
const coincap = new Witnet.Source('https://api.coincap.io/v2/assets')
  .parseJSONMap()
  .getArray('data')
  .getMap(1)
  .getFloat('priceUsd')
  .multiply(1000)
  .round()

// Retrieves USD price of eth from the coinpaprika API
const coinpaprika = new Witnet.Source(
  'https://api.coinpaprika.com/v1/tickers/eth-ethereum',
)
  .parseJSONMap()
  .getMap('quotes')
  .getMap('USD')
  .getFloat('price')
  .multiply(1000)
  .round()

// Filters out any value that is more than 1.5 times the standard
// deviationaway from the average, then computes the average mean of the
// values that pass the filter.
const aggregator = new Witnet.Aggregator({
  filters: [[Witnet.Types.FILTERS.deviationStandard, 1.5]],
  reducer: Witnet.Types.REDUCERS.averageMean,
})

// Filters out any value that is more than 1.0 times the standard
// deviationaway from the average, then computes the average mean of the
// values that pass the filter.
const tally = new Witnet.Tally({
  filters: [[Witnet.Types.FILTERS.deviationStandard, 1.5]],
  reducer: Witnet.Types.REDUCERS.averageMean,
})

// This is the Witnet.Request object that needs to be exported
const request = new Witnet.Request()
  .addSource(bitstamp) // Use source 1
  .addSource(coincap) // Use source 2
  .addSource(coinpaprika) // Use source 3
  .setAggregator(aggregator) // Set the aggregator function
  .setTally(tally) // Set the tally function
  .setQuorum(100, 70) // Set witness count
  .setFees(10, 1) // Set economic incentives
  .schedule(0) // Make this request immediately solvable

// Do not forget to export the request object
export { request as default }
