import { standardizeTransactions } from '@/api'
import { describe, expect, test } from 'vitest'

const TRANSACTIONS_RESULT = {
  result: {
    total: '24',
    transactions: [
      {
        amount: '30000',
        transaction: {
          block: {
            block_hash:
              'f035340737b91c5d4b809f8780d9c7d236d05285cf5fde107048b764bf2d860f',
            epoch: '5613152',
          },
          confirmed: true,
          data: {
            value_transfer: {
              inputs: [
                {
                  address: 'twit1py55qev2etver5n8ehy9z6y0sxzthzef7ewr0h',
                  value: '125000000000',
                },
              ],
              outputs: [],
            },
          },
          hash: '3d0162a7233c820dda9fc8b7d59909c9d8a733dde0a48642ed3f98948c2e1171',
          miner_fee: '125000000000',
          timestamp: 1666687938,
        },
        type: 'NEGATIVE',
      },
      {
        amount: '30000',
        transaction: {
          block: {
            block_hash:
              'c4f380cf2d62b61afbfc771efa2451157c2f0ce41529c29265bab43424e75eea',
            epoch: '5613151',
          },
          confirmed: true,
          data: {
            value_transfer: {
              inputs: [
                {
                  address: 'twit1py55qev2etver5n8ehy9z6y0sxzthzef7ewr0h',
                  value: '125000000000',
                },
              ],
              outputs: [
                {
                  address: 'twit1ja42jmy3s73rsgqpq5szqk54p2vlwfxthud5fd',
                  output_type: 'EXTERNAL',
                  time_lock: 1646330429,
                  value: '30000',
                },
                {
                  address: 'twit1py55qev2etver5n8ehy9z6y0sxzthzef7ewr0h',
                  output_type: 'OTHER',
                  time_lock: 0,
                  value: '124999967000',
                },
              ],
            },
          },
          hash: '6ce8d7af8013eb00aef3435771a5a6c8b23ed84db6bae4761770352733cc2619',
          miner_fee: '3000',
          timestamp: 1666687928,
        },
        type: 'POSITIVE',
      },
    ],
  },
}

describe('Show transactions standardized', () => {
  test('shows transactions with the outputs and with empty outputs', () => {
    const result = standardizeTransactions(TRANSACTIONS_RESULT)
    const expected = {
      result: {
        total: '24',
        transactions: [
          {
            address: 'miner',
            amount: '30000',
            block:
              'f035340737b91c5d4b809f8780d9c7d236d05285cf5fde107048b764bf2d860f',
            confirmed: true,
            currentStage: 'IN PROGRESS',
            epoch: '5613152',
            fee: '125000000000',
            finalResult: null,
            id: '3d0162a7233c820dda9fc8b7d59909c9d8a733dde0a48642ed3f98948c2e1171',
            inputs: [
              {
                address: 'twit1py55qev2etver5n8ehy9z6y0sxzthzef7ewr0h',
                value: '125000000000',
              },
            ],
            label: '',
            outputs: [],
            reveals: [],
            rewards: null,
            rounds: null,
            timelocked: false,
            timestamp: 1666687938,
            transactionType: 'value_transfer',
            type: 'NEGATIVE',
            witnesses: null,
          },
          {
            address: 'twit1py55qev2etver5n8ehy9z6y0sxzthzef7ewr0h',
            amount: '30000',
            block:
              'c4f380cf2d62b61afbfc771efa2451157c2f0ce41529c29265bab43424e75eea',
            confirmed: true,
            currentStage: 'IN PROGRESS',
            epoch: '5613151',
            fee: '3000',
            finalResult: null,
            id: '6ce8d7af8013eb00aef3435771a5a6c8b23ed84db6bae4761770352733cc2619',
            inputs: [
              {
                address: 'twit1py55qev2etver5n8ehy9z6y0sxzthzef7ewr0h',
                value: '125000000000',
              },
            ],
            label: '',
            outputs: [
              {
                address: 'twit1ja42jmy3s73rsgqpq5szqk54p2vlwfxthud5fd',
                index: 0,
                outputType: 'EXTERNAL',
                timelock: 1646330429,
                value: '30000',
              },
              {
                address: 'twit1py55qev2etver5n8ehy9z6y0sxzthzef7ewr0h',
                index: 1,
                outputType: 'OTHER',
                timelock: 0,
                value: '124999967000',
              },
            ],
            reveals: [],
            rewards: null,
            rounds: null,
            timelocked: false,
            timestamp: 1666687928,
            transactionType: 'value_transfer',
            type: 'POSITIVE',
            witnesses: null,
          },
        ],
      },
    }
    delete result.result.transactions[0].date
    delete result.result.transactions[1].date
    expect(result).toStrictEqual(expected)
  })
})
