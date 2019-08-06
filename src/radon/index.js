export let TYPES;

(function (TYPES) {
  TYPES[TYPES['Boolean'] = 0] = 'Boolean'
  TYPES[TYPES['Int'] = 1] = 'Int'
  TYPES[TYPES['Float'] = 2] = 'Float'
  TYPES[TYPES['String'] = 3] = 'String'
  TYPES[TYPES['Array'] = 4] = 'Array'
  TYPES[TYPES['Map'] = 5] = 'Map'
  TYPES[TYPES['Bytes'] = 6] = 'Bytes'
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
  OPERATORS[OPERATORS['BOOLEAN_MATCH'] = 0x10] = 'BOOLEAN_MATCH'
  OPERATORS[OPERATORS['BOOLEAN_NEGATE'] = 0x11] = 'BOOLEAN_NEG'
  OPERATORS[OPERATORS['BOOLEAN_ASSTRING'] = 0x12] = 'BOOLEAN_TOSTRING'

  OPERATORS[OPERATORS['INT_ABSOLUTE'] = 0x20] = 'INT_ABS'
  OPERATORS[OPERATORS['INT_ASBYTES'] = 0x21] = 'INT_ASBYTES'
  OPERATORS[OPERATORS['INT_ASFLOAT'] = 0x22] = 'INT_ASFLOAT'
  OPERATORS[OPERATORS['INT_ASSTRING'] = 0x23] = 'INT_ASFLOAT'
  OPERATORS[OPERATORS['INT_GREATERTHAN'] = 0x24] = 'INT_MATCH'
  OPERATORS[OPERATORS['INT_LESSTHAN'] = 0x25] = 'INT_MODULO'
  OPERATORS[OPERATORS['INT_MATCH'] = 0x26] = 'INT_MULT'
  OPERATORS[OPERATORS['INT_MODULO'] = 0x27] = 'INT_NEG'
  OPERATORS[OPERATORS['INT_MULTIPLY'] = 0x28] = 'INT_POW'
  OPERATORS[OPERATORS['INT_NEGATE'] = 0x29] = 'INT_RECIP'
  OPERATORS[OPERATORS['INT_POWER'] = 0x2A] = 'INT_SUM'
  OPERATORS[OPERATORS['INT_RECIPROCAL'] = 0x2B] = 'INT_TOFLOAT'
  OPERATORS[OPERATORS['INT_SUM'] = 0x2C] = 'INT_TOSTRING'

  OPERATORS[OPERATORS['FLOAT_ABSOLUTE'] = 0x30] = 'FLOAT_ABSOLUTE'
  OPERATORS[OPERATORS['FLOAT_ASBYTES'] = 0x31] = 'FLOAT_ASBYTES'
  OPERATORS[OPERATORS['FLOAT_ASSTRING'] = 0x32] = 'FLOAT_ASSTRING'
  OPERATORS[OPERATORS['FLOAT_CEILING'] = 0x33] = 'FLOAT_CEILING'
  OPERATORS[OPERATORS['FLOAT_GREATERTHAN'] = 0x33] = 'FLOAT_GREATERTHAN'
  OPERATORS[OPERATORS['FLOAT_FLOOR'] = 0x34] = 'FLOAT_FLOOR'
  OPERATORS[OPERATORS['FLOAT_MODULO'] = 0x35] = 'FLOAT_MODULO'
  OPERATORS[OPERATORS['FLOAT_MULTIPLY'] = 0x36] = 'FLOAT_MULTIPLY'
  OPERATORS[OPERATORS['FLOAT_NEGATE'] = 0x37] = 'FLOAT_NEGATE'
  OPERATORS[OPERATORS['FLOAT_POWER'] = 0x38] = 'FLOAT_POWER'
  OPERATORS[OPERATORS['FLOAT_RECIPROAL'] = 0x39] = 'FLOAT_RECIPROCAL'
  OPERATORS[OPERATORS['FLOAT_ROUND'] = 0x3A] = 'FLOAT_ROUND'
  OPERATORS[OPERATORS['FLOAT_SUM'] = 0x3B] = 'FLOAT_SUM'
  OPERATORS[OPERATORS['FLOAT_TRUNCATE'] = 0x3C] = 'FLOAT_TRUNCATE'

  OPERATORS[OPERATORS['STRING_ASBYTES'] = 0x40] = 'STRING_ASBYTES'
  OPERATORS[OPERATORS['STRING_FLOAT'] = 0x41] = 'STRING_FLOAT'
  OPERATORS[OPERATORS['STRING_INTEGER'] = 0x42] = 'STRING_INTEGER'
  OPERATORS[OPERATORS['STRING_LENGTH'] = 0x43] = 'STRING_LENGTH'
  OPERATORS[OPERATORS['STRING_MATCH'] = 0x44] = 'STRING_MATCH'
  OPERATORS[OPERATORS['STRING_PARSEJSON'] = 0x45] = 'STRING_PARSEJSON'
  OPERATORS[OPERATORS['STRING_PARSEXML'] = 0x46] = 'STRING_PARSEXML'
  OPERATORS[OPERATORS['STRING_ASBOOLEAN'] = 0x47] = 'STRING_ASBOOLEAN'
  OPERATORS[OPERATORS['STRING_TOLOWERCASE'] = 0x48] = 'STRING_TOLOWERCASE'
  OPERATORS[OPERATORS['STRING_TOUPPERCASE'] = 0x49] = 'STRING_TOUPPERCASE'

  OPERATORS[OPERATORS['ARRAY_ASBYTES'] = 0x50] = 'ARRAY_ASBYTES'
  OPERATORS[OPERATORS['ARRAY_COUNT'] = 0x51] = 'ARRAY_COUNT'
  OPERATORS[OPERATORS['ARRAY_EVERY'] = 0x52] = 'ARRAY_EVERY'
  OPERATORS[OPERATORS['ARRAY_FILTER'] = 0x53] = 'ARRAY_FILTER'
  OPERATORS[OPERATORS['ARRAY_FLATTEN'] = 0x54] = 'ARRAY_FLATTEN'
  OPERATORS[OPERATORS['ARRAY_GET'] = 0x55] = 'ARRAY_GET'
  OPERATORS[OPERATORS['ARRAY_MAP'] = 0x56] = 'ARRAY_MAP'
  OPERATORS[OPERATORS['ARRAY_REDUCE'] = 0x57] = 'ARRAY_REDUCE'
  OPERATORS[OPERATORS['ARRAY_SOME'] = 0x58] = 'ARRAY_SOME'
  OPERATORS[OPERATORS['ARRAY_SORT'] = 0x59] = 'ARRAY_SORT'
  OPERATORS[OPERATORS['ARRAY_TAKE'] = 0x5A] = 'ARRAY_TAKE'

  OPERATORS[OPERATORS['MAP_ENTRIES'] = 0x60] = 'MAP_ENTRIES'
  OPERATORS[OPERATORS['MAP_GET'] = 0x61] = 'MAP_GET'
  OPERATORS[OPERATORS['MAP_KEYS'] = 0x62] = 'MAP_KEYS'
  OPERATORS[OPERATORS['MAP_VALUES'] = 0x63] = 'MAP_VALUES'

  OPERATORS[OPERATORS['BYTES_ASARRAY'] = 0x70] = 'BYTES_ASARRAY'
  OPERATORS[OPERATORS['BYTES_ASBOOLEAN'] = 0x71] = 'BYTES_ASBOOLEAN'
  OPERATORS[OPERATORS['BYTES_ASFLOAT'] = 0x72] = 'BYTES_ASFLOAT'
  OPERATORS[OPERATORS['BYTES_ASINTEGER'] = 0x73] = 'BYTES_ASINTEGER'
  OPERATORS[OPERATORS['BYTES_ASMAP'] = 0x74] = 'BYTES_ASMAP'
  OPERATORS[OPERATORS['BYTES_ASSTRING'] = 0x75] = 'BYTES_ASSTRING'
  OPERATORS[OPERATORS['BYTES_HASH'] = 0x75] = 'BYTES_HASH'

  OPERATORS[OPERATORS['RESULT_GET'] = 0x80] = 'BYTES_GET'
  OPERATORS[OPERATORS['RESULT_GETOR'] = 0x81] = 'BYTES_GET_OR'
  OPERATORS[OPERATORS['RESULT_ISOK'] = 0x82] = 'BYTES_ISOK'
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
  RadonTypeCodes[RadonTypeCodes['Bytes'] = 6] = 'Bytes'
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
    [OPERATORS.STRING_PARSEJSON]: TYPES.Bytes,
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
    [OPERATORS.ARRAY_GET]: TYPES.Bytes,
    [OPERATORS.ARRAY_MAP]: TYPES.Array,
    [OPERATORS.ARRAY_REDUCE]: TYPES.Self,
    [OPERATORS.ARRAY_SOME]: TYPES.Boolean,
    [OPERATORS.ARRAY_SORT]: TYPES.Array,
    [OPERATORS.ARRAY_TAKE]: TYPES.Array,
  },
  [TYPES.Map]: {
    [OPERATORS.MAP_ENTRIES]: TYPES.Array,
    [OPERATORS.MAP_GET]: TYPES.Bytes,
    [OPERATORS.MAP_KEYS]: TYPES.Array,
    [OPERATORS.MAP_VALUES]: TYPES.Array,
  },
  [TYPES.Bytes]: {
    [OPERATORS.BYTES_TOARRAY]: TYPES.Array,
    [OPERATORS.BYTES_TOBOOLEAN]: TYPES.Boolean,
    [OPERATORS.BYTES_TOFLOAT]: TYPES.Float,
    [OPERATORS.BYTES_TOINT]: TYPES.Int,
    [OPERATORS.BYTES_TOMAP]: TYPES.Map,
    [OPERATORS.BYTES_HASH]: TYPES.Bytes,
  },
  [TYPES.Result]: {
    [OPERATORS.RESULT_GET]: TYPES.Self,
    [OPERATORS.RESULT_GETOR]: TYPES.Self,
    [OPERATORS.RESULT_ISOK]: TYPES.Boolean,
  },
}
export let RadonMethodNames;

(function (RadonMethodNames) {
  RadonMethodNames['BOOLEAN_MATCH'] = 'BOOLEAN_MATCH'
  RadonMethodNames['BOOLEAN_NEGATE'] = 'BOOLEAN_NEGATE'
  RadonMethodNames['BOOLEAN_ASSTRING'] = 'BOOLEAN_ASSTRING'

  RadonMethodNames['INT_ABSOLUTE'] = 'INT_ABSOLUTE'
  RadonMethodNames['INT_ASBYTES'] = 'INT_ASBYTES'
  RadonMethodNames['INT_ASFLOAT'] = 'INT_ASFLOAT'
  RadonMethodNames['INT_ASSTRING'] = 'INT_ASSTRING'
  RadonMethodNames['INT_GREATERTHAN'] = 'INT_GREATERTHAN'
  RadonMethodNames['INT_LESSTHAN'] = 'INT_LESSTHAN'
  RadonMethodNames['INT_MATCH'] = 'INT_MATCH'
  RadonMethodNames['INT_MODULO'] = 'INT_MODULO'
  RadonMethodNames['INT_MULTIPLY'] = 'INT_MULTIPLY'
  RadonMethodNames['INT_NEGATE'] = 'INT_NEGATE'
  RadonMethodNames['INT_POWER'] = 'INT_POWER'
  RadonMethodNames['INT_RECIPROCAL'] = 'INT_RECIPROCAL'
  RadonMethodNames['INT_SUM'] = 'INT_SUM'

  RadonMethodNames['FLOAT_ABSOLUTE'] = 'FLOAT_ABSOLUTE'
  RadonMethodNames['FLOAT_ASBYTES'] = 'FLOAT_ASBYTES'
  RadonMethodNames['FLOAT_ASSTRING'] = 'FLOAT_ASSTRING'
  RadonMethodNames['FLOAT_CEILING'] = 'FLOAT_CEILING'
  RadonMethodNames['FLOAT_GREATERTHAN'] = 'FLOAT_GREATERTHAN'
  RadonMethodNames['FLOAT_FLOOR'] = 'FLOAT_FLOOR'
  RadonMethodNames['FLOAT_LESSTHAN'] = 'FLOAT_LESSTHAN'
  RadonMethodNames['FLOAT_MODULO'] = 'FLOAT_MODULO'
  RadonMethodNames['FLOAT_MULTIPLY'] = 'FLOAT_MULTIPLY'
  RadonMethodNames['FLOAT_NEGATE'] = 'FLOAT_NEGATE'
  RadonMethodNames['FLOAT_POWER'] = 'FLOAT_POWER'
  RadonMethodNames['FLOAT_RECIPROAL'] = 'FLOAT_RECIPROAL'
  RadonMethodNames['FLOAT_ROUND'] = 'FLOAT_ROUND'
  RadonMethodNames['FLOAT_SUM'] = 'FLOAT_SUM'
  RadonMethodNames['FLOAT_TRUNCATE'] = 'truncate'

  RadonMethodNames['STRING_ASBYTES'] = 'STRING_ASBYTES'
  RadonMethodNames['STRING_ASFLOAT'] = 'STRING_ASFLOAT'
  RadonMethodNames['STRING_ASINTEGER'] = 'STRING_ASINTEGER'
  RadonMethodNames['STRING_LENGTH'] = 'STRING_LENGTH'
  RadonMethodNames['STRING_MATCH'] = 'STRING_MATCH'
  RadonMethodNames['STRING_PARSEJSON'] = 'STRING_PARSEJSON'
  RadonMethodNames['STRING_PARSEXML'] = 'STRING_PARSEXML'
  RadonMethodNames['STRING_ASBOOLEAN'] = 'STRING_ASBOOLEAN'
  RadonMethodNames['STRING_TOLOWERCASE'] = 'STRING_TOLOWERCASE'
  RadonMethodNames['STRING_TOUPPERCASE'] = 'STRING_TOUPPERCASE'

  RadonMethodNames['ARRAY_ASBYTES'] = 'ARRAY_ASBYTES'
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

  RadonMethodNames['MAP_ENTRIES'] = 'MAP_ENTRIES'
  RadonMethodNames['MAP_GET'] = 'MAP_GET'
  RadonMethodNames['MAP_KEYS'] = 'MAP_KEYS'
  RadonMethodNames['MAP_VALUES'] = 'MAP_VALUES'

  RadonMethodNames['BYTES_ASARRAY'] = 'BYTES_ASARRAY'
  RadonMethodNames['BYTES_ASBOOLEAN'] = 'BYTES_ASBOOLEAN'
  RadonMethodNames['BYTES_ASFLOAT'] = 'BYTES_ASFLOAT'
  RadonMethodNames['BYTES_ASINTEGER'] = 'BYTES_ASINTEGER'
  RadonMethodNames['BYTES_ASMAP'] = 'BYTES_ASMAP'
  RadonMethodNames['BYTES_ASSTRING'] = 'BYTES_ASSTRING'
  RadonMethodNames['BYTES_HASH'] = 'BYTES_HASH'

  RadonMethodNames['RESULT_GET'] = 'RESULT_GET'
  RadonMethodNames['RESULT_GETOR'] = 'RESULT_GETOR'
  RadonMethodNames['RESULT_ISOK'] = 'RESULT_ISOK'
})(RadonMethodNames || (RadonMethodNames = {}))

export const OPERATOR_INFOS = {
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
  [OPERATORS.BOOLEAN_NEGATE]: {
    name: RadonMethodNames.BOOLEAN_NEG,
    arguments: [],
  },
  [OPERATORS.BOOLEAN_ASSTRING]: {
    name: RadonMethodNames.BOOLEAN_TOSTRING,
    arguments: [],
  },
  [OPERATORS.INT_ABSOLUTE]: {
    name: RadonMethodNames.INT_ABS,
    arguments: [],
  },
  [OPERATORS.INT_ASBYTES]: {
    name: RadonMethodNames.INT_ASBYTES,
    arguments: [],
  },
  [OPERATORS.INT_ASFLOAT]: {
    name: RadonMethodNames.INT_ASBYTES,
    arguments: [],
  },
  [OPERATORS.INT_ASSTRING]: {
    name: RadonMethodNames.INT_ASSTRING,
    arguments: [{
      name: 'base',
      optional: true,
      kind: TYPES.Int,
    }],
  },
  [OPERATORS.INT_GREATERTHAN]: {
    name: RadonMethodNames.INT_GREATERTHAN,
    arguments: [{
      name: 'value',
      optional: false,
      kind: TYPES.Int,
    }],
  },
  [OPERATORS.INT_LESSTHAN]: {
    name: RadonMethodNames.INT_GREATERTHAN,
    arguments: [{
      name: 'value',
      optional: false,
      kind: TYPES.Int,
    }],
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
  [OPERATORS.INT_MULTIPLY]: {
    name: RadonMethodNames.INT_MULTIPLY,
    arguments: [{
      name: 'factor',
      optional: false,
      kind: TYPES.Int,
    }],
  },
  [OPERATORS.INT_NEGATE]: {
    name: RadonMethodNames.INT_NEGATE,
    arguments: [],
  },
  [OPERATORS.INT_POWER]: {
    name: RadonMethodNames.INT_POWER,
    arguments: [{
      name: 'exponent',
      optional: false,
      kind: TYPES.Int,
    }],
  },
  [OPERATORS.INT_RECIPROCAL]: {
    name: RadonMethodNames.INT_RECIPROCAL,
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
  [OPERATORS.FLOAT_ABSOLUTE]: {
    name: RadonMethodNames.FLOAT_ABSOLUTE,
    arguments: [],
  },
  [OPERATORS.FLOAT_ASBYTES]: {
    name: RadonMethodNames.FLOAT_ASBYTES,
    arguments: [],
  },
  [OPERATORS.FLOAT_ASSTRING]: {
    name: RadonMethodNames.FLOAT_ASSTRING,
    arguments: [{
      name: 'decimals',
      optional: false,
      kind: TYPES.Float,
    }],
  },
  [OPERATORS.FLOAT_CEILING]: {
    name: RadonMethodNames.FLOAT_CEILING,
    arguments: [],
  },
  [OPERATORS.FLOAT_GREATERTHAN]: {
    name: RadonMethodNames.FLOAT_GREATERTHAN,
    arguments: [{
      name: 'value',
      optional: false,
      kind: TYPES.Float,
    }],
  },
  [OPERATORS.FLOAT_FLOOR]: {
    name: RadonMethodNames.FLOAT_FLOOR,
    arguments: [],
  },
  [OPERATORS.FLOAT_LESSTHAN]: {
    name: RadonMethodNames.FLOAT_LESSTHAN,
    arguments: [{
      name: 'value',
      optional: false,
      kind: TYPES.Float,
    }],
  },
  [OPERATORS.FLOAT_MODULO]: {
    name: RadonMethodNames.FLOAT_MODULO,
    arguments: [{
      name: 'modulus',
      optional: false,
      kind: TYPES.Float,
    }],
  },
  [OPERATORS.FLOAT_MULTIPLY]: {
    name: RadonMethodNames.FLOAT_MULTIPLY,
    arguments: [{
      name: 'factor',
      optional: false,
      kind: TYPES.Float,
    }],
  },
  [OPERATORS.FLOAT_NEGATE]: {
    name: RadonMethodNames.FLOAT_NEGATE,
    arguments: [],
  },
  [OPERATORS.FLOAT_POWER]: {
    name: RadonMethodNames.FLOAT_POWER,
    arguments: [{
      name: 'exponent',
      optional: false,
      kind: TYPES.Float,
    }],
  },
  [OPERATORS.FLOAT_RECIPROCAL]: {
    name: RadonMethodNames.FLOAT_RECIPROCAL,
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
  [OPERATORS.FLOAT_TRUNCATE]: {
    name: RadonMethodNames.FLOAT_TRUNCATE,
    arguments: [],
  },

  [OPERATORS.STRING_ASBYTES]: {
    name: RadonMethodNames.STRING_ASBYTES,
    arguments: [],
  },
  [OPERATORS.STRING_ASFLOAT]: {
    name: RadonMethodNames.BYTES_ASFLOAT,
    arguments: [],
  },
  [OPERATORS.STRING_ASINTEGER]: {
    name: RadonMethodNames.STRING_ASINTEGER,
    arguments: [],
  },
  [OPERATORS.STRING_LENGTH]: {
    name: RadonMethodNames.STRING_PARSEJSON,
    arguments: [],
  },
  [OPERATORS.STRING_MATCH]: {
    name: RadonMethodNames.STRING_MATCH,
    arguments: [],
  },
  [OPERATORS.STRING_PARSEJSON]: {
    name: RadonMethodNames.STRING_PARSEJSON,
    arguments: [],
  },
  [OPERATORS.STRING_PARSEXML]: {
    name: RadonMethodNames.STRING_PARSEXML,
    arguments: [],
  },
  [OPERATORS.STRING_ASBOOLEAN]: {
    name: RadonMethodNames.STRING_TOINT,
    arguments: [],
  },
  [OPERATORS.STRING_TOLOWERCASE]: {
    name: RadonMethodNames.STRING_TOLOWERCASE,
    arguments: [],
  },
  [OPERATORS.STRING_TOUPPERCASE]: {
    name: RadonMethodNames.STRING_TOUPPERCASE,
    arguments: [],
  },
  [OPERATORS.ARRAY_ASBYTES]: {
    name: RadonMethodNames.ARRAY_ASBYTES,
    arguments: [],
  },
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
  [OPERATORS.BYTES_ASARRAY]: {
    name: RadonMethodNames.BYTES_ASARRAY,
    arguments: [],
  },
  [OPERATORS.BYTES_ASBOOLEAN]: {
    name: RadonMethodNames.BYTES_ASBOOLEAN,
    arguments: [],
  },
  [OPERATORS.BYTES_ASFLOAT]: {
    name: RadonMethodNames.BYTES_ASFLOAT,
    arguments: [],
  },
  [OPERATORS.BYTES_ASINTEGER]: {
    name: RadonMethodNames.BYTES_ASINTEGER,
    arguments: [{
      name: 'base',
      optional: true,
      kind: TYPES.Int,
    }],
  },
  [OPERATORS.BYTES_ASMAP]: {
    name: RadonMethodNames.BYTES_ASMAP,
    arguments: [],
  },
  [OPERATORS.BYTES_ASSTRING]: {
    name: RadonMethodNames.BYTES_ASSTRING,
    arguments: [],
  },
  [OPERATORS.BYTES_HASH]: {
    name: RadonMethodNames.BYTES_HASH,
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
}
