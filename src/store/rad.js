import { generateId } from '@/utils'
import { Radon } from 'witnet-radon-js'
import {
  UPDATE_HISTORY,
  UPDATE_TEMPLATE,
  EDITOR_REDO,
  EDITOR_UNDO,
  MOVE_CAROUSEL,
  CLEAR_MOVE_CAROUSEL,
  UPDATE_SOURCE,
  DELETE_SOURCE,
  ADD_SOURCE,
  SET_TEMPLATES,
  CREATE_TEMPLATE,
  SET_CURRENT_TEMPLATE,
  PUSH_OPERATOR,
  STORE_VARIABLE_COMPONENT_ID,
  CREATE_VARIABLE,
  UPDATE_VARIABLES,
} from '@/store/mutation-types'
import Vue from 'vue'

export default {
  state: {
    templates: {},
    currentTemplate: {},
    currentRadonMarkupInterpreter: {},
    radRequest: {},
    history: [],
    historyIndex: 0,
    moveCarousel: false,
    variablesIndex: 0,
  },
  getters: {
    currentTemplate: state => {
      return state.currentTemplate
    },
  },
  mutations: {
    [UPDATE_VARIABLES](state, { index, key, value }) {
      Vue.set(state.currentTemplate.variables, index, { key, value })
      state.currentTemplate.variables = [...state.currentTemplate.variables]
    },
    [CREATE_VARIABLE](state) {
      state.variablesIndex += 1
      state.currentTemplate.variables.push({
        key: 'key_' + state.variablesIndex,
        value: 'value',
      })
    },
    [STORE_VARIABLE_COMPONENT_ID](state, { id, variable, value }) {
      const usedVariables = state.currentTemplate.variablesIdMarkup
      const usedVariableId = usedVariables.find(x => x.id)
      const usedVariableKey = usedVariables.find(x => x.key)
      if (!usedVariableId) {
        Vue.set(usedVariables, { id, variable, value })
        state.currentTemplate.variablesIdMarkup = [...state.currentTemplate.variablesIdMarkup]
      }
      if (usedVariableId && !usedVariableKey) {
        usedVariableId.variable = variable
        usedVariableId.value = value
      }
    },
    [UPDATE_HISTORY](state, { mir }) {
      state.history.push(mir)
      state.historyIndex += 1
      state.history.splice(state.historyIndex + 1)
    },
    [UPDATE_TEMPLATE](state, { id, value }) {
      state.currentRadonMarkupInterpreter.updateMarkup(id, value)
      state.radRequest = state.currentRadonMarkupInterpreter.getMarkup().radRequest
      this.commit(UPDATE_HISTORY, { mir: state.currentRadonMarkupInterpreter.getMir() })
    },
    [EDITOR_REDO](state) {
      const redolenght = state.currentRadonMarkupInterpreter.getMarkup().radRequest.retrieve.length
      if (state.history[state.historyIndex + 1]) {
        state.historyIndex += 1
        state.currentRadonMarkupInterpreter = new Radon(state.history[state.historyIndex])
        state.radRequest = state.currentRadonMarkupInterpreter.getMarkup().radRequest
        const currentLenght = state.radRequest.retrieve.length
        if (redolenght > currentLenght) {
          this.commit(MOVE_CAROUSEL, { direction: 'right' })
        } else if (redolenght < currentLenght) {
          this.commit(MOVE_CAROUSEL, { direction: 'left' })
        }
      }
    },
    [EDITOR_UNDO](state) {
      const lenght = state.currentRadonMarkupInterpreter.getMarkup().radRequest.retrieve.length
      if (state.history[state.historyIndex - 1]) {
        state.historyIndex = state.historyIndex - 1
        state.currentRadonMarkupInterpreter = new Radon(state.history[state.historyIndex])
        state.radRequest = state.currentRadonMarkupInterpreter.getMarkup().radRequest
        let currentLenght = state.radRequest.retrieve.length
        if (lenght > currentLenght) {
          this.commit(MOVE_CAROUSEL, { direction: 'right' })
        } else if (lenght < currentLenght) {
          this.commit(MOVE_CAROUSEL, { direction: 'left' })
        }
      }
    },
    [MOVE_CAROUSEL](state, { direction }) {
      if (direction === 'right') {
        state.moveCarousel = 'right'
      } else if (direction === 'left') {
        state.moveCarousel = 'left'
      }
    },
    [CLEAR_MOVE_CAROUSEL](state) {
      state.moveCarousel = false
    },
    [UPDATE_SOURCE](state, { source, index }) {
      state.currentRadonMarkupInterpreter.updateSource(source, index)
      state.radRequest = state.currentRadonMarkupInterpreter.getMarkup().radRequest
      this.commit(UPDATE_HISTORY, { mir: state.currentRadonMarkupInterpreter.getMir() })
    },
    [DELETE_SOURCE](state, { index }) {
      state.currentRadonMarkupInterpreter.deleteSource(index)
      state.radRequest = state.currentRadonMarkupInterpreter.getMarkup().radRequest
      this.commit(UPDATE_HISTORY, { mir: state.currentRadonMarkupInterpreter.getMir() })
    },
    [ADD_SOURCE](state) {
      state.radRequest = state.currentRadonMarkupInterpreter.getMarkup().radRequest
      state.currentRadonMarkupInterpreter.addSource()
      state.radRequest = state.currentRadonMarkupInterpreter.getMarkup().radRequest
      this.commit(UPDATE_HISTORY, { mir: state.currentRadonMarkupInterpreter.getMir() })
    },
    [SET_TEMPLATES](state, { templates }) {
      if (templates) {
        state.templates = templates
      }
    },
    [CREATE_TEMPLATE](state) {
      const name = Object.values(state.templates).reduce((acc, _, index, self) => {
        index = parseInt(acc.split(' ')[1]) + 1
        let name = 'template'
        return self.find(template => template.name === acc) ? name : acc
      }, 'template')

      const radRequest = {
        timelock: 0,
        retrieve: [
          {
            url: '',
            kind: 'HTTP-GET',
            script: [0x75, [0x73, '10']],
          },
        ],
        aggregate: [0x50],
        tally: [0x50],
      }
      state.currentTemplate = {
        creationDate: Date.now(),
        id: generateId(),
        name: name,
        description: '',
        radRequest,
        variables: [
          {
            key: 'key_' + state.variablesIndex,
            value: 'value',
          },
        ],
        variablesIdMarkup: [],
      }
      state.currentRadonMarkupInterpreter = new Radon(state.currentTemplate)
      state.radRequest = state.currentRadonMarkupInterpreter.getMarkup().radRequest
      state.history = [state.currentTemplate]
    },
    [SET_CURRENT_TEMPLATE](state, { id }) {
      const template = state.templates[id]
      state.currentTemplate = template
      state.currentRadonMarkupInterpreter = new Radon(state.currentTemplate)
      state.radRequest = { ...state.currentRadonMarkupInterpreter.getMarkup().radRequest }
      state.history = [state.currentTemplate]
    },
    [PUSH_OPERATOR](state, { scriptId }) {
      state.currentRadonMarkupInterpreter.addOperator(scriptId)
      state.radRequest = state.currentRadonMarkupInterpreter.getMarkup().radRequest
      this.commit(UPDATE_HISTORY, { mir: state.currentRadonMarkupInterpreter.getMir() })
    },
  },
  actions: {
    saveTemplate: async function(context, args) {
      let templates = context.state.templates
      const templateToSave = args ? args.template : context.state.currentTemplate
      templateToSave.radRequest = context.state.currentRadonMarkupInterpreter.getMir().radRequest
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
        context.commit(SET_TEMPLATES, { templates: request.result.value })
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
