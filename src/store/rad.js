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
  USED_VARIABLES,
  CREATE_VARIABLE,
  UPDATE_VARIABLES,
  TOGGLE_VARIABLES,
  DELETE_VARIABLE,
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
    variablesKeys: state => {
      return state.currentTemplate.variables.map(x => x.key)
    },
  },
  mutations: {
    [UPDATE_VARIABLES](state, { index, key, value }) {
      const prevValue = state.currentTemplate.variables[index].key
      const usedVariables = state.currentTemplate.usedVariables.filter(
        x => x.variable === prevValue
      )
      if (state.hasVariables && usedVariables) {
        state.currentTemplate.variables[index] = {
          key: key,
          value: value,
        }
        state.currentTemplate.variables = [...state.currentTemplate.variables]
        usedVariables.forEach(usedVariable => {
          this.commit(USED_VARIABLES, { id: usedVariable.id, variable: key, value })
          this.commit(UPDATE_TEMPLATE, {
            id: usedVariable.id,
            value: '$' + usedVariable.variable,
          })
        })
      } else {
        state.currentTemplate.variables[index] = {
          key: key,
          value: value,
        }
        state.currentTemplate.variables = [...state.currentTemplate.variables]
      }
      this.dispatch('saveTemplate')
    },
    [DELETE_VARIABLE](state, { index }) {
      state.currentTemplate.variables.splice(index, 1)
      this.dispatch('saveTemplate')
    },
    [CREATE_VARIABLE](state) {
      state.currentTemplate.variablesIndex += 1
      state.currentTemplate.variables.push({
        key: 'key_' + state.currentTemplate.variablesIndex,
        value: 'value',
      })
      this.dispatch('saveTemplate')
    },
    [USED_VARIABLES](state, { id, variable, value }) {
      const usedVariable = state.currentTemplate.usedVariables.find(x => x.id)
      const hasSameId = state.currentTemplate.usedVariables.find(x => x.id === id)
      if (usedVariable && !!hasSameId) {
        hasSameId.variable = variable
        hasSameId.value = value
      } else {
        state.currentTemplate.usedVariables.push({ id: id, variable: variable, value: value })
        state.currentTemplate.usedVariables = [...state.currentTemplate.usedVariables]
      }
    },
    [UPDATE_HISTORY](state, { mir }) {
      state.history.push(mir)
      state.historyIndex += 1
      state.history.splice(state.historyIndex + 1)
    },
    [UPDATE_TEMPLATE](state, { id, value }) {
      state.currentRadonMarkupInterpreter.update(id, value)
      state.radRequest = state.currentRadonMarkupInterpreter
      this.commit(UPDATE_HISTORY, { mir: state.currentRadonMarkupInterpreter.getMir() })
    },
    [EDITOR_REDO](state) {
      const redolenght = state.currentRadonMarkupInterpreter.retrieve.length
      if (state.history[state.historyIndex + 1]) {
        state.historyIndex += 1
        state.currentRadonMarkupInterpreter = new Radon(state.history[state.historyIndex])
        state.radRequest = state.currentRadonMarkupInterpreter
        const currentLenght = state.radRequest.retrieve.length
        if (redolenght > currentLenght) {
          this.commit(MOVE_CAROUSEL, { direction: 'right' })
        } else if (redolenght < currentLenght) {
          this.commit(MOVE_CAROUSEL, { direction: 'left' })
        }
      }
    },
    [EDITOR_UNDO](state) {
      const lenght = state.currentRadonMarkupInterpreter.retrieve.length
      if (state.history[state.historyIndex - 1]) {
        state.historyIndex = state.historyIndex - 1
        state.currentRadonMarkupInterpreter = new Radon(state.history[state.historyIndex])
        state.radRequest = state.currentRadonMarkupInterpreter
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
    [UPDATE_SOURCE](state, { index, source }) {
      state.currentRadonMarkupInterpreter.updateSource(index, source)
      state.radRequest = state.currentRadonMarkupInterpreter
      this.commit(UPDATE_HISTORY, { mir: state.currentRadonMarkupInterpreter.getMir() })
    },
    [DELETE_SOURCE](state, { index }) {
      state.currentRadonMarkupInterpreter.deleteSource(index)
      state.radRequest = state.currentRadonMarkupInterpreter
      this.commit(UPDATE_HISTORY, { mir: state.currentRadonMarkupInterpreter.getMir() })
    },
    [ADD_SOURCE](state) {
      state.radRequest = state.currentRadonMarkupInterpreter
      state.currentRadonMarkupInterpreter.addSource()
      state.radRequest = state.currentRadonMarkupInterpreter
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
            script: [128, [67, 5]],
          },
        ],
        aggregate: [16],
        tally: [],
      }
      state.currentTemplate = {
        creationDate: Date.now(),
        id: generateId(),
        name: name,
        description: '',
        radRequest,
        variables: [
          {
            key: 'key_' + 0,
            value: 'value',
          },
        ],
        variablesIndex: 0,
        usedVariables: [],
      }
      state.currentRadonMarkupInterpreter = new Radon(radRequest)
      state.radRequest = state.currentRadonMarkupInterpreter
      state.history = [state.currentRadonMarkupInterpreter.getMir()]
    },
    [SET_CURRENT_TEMPLATE](state, { id }) {
      const template = state.templates[id]
      state.currentTemplate = template
      state.currentRadonMarkupInterpreter = new Radon(state.currentTemplate.radRequest)
      state.radRequest = state.currentRadonMarkupInterpreter
      state.history = [state.currentRadonMarkupInterpreter.getMir()]
    },
    [PUSH_OPERATOR](state, { scriptId }) {
      state.currentRadonMarkupInterpreter.addOperator(scriptId)
      state.radRequest = state.currentRadonMarkupInterpreter
      this.commit(UPDATE_HISTORY, { mir: state.currentRadonMarkupInterpreter.getMir() })
    },
    renameTemplate: function(state, { id, name }) {
      state.templates[id].name = name
    },
    [TOGGLE_VARIABLES](state, { hasVariables }) {
      if (hasVariables === true) {
        state.hasVariables = true
      } else {
        state.hasVariables = false
      }
    },
  },
  actions: {
    changeTemplateName: async function(context, { id, name }) {
      this.commit('renameTemplate', { id, name })
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
      templateToSave.radRequest = context.state.currentRadonMarkupInterpreter.getMir()
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
