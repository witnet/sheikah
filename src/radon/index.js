import { areSoftEqualArrays } from '@/utils'
import {
  typeSystem,
  TYPES,
  REDUCERS,
  MARKUP_REDUCER_OPTIONS,
  MARKUP_FILTER_OPTIONS,
  FILTERS,
  OPERATOR_INFOS,
} from './structures'

export class RadonMarkupInterpreter {
  constructor(mir) {
    this.counter = 0
    this.mir = mir

    this.cache = {}
    this.scriptsCache = {}

    this.markup = {
      notBefore: mir.notBefore,
      retrieve: mir.retrieve.map(source => ({
        kind: 'HTTP_GET',
        url: source.url,
        script: this._getSourceMarkup(source.script),
      })),
      aggregate: { script: this._getSourceMarkup(mir.aggregate.script) },
      tally: { script: this._getSourceMarkup(mir.tally.script) },
    }
  }

  generateId() {
    this.counter += 1
    return this.counter
  }

  getMir() {
    this._fromMarkup2Mir()
    return this.mir
  }
  // Method that read the current markup and updates the mir according to it
  _fromMarkup2Mir() {
    const newMir = JSON.parse(JSON.stringify(this.mir))
    newMir.retrieve = this.markup.retrieve.map(source => {
      source.script = this.buildFromScript(source.script)
      return source
    })

    newMir.aggregate.script = this.buildFromScript(this.markup.aggregate.script)
    newMir.tally.script = this.buildFromScript(this.markup.tally.script)
    this.mir = newMir
  }

  buildFromScript(script) {
    return script
      .filter(cacheRef => {
        return !!this.cache[cacheRef.cacheId]
      })
      .map(cacheRef => this.cache[cacheRef.cacheId])
      .map(expanded => {
        const label = expanded.selected.label
        const options = expanded.options.map(option => option.label)
        let operatorCode = Object.entries(typeSystem).find(entry =>
          areSoftEqualArrays(Object.keys(entry[1]), options)
        )
        operatorCode = operatorCode[1][label][0]
        const operatorInfo = OPERATOR_INFOS[operatorCode]
        let operatorMir
        if (operatorInfo.arguments && operatorInfo.arguments.length) {
          const args = this.getMirArguments(expanded.selected.arguments)
          operatorMir = args.filter(argument => !!argument).length
            ? [operatorCode, ...args]
            : operatorCode
        } else {
          operatorMir = operatorCode
        }

        return operatorMir
      })
  }

  getMirArguments(markupArguments) {
    return markupArguments
      .map(argument => (argument.cacheId ? this.cache[argument.cacheId] : argument))
      .filter(argument => !!argument)
      .map(argument => {
        if (['Boolean', 'Integer', 'Float', 'String'].includes(argument.type)) {
          return argument.value
        } else if (['Reducer'].includes(argument.type)) {
          return REDUCERS[argument.selected.label]
        } else if (['Filter'].includes(argument.type)) {
          return FILTERS[argument.selected.label]
        } else if (['Mapper'].includes(argument.type)) {
          console.log("We don't supper subscripts yet")
        } else if (['Inner', 'Argument', 'Passthrough'].includes(argument.type)) {
          console.log('You are using a unstable operator')
          return argument.value
        }
      })
  }
  getMarkup() {
    const expandedMarkup = JSON.parse(JSON.stringify(this.markup))
    expandedMarkup.retrieve = expandedMarkup.retrieve.map(source => {
      source.script = this._expandScript(source.script)
      return source
    })
    expandedMarkup.aggregate.script = this._expandScript(expandedMarkup.aggregate.script)
    expandedMarkup.tally.script = this._expandScript(expandedMarkup.tally.script)

    return expandedMarkup
  }

  pushSource() {
    this.markup.retrieve.push({
      url: '',
      kind: 'HTTP-GET',
      script: this._getSourceMarkup([0x75]),
    })
  }
  deleteSource(index) {
    if (this.markup.retrieve[index]) {
      this.markup.retrieve.splice(index, 1)
    }
  }

  updateSource({ url, kind }, index) {
    if (this.markup.retrieve[index]) {
      this.markup.retrieve[index].url = url
      this.markup.retrieve[index].kind = kind
    }
  }

  _expandScript(script) {
    const expanded = script
      // Skip subscripts removed operators. OperatorIds are not being removed from the subscript markup
      .filter(operator => !!this.cache[operator.cacheId])
      .map(operator =>
        operator.cacheId ? this._expandOperator(this.cache[operator.cacheId]) : operator
      )
    return expanded
  }

  _expandOperator(operator) {
    const expanded = operator
    if (expanded.selected && expanded.selected.arguments && expanded.selected.arguments.length) {
      expanded.selected.arguments = expanded.selected.arguments.map(argument =>
        argument.cacheId ? this._expandOperator(this.cache[argument.cacheId]) : argument
      )
    }

    return expanded
  }

  updateElement(id, value, _stage) {
    const scriptId = this.cache[id].scriptId
    const index = this.scriptsCache[scriptId].findIndex(x => x === id)
    const updatedElement = this._updateMarkup(this.cache[id], value)
    const oldOutputType = this.cache[id].selected.output_type
    const newOutputType = updatedElement.output_type
    this.cache[id] = updatedElement
    if (!areSoftEqualArrays(oldOutputType, newOutputType)) {
      const newScriptIds = this.scriptsCache[scriptId].slice(0, index + 1)
      const idsToRemove = this.scriptsCache[scriptId].slice(index + 1)
      this.scriptsCache[scriptId] = newScriptIds
      idsToRemove.forEach(idToRemove => {
        this.cache[idToRemove] = null
      })
    }
  }
  pushOperator(stage, sourceIndex) {
    const scriptId =
      stage === 'retrieve'
        ? this.cache[this.markup[stage][sourceIndex].script[0].cacheId].scriptId
        : this.cache[this.markup[stage].script[0].cacheId].scriptId
    const fullScript =
      stage === 'retrieve' ? this.markup[stage][sourceIndex].script : this.markup[stage].script
    const script = fullScript.filter(x => !!this.cache[x.cacheId])
    const lastOperator = this.cache[script[script.length - 1].cacheId]
    const lastOperatorOutputType = Array.isArray(lastOperator.selected.output_type)
      ? lastOperator.selected.output_type[0]
      : lastOperator.selected.output_type
    const outputType = TYPES[lastOperatorOutputType.toUpperCase()]
    const options = Object.entries(typeSystem[outputType]).map(option =>
      this._operatorOptionMarkupFactory(option[0], option[1][1][0])
    )
    const operatorNumber = Object.values(typeSystem[outputType])[0][0]
    const operatorInfo = OPERATOR_INFOS[operatorNumber]

    const args = operatorInfo.arguments
      .map(argument => {
        if ([TYPES.BOOLEAN, TYPES.INTEGER, TYPES.FLOAT, TYPES.STRING].includes(argument.type)) {
          return this._inputArgumentMarkupFactory(argument.name, '')
        } else if (argument.type === TYPES.MAPPER) {
          // TODO: return correct markup
          return this._inputArgumentMarkupFactory(argument.name, '')
        } else if (argument.type === TYPES.REDUCER) {
          const selected = this._selectedOptionMarkupFactory(Object.keys(REDUCERS)[0], 'array', [])
          return this._selectArgumentMarkupFactory(argument.name, selected, MARKUP_REDUCER_OPTIONS)
        } else if (argument.type === TYPES.FILTER) {
          const selected = this._selectedOptionMarkupFactory(Object.keys(FILTERS)[0], 'array', [])
          return this._selectArgumentMarkupFactory(argument.name, selected, MARKUP_FILTER_OPTIONS)
        } else {
          console.log('You are using an operator with a non supported argument type')
          // return this._inputArgumentMarkupFactory(argument.name, '')
          return null
        }
      })
      .filter(x => !!x)

    const selectedId = this._selectedOptionMarkupFactory(operatorInfo.name, outputType, args)
    const newOperatorId = this._operatorMarkupFactory(selectedId, options, outputType, scriptId)
    if (stage === 'retrieve') {
      this.markup[stage][sourceIndex].script.push(newOperatorId)
    } else {
      this.markup[stage].script.push(newOperatorId)
    }

    return newOperatorId
  }

  _updateMarkup(markup, value) {
    if (markup.markup_type === 'select') {
      const optionsList = markup.options.map(option => option.label)

      const selectedOperatorInfoEntry = Object.entries(OPERATOR_INFOS).find(operatorInfoEntry => {
        // su optionsList coincide
        const name = operatorInfoEntry[1].name
        const optionsListCandidate = Object.values(typeSystem).find(x =>
          Object.values(x)
            .map(y => y[0])
            .includes(parseInt(operatorInfoEntry[0]))
        )
        // check if they have the same operator name
        return name === value && areSoftEqualArrays(optionsList, Object.keys(optionsListCandidate))
      })

      const selectedOperatorInfo = selectedOperatorInfoEntry[1]
      const outputType = Object.values(typeSystem).reduce((acc, item) => {
        const operatorEntry = Object.values(item).find(
          x => x[0] === parseInt(selectedOperatorInfoEntry[0])
        )
        return acc || (operatorEntry ? operatorEntry[1] : null)
      }, null)

      const args = selectedOperatorInfo.arguments.length
        ? selectedOperatorInfo.arguments
            .map((argument, index) => {
              if (
                [TYPES.BOOLEAN, TYPES.INTEGER, TYPES.FLOAT, TYPES.STRING].includes(argument.type)
              ) {
                return this._inputArgumentMarkupFactory(argument.name, '')
              } else if (argument.type === TYPES.MAPPER) {
                return this._inputArgumentMarkupFactory(argument.name, '')
              } else if (argument.type === TYPES.REDUCER) {
                return this._selectArgumentMarkupFactory(
                  argument.name,
                  MARKUP_REDUCER_OPTIONS[0],
                  MARKUP_REDUCER_OPTIONS
                )
              } else if (argument.type === TYPES.FILTER) {
                return this._inputArgumentMarkupFactory(
                  argument.name,
                  MARKUP_FILTER_OPTIONS[0],
                  MARKUP_FILTER_OPTIONS
                )
              } else {
                console.log('You are using an operator with a non supported argument type')
                return null
              }
            })
            .filter(x => !!x)
        : []
      markup.selected.label = value
      markup.selected.output_type = outputType
      markup.selected.arguments = args
      return { ...markup }
    } else if (markup.markup_type === 'input') {
      markup.value = value
      return markup
    }
  }

  _getSourceMarkup(source) {
    const scriptId = this.generateId()
    this.scriptsCache[scriptId] = []
    return source.map(operator =>
      Object.entries(typeSystem).reduce((acc, entry) => {
        const search = Object.entries(entry[1]).find(x =>
          Array.isArray(operator) ? x[1][0] === operator[0] : x[1][0] === operator
        )

        if (search) {
          const operatorNumber = search[1][0]
          const operatorInfo = OPERATOR_INFOS[operatorNumber]
          const outputType = search[1][1]
          const options = Object.entries(entry[1]).map(option =>
            this._operatorOptionMarkupFactory(option[0], option[1][1][0])
          )

          const args = operatorInfo.arguments.map((argument, index) => {
            if ([TYPES.BOOLEAN, TYPES.INTEGER, TYPES.FLOAT, TYPES.STRING].includes(argument.type)) {
              return this._inputArgumentMarkupFactory(argument.name, operator[index + 1])
            } else if (argument.type === TYPES.MAPPER) {
              // TODO: return correct markup
              return this._inputArgumentMarkupFactory(argument.name, operator[index + 1])
            } else if (argument.type === TYPES.REDUCER) {
              const selected = Object.entries(REDUCERS)
                .filter(reducer => reducer[1] === operator[index + 1])
                .map(reducer => this._operatorOptionMarkupFactory(reducer[0], 'array'))[0]

              return this._selectArgumentMarkupFactory(
                argument.name,
                selected,
                MARKUP_REDUCER_OPTIONS
              )
            } else if (argument.type === TYPES.FILTER) {
              const selected = Object.entries(FILTERS)
                .filter(filter => filter[1] === operator[index + 1])
                .map(filter => this._operatorOptionMarkupFactory(filter[0], 'array'))[0]

              return this._selectArgumentMarkupFactory(
                argument.name,
                selected,
                MARKUP_FILTER_OPTIONS
              )
            } else {
              console.log('You are using an operator with a non supported argument type')
            }
          })

          const selected = this._selectedOptionMarkupFactory(operatorInfo.name, outputType, args)
          const markup = this._operatorMarkupFactory(selected, options, outputType, scriptId)

          return markup
        }

        return acc
      })
    )
  }

  _operatorMarkupFactory(selected, options, outputType, scriptId) {
    const id = this.generateId()
    this.scriptsCache[scriptId].push(id)
    this.cache[id] = {
      id,
      scriptId,
      markup_type: 'select',
      hierarchical_type: 'operator',
      output_type: outputType,
      selected,
      options,
    }

    return { cacheId: id }
  }

  _inputArgumentMarkupFactory(label, value) {
    const id = this.generateId()
    this.cache[id] = {
      id,
      label,
      markup_type: 'input',
      hierarchical_type: 'argument',
      value,
    }
    return { cacheId: id }
  }

  _selectArgumentMarkupFactory(label, selected, options) {
    const id = this.generateId()
    this.cache[id] = {
      id,
      label,
      markup_type: 'select',
      hierarchical_type: 'argumnet',
      selected,
      options,
    }

    return { cacheId: id }
  }

  _operatorOptionMarkupFactory(label, outputType) {
    return {
      markup_type: 'option',
      hierarchical_type: 'operator_option',
      label,
      output_type: outputType,
    }
  }

  _selectedOptionMarkupFactory(label, outputType, args) {
    return {
      markup_type: 'option',
      hierarchical_type: 'selected_operator_option',
      label,
      output_type: outputType,
      arguments: args,
    }
  }
}
