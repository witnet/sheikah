export let TYPES;

(function (TYPES) {
  TYPES[TYPES['Boolean'] = 0] = 'Boolean'
  TYPES[TYPES['Int'] = 1] = 'Int'
  TYPES[TYPES['Float'] = 2] = 'Float'
  TYPES[TYPES['String'] = 3] = 'String'
  TYPES[TYPES['Array'] = 4] = 'Array'
  TYPES[TYPES['Map'] = 5] = 'Map'
  TYPES[TYPES['Mixed'] = 6] = 'Mixed'
  TYPES[TYPES['Null'] = 7] = 'Null'
  TYPES[TYPES['Result'] = 8] = 'Result'
  TYPES[TYPES['HashFunction'] = -1] = 'HashFunction'
  TYPES[TYPES['FilterFunction'] = -2] = 'FilterFunction'
  TYPES[TYPES['ReduceFunction'] = -3] = 'ReduceFunction'
  TYPES[TYPES['MapFunction'] = -4] = 'MapFunction'
  TYPES[TYPES['Self'] = -5] = 'Self'
})(TYPES || (TYPES = {}))

export let OPERATORS;

(function (OPERATORS) {
  OPERATORS[OPERATORS['ARRAY_COUNT'] = 80] = 'ARRAY_COUNT'
  OPERATORS[OPERATORS['ARRAY_EVERY'] = 81] = 'ARRAY_EVERY'
  OPERATORS[OPERATORS['ARRAY_FILTER'] = 82] = 'ARRAY_FILTER'
  OPERATORS[OPERATORS['ARRAY_FLATTEN'] = 83] = 'ARRAY_FLATTEN'
  OPERATORS[OPERATORS['ARRAY_GET'] = 84] = 'ARRAY_GET'
  OPERATORS[OPERATORS['ARRAY_MAP'] = 85] = 'ARRAY_MAP'
  OPERATORS[OPERATORS['ARRAY_REDUCE'] = 86] = 'ARRAY_REDUCE'
  OPERATORS[OPERATORS['ARRAY_SOME'] = 87] = 'ARRAY_SOME'
  OPERATORS[OPERATORS['ARRAY_SORT'] = 88] = 'ARRAY_SORT'
  OPERATORS[OPERATORS['ARRAY_TAKE'] = 89] = 'ARRAY_TAKE'
  OPERATORS[OPERATORS['BOOLEAN_MATCH'] = 16] = 'BOOLEAN_MATCH'
  OPERATORS[OPERATORS['BOOLEAN_NEG'] = 17] = 'BOOLEAN_NEG'
  OPERATORS[OPERATORS['BOOLEAN_TOSTRING'] = 18] = 'BOOLEAN_TOSTRING'
  OPERATORS[OPERATORS['FLOAT_ABS'] = 48] = 'FLOAT_ABS'
  OPERATORS[OPERATORS['FLOAT_CEIL'] = 49] = 'FLOAT_CEIL'
  OPERATORS[OPERATORS['FLOAT_FLOOR'] = 50] = 'FLOAT_FLOOR'
  OPERATORS[OPERATORS['FLOAT_MODULO'] = 51] = 'FLOAT_MODULO'
  OPERATORS[OPERATORS['FLOAT_MULT'] = 52] = 'FLOAT_MULT'
  OPERATORS[OPERATORS['FLOAT_NEG'] = 53] = 'FLOAT_NEG'
  OPERATORS[OPERATORS['FLOAT_POW'] = 54] = 'FLOAT_POW'
  OPERATORS[OPERATORS['FLOAT_RECIP'] = 55] = 'FLOAT_RECIP'
  OPERATORS[OPERATORS['FLOAT_ROUND'] = 56] = 'FLOAT_ROUND'
  OPERATORS[OPERATORS['FLOAT_SUM'] = 57] = 'FLOAT_SUM'
  OPERATORS[OPERATORS['FLOAT_TOSTRING'] = 58] = 'FLOAT_TOSTRING'
  OPERATORS[OPERATORS['FLOAT_TRUNC'] = 59] = 'FLOAT_TRUNC'
  OPERATORS[OPERATORS['INT_ABS'] = 32] = 'INT_ABS'
  OPERATORS[OPERATORS['INT_MATCH'] = 33] = 'INT_MATCH'
  OPERATORS[OPERATORS['INT_MODULO'] = 34] = 'INT_MODULO'
  OPERATORS[OPERATORS['INT_MULT'] = 35] = 'INT_MULT'
  OPERATORS[OPERATORS['INT_NEG'] = 36] = 'INT_NEG'
  OPERATORS[OPERATORS['INT_POW'] = 37] = 'INT_POW'
  OPERATORS[OPERATORS['INT_RECIP'] = 38] = 'INT_RECIP'
  OPERATORS[OPERATORS['INT_SUM'] = 39] = 'INT_SUM'
  OPERATORS[OPERATORS['INT_TOFLOAT'] = 40] = 'INT_TOFLOAT'
  OPERATORS[OPERATORS['INT_TOSTRING'] = 41] = 'INT_TOSTRING'
  OPERATORS[OPERATORS['MAP_ENTRIES'] = 96] = 'MAP_ENTRIES'
  OPERATORS[OPERATORS['MAP_GET'] = 97] = 'MAP_GET'
  OPERATORS[OPERATORS['MAP_KEYS'] = 98] = 'MAP_KEYS'
  OPERATORS[OPERATORS['MAP_VALUES'] = 99] = 'MAP_VALUES'
  OPERATORS[OPERATORS['MIXED_TOARRAY'] = 112] = 'MIXED_TOARRAY'
  OPERATORS[OPERATORS['MIXED_TOBOOLEAN'] = 113] = 'MIXED_TOBOOLEAN'
  OPERATORS[OPERATORS['MIXED_TOFLOAT'] = 114] = 'MIXED_TOFLOAT'
  OPERATORS[OPERATORS['MIXED_TOINT'] = 115] = 'MIXED_TOINT'
  OPERATORS[OPERATORS['MIXED_TOMAP'] = 116] = 'MIXED_TOMAP'
  OPERATORS[OPERATORS['RESULT_GET'] = 128] = 'RESULT_GET'
  OPERATORS[OPERATORS['RESULT_GETOR'] = 129] = 'RESULT_GETOR'
  OPERATORS[OPERATORS['RESULT_ISOK'] = 130] = 'RESULT_ISOK'
  OPERATORS[OPERATORS['STRING_HASH'] = 64] = 'STRING_HASH'
  OPERATORS[OPERATORS['STRING_LENGTH'] = 65] = 'STRING_LENGTH'
  OPERATORS[OPERATORS['STRING_CATEGORIZE'] = 66] = 'STRING_CATEGORIZE'
  OPERATORS[OPERATORS['STRING_PARSEJSON'] = 67] = 'STRING_PARSEJSON'
  OPERATORS[OPERATORS['STRING_PARSEXML'] = 68] = 'STRING_PARSEXML'
  OPERATORS[OPERATORS['STRING_TOBOOLEAN'] = 69] = 'STRING_TOBOOLEAN'
  OPERATORS[OPERATORS['STRING_TOFLOAT'] = 70] = 'STRING_TOFLOAT'
  OPERATORS[OPERATORS['STRING_TOINT'] = 71] = 'STRING_TOINT'
  OPERATORS[OPERATORS['STRING_TOLOWERCASE'] = 72] = 'STRING_TOLOWERCASE'
  OPERATORS[OPERATORS['STRING_TOUPPERCASE'] = 73] = 'STRING_TOUPPERCASE'
})(OPERATORS || (OPERATORS = {}))

export let HashFunctionCodes;

(function (HashFunctionCodes) {
  HashFunctionCodes[HashFunctionCodes['BLAKE256'] = 0] = 'BLAKE256'
  HashFunctionCodes[HashFunctionCodes['BLAKE512'] = 1] = 'BLAKE512'
  HashFunctionCodes[HashFunctionCodes['BLAKE2s'] = 3] = 'BLAKE2s'
  HashFunctionCodes[HashFunctionCodes['Blake2b'] = 4] = 'Blake2b'
  HashFunctionCodes[HashFunctionCodes['MD5'] = 5] = 'MD5'
  HashFunctionCodes[HashFunctionCodes['RIPEMD128'] = 6] = 'RIPEMD128'
  HashFunctionCodes[HashFunctionCodes['RIPEMD160'] = 7] = 'RIPEMD160'
  HashFunctionCodes[HashFunctionCodes['RIPEMD320'] = 8] = 'RIPEMD320'
  HashFunctionCodes[HashFunctionCodes['SHA1'] = 9] = 'SHA1'
  HashFunctionCodes[HashFunctionCodes['SHA2224'] = 10] = 'SHA2224'
  HashFunctionCodes[HashFunctionCodes['SHA2256'] = 11] = 'SHA2256'
  HashFunctionCodes[HashFunctionCodes['SHA2384'] = 11] = 'SHA2384'
  HashFunctionCodes[HashFunctionCodes['SHA2512'] = 12] = 'SHA2512'
  HashFunctionCodes[HashFunctionCodes['SHA3224'] = 13] = 'SHA3224'
  HashFunctionCodes[HashFunctionCodes['SHA3256'] = 14] = 'SHA3256'
  HashFunctionCodes[HashFunctionCodes['SHA3384'] = 15] = 'SHA3384'
  HashFunctionCodes[HashFunctionCodes['SHA3512'] = 16] = 'SHA3512'
  HashFunctionCodes[HashFunctionCodes['WHIRLPOOL512'] = 17] = 'WHIRLPOOL512'
})(HashFunctionCodes || (HashFunctionCodes = {}))

export let FilteringFunctionCodes;

(function (FilteringFunctionCodes) {
  FilteringFunctionCodes[FilteringFunctionCodes['GT'] = 0] = 'GT'
  FilteringFunctionCodes[FilteringFunctionCodes['LT'] = 1] = 'LT'
  FilteringFunctionCodes[FilteringFunctionCodes['EQ'] = 2] = 'EQ'
  FilteringFunctionCodes[FilteringFunctionCodes['DEVABS'] = 3] = 'DEVABS'
  FilteringFunctionCodes[FilteringFunctionCodes['DEVREL'] = 4] = 'DEVREL'
  FilteringFunctionCodes[FilteringFunctionCodes['DEVSTD'] = 5] = 'DEVSTD'
  FilteringFunctionCodes[FilteringFunctionCodes['TOP'] = 6] = 'TOP'
  FilteringFunctionCodes[FilteringFunctionCodes['BOTTOM'] = 7] = 'BOTTOM'
  FilteringFunctionCodes[FilteringFunctionCodes['NOTGT'] = 8] = 'NOTGT'
  FilteringFunctionCodes[FilteringFunctionCodes['NOTLT'] = 9] = 'NOTLT'
  FilteringFunctionCodes[FilteringFunctionCodes['NOTEQ'] = 10] = 'NOTEQ'
  FilteringFunctionCodes[FilteringFunctionCodes['NOTDEVABS'] = 11] = 'NOTDEVABS'
  FilteringFunctionCodes[FilteringFunctionCodes['NOTDEVREL'] = 12] = 'NOTDEVREL'
  FilteringFunctionCodes[FilteringFunctionCodes['NOTDEVSTD'] = 13] = 'NOTDEVSTD'
  FilteringFunctionCodes[FilteringFunctionCodes['NOTTOP'] = 14] = 'NOTTOP'
  FilteringFunctionCodes[FilteringFunctionCodes['NOTBOTTOM'] = 15] = 'NOTBOTTOM'
})(FilteringFunctionCodes || (FilteringFunctionCodes = {}))

export let ReducingFunctionCodes;

(function (ReducingFunctionCodes) {
  ReducingFunctionCodes[ReducingFunctionCodes['MIN'] = 0] = 'MIN'
  ReducingFunctionCodes[ReducingFunctionCodes['MAX'] = 1] = 'MAX'
  ReducingFunctionCodes[ReducingFunctionCodes['MODE'] = 2] = 'MODE'
  ReducingFunctionCodes[ReducingFunctionCodes['AVGMEAN'] = 3] = 'AVGMEAN'
  ReducingFunctionCodes[ReducingFunctionCodes['AVGMEANW'] = 4] = 'AVGMEANW'
  ReducingFunctionCodes[ReducingFunctionCodes['AVGMEDIAN'] = 5] = 'AVGMEDIAN'
  ReducingFunctionCodes[ReducingFunctionCodes['AVGMEDIANW'] = 6] = 'AVGMEDIANW'
  ReducingFunctionCodes[ReducingFunctionCodes['DEVSTD'] = 7] = 'DEVSTD'
  ReducingFunctionCodes[ReducingFunctionCodes['DEVAVG'] = 8] = 'DEVAVG'
  ReducingFunctionCodes[ReducingFunctionCodes['DEVMED'] = 9] = 'DEVMED'
  ReducingFunctionCodes[ReducingFunctionCodes['DEVMAX'] = 10] = 'DEVMAX'
})(ReducingFunctionCodes || (ReducingFunctionCodes = {}))

export let RadonTypeCodes;

(function (RadonTypeCodes) {
  RadonTypeCodes[RadonTypeCodes['Boolean'] = 0] = 'Boolean'
  RadonTypeCodes[RadonTypeCodes['Int'] = 1] = 'Int'
  RadonTypeCodes[RadonTypeCodes['Float'] = 2] = 'Float'
  RadonTypeCodes[RadonTypeCodes['String'] = 3] = 'String'
  RadonTypeCodes[RadonTypeCodes['Array'] = 4] = 'Array'
  RadonTypeCodes[RadonTypeCodes['Map'] = 5] = 'Map'
  RadonTypeCodes[RadonTypeCodes['Mixed'] = 6] = 'Mixed'
  RadonTypeCodes[RadonTypeCodes['Null'] = 7] = 'Null'
  RadonTypeCodes[RadonTypeCodes['Result'] = 8] = 'Result'
})(RadonTypeCodes || (RadonTypeCodes = {}))

export const TYPESYSTEM = {
  [TYPES.Boolean]: {
    [OPERATORS.BOOLEAN_MATCH]: TYPES.Self,
    [OPERATORS.BOOLEAN_NEG]: TYPES.Boolean,
    [OPERATORS.BOOLEAN_TOSTRING]: TYPES.String,
  },
  [TYPES.Int]: {
    [OPERATORS.INT_ABS]: TYPES.Int,
    [OPERATORS.INT_MATCH]: TYPES.Self,
    [OPERATORS.INT_MODULO]: TYPES.Int,
    [OPERATORS.INT_MULT]: TYPES.Int,
    [OPERATORS.INT_NEG]: TYPES.Int,
    [OPERATORS.INT_POW]: TYPES.Float,
    [OPERATORS.INT_RECIP]: TYPES.Float,
    [OPERATORS.INT_SUM]: TYPES.Int,
    [OPERATORS.INT_TOFLOAT]: TYPES.Float,
    [OPERATORS.INT_TOSTRING]: TYPES.String,
  },
  [TYPES.Float]: {
    [OPERATORS.FLOAT_ABS]: TYPES.Float,
    [OPERATORS.FLOAT_CEIL]: TYPES.Int,
    [OPERATORS.FLOAT_FLOOR]: TYPES.Int,
    [OPERATORS.FLOAT_MODULO]: TYPES.Float,
    [OPERATORS.FLOAT_MULT]: TYPES.Float,
    [OPERATORS.FLOAT_NEG]: TYPES.Float,
    [OPERATORS.FLOAT_POW]: TYPES.Float,
    [OPERATORS.FLOAT_RECIP]: TYPES.Float,
    [OPERATORS.FLOAT_ROUND]: TYPES.Int,
    [OPERATORS.FLOAT_SUM]: TYPES.Float,
    [OPERATORS.FLOAT_TOSTRING]: TYPES.String,
    [OPERATORS.FLOAT_TRUNC]: TYPES.Int,
  },
  [TYPES.String]: {
    [OPERATORS.STRING_HASH]: TYPES.String,
    [OPERATORS.STRING_LENGTH]: TYPES.Int,
    [OPERATORS.STRING_CATEGORIZE]: TYPES.Self,
    [OPERATORS.STRING_PARSEJSON]: TYPES.Mixed,
    [OPERATORS.STRING_PARSEXML]: TYPES.Map,
    [OPERATORS.STRING_TOBOOLEAN]: TYPES.Boolean,
    [OPERATORS.STRING_TOFLOAT]: TYPES.Float,
    [OPERATORS.STRING_TOINT]: TYPES.Int,
    [OPERATORS.STRING_TOLOWERCASE]: TYPES.String,
    [OPERATORS.STRING_TOUPPERCASE]: TYPES.String,
  },
  [TYPES.Array]: {
    [OPERATORS.ARRAY_COUNT]: TYPES.Int,
    [OPERATORS.ARRAY_EVERY]: TYPES.Boolean,
    [OPERATORS.ARRAY_FILTER]: TYPES.Array,
    [OPERATORS.ARRAY_FLATTEN]: TYPES.Array,
    [OPERATORS.ARRAY_GET]: TYPES.Mixed,
    [OPERATORS.ARRAY_MAP]: TYPES.Array,
    [OPERATORS.ARRAY_REDUCE]: TYPES.Self,
    [OPERATORS.ARRAY_SOME]: TYPES.Boolean,
    [OPERATORS.ARRAY_SORT]: TYPES.Array,
    [OPERATORS.ARRAY_TAKE]: TYPES.Array,
  },
  [TYPES.Map]: {
    [OPERATORS.MAP_ENTRIES]: TYPES.Array,
    [OPERATORS.MAP_GET]: TYPES.Mixed,
    [OPERATORS.MAP_KEYS]: TYPES.Array,
    [OPERATORS.MAP_VALUES]: TYPES.Array,
  },
  [TYPES.Mixed]: {
    [OPERATORS.MIXED_TOARRAY]: TYPES.Array,
    [OPERATORS.MIXED_TOBOOLEAN]: TYPES.Boolean,
    [OPERATORS.MIXED_TOFLOAT]: TYPES.Float,
    [OPERATORS.MIXED_TOINT]: TYPES.Int,
    [OPERATORS.MIXED_TOMAP]: TYPES.Map,
  },
  [TYPES.Result]: {
    [OPERATORS.RESULT_GET]: TYPES.Self,
    [OPERATORS.RESULT_GETOR]: TYPES.Self,
    [OPERATORS.RESULT_ISOK]: TYPES.Boolean,
  },
}
export let RadonMethodNames;

(function (RadonMethodNames) {
  RadonMethodNames['ARRAY_COUNT'] = 'ARRAY_COUNT'
  RadonMethodNames['ARRAY_EVERY'] = 'ARRAY_EVERY'
  RadonMethodNames['ARRAY_FILTER'] = 'ARRAY_FILTER'
  RadonMethodNames['ARRAY_FLATTEN'] = 'ARRAY_FLATTEN'
  RadonMethodNames['ARRAY_GET'] = 'ARRAY_GET'
  RadonMethodNames['ARRAY_MAP'] = 'ARRAY_MAP'
  RadonMethodNames['ARRAY_REDUCE'] = 'ARRAY_REDUCE'
  RadonMethodNames['ARRAY_SOME'] = 'ARRAY_SOME'
  RadonMethodNames['ARRAY_SORT'] = 'ARRAY_SORT'
  RadonMethodNames['ARRAY_TAKE'] = 'ARRAY_TAKE'
  RadonMethodNames['BOOLEAN_MATCH'] = 'BOOLEAN_MATCH'
  RadonMethodNames['BOOLEAN_NEG'] = 'BOOLEAN_NEG'
  RadonMethodNames['BOOLEAN_TOSTRING'] = 'BOOLEAN_TOSTRING'
  RadonMethodNames['FLOAT_ABS'] = 'FLOAT_ABS'
  RadonMethodNames['FLOAT_CEIL'] = 'FLOAT_CEIL'
  RadonMethodNames['FLOAT_FLOOR'] = 'FLOAT_FLOOR'
  RadonMethodNames['FLOAT_MODULO'] = 'FLOAT_MODULO'
  RadonMethodNames['FLOAT_MULT'] = 'floatMult'
  RadonMethodNames['FLOAT_NEG'] = 'floatNeg'
  RadonMethodNames['FLOAT_POW'] = 'floatPow'
  RadonMethodNames['FLOAT_RECIP'] = 'floatRecip'
  RadonMethodNames['FLOAT_ROUND'] = 'floatRound'
  RadonMethodNames['FLOAT_SUM'] = 'floatSum'
  RadonMethodNames['FLOAT_TOSTRING'] = 'floatToString'
  RadonMethodNames['FLOAT_TRUNC'] = 'floatTrunc'
  RadonMethodNames['INT_ABS'] = 'intAbs'
  RadonMethodNames['INT_MATCH'] = 'intMatch'
  RadonMethodNames['INT_MODULO'] = 'intModulo'
  RadonMethodNames['INT_MULT'] = 'intMult'
  RadonMethodNames['INT_NEG'] = 'intNeg'
  RadonMethodNames['INT_POW'] = 'intPow'
  RadonMethodNames['INT_RECIP'] = 'intRecip'
  RadonMethodNames['INT_SUM'] = 'intSum'
  RadonMethodNames['INT_TOFLOAT'] = 'intToFloat'
  RadonMethodNames['INT_TOSTRING'] = 'intToString'
  RadonMethodNames['MAP_ENTRIES'] = 'mapEntries'
  RadonMethodNames['MAP_GET'] = 'mapGet'
  RadonMethodNames['MAP_KEYS'] = 'mapKeys'
  RadonMethodNames['MAP_VALUES'] = 'mapValues'
  RadonMethodNames['MIXED_TOARRAY'] = 'mixedToArray'
  RadonMethodNames['MIXED_TOBOOLEAN'] = 'mixedToBoolean'
  RadonMethodNames['MIXED_TOFLOAT'] = 'mixedToFloat'
  RadonMethodNames['MIXED_TOINT'] = 'mixedToInt'
  RadonMethodNames['MIXED_TOMAP'] = 'mixedToMap'
  RadonMethodNames['RESULT_GET'] = 'resultGet'
  RadonMethodNames['RESULT_GETOR'] = 'resultGetOr'
  RadonMethodNames['RESULT_ISOK'] = 'resutlIsok'
  RadonMethodNames['STRING_HASH'] = 'HASH'
  RadonMethodNames['STRING_LENGTH'] = 'LENGHT'
  RadonMethodNames['STRING_CATEGORIZE'] = 'CATEGORIZE'
  RadonMethodNames['STRING_PARSEJSON'] = 'PARSE_JSON'
  RadonMethodNames['STRING_PARSEXML'] = 'PARSE_XML'
  RadonMethodNames['STRING_TOBOOLEAN'] = 'TO_BOOLEAN'
  RadonMethodNames['STRING_TOFLOAT'] = 'TO_FLOAT'
  RadonMethodNames['STRING_TOINT'] = 'TO_INT'
  RadonMethodNames['STRING_TOLOWERCASE'] = 'TO_LOWERCASE'
  RadonMethodNames['STRING_TOUPPERCASE'] = 'TO_UPPERCASE'
})(RadonMethodNames || (RadonMethodNames = {}))

export const OPERATOR_INFOS = {
  [OPERATORS.ARRAY_COUNT]: {
    name: RadonMethodNames.ARRAY_COUNT,
    arguments: [],
  },
  [OPERATORS.ARRAY_EVERY]: {
    name: RadonMethodNames.ARRAY_EVERY,
    arguments: [{
      name: 'function',
      optional: false,
      kind: TYPES.FilterFunction,
    }],
  },
  [OPERATORS.ARRAY_FILTER]: {
    name: RadonMethodNames.ARRAY_FILTER,
    arguments: [{
      name: 'function',
      optional: false,
      kind: TYPES.FilterFunction,
    }],
  },
  [OPERATORS.ARRAY_FLATTEN]: {
    name: RadonMethodNames.ARRAY_FLATTEN,
    arguments: [{
      name: 'depth',
      optional: true,
      kind: TYPES.Int,
    }],
  },
  [OPERATORS.ARRAY_GET]: {
    name: RadonMethodNames.ARRAY_GET,
    arguments: [{
      name: 'index',
      optional: false,
      kind: TYPES.Int,
    }],
  },
  [OPERATORS.ARRAY_MAP]: {
    name: RadonMethodNames.ARRAY_MAP,
    arguments: [{
      name: 'operator',
      optional: false,
      kind: TYPES.MapFunction,
    }],
  },
  [OPERATORS.ARRAY_REDUCE]: {
    name: RadonMethodNames.ARRAY_REDUCE,
    arguments: [{
      name: 'function',
      optional: false,
      kind: TYPES.ReduceFunction,
    }],
  },
  [OPERATORS.ARRAY_SOME]: {
    name: RadonMethodNames.ARRAY_SOME,
    arguments: [{
      name: 'function',
      optional: false,
      kind: TYPES.FilterFunction,
    }],
  },
  [OPERATORS.ARRAY_SORT]: {
    name: RadonMethodNames.ARRAY_SORT,
    arguments: [{
      name: 'mapFunction',
      optional: false,
      kind: TYPES.MapFunction,
    }, {
      name: 'ascending',
      optional: false,
      kind: TYPES.Boolean,
    }],
  },
  [OPERATORS.ARRAY_TAKE]: {
    name: RadonMethodNames.ARRAY_TAKE,
    arguments: [{
      name: 'min',
      optional: true,
      kind: TYPES.Int,
    }, {
      name: 'max',
      optional: true,
      kind: TYPES.Int,
    }],
  },
  [OPERATORS.BOOLEAN_MATCH]: {
    name: RadonMethodNames.BOOLEAN_MATCH,
    arguments: [{
      name: 'categories',
      optional: false,
      kind: TYPES.Map,
    }, {
      name: 'default',
      optional: false,
      kind: TYPES.Self,
    }],
  },
  [OPERATORS.BOOLEAN_NEG]: {
    name: RadonMethodNames.BOOLEAN_NEG,
    arguments: [],
  },
  [OPERATORS.BOOLEAN_TOSTRING]: {
    name: RadonMethodNames.BOOLEAN_TOSTRING,
    arguments: [],
  },
  [OPERATORS.FLOAT_ABS]: {
    name: RadonMethodNames.FLOAT_ABS,
    arguments: [],
  },
  [OPERATORS.FLOAT_CEIL]: {
    name: RadonMethodNames.FLOAT_CEIL,
    arguments: [],
  },
  [OPERATORS.FLOAT_FLOOR]: {
    name: RadonMethodNames.FLOAT_FLOOR,
    arguments: [],
  },
  [OPERATORS.FLOAT_MODULO]: {
    name: RadonMethodNames.FLOAT_MODULO,
    arguments: [{
      name: 'modulus',
      optional: false,
      kind: TYPES.Float,
    }],
  },
  [OPERATORS.FLOAT_MULT]: {
    name: RadonMethodNames.FLOAT_MULT,
    arguments: [{
      name: 'factor',
      optional: false,
      kind: TYPES.Float,
    }],
  },
  [OPERATORS.FLOAT_NEG]: {
    name: RadonMethodNames.FLOAT_NEG,
    arguments: [],
  },
  [OPERATORS.FLOAT_POW]: {
    name: RadonMethodNames.FLOAT_POW,
    arguments: [{
      name: 'exponent',
      optional: false,
      kind: TYPES.Float,
    }],
  },
  [OPERATORS.FLOAT_RECIP]: {
    name: RadonMethodNames.FLOAT_RECIP,
    arguments: [],
  },
  [OPERATORS.FLOAT_ROUND]: {
    name: RadonMethodNames.FLOAT_ROUND,
    arguments: [],
  },
  [OPERATORS.FLOAT_SUM]: {
    name: RadonMethodNames.FLOAT_SUM,
    arguments: [{
      name: 'addend',
      optional: false,
      kind: TYPES.Float,
    }],
  },
  [OPERATORS.FLOAT_TOSTRING]: {
    name: RadonMethodNames.FLOAT_TOSTRING,
    arguments: [{
      name: 'decimals',
      optional: false,
      kind: TYPES.Float,
    }],
  },
  [OPERATORS.FLOAT_TRUNC]: {
    name: RadonMethodNames.FLOAT_TRUNC,
    arguments: [],
  },
  [OPERATORS.INT_ABS]: {
    name: RadonMethodNames.INT_ABS,
    arguments: [],
  },
  [OPERATORS.INT_MATCH]: {
    name: RadonMethodNames.INT_MATCH,
    arguments: [],
  },
  [OPERATORS.INT_MODULO]: {
    name: RadonMethodNames.INT_MODULO,
    arguments: [{
      name: 'modulus',
      optional: false,
      kind: TYPES.Int,
    }],
  },
  [OPERATORS.INT_MULT]: {
    name: RadonMethodNames.INT_MULT,
    arguments: [{
      name: 'factor',
      optional: false,
      kind: TYPES.Int,
    }],
  },
  [OPERATORS.INT_NEG]: {
    name: RadonMethodNames.INT_NEG,
    arguments: [],
  },
  [OPERATORS.INT_POW]: {
    name: RadonMethodNames.INT_POW,
    arguments: [{
      name: 'exponent',
      optional: false,
      kind: TYPES.Int,
    }],
  },
  [OPERATORS.INT_RECIP]: {
    name: RadonMethodNames.INT_RECIP,
    arguments: [],
  },
  [OPERATORS.INT_SUM]: {
    name: RadonMethodNames.INT_SUM,
    arguments: [{
      name: 'addend',
      optional: false,
      kind: TYPES.Int,
    }],
  },
  [OPERATORS.INT_TOFLOAT]: {
    name: RadonMethodNames.INT_TOFLOAT,
    arguments: [],
  },
  [OPERATORS.INT_TOSTRING]: {
    name: RadonMethodNames.INT_TOSTRING,
    arguments: [{
      name: 'base',
      optional: true,
      kind: TYPES.Int,
    }],
  },
  [OPERATORS.MAP_ENTRIES]: {
    name: RadonMethodNames.MAP_ENTRIES,
    arguments: [],
  },
  [OPERATORS.MAP_GET]: {
    name: RadonMethodNames.MAP_GET,
    arguments: [{
      name: 'key',
      optional: false,
      kind: TYPES.String,
    }],
  },
  [OPERATORS.MAP_KEYS]: {
    name: RadonMethodNames.MAP_KEYS,
    arguments: [],
  },
  [OPERATORS.MAP_VALUES]: {
    name: RadonMethodNames.MAP_VALUES,
    arguments: [],
  },
  [OPERATORS.MIXED_TOARRAY]: {
    name: RadonMethodNames.MIXED_TOARRAY,
    arguments: [],
  },
  [OPERATORS.MIXED_TOBOOLEAN]: {
    name: RadonMethodNames.MIXED_TOBOOLEAN,
    arguments: [],
  },
  [OPERATORS.MIXED_TOFLOAT]: {
    name: RadonMethodNames.MIXED_TOFLOAT,
    arguments: [],
  },
  [OPERATORS.MIXED_TOINT]: {
    name: RadonMethodNames.MIXED_TOINT,
    arguments: [{
      name: 'base',
      optional: true,
      kind: TYPES.Int,
    }],
  },
  [OPERATORS.MIXED_TOMAP]: {
    name: RadonMethodNames.MIXED_TOMAP,
    arguments: [],
  },
  [OPERATORS.RESULT_GET]: {
    name: RadonMethodNames.RESULT_GET,
    arguments: [],
  },
  [OPERATORS.RESULT_GETOR]: {
    name: RadonMethodNames.RESULT_GETOR,
    arguments: [{
      name: 'default',
      optional: false,
      kind: TYPES.Self,
    }],
  },
  [OPERATORS.RESULT_ISOK]: {
    name: RadonMethodNames.RESULT_ISOK,
    arguments: [],
  },
  [OPERATORS.STRING_HASH]: {
    name: RadonMethodNames.STRING_HASH,
    arguments: [{
      name: 'function',
      optional: false,
      kind: TYPES.HashFunction,
    }],
  },
  [OPERATORS.STRING_LENGTH]: {
    name: RadonMethodNames.STRING_LENGTH,
    arguments: [],
  },
  [OPERATORS.STRING_CATEGORIZE]: {
    name: RadonMethodNames.STRING_CATEGORIZE,
    arguments: [{
      name: 'categories',
      optional: false,
      kind: TYPES.Map,
    }, {
      name: 'default',
      optional: true,
      kind: TYPES.Self,
    }],
  },
  [OPERATORS.STRING_PARSEJSON]: {
    name: RadonMethodNames.STRING_PARSEJSON,
    arguments: [],
  },
  [OPERATORS.STRING_PARSEXML]: {
    name: RadonMethodNames.STRING_PARSEXML,
    arguments: [],
  },
  [OPERATORS.STRING_TOBOOLEAN]: {
    name: RadonMethodNames.STRING_TOBOOLEAN,
    arguments: [],
  },
  [OPERATORS.STRING_TOFLOAT]: {
    name: RadonMethodNames.STRING_TOFLOAT,
    arguments: [],
  },
  [OPERATORS.STRING_TOINT]: {
    name: RadonMethodNames.STRING_TOINT,
    arguments: [{
      name: 'base',
      optional: true,
      kind: TYPES.Int,
    }],
  },
  [OPERATORS.STRING_TOLOWERCASE]: {
    name: RadonMethodNames.STRING_TOLOWERCASE,
    arguments: [],
  },
  [OPERATORS.STRING_TOUPPERCASE]: {
    name: RadonMethodNames.STRING_TOUPPERCASE,
    arguments: [],
  },
}
