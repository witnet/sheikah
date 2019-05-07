export interface OperatorInfo {
  name: RadonMethodNames,
  arguments: Array<{name: string, optional: boolean, kind: TYPES}>,
}
export interface OperatorInfos {[key: number]: OperatorInfo}
export interface Typesystem {
  [key: number]: {
    [key: number]: TYPES,
  },
}

export enum TYPES {
  Boolean = 0x00,
  Int = 0x01,
  Float = 0x02,
  String = 0x03,
  Array = 0x04,
  Map = 0x05,
  Mixed = 0x06,
  Null = 0x07,
  Result = 0x08,
  HashFunction = -0x01,
  FilterFunction = -0x02,
  ReduceFunction = -0x03,
  MapFunction = -0x04,
  Self = -0x05
}

export enum OPERATORS {
  ARRAY_COUNT = 0x50,
  ARRAY_EVERY = 0x51,
  ARRAY_FILTER = 0x52,
  ARRAY_FLATTEN = 0x53,
  ARRAY_GET = 0x54,
  ARRAY_MAP = 0x55,
  ARRAY_REDUCE = 0x56,
  ARRAY_SOME = 0x57,
  ARRAY_SORT = 0x58,
  ARRAY_TAKE = 0x59,
  BOOLEAN_MATCH = 0x10,
  BOOLEAN_NEG = 0x11,
  BOOLEAN_TOSTRING = 0x12,
  FLOAT_ABS = 0x30,
  FLOAT_CEIL = 0x31,
  FLOAT_FLOOR = 0x32,
  FLOAT_MODULO = 0x33,
  FLOAT_MULT = 0x34,
  FLOAT_NEG = 0x35,
  FLOAT_POW = 0x36,
  FLOAT_RECIP = 0x37,
  FLOAT_ROUND = 0x38,
  FLOAT_SUM = 0x39,
  FLOAT_TOSTRING = 0x3A,
  FLOAT_TRUNC = 0x3B,
  INT_ABS = 0x20,
  INT_MATCH = 0x21,
  INT_MODULO = 0x22,
  INT_MULT = 0x23,
  INT_NEG = 0x24,
  INT_POW = 0x25,
  INT_RECIP = 0x26,
  INT_SUM = 0x27,
  INT_TOFLOAT = 0x28,
  INT_TOSTRING = 0x29,
  MAP_ENTRIES = 0x60,
  MAP_GET = 0x61,
  MAP_KEYS = 0x62,
  MAP_VALUES = 0x63,
  MIXED_TOARRAY = 0x70,
  MIXED_TOBOOLEAN = 0x71,
  MIXED_TOFLOAT = 0x72,
  MIXED_TOINT = 0x73,
  MIXED_TOMAP = 0x74,
  RESULT_GET = 0x80,
  RESULT_GETOR = 0x81,
  RESULT_ISOK = 0x82,
  STRING_HASH = 0x40,
  STRING_LENGTH = 0x41,
  STRING_CATEGORIZE = 0x42,
  STRING_PARSEJSON = 0x43,
  STRING_PARSEXML = 0x44,
  STRING_TOBOOLEAN = 0x45,
  STRING_TOFLOAT = 0x46,
  STRING_TOINT = 0x47,
  STRING_TOLOWERCASE = 0x48,
  STRING_TOUPPERCASE = 0x49,
}

export enum HashFunctionCodes {
  BLAKE256 = 0x00,
  BLAKE512 = 0x01,
  BLAKE2s = 0x03,
  Blake2b = 0x04,
  MD5 = 0x05,
  RIPEMD128 = 0x06,
  RIPEMD160 = 0x07,
  RIPEMD320 = 0x08,
  SHA1 = 0x09,
  SHA2224 = 0x0a,
  SHA2256 = 0x0b,
  SHA2384 = 0x0b,
  SHA2512 = 0x0c,
  SHA3224 = 0x0d,
  SHA3256 = 0x0e,
  SHA3384 = 0x0f,
  SHA3512 = 0x10,
  WHIRLPOOL512 = 0x11,
}

export enum FilteringFunctionCodes {
  GT = 0x00,
  LT = 0x01,
  EQ = 0x02,
  DEVABS = 0x03,
  DEVREL = 0x04,
  DEVSTD = 0x05,
  TOP = 0x06,
  BOTTOM = 0x07,
  NOTGT = 0x08,
  NOTLT = 0x09,
  NOTEQ = 0x0a,
  NOTDEVABS = 0x0b,
  NOTDEVREL = 0x0c,
  NOTDEVSTD = 0x0d,
  NOTTOP = 0x0e,
  NOTBOTTOM = 0x0f,
}

export enum ReducingFunctionCodes {
  MIN = 0x00,
  MAX = 0x01,
  MODE = 0x02,
  AVGMEAN = 0x03,
  AVGMEANW = 0x04,
  AVGMEDIAN = 0x05,
  AVGMEDIANW = 0x06,
  DEVSTD = 0x07,
  DEVAVG = 0x08,
  DEVMED = 0x09,
  DEVMAX = 0x0a,
}

export enum RadonTypeCodes {
  Boolean = 0x00,
  Int = 0x01,
  Float = 0x02,
  String = 0x03,
  Array = 0x04,
  Map = 0x05,
  Mixed = 0x06,
  Null = 0x07,
  Result = 0x08,
}

export const TYPESYSTEM: Typesystem = {
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
    [OPERATORS.STRING_PARSEJSON]: TYPES.Self,
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
    [OPERATORS.ARRAY_GET]: TYPES.Self,
    [OPERATORS.ARRAY_MAP]: TYPES.Array,
    [OPERATORS.ARRAY_REDUCE]: TYPES.Self,
    [OPERATORS.ARRAY_SOME]: TYPES.Boolean,
    [OPERATORS.ARRAY_SORT]: TYPES.Array,
    [OPERATORS.ARRAY_TAKE]: TYPES.Array,
  },
  [TYPES.Map]: {
    [OPERATORS.MAP_ENTRIES]: TYPES.Array,
    [OPERATORS.MAP_GET]: TYPES.Self,
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

export enum RadonMethodNames {
  ARRAY_COUNT = "ARRAY_COUNT",
  ARRAY_EVERY = "ARRAY_EVERY",
  ARRAY_FILTER = "ARRAY_FILTER",
  ARRAY_FLATTEN = "ARRAY_FLATTEN",
  ARRAY_GET = "ARRAY_GET",
  ARRAY_MAP = "ARRAY_MAP",
  ARRAY_REDUCE = "ARRAY_REDUCE",
  ARRAY_SOME = "ARRAY_SOME",
  ARRAY_SORT = "ARRAY_SORT",
  ARRAY_TAKE = "ARRAY_TAKE",
  BOOLEAN_MATCH = "BOOLEAN_MATCH",
  BOOLEAN_NEG = "BOOLEAN_NEG",
  BOOLEAN_TOSTRING = "BOOLEAN_TOSTRING",
  FLOAT_ABS = "FLOAT_ABS",
  FLOAT_CEIL = "FLOAT_CEIL",
  FLOAT_FLOOR = "FLOAT_FLOOR",
  FLOAT_MODULO = "FLOAT_MODULO",
  FLOAT_MULT = "floatMult",
  FLOAT_NEG = "floatNeg",
  FLOAT_POW = "floatPow",
  FLOAT_RECIP = "floatRecip",
  FLOAT_ROUND = "floatRound",
  FLOAT_SUM = "floatSum",
  FLOAT_TOSTRING = "floatToString",
  FLOAT_TRUNC = "floatTrunc",
  INT_ABS = "intAbs",
  INT_MATCH = "intMatch",
  INT_MODULO = "intModulo",
  INT_MULT = "intMult",
  INT_NEG = "intNeg",
  INT_POW = "intPow",
  INT_RECIP = "intRecip",
  INT_SUM = "intSum",
  INT_TOFLOAT = "intToFloat",
  INT_TOSTRING = "intToString",
  MAP_ENTRIES = "mapEntries",
  MAP_GET = "mapGet",
  MAP_KEYS = "mapKeys",
  MAP_VALUES = "mapValues",
  MIXED_TOARRAY = "mixedToArray",
  MIXED_TOBOOLEAN = "mixedToBoolean",
  MIXED_TOFLOAT = "mixedToFloat",
  MIXED_TOINT = "mixedToInt",
  MIXED_TOMAP = "mixedToMap",
  RESULT_GET = "resultGet",
  RESULT_GETOR = "resultGetOr",
  RESULT_ISOK = "resutlIsok",
  STRING_HASH = "stringHash",
  STRING_LENGTH = "strighLenght",
  STRING_CATEGORIZE = "stringCategorize",
  STRING_PARSEJSON = "stringParseJson",
  STRING_PARSEXML = "stringParseXml",
  STRING_TOBOOLEAN = "stringToBoolean",
  STRING_TOFLOAT = "stringToFloat",
  STRING_TOINT = "stringToInt",
  STRING_TOLOWERCASE = "stringToLowercase",
  STRING_TOUPPERCASE = "stringToUppercase",
}

export const OPERATOR_INFOS: OperatorInfos = {
  [OPERATORS.ARRAY_COUNT]: {
    name: RadonMethodNames.ARRAY_COUNT,
    arguments: [],
  },
  [OPERATORS.ARRAY_EVERY]: {
    name: RadonMethodNames.ARRAY_EVERY,
    arguments: [
      {
        name: "function",
        optional: false,
        kind: TYPES.FilterFunction,
      },
    ],
  },
  [OPERATORS.ARRAY_FILTER]: {
    name: RadonMethodNames.ARRAY_FILTER,
    arguments: [{
      name: "function",
      optional: false,
      kind: TYPES.FilterFunction,
    }],
  },
  [OPERATORS.ARRAY_FLATTEN]: {
    name: RadonMethodNames.ARRAY_FLATTEN,
    arguments: [{
      name: "depth",
      optional: true,
      kind: TYPES.Int,
    }],
  },
  [OPERATORS.ARRAY_GET]: {
    name: RadonMethodNames.ARRAY_GET,
    arguments: [{
      name: "index",
      optional: false,
      kind: TYPES.Int,
    }],
  },
  [OPERATORS.ARRAY_MAP]: {
    name: RadonMethodNames.ARRAY_MAP,
    arguments: [{
      name: "operator",
      optional: false,
      kind: TYPES.MapFunction,
    }],
  },
  [OPERATORS.ARRAY_REDUCE]: {
    name: RadonMethodNames.ARRAY_REDUCE,
    arguments: [{
      name: "function",
      optional: false,
      kind: TYPES.ReduceFunction,
    }],
  },
  [OPERATORS.ARRAY_SOME]: {
    name: RadonMethodNames.ARRAY_SOME,
    arguments: [{
      name: "function",
      optional: false,
      kind: TYPES.FilterFunction,
    }],
  },
  [OPERATORS.ARRAY_SORT]: {
    name: RadonMethodNames.ARRAY_SORT,
    arguments: [{
      name: "mapFunction",
      optional: false,
      kind: TYPES.MapFunction,
    }, {
      name: "ascending",
      optional: false,
      kind: TYPES.Boolean,
    }],
  },
  [OPERATORS.ARRAY_TAKE]: {
    name: RadonMethodNames.ARRAY_TAKE,
    arguments: [{
      name: "min",
      optional: true,
      kind: TYPES.Int,
    }, {
      name: "max",
      optional: true,
      kind: TYPES.Int,
    }],
  },
  [OPERATORS.BOOLEAN_MATCH]: {
    name: RadonMethodNames.BOOLEAN_MATCH,
    arguments: [{
      name: "categories",
      optional: false,
      kind: TYPES.Map,
    }, {
      name: "default",
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
      name: "modulus",
      optional: false,
      kind: TYPES.Float,
    }],
  },
  [OPERATORS.FLOAT_MULT]: {
    name: RadonMethodNames.FLOAT_MULT,
    arguments: [{
      name: "factor",
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
      name: "exponent",
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
      name: "addend",
      optional: false,
      kind: TYPES.Float,
    }],
  },
  [OPERATORS.FLOAT_TOSTRING]: {
    name: RadonMethodNames.FLOAT_TOSTRING,
    arguments: [{
      name: "decimals",
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
      name: "modulus",
      optional: false,
      kind: TYPES.Int,
    }],
  },
  [OPERATORS.INT_MULT]: {
    name: RadonMethodNames.INT_MULT,
    arguments: [{
      name: "factor",
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
      name: "exponent",
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
      name: "addend",
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
      name: "base",
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
      name: "key",
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
      name: "base",
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
    arguments: [
      {
        name: "default",
        optional: false,
        kind: TYPES.Self,
      },
    ],
  },
  [OPERATORS.RESULT_ISOK]: {
    name: RadonMethodNames.RESULT_ISOK,
    arguments: [],
  },
  [OPERATORS.STRING_HASH]: {
    name: RadonMethodNames.STRING_HASH,
    arguments: [{
      name: "function",
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
    arguments: [
      {
        name: "categories",
        optional: false,
        kind: TYPES.Map,
      },
      {
        name: "default",
        optional: true,
        kind: TYPES.Self,
      },
    ],
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
      name: "base",
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
