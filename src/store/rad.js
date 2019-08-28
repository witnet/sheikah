import { generateId } from '@/utils'
import { RadonMarkupInterpreter } from '@/radon'
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
    updateTemplate(state, { id, value }) {
      state.history.push({ ...state.currentTemplate })
      state.currentTemplate.updateTemplate(id, value)
    },
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
      state.currentTemplate = new RadonMarkupInterpreter({
        creationDate: Date.now(),
        id: generateId(),
        name: name,
        description: '',
        radRequest: {
          notBefore: 0,
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
        },
      })
    },
    setCurrentTemplate: function(state, { id }) {
      console.log('on click Edit in Template Card: set current template----->', state.templates[id])
      state.currentTemplate = new RadonMarkupInterpreter(state.templates[id])
      console.log(3)
    },
    pushOperator: function(state, { stage, sourceIndex }) {
      state.currentTemplate.pushOperator(stage, sourceIndex)
      console.log('This comes from the Rad.js------>', state.currentTemplate.radRequest[stage].script)
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
        console.log('request---->', request)
      }
    },
    getTemplates: async function(context, params) {
      const request = await this.$walletApi.getItem({
        walletId: context.rootState.wallet.walletId,
        sessionId: context.rootState.wallet.sessionId,
        key: 'templates',
      })
      if (request.result) {
        console.log('get templates----->', request.result.value)
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
