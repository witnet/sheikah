<template>
  <div class="transaction-list">
    <Fieldset
      title="Transactions"
      :subtitle="`${transactionsLength} transactions`"
    />
    <p class="title">
      <span class="label">Transactions</span>
      <span class="number" data-test="transactions-length"
        >{{ transactionsLength }} transactions</span
      >
    </p>
    <div class="list">
      <Transaction
        v-for="transaction in paginatedItems"
        :id="transaction.id"
        :key="transaction.id"
        :currency="currency"
        :type="transaction.type"
        :inputs="transaction.inputs"
        :outputs="transaction.outputs"
        :fee="transaction.fee"
        :date="transaction.date"
        :time-ago="transaction.timeAgo"
        :label="transaction.label"
        :amount="transaction.amount"
        :block="transaction.block"
        :epoch="transaction.epoch"
        :witnesses="transaction.witnesses"
        :rewards="transaction.rewards"
        :rounds="transaction.rounds"
        :state="transaction.currentStage"
        :timelocked="transaction.timelocked"
        :reveals="transaction.reveals"
        :result="transaction.finalResult"
        :transaction-type="transaction.transactionType"
      />
      <div
        v-if="transactions.length === 0"
        class="no-transactions-container"
        data-test="empty-transactions"
      >
        <p class="no-transactions-text">You don't have transactions</p>
      </div>
    </div>
    <div
      v-show="transactions.length > itemsPerPage"
      class="pagination-nav"
      data-test="pagination"
    >
      <el-pagination
        layout="prev, pager, next"
        :total="transactions.length"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Transaction from './Transaction'

export default {
  name: 'TransactionList',
  components: {
    Transaction,
  },
  props: {
    currency: {
      type: String,
      required: true,
    },
    transactions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 13,
    }
  },
  computed: {
    paginatedItems() {
      const from = this.currentPage * this.itemsPerPage - this.itemsPerPage
      const to = this.currentPage * this.itemsPerPage
      return this.transactions.slice(from, to)
    },
    transactionsLength() {
      return this.transactions.length
    },
  },
  watch: {
    currentPage(value) {
      this.setCurrentTransactionsPage({ page: value })
    },
  },
  methods: {
    ...mapMutations({
      setCurrentTransactionsPage: 'setCurrentTransactionsPage',
    }),
    handleCurrentChange(val) {
      this.currentPage = val
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.transaction-list {
  display: grid;
  grid-template-rows: max-content max-content 1fr;

  .label {
    color: $alt-grey-5;
    font-size: 16px;
    font-weight: 600;
  }

  .number {
    color: $alt-grey-3;
    font-size: 14px;
    margin-left: 8px;
  }

  .list {
    background-color: $white;
    border: 0.5px solid rgb(224, 224, 224);
    border-radius: 4px;
    box-shadow: $card-box-shadow;
    overflow: auto;
  }

  .no-transactions-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 24px;

    .no-transactions-text {
      color: $alt-grey-5;
      font-size: 16px;
      font-style: italic;
      font-weight: 400;
    }

    .no-transactions-img {
      margin-bottom: 16px;
      width: 40px;
    }
  }

  .pagination-nav {
    align-self: flex-end;
    padding: 16px 0 0 0;
    text-align: center;
  }

  .title {
    margin-bottom: 16px;
  }
}
</style>

<docs>
### Example
#### Empty
```jsx
  <TransactionList :transactions="[]" currency="nanoWits" />
```

#### Without pagination
```jsx
  const transactions = [{
    block: "511482fc9161cd17545561449c0d7aae19c9986e4119db355bb9637c7804003f",
    border: "false",
    date: "JAN 19, 1970 @ 10:00:31",
    timeAgo: "33 minutes ago",
    fee: 12,
    id: "600338d94f4ef28281fbe37d5c82cf721d677f88f256be12cfae6498ed972109",
    outputs: [
      { value: 123, address: 'twit1vclrvjt7jf4jk8phyvxukctwsh0l0f8v9r8ffq' },
      { value: 499999999865, address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44' }
    ],
    inputs: [{ value: 500000000000, address: 'twit1syp754tutlpnqf4a492dssrv3lqtwqxjp4nq44' }],
    type: "POSITIVE",
    transactionType: "value_transfer",
    amount: 123
  }]

  <TransactionList
    currency="nanoWits"
    :transactions="transactions"
  />
```

#### With pagination
```jsx
  const transactions = [{
    id: '3fd836aed72e79d7ae80cde032b554f43b9a70efce22211f954f5148c21040fd',
    type: 'POSITIVE',
    inputs: null,
    outputs: [
      {
        value: 250000000000,
        address: 'twit1yy2eplt7zpnvycspnc96wse485ezwmzd6kzlxg',
      },
      {
        value: 250000000000,
        address: 'twit1sraz4xlpec7kyng4g75gslwylxd3hw5fukvvj2',
      },
    ],
    fee: 0,
    date: 'JUN 04, 2020 @ 18:40:00',
    timestamp: 1591288800,
    label: '',
    amount: 250000000000,
    block: '006c56477fe98e3190579c16c80b929224ac561839d2c6e44310a3f16bc11522',
    witnesses: null,
    rewards: null,
    rounds: null,
    currentStage: 'IN PROGRESS',
    reveals: null,
    finalResult: null,
    transactionType: 'mint',
  },
  {
    id: '6e80fe8b495661c8c8a409ee0dd7a6f92eb1cd682d874e26aad8e7c0d1dc36cb',
    type: 'POSITIVE',
    inputs: null,
    outputs: [
      {
        value: 250000000000,
        address: 'twit1yy2eplt7zpnvycspnc96wse485ezwmzd6kzlxg',
      },
      {
        value: 250000000000,
        address: 'twit1sraz4xlpec7kyng4g75gslwylxd3hw5fukvvj2',
      },
    ],
    fee: 0,
    date: 'JUN 04, 2020 @ 18:39:30',
    timestamp: 1591288770,
    label: '',
    amount: 250000000000,
    block: 'eceda36a8448508aad272549928c1ab295e830f801b86841949de57c53837e72',
    witnesses: null,
    rewards: null,
    rounds: null,
    currentStage: 'IN PROGRESS',
    reveals: null,
    finalResult: null,
    transactionType: 'mint',
  },
  {
    id: 'd3f1f6271c5da7207d518262c13714a258e6ea6acb8e781e4b49cc82e31d2c66',
    type: 'POSITIVE',
    inputs: null,
    outputs: [
      {
        value: 250000000000,
        address: 'twit1yy2eplt7zpnvycspnc96wse485ezwmzd6kzlxg',
      },
      {
        value: 250000000000,
        address: 'twit1sraz4xlpec7kyng4g75gslwylxd3hw5fukvvj2',
      },
    ],
    fee: 0,
    date: 'JUN 04, 2020 @ 18:39:00',
    timestamp: 1591288740,
    label: '',
    amount: 250000000000,
    block: 'f25cefece30d519814ab435e240a88fa0a19aad1a0cb2391701febc2c6f1c43a',
    witnesses: null,
    rewards: null,
    rounds: null,
    currentStage: 'IN PROGRESS',
    reveals: null,
    finalResult: null,
    transactionType: 'mint',
  },
  {
    id: '5b7911f0bc47b58687b776ae94bfd054115ba8d31887fb24b51b45480f59950f',
    type: 'POSITIVE',
    inputs: null,
    outputs: [
      {
        value: 250000000000,
        address: 'twit1yy2eplt7zpnvycspnc96wse485ezwmzd6kzlxg',
      },
      {
        value: 250000000000,
        address: 'twit1sraz4xlpec7kyng4g75gslwylxd3hw5fukvvj2',
      },
    ],
    fee: 0,
    date: 'JUN 04, 2020 @ 18:38:30',
    timestamp: 1591288710,
    label: '',
    amount: 250000000000,
    block: 'caab7b6c47e07f4a2b811b0106c1984016dba466e747e35353f356f5847fb0d1',
    witnesses: null,
    rewards: null,
    rounds: null,
    currentStage: 'IN PROGRESS',
    reveals: null,
    finalResult: null,
    transactionType: 'mint',
  },
  {
    id: '058e206f9a510ca8f16b32f233a0a4d42e265c4fa45ffcb21556c6544de73330',
    type: 'POSITIVE',
    inputs: null,
    outputs: [
      {
        value: 250000000000,
        address: 'twit1yy2eplt7zpnvycspnc96wse485ezwmzd6kzlxg',
      },
      {
        value: 250000000000,
        address: 'twit1sraz4xlpec7kyng4g75gslwylxd3hw5fukvvj2',
      },
    ],
    fee: 0,
    date: 'JUN 04, 2020 @ 18:38:00',
    timestamp: 1591288680,
    label: '',
    amount: 250000000000,
    block: 'c42e5f17b2fbb97ea1e3fbabf0fb955405c7dcf2f7b0a36c5ca7cf961fa1ff06',
    witnesses: null,
    rewards: null,
    rounds: null,
    currentStage: 'IN PROGRESS',
    reveals: null,
    finalResult: null,
    transactionType: 'mint',
  },
  {
    id: '7f7e3fd7e9d869bfe532c6a67d8781191fb21a9780a072eabedcd776ff3a7f04',
    type: 'POSITIVE',
    inputs: null,
    outputs: [
      {
        value: 250000000000,
        address: 'twit1yy2eplt7zpnvycspnc96wse485ezwmzd6kzlxg',
      },
      {
        value: 250000000000,
        address: 'twit1sraz4xlpec7kyng4g75gslwylxd3hw5fukvvj2',
      },
    ],
    fee: 0,
    date: 'JUN 04, 2020 @ 18:37:30',
    timestamp: 1591288650,
    label: '',
    amount: 250000000000,
    block: 'fd4ddca52ef20d72f460eb5cf0c3131138b899564b3e4cb300a42e855bb36652',
    witnesses: null,
    rewards: null,
    rounds: null,
    currentStage: 'IN PROGRESS',
    reveals: null,
    finalResult: null,
    transactionType: 'mint',
  },
  {
    id: 'e412d20b12b0997276ff8dce57be5aa75b10d8f678c23f11d0a0a46c50e10cca',
    type: 'POSITIVE',
    inputs: null,
    outputs: [
      {
        value: 250000000000,
        address: 'twit1yy2eplt7zpnvycspnc96wse485ezwmzd6kzlxg',
      },
      {
        value: 250000000000,
        address: 'twit1sraz4xlpec7kyng4g75gslwylxd3hw5fukvvj2',
      },
    ],
    fee: 0,
    date: 'JUN 04, 2020 @ 18:37:00',
    timestamp: 1591288620,
    label: '',
    amount: 250000000000,
    block: '9e9d9de97de52fd8ecd6de20b4b442ee8107bbf1d5b43f0b4f1a6bdcd90e9ed7',
    witnesses: null,
    rewards: null,
    rounds: null,
    currentStage: 'IN PROGRESS',
    reveals: null,
    finalResult: null,
    transactionType: 'mint',
  },
  {
    id: 'de163e82e60aeed550009d16223d4060852b90ea15b4d678126312c1da02fdb8',
    type: 'POSITIVE',
    inputs: null,
    outputs: [
      {
        value: 250000000000,
        address: 'twit1yy2eplt7zpnvycspnc96wse485ezwmzd6kzlxg',
      },
      {
        value: 250000000000,
        address: 'twit1sraz4xlpec7kyng4g75gslwylxd3hw5fukvvj2',
      },
    ],
    fee: 0,
    date: 'JUN 04, 2020 @ 18:36:30',
    timestamp: 1591288590,
    label: '',
    amount: 250000000000,
    block: '27cb7b4a8c41a3950dcc38f8ee4face9f0076e6de626e4e15b34704e588382d3',
    witnesses: null,
    rewards: null,
    rounds: null,
    currentStage: 'IN PROGRESS',
    reveals: null,
    finalResult: null,
    transactionType: 'mint',
  },
  {
    id: '3618b7ac2351ee27102d34f26efc3ee1b02423bce1b432f45635a0d5cc2722ef',
    type: 'POSITIVE',
    inputs: null,
    outputs: [
      {
        value: 250000000000,
        address: 'twit1yy2eplt7zpnvycspnc96wse485ezwmzd6kzlxg',
      },
      {
        value: 250000000000,
        address: 'twit1sraz4xlpec7kyng4g75gslwylxd3hw5fukvvj2',
      },
    ],
    fee: 0,
    date: 'JUN 04, 2020 @ 18:36:00',
    timestamp: 1591288560,
    label: '',
    amount: 250000000000,
    block: '708dfe448fc50bc75cad4113e82d608eb730f8e98591b7871de09211c82d3b2b',
    witnesses: null,
    rewards: null,
    rounds: null,
    currentStage: 'IN PROGRESS',
    reveals: null,
    finalResult: null,
    transactionType: 'mint',
  },
  {
    id: '5ba580a081aefd6082232659508b289d5c6fb3a93bc03ffcac050e178ecc9ac3',
    type: 'POSITIVE',
    inputs: null,
    outputs: [
      {
        value: 250000000000,
        address: 'twit1yy2eplt7zpnvycspnc96wse485ezwmzd6kzlxg',
      },
      {
        value: 250000000000,
        address: 'twit1sraz4xlpec7kyng4g75gslwylxd3hw5fukvvj2',
      },
    ],
    fee: 0,
    date: 'JUN 04, 2020 @ 18:35:30',
    timestamp: 1591288530,
    label: '',
    amount: 250000000000,
    block: 'cea4abb20d01eb31b0bc6c9ba5acc06a51aed67d0ee8fd6cbef9e05b63c0f566',
    witnesses: null,
    rewards: null,
    rounds: null,
    currentStage: 'IN PROGRESS',
    reveals: null,
    finalResult: null,
    transactionType: 'mint',
  },
  {
    id: 'e3dad41acb8514f4855d15c42bee1df8b0365baede6d95a0a624112d56c26499',
    type: 'POSITIVE',
    inputs: null,
    outputs: [
      {
        value: 250000000000,
        address: 'twit1yy2eplt7zpnvycspnc96wse485ezwmzd6kzlxg',
      },
      {
        value: 250000000000,
        address: 'twit1sraz4xlpec7kyng4g75gslwylxd3hw5fukvvj2',
      },
    ],
    fee: 0,
    date: 'JUN 04, 2020 @ 18:35:00',
    timestamp: 1591288500,
    label: '',
    amount: 250000000000,
    block: '86debc21d03636ea8bab370d7602e43b1a328624e10ead0db4ad50cd52149b59',
    witnesses: null,
    rewards: null,
    rounds: null,
    currentStage: 'IN PROGRESS',
    reveals: null,
    finalResult: null,
    transactionType: 'mint',
  },
  {
    id: '7abbe3053d87f3572748ecd249d0b797bffcda8a4a5ee5fb6e08952717106d99',
    type: 'POSITIVE',
    inputs: null,
    outputs: [
      {
        value: 250000000000,
        address: 'twit1yy2eplt7zpnvycspnc96wse485ezwmzd6kzlxg',
      },
      {
        value: 250000000000,
        address: 'twit1sraz4xlpec7kyng4g75gslwylxd3hw5fukvvj2',
      },
    ],
    fee: 0,
    date: 'JUN 04, 2020 @ 18:34:30',
    timestamp: 1591288470,
    label: '',
    amount: 250000000000,
    block: '7eea52ebedf2b46f1c11a96cfc6d7b1583912a87bd510d5f77d1fc9dd79fa066',
    witnesses: null,
    rewards: null,
    rounds: null,
    currentStage: 'IN PROGRESS',
    reveals: null,
    finalResult: null,
    transactionType: 'mint',
  },
  {
    id: '9a08cb803625aa5ff053c7e0cd8598fa6c4512b9755c115055e4929871c8eea7',
    type: 'POSITIVE',
    inputs: null,
    outputs: [
      {
        value: 250000000000,
        address: 'twit1yy2eplt7zpnvycspnc96wse485ezwmzd6kzlxg',
      },
      {
        value: 250000000000,
        address: 'twit1sraz4xlpec7kyng4g75gslwylxd3hw5fukvvj2',
      },
    ],
    fee: 0,
    date: 'JUN 04, 2020 @ 18:34:00',
    timestamp: 1591288440,
    label: '',
    amount: 250000000000,
    block: 'e454ea92662711814eaa716c725ed1cd0a05528b82193c28585d187df725dd1d',
    witnesses: null,
    rewards: null,
    rounds: null,
    currentStage: 'IN PROGRESS',
    reveals: null,
    finalResult: null,
    transactionType: 'mint',
  },
  {
    id: 'b84c0b56e6e9198f98928ce8aa270b473eb1755cc67ec194b3261bfd77daebc9',
    type: 'POSITIVE',
    inputs: null,
    outputs: [
      {
        value: 250000000000,
        address: 'twit1yy2eplt7zpnvycspnc96wse485ezwmzd6kzlxg',
      },
      {
        value: 250000000000,
        address: 'twit1sraz4xlpec7kyng4g75gslwylxd3hw5fukvvj2',
      },
    ],
    fee: 0,
    date: 'JUN 04, 2020 @ 18:33:30',
    timestamp: 1591288410,
    label: '',
    amount: 250000000000,
    block: 'ce9a5f49caab4fbcaae7c831d2264dd9535f6cc4fdf056337cd24e2ace003d37',
    witnesses: null,
    rewards: null,
    rounds: null,
    currentStage: 'IN PROGRESS',
    reveals: null,
    finalResult: null,
    transactionType: 'mint',
  },
  {
    id: 'a9ea936c75d6d3ae3c672f9774198a8ac78b11873d93713367c6f62046cb0583',
    type: 'POSITIVE',
    inputs: null,
    outputs: [
      {
        value: 250000000000,
        address: 'twit1yy2eplt7zpnvycspnc96wse485ezwmzd6kzlxg',
      },
      {
        value: 250000000000,
        address: 'twit1sraz4xlpec7kyng4g75gslwylxd3hw5fukvvj2',
      },
    ],
    fee: 0,
    date: 'JUN 04, 2020 @ 18:33:00',
    timestamp: 1591288380,
    label: '',
    amount: 250000000000,
    block: 'de8adb0d4917b7d4abad48d41277298b4bbd6c1609ee16ce7a696b5160d8c41b',
    witnesses: null,
    rewards: null,
    rounds: null,
    currentStage: 'IN PROGRESS',
    reveals: null,
    finalResult: null,
    transactionType: 'mint',
  },
  {
    id: '567a2133e209dc3838afe010580bc7e19353bd18aed60bb9608012d1d832f1cd',
    type: 'POSITIVE',
    inputs: null,
    outputs: [
      {
        value: 250000000000,
        address: 'twit1yy2eplt7zpnvycspnc96wse485ezwmzd6kzlxg',
      },
      {
        value: 250000000000,
        address: 'twit1sraz4xlpec7kyng4g75gslwylxd3hw5fukvvj2',
      },
    ],
    fee: 0,
    date: 'JUN 04, 2020 @ 18:32:30',
    timestamp: 1591288350,
    label: '',
    amount: 250000000000,
    block: '5c2083036989d9e2ef8c7bf18c8dffa85061cbdb4ba3b76b5a146012a6ef343f',
    witnesses: null,
    rewards: null,
    rounds: null,
    currentStage: 'IN PROGRESS',
    reveals: null,
    finalResult: null,
    transactionType: 'mint',
  },
  {
    id: 'c03dbd32902c75a7d66d55cae44857fff92db68f34c169c1df2aa1c8bc51b24b',
    type: 'POSITIVE',
    inputs: null,
    outputs: [
      {
        value: 250000000000,
        address: 'twit1yy2eplt7zpnvycspnc96wse485ezwmzd6kzlxg',
      },
      {
        value: 250000000000,
        address: 'twit1sraz4xlpec7kyng4g75gslwylxd3hw5fukvvj2',
      },
    ],
    fee: 0,
    date: 'JUN 04, 2020 @ 18:32:00',
    timestamp: 1591288320,
    label: '',
    amount: 250000000000,
    block: '09e410bfd03f7177c399c0de39066ed48aeeef1c07621e316e7838ee767b073b',
    witnesses: null,
    rewards: null,
    rounds: null,
    currentStage: 'IN PROGRESS',
    reveals: null,
    finalResult: null,
    transactionType: 'mint',
  },
  {
    id: '2a41dfa04b0f52539b90eecf5799ce578994f382925eddff93638339f6d079d8',
    type: 'POSITIVE',
    inputs: null,
    outputs: [
      {
        value: 250000000000,
        address: 'twit1yy2eplt7zpnvycspnc96wse485ezwmzd6kzlxg',
      },
      {
        value: 250000000000,
        address: 'twit1sraz4xlpec7kyng4g75gslwylxd3hw5fukvvj2',
      },
    ],
    fee: 0,
    date: 'JUN 04, 2020 @ 18:31:30',
    timestamp: 1591288290,
    label: '',
    amount: 250000000000,
    block: '52e0e82007fe9719e4967b41745b152319c742161d8c3bc8cf3f30c55a8a64a9',
    witnesses: null,
    rewards: null,
    rounds: null,
    currentStage: 'IN PROGRESS',
    reveals: null,
    finalResult: null,
    transactionType: 'mint',
  }]

  <TransactionList :transactions="transactions" currency="nanoWits" />
```
</docs>
