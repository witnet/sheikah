import { generateId } from '@/utils'

export function RadonMarkupInterpreter() {
  return {
    validateScript: script => true,
    pushOperator: stage => mainOperator(),
    parseTemplate: template => radonToMarkup(),
  }
}

export function isValidScript() {
  return false
}

export function mainOperator() {
  const MainOperator = {
    markup_type: 'select',
    hierarchical_type: 'operator',
    selected: {
      hierarchical_type: 'operator_option',
      label: 'asString',
      output_type: 'string',
      arguments: [],
    },
    options: [
      {
        markup_type: 'option',
        hierarchical_type: 'operator_option',
        label: 'asArray',
        output_type: 'array',
        meta: {},
      },
      {
        markup_type: 'option',
        hierarchical_type: 'operator_option',
        label: 'asBoolean',
        output_type: 'array',
        meta: {},
      },
      {
        markup_type: 'option',
        hierarchical_type: 'operator_option',
        label: 'asFloat',
        output_type: 'float',
      },
      {
        markup_type: 'option',
        hierarchical_type: 'operator_option',
        label: 'asInteger',
        output_type: 'array',
      },
      {
        markup_type: 'option',
        hierarchical_type: 'operator_option',
        label: 'asMap',
        output_type: 'array',
      },
      {
        markup_type: 'option',
        hierarchical_type: 'operator_option',
        label: 'asString',
        output_type: 'array',
      },
      {
        markup_type: 'option',
        hierarchical_type: 'operator_option',
        label: 'hash',
        output_type: 'string',
      },
    ],
  }
  return MainOperator
}

export function radonToMarkup() {
  const markup = [
    {
      markup_type: 'select',
      hierarchical_type: 'operator',
      selected: {
        hierarchical_type: 'operator_option',
        label: 'asString',
        output_type: 'string',
        arguments: [],
      },
      options: [
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asArray',
          output_type: 'array',
          meta: {},
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asBoolean',
          output_type: 'array',
          meta: {},
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asFloat',
          output_type: 'float',
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asInteger',
          output_type: 'array',
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asMap',
          output_type: 'array',
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asString',
          output_type: 'array',
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'hash',
          output_type: 'string',
        },
      ],
    },
    {
      markup_type: 'select',
      hierarchical_type: 'operator',
      selected: {
        hierarchical_type: 'operator_option',
        label: 'parseJson',
        output_type: 'bytes',
        meta: {},
        arguments: [],
      },
      options: [
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'hash',
          output_type: 'string',
          meta: {},
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'length',
          output_type: 'int',
          meta: {},
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'match',
          output_type: 'generic',
          meta: {},
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'parseJson',
          output_type: 'bytes',
          meta: {},
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'parseXml',
          output_type: 'map',
          meta: {
            static_type: 'map<string, bytes>',
          },
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asBoolean',
          output_type: 'boolean',
          meta: {
            static_type: 'map<string, bytes>',
          },
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asInteger',
          output_type: 'integer',
          meta: {},
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'toLowerCase',
          output_type: 'string',
          meta: {},
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'toUpperCase',
          output_type: 'string',
          meta: {},
        },
      ],
    },
    {
      markup_type: 'select',
      hierarchical_type: 'operator',
      selected: {
        hierarchical_type: 'operator_option',
        label: 'asMap',
        output_type: 'map',
        arguments: [],
      },
      options: [
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asArray',
          output_type: 'array',
          meta: {},
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asBoolean',
          output_type: 'array',
          meta: {},
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asFloat',
          output_type: 'float',
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asInteger',
          output_type: 'array',
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asMap',
          output_type: 'array',
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asString',
          output_type: 'array',
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'hash',
          output_type: 'string',
        },
      ],
    },
    {
      markup_type: 'select',
      hierarchical_type: 'operator',
      selected: {
        markup_type: 'option',
        hierarchical_type: 'operator_option',
        label: 'entries',
        output_type: 'array',
        meta: {
          static_type: 'array<array<bytes>>',
        },
        arguments: [
          {
            label: 'value',
            markup_type: 'input',
            hierarchical_type: 'argument',
            value: 'caracola',
          },
          {
            label: 'hash',
            markup_type: 'select',
            hierarchical_type: 'argument',
            selected: {
              markup_type: 'option',
              hierarchical_type: 'argument_option',
              label: 'MD5',
              output_type: 'bytes',
              arguments: [],
            },
            options: [
              {
                markup_type: 'option',
                hierarchical_type: 'argument_option',
                label: 'blake256',
                output_type: 'bytes',
              },
              {
                markup_type: 'option',
                hierarchical_type: 'argument_option',
                label: 'blake512',
                output_type: 'bytes',
              },
              {
                markup_type: 'option',
                hierarchical_type: 'argument_option',
                label: 'MD5',
                output_type: 'bytes',
              },
              {
                markup_type: 'option',
                hierarchical_type: 'argument_option',
                label: 'SHA1',
                output_type: 'bytes',
              },
            ],
          },
        ],
      },
      options: [
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'entries',
          output_type: 'array',
          meta: {
            static_type: 'array<array<bytes>>',
          },
          options: [],
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'get',
          output_type: 'generic',
          meta: {},
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'keys',
          output_type: 'array',
          meta: {
            static_type: 'array<string>',
          },
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'values',
          output_type: 'array',
          meta: {
            static_type: 'array<generic>',
          },
        },
      ],
    },
  ]
  return {
    id: generateId(),
    radRequest: {
      not_before: 0,
      retrieve: [
        {
          url: '',
          kind: 'HTTP-GET',
          script: markup,
        },
      ],
      aggregate: {
        script: markup,
      },
      consensus: {
        script: markup,
      },
    },
  }
}
