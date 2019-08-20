/* eslint no-useless-computed-key: 0 */
// Type names
export const TYPES = {
  BOOLEAN: 'Boolean',
  INTEGER: 'Integer',
  FLOAT: 'Float',
  STRING: 'String',
  ARRAY: 'Array',
  MAP: 'Map',
  BYTES: 'Bytes',
  RESULT: 'Result',
  REDUCER: 'Reducer',
  FILTER: 'Filter',
  MAPPER: 'Mapper',
}

// Pseudo-type names
const PSEUDOTYPES = {
  INNER: 'Inner',
  ARGUMENT: 'Argument',
  PASSTHROUGH: 'Passthrough',
}

export const REDUCERS = {
  min: 0x00,
  max: 0x01,
  mode: 0x02,
  averageMean: 0x03,
  averageMeanWeighted: 0x04,
  averageMedian: 0x05,
  averageMedianWeighted: 0x06,
  deviationStandard: 0x07,
  deviationAverage: 0x08,
  deviationMedian: 0x09,
  deviationMaximum: 0x0a,
}

export const MARKUP_REDUCER_OPTIONS = [
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'min',
    output_type: 'integer',
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'max',
    output_type: 'integer',
    meta: {},
  },

  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'averageMean',
    output_type: 'integer',
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'max',
    output_type: 'integer',
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'averageMean',
    output_type: 'integer',
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'averageMeanWeighted',
    output_type: 'integer',
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'averageMedian',
    output_type: 'integer',
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'averageMedianWeighted',
    output_type: 'integer',
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'deviationStandard',
    output_type: 'integer',
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'deviationAverage',
    output_type: 'integer',
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'deviationMedian',
    output_type: 'integer',
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'deviationMaximum',
    output_type: 'integer',
    meta: {},
  },
]

export const FILTERS = {
  greaterThan: 0x00,
  lessThan: 0x01,
  equals: 0x02,
  deviationAbsolute: 0x03,
  deviationRelative: 0x04,
  deviationStandard: 0x05,
  top: 0x06,
  bottom: 0x07,
  lessOrEqualThan: 0x80,
  greaterOrEqualThan: 0x81,
  notEquals: 0x82,
  notDeviationAbsolute: 0x83,
  notDeviationRelative: 0x84,
  notDeviationStandard: 0x85,
  notTop: 0x86,
  notBottom: 0x87,
}

export const MARKUP_FILTER_OPTIONS = [
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'greaterThan',
    output_type: TYPES.BYTES,
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'lessThan',
    output_type: TYPES.BYTES,
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'equals',
    output_type: TYPES.BYTES,
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'deviationAbsolute',
    output_type: TYPES.BYTES,
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'deviationRelative',
    output_type: TYPES.BYTES,
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'deviationStandard',
    output_type: TYPES.BYTES,
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'top',
    output_type: TYPES.BYTES,
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'bottom',
    output_type: TYPES.BYTES,
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'lessOrEqualThan',
    output_type: TYPES.BYTES,
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'greaterOrEqualThan',
    output_type: TYPES.BYTES,
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'notEquals',
    output_type: TYPES.BYTES,
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'notDeviationAbsolute',
    output_type: TYPES.BYTES,
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'notDeviationRelative',
    output_type: TYPES.BYTES,
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'notDeviationStandard',
    output_type: TYPES.BYTES,
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'notTop',
    output_type: TYPES.BYTES,
    meta: {},
  },
  {
    markup_type: 'option',
    hierarchical_type: 'argument_option',
    label: 'notBottom',
    output_type: TYPES.BYTES,
    meta: {},
  },
]

export const OPERATOR_INFOS = {
  // Boolean match
  [0x10]: {
    name: 'match',
    arguments: [
      {
        name: 'categories',
        optional: false,
        type: TYPES.MAP,
      },
      {
        name: 'default',
        optional: false,
        type: PSEUDOTYPES.INNER,
      },
    ],
  },
  // Boolean negate
  [0x11]: {
    name: 'negate',
    arguments: [],
  },
  [0x12]: {
    name: 'asString',
    arguments: [],
  },

  // Integer absolute
  [0x20]: {
    name: 'absolute',
    arguments: [],
  },
  // Integer asBytes
  [0x21]: {
    name: 'asBytes',
    arguments: [],
  },
  [0x22]: {
    name: 'asFloat',
    arguments: [],
  },
  [0x23]: {
    name: 'asString',
    arguments: [
      {
        name: 'base',
        optional: true,
        type: TYPES.INTEGER,
      },
    ],
  },
  [0x24]: {
    name: 'greaterThan',
    arguments: [
      {
        name: 'value',
        optional: false,
        type: TYPES.INTEGER,
      },
    ],
  },
  [0x25]: {
    name: 'lessThan',
    arguments: [
      {
        name: 'value',
        optional: false,
        type: TYPES.INTEGER,
      },
    ],
  },
  [0x26]: {
    name: 'match',
    arguments: [],
  },
  [0x27]: {
    name: 'modulo',
    arguments: [
      {
        name: 'modulus',
        optional: false,
        type: TYPES.INTEGER,
      },
    ],
  },
  [0x28]: {
    name: 'multiply',
    arguments: [
      {
        name: 'factor',
        optional: false,
        type: TYPES.INTEGER,
      },
    ],
  },
  [0x29]: {
    name: 'negate',
    arguments: [],
  },
  [0x2a]: {
    name: 'power',
    arguments: [
      {
        name: 'exponent',
        optional: false,
        type: TYPES.INTEGER,
      },
    ],
  },
  [0x2b]: {
    name: 'reciprocal',
    arguments: [],
  },
  [0x2c]: {
    name: 'sum',
    arguments: [
      {
        name: 'addend',
        optional: false,
        type: TYPES.INTEGER,
      },
    ],
  },

  // FLOAT
  [0x30]: {
    name: 'absolute',
    arguments: [],
  },
  [0x31]: {
    name: 'asBytes',
    arguments: [],
  },
  [0x32]: {
    name: 'asString',
    arguments: [
      {
        name: 'decimals',
        optional: false,
        type: TYPES.FLOAT,
      },
    ],
  },
  [0x33]: {
    name: 'ceiling',
    arguments: [],
  },
  [0x34]: {
    name: 'greaterThan',
    arguments: [
      {
        name: 'value',
        optional: false,
        type: TYPES.FLOAT,
      },
    ],
  },
  [0x35]: {
    name: 'floor',
    arguments: [],
  },
  [0x36]: {
    name: 'lessThan',
    arguments: [
      {
        name: 'value',
        optional: false,
        type: TYPES.FLOAT,
      },
    ],
  },
  [0x37]: {
    name: 'modulo',
    arguments: [
      {
        name: 'modulus',
        optional: false,
        type: TYPES.FLOAT,
      },
    ],
  },
  [0x38]: {
    name: 'multiply',
    arguments: [
      {
        name: 'factor',
        optional: false,
        type: TYPES.FLOAT,
      },
    ],
  },
  [0x39]: {
    name: 'negate',
    arguments: [],
  },
  [0x3a]: {
    name: 'power',
    arguments: [
      {
        name: 'exponent',
        optional: false,
        type: TYPES.FLOAT,
      },
    ],
  },
  [0x3b]: {
    name: 'reciprocal',
    arguments: [],
  },
  [0x3c]: {
    name: 'round',
    arguments: [],
  },
  [0x3d]: {
    name: 'sum',
    arguments: [
      {
        name: 'addend',
        optional: false,
        type: TYPES.FLOAT,
      },
    ],
  },
  [0x3e]: {
    name: 'truncate',
    arguments: [],
  },
  // STRING
  [0x40]: {
    name: 'asBytes',
    arguments: [],
  },
  [0x41]: {
    name: 'asFloat',
    arguments: [],
  },
  [0x42]: {
    name: 'asInteger',
    arguments: [],
  },
  [0x43]: {
    name: 'length',
    arguments: [],
  },
  [0x44]: {
    name: 'match',
    arguments: [],
  },
  [0x45]: {
    name: 'parseJson',
    arguments: [],
  },
  [0x46]: {
    name: 'parseXml',
    arguments: [],
  },
  [0x47]: {
    name: 'asBoolean',
    arguments: [],
  },
  [0x48]: {
    name: 'toLowerCase',
    arguments: [],
  },
  [0x49]: {
    name: 'toUpperCase',
    arguments: [],
  },
  [0x50]: {
    name: 'asBytes',
    arguments: [],
  },
  [0x51]: {
    name: 'count',
    arguments: [],
  },
  [0x52]: {
    name: 'every',
    arguments: [
      {
        name: 'function',
        optional: false,
        type: TYPES.FILTER,
      },
    ],
  },
  [0x53]: {
    name: 'filter',
    arguments: [
      {
        name: 'function',
        optional: false,
        type: TYPES.FILTER,
      },
    ],
  },
  [0x54]: {
    name: 'flatten',
    arguments: [
      {
        name: 'depth',
        optional: true,
        type: TYPES.INTEGER,
      },
    ],
  },
  [0x55]: {
    name: 'get',
    arguments: [
      {
        name: 'index',
        optional: false,
        type: TYPES.INTEGER,
      },
    ],
  },
  [0x56]: {
    name: 'map',
    arguments: [
      {
        name: 'operator',
        optional: false,
        type: TYPES.MAPPER,
      },
    ],
  },
  [0x57]: {
    name: 'reduce',
    arguments: [
      {
        name: 'function',
        optional: false,
        type: TYPES.REDUCER,
      },
    ],
  },
  [0x58]: {
    name: 'some',
    arguments: [
      {
        name: 'function',
        optional: false,
        type: TYPES.FILTER,
      },
    ],
  },
  [0x59]: {
    name: 'sort',
    arguments: [
      {
        name: 'mapFunction',
        optional: false,
        type: TYPES.MAPPER,
      },
      {
        name: 'ascending',
        optional: false,
        type: TYPES.BOOLEAN,
      },
    ],
  },
  [0x5a]: {
    name: 'take',
    arguments: [
      {
        name: 'min',
        optional: true,
        type: TYPES.INTEGER,
      },
      {
        name: 'max',
        optional: true,
        type: TYPES.INTEGER,
      },
    ],
  },
  [0x60]: {
    name: 'entries',
    arguments: [],
  },
  [0x61]: {
    name: 'get',
    arguments: [
      {
        name: 'key',
        optional: false,
        type: TYPES.STRING,
      },
    ],
  },
  [0x62]: {
    name: 'keys',
    arguments: [],
  },
  [0x63]: {
    name: 'values',
    arguments: [],
  },
  [0x70]: {
    name: 'asArray',
    arguments: [],
  },
  [0x71]: {
    name: 'asBoolean',
    arguments: [],
  },
  [0x72]: {
    name: 'asFloat',
    arguments: [],
  },
  [0x73]: {
    name: 'asInteger',
    arguments: [
      {
        name: 'base',
        optional: true,
        type: TYPES.INTEGER,
      },
    ],
  },
  [0x74]: {
    name: 'asMap',
    arguments: [],
  },
  [0x75]: {
    name: 'asString',
    arguments: [],
  },
  [0x76]: {
    name: 'hash',
    arguments: [],
  },
  [0x80]: {
    name: 'get',
    arguments: [],
  },
  [0x81]: {
    name: 'getOr',
    arguments: [
      {
        name: 'default',
        optional: false,
        type: TYPES.Self,
      },
    ],
  },
  [0x82]: {
    name: 'isOk',
    arguments: [],
  },
}

export const typeSystem = {
  [TYPES.BOOLEAN]: {
    match: [0x10, [PSEUDOTYPES.ARGUMENT]],
    negate: [0x11, [TYPES.BOOLEAN]],
    asString: [0x12, [TYPES.STRING]],
  },
  [TYPES.INTEGER]: {
    absolute: [0x20, [TYPES.INTEGER]],
    asBytes: [0x21, [TYPES.BYTES]],
    asFloat: [0x22, [TYPES.FLOAT]],
    asString: [0x23, [TYPES.STRING]],
    greaterThan: [0x24, [TYPES.BOOLEAN]],
    lessThan: [0x25, [TYPES.BOOLEAN]],
    match: [0x26, [PSEUDOTYPES.ARGUMENT]],
    modulo: [0x27, [TYPES.INTEGER]],
    multiply: [0x28, [TYPES.INTEGER]],
    negate: [0x29, [TYPES.INTEGER]],
    power: [0x2a, [TYPES.INTEGER]],
    reciprocal: [0x2b, [TYPES.FLOAT]],
    sum: [0x2c, [TYPES.INTEGER]],
  },
  [TYPES.FLOAT]: {
    absolute: [0x30, [TYPES.INTEGER]],
    asBytes: [0x31, [TYPES.BYTES]],
    asString: [0x32, [TYPES.STRING]],
    ceiling: [0x33, [TYPES.INTEGER]],
    graterThan: [0x34, [TYPES.BOOLEAN]],
    floor: [0x35, [TYPES.INTEGER]],
    lessThan: [0x36, [TYPES.BOOLEAN]],
    modulo: [0x37, [TYPES.FLOAT]],
    multiply: [0x38, [TYPES.FLOAT]],
    negate: [0x39, [TYPES.FLOAT]],
    power: [0x3a, [TYPES.FLOAT]],
    reciprocal: [0x3b, [TYPES.FLOAT]],
    round: [0x3c, [TYPES.INTEGER]],
    sum: [0x3d, [TYPES.FLOAT]],
    truncate: [0x3e, [TYPES.INTEGER]],
  },
  [TYPES.STRING]: {
    asBytes: [0x40, [TYPES.BYTES]],
    asFloat: [0x41, [TYPES.FLOAT]],
    asInteger: [0x42, [TYPES.INTEGER]],
    length: [0x43, [TYPES.INTEGER]],
    match: [0x44, [PSEUDOTYPES.ARGUMENT]],
    parseJson: [0x45, [TYPES.BYTES]],
    parseXML: [0x46, [TYPES.MAP]],
    asBoolean: [0x47, [TYPES.BOOLEAN]],
    toLowerCase: [0x48, [TYPES.STRING]],
    toUpperCase: [0x49, [TYPES.STRING]],
  },
  [TYPES.ARRAY]: {
    asBytes: [0x50, [TYPES.BYTES]],
    count: [0x51, [TYPES.INTEGER]],
    every: [0x52, [TYPES.BOOLEAN]],
    filter: [0x53, [TYPES.ARRAY, PSEUDOTYPES.INNER]],
    flatten: [0x54, [TYPES.ARRAY, PSEUDOTYPES.PASSTHROUGH]],
    get: [0x55, [PSEUDOTYPES.INNER]],
    map: [0x56, [PSEUDOTYPES.ARGUMENT]],
    reduce: [0x57, [PSEUDOTYPES.INNER]],
    some: [0x58, [TYPES.BOOLEAN]],
    sort: [0x59, [TYPES.ARRAY, PSEUDOTYPES.INNER]],
    take: [0x5a, [TYPES.ARRAY, PSEUDOTYPES.INNER]],
  },
  [TYPES.MAP]: {
    entries: [0x60, [TYPES.ARRAY, TYPES.BYTES]],
    get: [0x61, [PSEUDOTYPES.INNER]],
    keys: [0x62, [TYPES.STRING]],
    values: [0x63, [PSEUDOTYPES.INNER]],
  },
  [TYPES.BYTES]: {
    asArray: [0x70, [TYPES.ARRAY, TYPES.BYTES]],
    asBoolean: [0x71, [TYPES.BOOLEAN]],
    asFloat: [0x72, [TYPES.FLOAT]],
    asInteger: [0x73, [TYPES.INTEGER]],
    asMap: [0x74, [TYPES.MAP, TYPES.BYTES]],
    asString: [0x75, [TYPES.STRING]],
    hash: [0x76, [TYPES.BYTES]],
  },
  [TYPES.RESULT]: {
    get: [0x80, [PSEUDOTYPES.INNER]],
    getOr: [0x81, [PSEUDOTYPES.INNER]],
    isOk: [0x82, [TYPES.BOOLEAN]],
  },
}
