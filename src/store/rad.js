import {
  OPERATOR_INFOS as RadonOperatorInfos,
  TYPESYSTEM as RadonTypeSystem,
  TYPES as RadonTypes,
} from '@/radon'
import { getOutput, isValidScript } from '@/radon/utils'
import { match, generateId } from '@/utils'
import Vue from 'vue'

export default {
  state: {
    templates: {},
    currentTemplate: {},
    history: [{}],
    historyIndex: 0,
  },
  getters: {
    currentTemplate: state => {
      return state.currentTemplate
    },
  },
  mutations: {
    editorRedo(state) {
      if (state.historyIndex + 1 < history.length) {
        state.historyIndex += 1
        state.currentTemplate = history[state.historyIndex]
      }
    },
    editorUndo(state) {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1
        state.currentTemplate = history[state.historyIndex]
      }
    },
    pushOperator(state, { path }) {
      if (
        path.stage === 'retrieve' &&
        state.currentTemplate.radRequest.retrieve[path.retrieveIndex].script.length === 0
      ) {
        state.currentTemplate.radRequest.retrieve[path.retrieveIndex].script.push(67)
      } else {
        const currentScript = Number.isInteger(parseInt(path.retrieveIndex))
          ? state.currentTemplate.radRequest[path.stage][path.retrieveIndex].script
          : state.currentTemplate.radRequest[path.stage].script
        const scriptTypes = currentScript.map(getOutput)
        if (scriptTypes[0] === 'Self') {
          console.log(
            `ERROR pushing a new operator in stage ${path.stage} in stageIndex ${
              path.retrieveIndex
            }`
          )
        } else {
          // TODO: check if first operator in aggregate phase is Self and then search the type in retrieval stage
          const cleanScriptTypes = scriptTypes.map((item, index, array) => {
            if (item === 'Self') {
              return array[index - 1]
            } else {
              return item
            }
          })

          const outputType = cleanScriptTypes[cleanScriptTypes.length - 1]
          const operatorsObject = RadonTypeSystem[RadonTypes[outputType]]
          const newOperatorCode = parseInt(Object.entries(operatorsObject)[0][0])
          const newOperatorInfo = RadonOperatorInfos[newOperatorCode]
          const numberOfOperatorArguments = newOperatorInfo.arguments.length

          if (numberOfOperatorArguments === 0) {
            Number.isInteger(parseInt(path.retrieveIndex))
              ? state.currentTemplate.radRequest[path.stage][path.retrieveIndex].script.push(
                  newOperatorCode
                )
              : state.currentTemplate.radRequest[path.stage].script.push(newOperatorCode)
          } else {
            Number.isInteger(parseInt(path.retrieveIndex))
              ? state.currentTemplate.radRequest[path.stage][path.retrieveIndex].script.push([
                  newOperatorCode,
                ])
              : state.currentTemplate.radRequest[path.stage].script.push(newOperatorCode)
          }
        }
      }
    },
    updateRetrieveSource(state, { source, index }) {
      state.currentTemplate.radRequest.retrieve[index].url = source.url
      state.currentTemplate.radRequest.retrieve[index].kind = source.kind
    },
    deleteSource(state, { index }) {
      state.currentTemplate.radRequest.retrieve.splice(index, 1)
      state.currentTemplate.radRequest.retrieve.map(source => {
        if (index < source.index) {
          return source.index--
        }
      })
    },
    pushRetrieve(state) {
      state.currentTemplate.radRequest.retrieve.push({
        url: '',
        kind: 'HTTP-GET',
        script: [],
      })
    },
    updateArgumentInput(state, { path, input, operator, argIndex }) {
      operator[argIndex] = input
      if (Number.isInteger(parseInt(path.retrieveIndex))) {
        state.currentTemplate.radRequest[`${path.stage}`][path.retrieveIndex][
          path.scriptIndex
        ] = operator
      } else {
        state.currentTemplate.radRequest[`${path.stage}`][path.scriptIndex] = operator
      }
    },
    selectHashFunction: function(state, { path, hashFunctionCode, operator, argIndex }) {
      operator[argIndex] = hashFunctionCode
      if (Number.isInteger(parseInt(path.retrieveIndex))) {
        state.currentTemplate.radRequest[`${path.stage}`][path.retrieveIndex][
          path.scriptIndex
        ] = operator
        state.currentTemplate.radRequest[`${path.stage}`] = [
          ...state.currentTemplate.radRequest[`${path.stage}`],
        ]
      } else {
        state.currentTemplate.radRequest[`${path.stage}`][path.scriptIndex] = operator
        state.currentTemplate.radRequest[`${path.stage}`] = { ...this[`${path.stage}`] }
      }
    },
    updateOperatorReduceArgument: function(state, { path, reduceArgument, operator, argIndex }) {
      operator[argIndex] = reduceArgument
      if (Number.isInteger(parseInt(path.retrieveIndex))) {
        state.currentTemplate.radRequest[`${path.stage}`][path.retrieveIndex].script[
          path.scriptIndex
        ] = operator
        state.currentTemplate.radRequest[`${path.stage}`] = [
          ...state.currentTemplate.radRequest[`${path.stage}`],
        ]
      } else {
        state.currentTemplate.radRequest[`${path.stage}`].script[path.scriptIndex] = operator
        state.currentTemplate.radRequest[`${path.stage}`] = {
          ...state.currentTemplate.radRequest[`${path.stage}`],
        }
      }
    },
    updateFilterArgument: function(state, { path, filterArgument, operator, argIndex }) {
      operator[argIndex] = [operator[argIndex][0], filterArgument]
      if (Number.isInteger(parseInt(path.retrieveIndex))) {
        state.currentTemplate.radRequest[`${path.stage}`][path.retrieveIndex][
          path.scriptIndex
        ] = operator
        state.currentTemplate.radRequest[`${path.stage}`] = [
          ...state.currentTemplate.radRequest[`${path.stage}`],
        ]
      } else {
        state.currentTemplate.radRequest[`${path.stage}`][path.scriptIndex] = operator
        state.currentTemplate.radRequest[`${path.stage}`] = {
          ...state.currentTemplate.radRequest[`${path.stage}`],
        }
      }
    },
    updateOperatorFilterArgument: function(
      state,
      { path, filterFunctionCode, operator, argIndex }
    ) {
      operator[argIndex] = [filterFunctionCode, '']
      if (Number.isInteger(parseInt(path.retrieveIndex))) {
        state.currentTemplate.radRequest[`${path.stage}`][path.retrieveIndex][
          path.scriptIndex
        ] = operator
      } else {
        state.currentTemplate.radRequest[`${path.stage}`][path.scriptIndex] = operator
      }
    },
    updateOperatorCodeSelect: function(state, { path, operatorCode }) {
      let args = RadonOperatorInfos[operatorCode].arguments.map(argument => {
        return match(argument.kind, [
          {
            options: [RadonTypes.Boolean],
            result: true,
          },
          {
            options: [RadonTypes.Int],
            result: 0,
          },
          {
            options: [RadonTypes.Float],
            result: 0.0,
          },
          {
            options: [RadonTypes.String],
            result: '',
          },
          {
            options: [
              RadonTypes.Map,
              RadonTypes.Mixed,
              RadonTypes.Array,
              RadonTypes.Null,
              RadonTypes.Result,
              RadonTypes.Self,
              RadonTypes.MapFunction,
            ],
            result: [],
          },
          {
            options: [RadonTypes.FilterFunction],
            result: [0, 0],
          },
          {
            options: [RadonTypes.HashFunction],
            result: 0,
          },
          {
            options: [RadonTypes.ReduceFunction],
            result: 0,
          },
        ])
      })
      if (path.stage === 'retrieve') {
        state.currentTemplate.radRequest[`${path.stage}`][path.retrieveIndex].script[
          path.scriptIndex
        ] = [parseInt(operatorCode), ...args]
        if (!isValidScript('')) {
          state.currentTemplate.radRequest[`${path.stage}`][path.retrieveIndex].script.splice(
            path.scriptIndex + 1,
            state.currentTemplate.radRequest[`${path.stage}`][path.retrieveIndex].script.length
          )
        }
        state.currentTemplate.radRequest[`${path.stage}`] = {
          ...state.currentTemplate.radRequest[`${path.stage}`],
        }
      } else {
        state.currentTemplate.radRequest[`${path.stage}`].script[path.scriptIndex] = [
          parseInt(operatorCode),
          ...args,
        ]
        if (!isValidScript('')) {
          state.currentTemplate.radRequest[`${path.stage}`].script.splice(
            path.scriptIndex + 1,
            state.currentTemplate.radRequest[`${path.stage}`].script.length
          )
        }
        state.currentTemplate.radRequest[`${path.stage}`] = {
          ...state.currentTemplate.radRequest[`${path.stage}`],
        }
      }
    },
    setTemplates: function(state, { templates }) {
      if (templates) {
        state.templates = templates
      }
    },
    createTemplate: function(state) {
      const name = Object.values(state.templates).reduce((acc, _, index, self) => {
        let name = 'template ' + (parseInt(acc.split(' ')[1]) + 1)
        return self.find(template => template.name === acc) ? name : acc
      }, 'template 1')
      state.currentTemplate = {
        creationDate: Date.now(),
        id: generateId(),
        name: name,
        description: '',
        radRequest: {
          not_before: 0,
          retrieve: [
            {
              url: '',
              kind: 'HTTP-GET',
              script: [0x45],
            },
          ],
          aggregate: {
            script: [0x50],
          },
          consensus: {
            script: [0x50],
          },
        },
      }
    },
    setCurrentTemplate: function(state, { id }) {
      state.currentTemplate = state.templates[id]
    },
  },
  actions: {
    saveTemplate: async function(context, args) {
      console.log('saving template')
      let templates = context.state.templates
      const templateToSave = args ? args.template : context.state.currentTemplate
      if (!templateToSave.id) {
        templateToSave.id = generateId()
      }

      templates[templateToSave.id] = templateToSave
      const request = await this.$walletApi.saveItem({
        walletId: context.rootState.wallet.walletId,
        sessionId: context.rootState.wallet.sessionId,
        key: 'templates',
        value: templates,
        creationDate: Date.now(),
      })
      if (request.result) {
        await context.dispatch('getTemplates')
      } else {
        console.log(request)
      }
    },
    getTemplates: async function(context, params) {
      const request = await this.$walletApi.getItem({
        walletId: context.rootState.wallet.walletId,
        sessionId: context.rootState.wallet.sessionId,
        key: 'templates',
      })
      if (request.result) {
        context.commit('setTemplates', { templates: request.result.value })
      } else {
        console.log(request)
      }
    },
    deleteTemplate: async function(context, { id }) {
      Vue.delete(context.state.templates, id)
      const request = await this.$walletApi.saveItem({
        walletId: context.rootState.wallet.walletId,
        sessionId: context.rootState.wallet.sessionId,
        key: 'templates',
        value: context.state.templates,
      })
      if (request.result) {
        console.log(request.result)
      } else {
        console.log(request)
      }
    },
  },
}
