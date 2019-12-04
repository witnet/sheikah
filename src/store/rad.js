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
    currentRadonMarkupInterpreter: null,
    radRequest: {},
    history: [],
    historyIndex: 0,
    moveCarousel: false,
    variablesIndex: 0,
    hasVariables: false,
  },
  getters: {
    currentTemplate: state => {
      return state.currentTemplate
    },
  },
  mutations: {
    [UPDATE_VARIABLES](state, { index, key, value }) {
      const prevValue = state.currentTemplate.variables[index].key
      const markupVariable = state.currentTemplate.variablesIdMarkup.find(
        x => x.variable === prevValue
      )
      if (state.hasVariables && markupVariable) {
        state.currentTemplate.variables[index] = {
          key: key,
          value: value,
        }
        state.currentTemplate.variables = [...state.currentTemplate.variables]
        this.commit(STORE_VARIABLE_COMPONENT_ID, { id: markupVariable.id, variable: key, value })
        this.commit(UPDATE_TEMPLATE, {
          id: markupVariable.id,
          value: '$' + markupVariable.variable,
        })
      } else {
        state.currentTemplate.variables[index] = {
          key: key,
          value: value,
        }
        state.currentTemplate.variables = [...state.currentTemplate.variables]
      }
    },
    [CREATE_VARIABLE](state) {
      state.currentTemplate.variablesIndex += 1
      console.log('index>', state.currentTemplate.variablesIndex)
      state.currentTemplate.variables.push({
        key: 'key_' + state.currentTemplate.variablesIndex,
        value: 'value',
      })
      console.log('1. create variable', state.currentTemplate.variables)
    },
    [STORE_VARIABLE_COMPONENT_ID](state, { id, variable, value }) {
      if (!state.currentTemplate.variablesIdMarkup.find(x => x.id)) {
        state.currentTemplate.variablesIdMarkup.push({ id: id, variable: variable, value: value })
        state.currentTemplate.variablesIdMarkup = [...state.currentTemplate.variablesIdMarkup]
      }
      if (
        state.currentTemplate.variablesIdMarkup.find(x => x.id) &&
        !state.currentTemplate.variablesIdMarkup.find(x => x.key)
      ) {
        state.currentTemplate.variablesIdMarkup.find(x => x.id).variable = variable
        state.currentTemplate.variablesIdMarkup.find(x => x.id).value = value
      }
    },
    [UPDATE_HISTORY](state, { mir }) {
      state.history.push(mir)
      state.historyIndex += 1
      state.history.splice(state.historyIndex + 1)
    },
    [UPDATE_TEMPLATE](state, { id, value }) {
      console.log('1', state.radRequest)
      state.currentRadonMarkupInterpreter.updateMarkup(id, value)
      console.log('2', state.radRequest)
      state.radRequest = state.currentRadonMarkupInterpreter.getMarkup().radRequest
      console.log('3', state.radRequest)
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
            key: 'key_0',
            value: 'value',
          },
        ],
        variablesIndex: 0,
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
    renameTemplate: function(state, { id, name }) {
      console.log('remaned::')
      state.templates[id].name = name
    },
  },
  actions: {
    changeTemplateName: async function(context, { id, name }) {
      console.log('change template name::')
      this.commit('renameTemplate', { id, name })
      console.log('STATE>', { ...context.state })
      const request = await this.$walletApi.saveItem({
        walletId: context.rootState.wallet.walletId,
        sessionId: context.rootState.wallet.sessionId,
        key: 'templates',
        value: context.state.templates,
        creationDate: Date.now(),
      })
      if (request.result) {
        await context.dispatch('getTemplates')
      } else {
        console.log(request)
      }
    },
    saveTemplate: async function(context, args) {
      let templates = context.state.templates
      const templateToSave = args ? args.template : context.state.currentTemplate
      console.log('esto es lo ultimo que ves', context.state.currentRadonMarkupInterpreter)
      templateToSave.radRequest = context.state.currentRadonMarkupInterpreter.getMir().radRequest
      console.log('si me ves funciona')
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
