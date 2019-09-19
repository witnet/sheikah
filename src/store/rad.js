import { generateId } from '@/utils'
import { RadonMarkupInterpreter } from '@/radon'
import Vue from 'vue'

export default {
  state: {
    templates: {},
    currentTemplate: {},
    currentRadonMarkupInterpreter: {},
    radRequest: {},
    history: [{}],
    historyIndex: 0,
  },
  getters: {
    currentTemplate: state => {
      return state.currentTemplate
    },
  },
  mutations: {
    updateHistory(state, { mir }) {
      state.history.push(mir)
      state.history.splice(0, state.historyIndex)
    },
    updateTemplate(state, { id, value }) {
      // this.commit('updateHistory', { mir: state.currentRadonMarkupInterpreter.getMir() })
      state.currentRadonMarkupInterpreter.updateElement(id, value)
      state.radRequest = state.currentRadonMarkupInterpreter.getMarkup()
    },
    editorRedo(state) {
      if (state.historyIndex + 1 < history.length) {
        state.historyIndex += 1
        state.currentRadonMarkupInterpreter = RadonMarkupInterpreter(history[state.historyIndex])
      }
    },
    editorUndo(state) {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1
        state.currentRadonMarkupInterpreter = RadonMarkupInterpreter(history[state.historyIndex])
      }
    },
    updateSource(state, { source, index }) {
      // this.commit('updateHistory', { mir: state.currentRadonMarkupInterpreter.getMir() })
      state.currentRadonMarkupInterpreter.updateSource(source, index)
      state.radRequest = state.currentRadonMarkupInterpreter.getMarkup()
    },
    deleteSource(state, { index }) {
      // this.commit('updateHistory', { mir: state.currentRadonMarkupInterpreter.getMir() })
      state.currentRadonMarkupInterpreter.deleteSource(index)
      state.radRequest = state.currentRadonMarkupInterpreter.getMarkup()
    },
    addSource(state) {
      // this.commit('updateHistory', { mir: state.currentRadonMarkupInterpreter.getMir() })
      state.currentRadonMarkupInterpreter.pushSource()
      state.radRequest = state.currentRadonMarkupInterpreter.getMarkup()
    },
    setTemplates: function(state, { templates }) {
      if (templates) {
        state.templates = templates
      }
    },
    createTemplate: function(state) {
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
            script: [0x45],
          },
        ],
        aggregate: {
          script: [0x50],
        },
        tally: {
          script: [0x50],
        },
      }

      state.currentTemplate = {
        creationDate: Date.now(),
        id: generateId(),
        name: name,
        description: '',
        radRequest,
      }
      state.currentRadonMarkupInterpreter = new RadonMarkupInterpreter(radRequest)
      state.radRequest = state.currentRadonMarkupInterpreter.getMarkup()
    },
    setCurrentTemplate: function(state, { id }) {
      const template = state.templates[id]
      state.currentTemplate = template
      state.currentRadonMarkupInterpreter = new RadonMarkupInterpreter(template.radRequest)
      state.radRequest = state.currentRadonMarkupInterpreter.getMarkup()
    },
    pushOperator: function(state, { stage, sourceIndex }) {
      state.currentRadonMarkupInterpreter.pushOperator(stage, sourceIndex)
      state.radRequest = state.currentRadonMarkupInterpreter.getMarkup()
    },
  },
  actions: {
    saveTemplate: async function(context, args) {
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
