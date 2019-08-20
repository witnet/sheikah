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
    return this.mir
  }

  getMarkup() {
    return this.markup
  }
  pushSource() {
    this.markup.retrieve.push({
      url: '',
      kind: 'HTTP-GET',
      script: this._getSourceMarkup([0x75]),
    })
  }

  pushOperator(stage, sourceIndex) {
    const script =
      stage === 'retrieve' ? this.markup[stage][sourceIndex].script : this.markup[stage].script
    const lastOperator = script[script.length - 1]
    const lastOperatorOutputType = Array.isArray(lastOperator.selected.output_type)
      ? lastOperator.selected.output_type[0]
      : lastOperator.selected.output_type
    const outputType = TYPES[lastOperatorOutputType.toUpperCase()]
    const options = Object.entries(typeSystem[outputType]).map(option => {
      return {
        markup: 'option',
        hierarchical_type: 'operator_option',
        label: option[0],
        output_type: option[1][1][0],
      }
    })
    const operatorNumber = Object.values(typeSystem[outputType])[0][0]
    const operatorInfo = OPERATOR_INFOS[operatorNumber]

    const args = operatorInfo.arguments.map((argument, index) => {
      if ([TYPES.BOOLEAN, TYPES.INTEGER, TYPES.FLOAT, TYPES.STRING].includes(argument.type)) {
        return {
          id: this.generateId(),
          label: argument.name,
          markup_type: 'input',
          hierarchical_type: 'argument',
          value: '',
        }
      } else if (argument.type === TYPES.MAPPER) {
        // TODO: return correct markup
        return {
          id: this.generateId(),
          label: argument.name,
          markup_type: 'input',
          hierarchical_type: 'argument',
          value: '',
        }
      } else if (argument.type === TYPES.REDUCER) {
        return {
          id: this.generateId(),
          label: argument.name,
          markup_type: 'input',
          hierarchical_type: 'argument',
          selected: {
            markup_type: 'option',
            hierarchical_type: 'operator_option',
            label: Object.keys(REDUCERS)[0],
            output_type: 'array',
          },
          options: MARKUP_REDUCER_OPTIONS,
        }
      } else if (argument.type === TYPES.FILTER) {
        return {
          id: this.generateId(),
          label: argument.name,
          markup_type: 'input',
          hierarchical_type: 'argument',
          selected: {
            markup_type: 'option',
            hierarchical_type: 'operator_option',
            label: Object.keys(FILTERS)[0],
            output_type: 'array',
          },
          options: MARKUP_FILTER_OPTIONS,
        }
      } else {
        console.log('You are using an operator with a non supported argument type')
      }
    })

    const selected = {
      hierarchical_type: 'operator_option',
      label: operatorInfo.name,
      arguments: args,
      output_type: outputType,
    }

    const newOperator = {
      id: this.generateId(),
      markup_type: 'select',
      hierarchical_type: 'operator',
      selected: selected,
      options: options,
    }

    if (stage === 'retrieve') {
      this.markup[stage][sourceIndex].script.push(newOperator)
    } else {
      this.markup[stage].script.push(newOperator)
    }
    return newOperator
  }

  updateMarkup(markup, value) {
    if (markup.markup_type === 'select') {
      const optionsList = markup.options.map(option => option.label)

      const selectedOperatorInfoEntry = Object.entries(OPERATOR_INFOS).find(operatorInfoEntry => {
        // su optionsList coincide
        const name = operatorInfoEntry[1].name
        const optionsListCandidate = Object.values(typeSystem).find(x => {
          return Object.values(x)
            .map(y => y[0])
            .includes(parseInt(operatorInfoEntry[0]))
        })
        // tienen el mismo nombre de operador
        return name === value && areSoftEqualArrays(optionsList, Object.keys(optionsListCandidate))
      })
      const selectedOperatorInfo = selectedOperatorInfoEntry[1]
      const outputType = Object.values(typeSystem).reduce((acc, item) => {
        const operatorEntry = Object.values(item).find(x => {
          return x[0] === parseInt(selectedOperatorInfoEntry[0])
        })
        return acc || (operatorEntry ? operatorEntry[1] : null)
      }, null)

      const args = selectedOperatorInfo.arguments.length
        ? selectedOperatorInfo.arguments.map((argument, index) => {
            if ([TYPES.BOOLEAN, TYPES.INTEGER, TYPES.FLOAT, TYPES.STRING].includes(argument.type)) {
              return {
                id: this.generateId(),
                label: argument.name,
                markup_type: 'input',
                hierarchical_type: 'argument',
                // [operatorNumber, arg1, arg2, ...]
                value: '',
              }
            } else if (argument.type === TYPES.MAPPER) {
              return {
                id: this.generateId(),
                label: argument.name,
                markup_type: 'input',
                hierarchical_type: 'argument',
                // [operatorNumber, arg1, arg2, ...]
                value: '',
              }
            } else if (argument.type === TYPES.REDUCER) {
              return {
                id: this.generateId(),
                label: argument.name,
                markup_type: 'input',
                hierarchical_type: 'argument',
                selected: MARKUP_REDUCER_OPTIONS[0],
                options: MARKUP_REDUCER_OPTIONS,
              }
            } else if (argument.type === TYPES.FILTER) {
              return {
                id: this.generateId(),
                label: argument.name,
                markup_type: 'input',
                hierarchical_type: 'argument',
                selected: MARKUP_FILTER_OPTIONS[0],
                options: MARKUP_FILTER_OPTIONS,
              }
            } else {
              console.log('You are using an operator with a non supported argument type')
            }
          })
        : []
      markup.selected.label = value
      markup.selected.output_type = outputType

      return { ...markup, arguments: args }
    } else if (markup.markup_type === 'input') {
      markup.value = value
      return markup
    }
  }

  updateElement(id, value, stage) {
    const searchAndReplace = (currentMarkup, id, value, found) => {
      if (found) {
        return currentMarkup
      }

      if (Array.isArray(currentMarkup)) {
        return currentMarkup.map(x => {
          return searchAndReplace(x, id, value, found)
        })
      }

      if (currentMarkup.id === id) {
        const result = this.updateMarkup(currentMarkup, value)
        return result
      } else {
        if (
          currentMarkup.selected &&
          currentMarkup.selected.arguments &&
          currentMarkup.selected.arguments.length
        ) {
          currentMarkup.selected.arguments = currentMarkup.selected.arguments.map(argument => {
            return searchAndReplace(argument, id, value, false)
          })
          return currentMarkup
        } else {
          return currentMarkup
        }
      }
    }

    this.markup.retrieve = this.markup.retrieve.map(source => {
      source.script = searchAndReplace(source.script, id, value, false)
      return source
    })

    this.markup.aggregate.script = searchAndReplace(this.markup.aggregate.script, id, value, false)
    this.markup.tally.script = searchAndReplace(this.markup.tally.script, id, value, false)
  }

  _getSourceMarkup(source) {
    return source.map((operator, index) => {
      return Object.entries(typeSystem).reduce((acc, entry) => {
        // returns generateMarkdown([operatorName,[operatorCode, outputType] ])
        const search = Object.entries(entry[1]).find(x =>
          Array.isArray(operator) ? x[1][0] === operator[0] : x[1][0] === operator
        )

        if (search) {
          const operatorNumber = search[1][0]
          const operatorInfo = OPERATOR_INFOS[operatorNumber]
          const outputType = search[1][1]
          const options = Object.entries(entry[1]).map(option => ({
            markup: 'option',
            hierarchical_type: 'operator_option',
            label: option[0],
            output_type: option[1][1][0],
          }))

          const args = operatorInfo.arguments.map((argument, index) => {
            if ([TYPES.BOOLEAN, TYPES.INTEGER, TYPES.FLOAT, TYPES.STRING].includes(argument.type)) {
              return {
                id: this.generateId(),
                label: argument.name,
                markup_type: 'input',
                hierarchical_type: 'argument',
                // [operatorNumber, arg1, arg2, ...]
                value: operator[index + 1],
              }
            } else if (argument.type === TYPES.MAPPER) {
              // TODO: return correct markup
              return {
                id: this.generateId(),
                label: argument.name,
                markup_type: 'input',
                hierarchical_type: 'argument',
                // [operatorNumber, arg1, arg2, ...]
                value: operator[index + 1],
              }
            } else if (argument.type === TYPES.REDUCER) {
              return {
                id: this.generateId(),
                label: argument.name,
                markup_type: 'input',
                hierarchical_type: 'argument',
                selected: Object.entries(REDUCERS)
                  .filter(reducer => reducer[1] === operator[index + 1])
                  .map(reducer => {
                    return {
                      markup_type: 'option',
                      hierarchical_type: 'operator_option',
                      label: reducer[0],
                      output_type: 'array',
                    }
                  })[0],
                options: MARKUP_REDUCER_OPTIONS,
              }
            } else if (argument.type === TYPES.FILTER) {
              return {
                id: this.generateId(),
                label: argument.name,
                markup_type: 'input',
                hierarchical_type: 'argument',
                selected: Object.entries(FILTERS)
                  .filter(filter => filter[1] === operator[index + 1])
                  .map(filter => {
                    return {
                      markup_type: 'option',
                      hierarchical_type: 'operator_option',
                      label: filter[0],
                      output_type: 'array',
                    }
                  })[0],
                options: MARKUP_FILTER_OPTIONS,
              }
            } else {
              console.log('You are using an operator with a non supported argument type')
            }
          })

          const selected = {
            hierarchical_type: 'operator_option',
            label: operatorInfo.name,
            arguments: args,
            output_type: outputType,
          }

          const markup = {
            id: this.generateId(),
            markup_type: 'select',
            hierarchical_type: 'operator',
            output_type: outputType,
            selected: selected,
            options: options,
          }

          return markup
        }

        return acc
      })
    })
  }
}
