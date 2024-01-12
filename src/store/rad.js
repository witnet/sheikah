import { Radon } from 'witnet-radon-js'
import {
  createNotification,
  generateId,
  isValidRadRequest,
  calculateCurrentFocusAfterUndo,
  calculateCurrentFocusAfterRedo,
  getNativeValueFromMarkupArgumentType,
} from '@/utils'
import i18n from '@/plugins/i18n'
import { EDITOR_STAGES, HISTORY_UPDATE_TYPE, RAD_EXAMPLES } from '@/constants'
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
  CLEAR_HISTORY,
  SET_CURRENT_TEMPLATE,
  PUSH_OPERATOR,
  DELETE_OPERATOR,
  USED_VARIABLES,
  CREATE_VARIABLE,
  UPDATE_VARIABLES,
  TOGGLE_VARIABLES,
  DELETE_VARIABLE,
  SET_CURRENT_STAGE,
  DELETE_USED_VARIABLE,
} from '@/store/mutation-types'
import { api } from '@/main'

// import wallet from './wallet'

export default {
  state: {
    errors: {
      saveItem: null,
      getItem: null,
    },
    templates: {},
    currentTemplate: {},
    currentRadonMarkupInterpreter: null,
    currentStage: EDITOR_STAGES.SETTINGS,
    radRequest: {},
    history: [],
    historyIndex: 0,
    moveCarousel: false,
    variablesIndex: 0,
    hasVariables: false,
    subscriptIds: [],
    autoTry: false,
    dataRequestChangedSinceSaved: false,
    currentFocus: null,
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
    setDefaultTemplates: function (state, { locale }) {
      RAD_EXAMPLES.forEach(example => {
        const radRequest = {
          retrieve: example.radRequest.data.data_request.retrieve,
          aggregate: example.radRequest.data.data_request.aggregate,
          tally: example.radRequest.data.data_request.tally,
          timelock: example.radRequest.data.data_request.time_lock,
        }
        this.dispatch('saveTemplate', {
          template: {
            name: example.name,
            description: example.description,
            radRequest: new Radon(radRequest, locale).getMir(),
          },
        })
      })
    },
    setSubscriptId: function (state, { id }) {
      state.subscriptIds.push(id)
    },
    clearSubscriptIds: function (state) {
      state.subscriptIds = []
    },
    setDataRequestChangedSinceSaved(state, payload) {
      state.dataRequestChangedSinceSaved = payload.value
    },
    resetAutoTry(state) {
      state.autoTry = false
    },
    toggleTryDataRequest(state) {
      state.autoTry = !state.autoTry
      state.autoTry
        ? this.dispatch('tryDataRequest')
        : this.commit('clearDataRequestResult')
    },
    [SET_CURRENT_STAGE](state, { stage }) {
      state.currentStage = stage
    },
    [UPDATE_VARIABLES](
      state,
      { index, key, value, description, type, variableField = '' },
    ) {
      const prevValue = state.currentTemplate.variables[index].key
      const usedVariables = state.currentTemplate.usedVariables.filter(
        x => x.variable === prevValue,
      )
      if (usedVariables) {
        state.currentTemplate.variables[index] = {
          key: key,
          value: value,
          description: description,
          type: type,
        }
        state.currentTemplate.variables = [...state.currentTemplate.variables]
        usedVariables.forEach(usedVariable => {
          this.commit(USED_VARIABLES, {
            id: usedVariable.id,
            variable: key,
            value: value,
            type: type,
          })
          this.commit(UPDATE_TEMPLATE, {
            id: usedVariable.id,
            value: '$' + usedVariable.variable,
            description: description,
            type: type,
          })
        })
      } else {
        state.currentTemplate.variables[index] = {
          key: key,
          value: value,
          description: description,
          type: type,
        }
        state.currentTemplate.variables = [...state.currentTemplate.variables]
      }
      this.commit(UPDATE_HISTORY, {
        mir: state.currentRadonMarkupInterpreter.getMir(),
        type: HISTORY_UPDATE_TYPE.UPDATE_VARIABLE,
        info: { index, currentTemplate: state.currentTemplate, variableField },
      })
    },
    [DELETE_VARIABLE](state, { index }) {
      state.currentTemplate.variables.splice(index, 1)

      this.commit(UPDATE_HISTORY, {
        mir: state.currentRadonMarkupInterpreter.getMir(),
        type: HISTORY_UPDATE_TYPE.DELETE_VARIABLE,
        info: { index, currentTemplate: state.currentTemplate },
      })
    },
    [CREATE_VARIABLE](state) {
      state.currentTemplate.variablesIndex += 1
      state.currentTemplate.variables.push({
        key:
          i18n.global.tc('variable_default_key') +
          state.currentTemplate.variablesIndex,
        value: '',
        description: '',
        type: 'String',
      })
      this.commit(UPDATE_HISTORY, {
        mir: state.currentRadonMarkupInterpreter.getMir(),
        type: HISTORY_UPDATE_TYPE.ADD_VARIABLE,
        info: { currentTemplate: state.currentTemplate },
      })
    },
    [DELETE_USED_VARIABLE](state, { index }) {
      state.currentTemplate.usedVariables.splice(index, 1)
      this.dispatch('saveTemplate')
    },
    [USED_VARIABLES](state, { id, variable, value, type }) {
      const nativeValue = getNativeValueFromMarkupArgumentType(value, type)
      const usedVariable = state.currentTemplate.usedVariables.find(x => x.id)
      const hasSameId = state.currentTemplate.usedVariables.find(
        x => x.id === id,
      )
      if (usedVariable && !!hasSameId) {
        hasSameId.variable = variable
        hasSameId.value = nativeValue
      } else {
        state.currentTemplate.usedVariables.push({
          id: id,
          variable: variable,
          value: nativeValue,
        })
        state.currentTemplate.usedVariables = [
          ...state.currentTemplate.usedVariables,
        ]
        this.dispatch('saveTemplate')
      }
    },
    [CLEAR_HISTORY](state) {
      state.history = []
      state.historyIndex = 0
    },
    [UPDATE_HISTORY](state, { mir, type, info = {} }) {
      state.history.push({
        rad: mir,
        stage: state.currentStage,
        type,
        ...info,
        currentTemplate: state.currentTemplate,
      })
      state.historyIndex += 1
      state.history.splice(state.historyIndex + 1)
      this.dispatch('saveTemplate')
      if (state.autoTry) {
        this.dispatch('tryDataRequest', { root: true })
      }
    },
    [UPDATE_TEMPLATE](state, { id, value, keepRecord = true }) {
      state.currentRadonMarkupInterpreter.update(id, value)
      if (keepRecord) {
        this.commit(UPDATE_HISTORY, {
          mir: state.currentRadonMarkupInterpreter.getMir(),
          type: HISTORY_UPDATE_TYPE.UPDATE_TEMPLATE,
          info: { id, value },
        })
      }

      state.radRequest = state.currentRadonMarkupInterpreter
    },
    [EDITOR_REDO](state, { locale }) {
      if (state.history[state.historyIndex + 1]) {
        state.historyIndex += 1

        const currentHistoryCheckpoint = state.history[state.historyIndex]
        const { rad, stage } = currentHistoryCheckpoint
        state.currentTemplate =
          state.history[state.historyIndex].currentTemplate
        this.commit('setDataRequestChangedSinceSaved', { value: true })
        state.currentRadonMarkupInterpreter = new Radon(rad, locale)

        state.currentFocus = calculateCurrentFocusAfterRedo(
          currentHistoryCheckpoint,
          state.currentRadonMarkupInterpreter.getMarkup(),
          state.variablesIndex,
        )
        state.currentStage = stage
        state.radRequest = state.currentRadonMarkupInterpreter

        if (state.autoTry) {
          this.dispatch('tryDataRequest', { root: true })
        }
      }
    },
    clearCurrentFocus(state) {
      state.currentFocus = null
    },
    [EDITOR_UNDO](state, { locale }) {
      if (state.history[state.historyIndex - 1]) {
        state.historyIndex = state.historyIndex - 1
        const { rad } = state.history[state.historyIndex]
        state.currentTemplate =
          state.history[state.historyIndex].currentTemplate
        this.commit('setDataRequestChangedSinceSaved', { value: true })
        const previousHistoryCheckpoint = state.history[state.historyIndex]

        state.currentRadonMarkupInterpreter = new Radon(rad, locale)

        if (state.historyIndex !== 0) {
          state.currentStage = previousHistoryCheckpoint.stage
        }

        state.currentFocus = null
        state.currentFocus = calculateCurrentFocusAfterUndo(
          previousHistoryCheckpoint,
          state.currentRadonMarkupInterpreter.getMarkup(),
          state.variablesIndex,
          state.history[state.historyIndex].variableField,
        )
        state.radRequest = state.currentRadonMarkupInterpreter

        if (state.autoTry) {
          this.dispatch('tryDataRequest', { root: true })
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
      state.currentRadonMarkupInterpreter.updateSource(index, {
        kind: source.protocol,
        url: source.url,
        body: source.body,
        headers: source.headers,
        contentType: source.contentType,
      })
      state.radRequest = state.currentRadonMarkupInterpreter
      this.commit(UPDATE_HISTORY, {
        mir: state.currentRadonMarkupInterpreter.getMir(),
        type: HISTORY_UPDATE_TYPE.UPDATE_SOURCE,
        info: { index, source },
      })
    },
    [DELETE_SOURCE](state, { index }) {
      state.currentRadonMarkupInterpreter.deleteSource(index)
      state.radRequest = state.currentRadonMarkupInterpreter
      this.commit(UPDATE_HISTORY, {
        mir: state.currentRadonMarkupInterpreter.getMir(),
        type: HISTORY_UPDATE_TYPE.DELETE_SOURCE,
        info: { index },
      })
    },
    [ADD_SOURCE](state) {
      state.radRequest = state.currentRadonMarkupInterpreter
      state.currentRadonMarkupInterpreter.addSource()
      state.radRequest = state.currentRadonMarkupInterpreter
      this.commit(UPDATE_HISTORY, {
        mir: state.currentRadonMarkupInterpreter.getMir(),
        type: HISTORY_UPDATE_TYPE.ADD_SOURCE,
      })
    },
    [SET_TEMPLATES](state, { templates }) {
      if (templates) {
        state.templates = templates
      }
    },
    [PUSH_OPERATOR](state, { scriptId }) {
      state.currentRadonMarkupInterpreter.addOperator(scriptId)
      state.radRequest = state.currentRadonMarkupInterpreter
      this.commit(UPDATE_HISTORY, {
        mir: state.currentRadonMarkupInterpreter.getMir(),
        type: HISTORY_UPDATE_TYPE.PUSH_OPERATOR,
        info: { scriptId },
      })
    },
    [CREATE_TEMPLATE](state, context) {
      const TEMPLATE_DEFAULT_NAME = i18n.global.tc('template_default_name')
      const name = Object.values(state.templates).reduce(
        (acc, _, index, self) => {
          const isRepeatedName = self.find(template => template.name === acc)

          return isRepeatedName ? `${TEMPLATE_DEFAULT_NAME} ${index + 1}` : acc
        },
        TEMPLATE_DEFAULT_NAME,
      )

      const radRequest = {
        timelock: 0,
        retrieve: [
          {
            url: '',
            kind: 'HTTP-GET',
            script: [],
          },
        ],
        aggregate: {
          filters: [],
          reducer: 0x02,
        },
        tally: {
          filters: [],
          reducer: 0x02,
        },
      }

      if (isValidRadRequest(radRequest)) {
        state.currentTemplate = {
          creationDate: Date.now(),
          id: generateId(),
          name: name,
          description: '',
          radRequest,
          variables: [],
          variablesIndex: 0,
          usedVariables: [],
        }

        state.currentRadonMarkupInterpreter = new Radon(
          radRequest,
          context.locale,
        )
        state.radRequest = state.currentRadonMarkupInterpreter
        state.history = [
          {
            rad: state.currentRadonMarkupInterpreter.getMir(),
            stage: EDITOR_STAGES.SETTINGS,
            currentTemplate: { ...state.currentTemplate },
          },
        ]
      } else {
        createNotification({
          title: i18n.global.tc('import_dr_notification_title'),
          body: i18n.global.tc('import_dr_notification_body'),
        })
      }
    },
    [SET_CURRENT_TEMPLATE](state, { id, locale }) {
      this.autoTry = false
      let template = state.templates[id]
      // Allow old templates compatibility with new radon js versions
      template.radRequest.retrieve = template.radRequest.retrieve.map(
        source => {
          return {
            ...source,
            kind: source.kind ? source.kind : source.kindOptions[0],
          }
        },
      )
      state.currentTemplate = template
      state.currentRadonMarkupInterpreter = new Radon(
        template.radRequest,
        locale,
      )
      state.radRequest = state.currentRadonMarkupInterpreter
    },
    [DELETE_OPERATOR](state, { scriptId, operatorId }) {
      state.currentRadonMarkupInterpreter.deleteOperator(scriptId, operatorId)
      state.radRequest = state.currentRadonMarkupInterpreter
      this.commit(UPDATE_HISTORY, {
        mir: state.currentRadonMarkupInterpreter.getMir(),
        type: HISTORY_UPDATE_TYPE.DELETE_OPERATOR,
        info: { scriptId, operatorId },
      })
    },
    renameTemplate: function (state, { id, name }) {
      state.templates[id].name = name
      this.commit('setDataRequestChangedSinceSaved', { value: true })
      this.commit(UPDATE_HISTORY, {
        mir: state.currentRadonMarkupInterpreter.getMir(),
        type: HISTORY_UPDATE_TYPE.UPDATE_NAME,
        info: { currentTemplate: state.currentTemplate },
      })
    },
    updateTemplateDescription: function (state, { id, description }) {
      state.templates[id].description = description
      this.commit('setDataRequestChangedSinceSaved', { value: true })
      this.commit(UPDATE_HISTORY, {
        mir: state.currentRadonMarkupInterpreter.getMir(),
        type: HISTORY_UPDATE_TYPE.UPDATE_DESCRIPTION,
        info: { currentTemplate: state.currentTemplate },
      })
    },
    [TOGGLE_VARIABLES](state, { hasVariables }) {
      if (hasVariables === true) {
        state.hasVariables = true
      } else {
        state.hasVariables = false
      }
    },
    setError(state, { name, error, message }) {
      state.errors[name] = {
        name,
        error,
        message,
      }
    },
    updateDRLanguage(state, { locale }) {
      if (state.currentRadonMarkupInterpreter) {
        state.currentRadonMarkupInterpreter.setLocale(locale)
      }
    },
  },
  actions: {
    saveTemplate: async function (context, args) {
      context.commit('setDataRequestChangedSinceSaved', { value: false })
      const isImportingTemplate = args ? !!args.template : null
      const date = Date.now()
      const templates = context.state.templates
      if (isImportingTemplate && !isValidRadRequest(args.template.radRequest)) {
        // data request is invalid
        createNotification({
          title: i18n.global.tc('import_dr_notification_title'),
          body: i18n.global.tc('import_dr_notification_body'),
        })
      } else {
        const templateToSave = isImportingTemplate
          ? {
              ...args.template,
              id: generateId(),
              creationDate: date,
              lastTimeOpened: date,
              variables: args.template.variables || [],
              variablesIndex: args.template.variablesIndex || 0,
              usedVariables: args.template.usedVariables || [],
            }
          : {
              ...context.state.currentTemplate,
              lastTimeOpened: date,
              radRequest: context.state.currentRadonMarkupInterpreter.getMir(),
            }
        if (!templateToSave.id) {
          templateToSave.id = generateId()
        }
        templates[templateToSave.id] = templateToSave

        const request = await api.saveItem({
          wallet_id: context.rootState.wallet.walletId,
          session_id: context.rootState.wallet.sessionId,
          key: 'templates',
          value: templates,
        })
        if (request.result) {
          await context.dispatch('getTemplates')
          this.commit(SET_CURRENT_TEMPLATE, {
            id: templateToSave.id,
            locale: context.rootState.wallet.locale,
          })
        } else {
          context.commit('setError', {
            name: 'saveItem',
            error: request.error,
            message: i18n.global.tc('save_template_error_message'),
          })
        }
      }
    },
    getTemplates: async function (context) {
      const request = await api.getItem({
        wallet_id: context.rootState.wallet.walletId,
        session_id: context.rootState.wallet.sessionId,
        key: 'templates',
      })
      if (request.result) {
        context.commit(SET_TEMPLATES, { templates: request.result.value })
      } else {
        context.commit('setError', {
          name: 'getItem',
          error: request.error.message,
          message: i18n.global.tc('get_templates_error_message'),
        })
      }
    },
    deleteTemplate: async function (context /*, { id }*/) {
      // TODO: fix
      // $vm.delete(context.state.templates, id)
      const request = await api.saveItem({
        wallet_id: context.rootState.wallet.walletId,
        session_id: context.rootState.wallet.sessionId,
        key: 'templates',
        value: context.state.templates,
      })
      if (!request.result) {
        context.commit('setError', {
          name: 'saveItem',
          error: request.error.message,
          message: i18n.global.tc('delete_template_error_message'),
        })
      }
    },
  },
}
