[1mdiff --git a/src/api.js b/src/api.js[m
[1mindex 618aac43..b4d7517f 100644[m
[1m--- a/src/api.js[m
[1m+++ b/src/api.js[m
[36m@@ -230,11 +230,9 @@[m [mexport function standardizeAddresses(response) {[m
 [m
 export function standardizeTransactions(response) {[m
   if (!response.result) return response[m
[31m-[m
   const transactions = response.result.transactions.map(transaction => {[m
[31m-    const transactionType = transaction.transaction.data.value_transfer[m
[31m-      ? 'value_transfer'[m
[31m-      : 'data_request'[m
[32m+[m[32m    const transactionType = Object.keys(transaction.transaction.data)[0][m
[32m+[m
     const { inputs, outputs } = transaction.transaction.data[transactionType][m
     // eslint-disable-next-line camelcase[m
     const { hash, miner_fee, block, tally, timestamp } = transaction.transaction[m
[36m@@ -242,7 +240,7 @@[m [mexport function standardizeTransactions(response) {[m
     return {[m
       id: hash,[m
       type: transaction.type,[m
[31m-      inputs: inputs.map(input => ({ value: input.value, address: input.address })),[m
[32m+[m[32m      inputs: inputs ? inputs.map(input => ({ value: input.value, address: input.address })) : null,[m
       outputs: outputs.map(output => ({ value: output.value, address: output.address })),[m
       fee: miner_fee,[m
       date: changeDateFormat(timestamp),[m
[1mdiff --git a/src/components/InputsOutputs.vue b/src/components/InputsOutputs.vue[m
[1mindex 6b1b94cd..a2f3e30f 100644[m
[1m--- a/src/components/InputsOutputs.vue[m
[1m+++ b/src/components/InputsOutputs.vue[m
[36m@@ -30,10 +30,22 @@[m [mimport Amount from '@/components/Amount.vue'[m
 export default {[m
   name: 'Transaction',[m
   props: {[m
[31m-    currency: String,[m
[31m-    fee: Number,[m
[31m-    outputs: Array,[m
[31m-    inputs: Array,[m
[32m+[m[32m    currency: {[m
[32m+[m[32m      type: String,[m
[32m+[m[32m      required: true,[m
[32m+[m[32m    },[m
[32m+[m[32m    fee: {[m
[32m+[m[32m      type: Number,[m
[32m+[m[32m      required: true,[m
[32m+[m[32m    },[m
[32m+[m[32m    outputs: {[m
[32m+[m[32m      type: Array,[m
[32m+[m[32m      required: true,[m
[32m+[m[32m    },[m
[32m+[m[32m    inputs: {[m
[32m+[m[32m      required: false,[m
[32m+[m[32m      type: Array,[m
[32m+[m[32m    },[m
   },[m
   components: {[m
     Amount,[m
[1mdiff --git a/src/components/Transaction.vue b/src/components/Transaction.vue[m
[1mindex 1307fdf2..cad1c966 100644[m
[1m--- a/src/components/Transaction.vue[m
[1m+++ b/src/components/Transaction.vue[m
[36m@@ -10,13 +10,19 @@[m
           :class="[origin.toLowerCase()]"[m
           :amount="amount"[m
         />[m
[32m+[m
         <div v-if="transactionType === 'value_transfer'" class="address-container">[m
           <p data-test="origin" class="origin">{{ origin }}</p>[m
           <p data-test="address" class="address">{{ address }}</p>[m
         </div>[m
[31m-        <div v-if="transactionType === 'data_request'" class="address-container">[m
[31m-          <p data-test="data-request-type" class="address">Data request</p>[m
[32m+[m[32m        <div v-else-if="transactionType === 'value_transfer'" class="address-container">[m
[32m+[m[32m          <p data-test="origin" class="origin">{{ origin }}</p>[m
[32m+[m[32m          <p data-test="address" class="address">{{ address }}</p>[m
[32m+[m[32m        </div>[m
[32m+[m[32m        <div v-else-if="transactionType === 'mint'" class="address-container">[m
[32m+[m[32m          <p data-test="data-request-type" class="address">Mint</p>[m
         </div>[m
[32m+[m
         <div class="">[m
           <p data-test="time-ago" class="date">{{ timeAgo }}</p>[m
         </div>[m
[36m@@ -93,6 +99,8 @@[m [mexport default {[m
   },[m
   computed: {[m
     address() {[m
[32m+[m[32m      console.log('---inputs--', this.inputs)[m
[32m+[m
       return this.inputs.length > 1 ? 'several addresses' : this.inputs[0].address[m
     },[m
     origin() {[m
[36m@@ -117,7 +125,7 @@[m [mexport default {[m
 .transaction {[m
   padding: 16px;[m
   display: grid;[m
[31m-  grid-template-columns: max-content max-content auto max-content;[m
[32m+[m[32m  grid-template-columns: max-content max-content auto 100px;[m
   grid-column-gap: 24px;[m
   align-items: center;[m
   cursor: pointer;[m
[36m@@ -163,6 +171,7 @@[m [mexport default {[m
     color: $grey-4;[m
     font-weight: 600;[m
     font-style: italic;[m
[32m+[m[32m    text-align: right;[m
   }[m
 [m
   .block {[m
[1mdiff --git a/src/store/wallet.js b/src/store/wallet.js[m
[1mindex 3feae61b..b9ee42f4 100644[m
[1m--- a/src/store/wallet.js[m
[1m+++ b/src/store/wallet.js[m
[36m@@ -445,12 +445,14 @@[m [mexport default {[m
     },[m
 [m
     getTransactions: async function(context, { limit, page }) {[m
[32m+[m[32m      console.log('inside getTransactions')[m
       const request = await context.state.api.getTransactions({[m
         wallet_id: context.state.walletId,[m
         session_id: context.state.sessionId,[m
         limit,[m
         page,[m
       })[m
[32m+[m[32m      console.log('----', request)[m
       if (request.result) {[m
         context.commit('setTransactions', { transactions: request.result })[m
         this.commit('clearError', { error: 'getTransactions' })[m
[36m@@ -547,6 +549,7 @@[m [mexport default {[m
       const eventType = Object.keys(rawEvent.event)[0][m
       const event = rawEvent.event[eventType][m
       const status = rawEvent.status[m
[32m+[m[32m      console.log('NEW EVENT', rawEvent)[m
       if (eventType === WALLET_EVENTS.BLOCK) {[m
         status.timestamp = Date.now()[m
       } else if (eventType === WALLET_EVENTS.MOVEMENT) {[m
