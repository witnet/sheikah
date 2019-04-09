import { objectValues } from "../utils/objectValues"

export type RadonTypeName = "Array" | "Boolean" | "Float" | "Int" | "Map" | "Mixed" | "Null" | "Result" | "String"

export type RadonFunction = "FUNCTION_FILTER" | "FUNCTION_MAP" | "FUNCTION_REDUCE" | "FUNCTION_HASH"
export type RadonMethodName = "ARRAY_COUNT" | "ARRAY_EVERY" | "ARRAY_FILTER" | "ARRAY_FLATTEN" |
"ARRAY_GET" | "ARRAY_MAP" | "ARRAY_REDUCE" | "ARRAY_SOME" | "ARRAY_SORT" | "ARRAY_TAKE" |
"BOOLEAN_MATCH" | "BOOLEAN_NEG" | "BOOLEAN_TOSTRING" | "FLOAT_ABS" | "FLOAT_CEIL" |
"FLOAT_FLOOR" | "FLOAT_MODULO" | "FLOAT_MULT" | "FLOAT_NEG" | "FLOAT_POW" | "FLOAT_RECIP" |
"FLOAT_ROUND" | "FLOAT_SUM" | "FLOAT_TOSTRING" | "FLOAT_TRUNC" | "INT_ABS" | "INT_MODULO" |
"INT_MULT" | "INT_NEG" | "INT_POW" | "INT_RECIP" | "INT_SUM" | "INT_TOFLOAT" | "INT_TOSTRING" |
"MAP_ENTRIES" | "MAP_GET" | "MAP_KEYS" | "MAP_VALUES" | "MIXED_TOARRAY" | "MIXED_TOBOOLEAN" |
"MIXED_TOFLOAT" | "MIXED_TOINT" | "MIXED_TOMAP" | "RESULT_GET" | "RESULT_GETOR" |
"RESULT_ISOK" | "STRING_HASH" | "STRING_LENGTH" | "STRING_CATEGORIZE" | "STRING_PARSEJSON" |
"STRING_PARSEXML" | "STRING_TOBOOLEAN" | "STRING_TOFLOAT" | "STRING_TOINT" |
"STRING_TOLOWERCASE" | "STRING_TOUPPERCASE"

export interface RadonArgument {
  name: string,
  optional: boolean,
  kind: "RADON_TYPE" | RadonFunction,
}

export interface RadonMethod {
  name: string,
  structure: string,
  arguments: Array<RadonArgument>,
  outputType: RadonType,
}

enum HashFunction {
  BLAKE256 = "blake-256",
  BLAKE512 = "blake-512",
  BLAKE2s = "blake2s-256",
  Blake2b = "blake2b-512",
  MD5 = "md5-128",
  RIPEMD128 = "ripemd-128",
  RIPEMD160 = "ripemd-160",
  RIPEMD320 = "ripemd-320",
  SHA1 = "sha1-160",
  SHA2224 = "sha2-224",
  SHA2256 ="sha2-256",
  SHA2384 = "sha2-384",
  SHA2512 = "sha2-512",
  SHA3224 = "sha3-224",
  SHA3256= "sha3-256",
  SHA3384= "sha3-384",
  SHA3512 = "sha3-512",
  WHIRLPOOL512 = "whirlpool-512",
}

enum FilterFunction {
  GT = "gt",
  LT = "lt",
  EQ = "eq",
  DEVABS = "dev-abs",
  DEVREL = "dev-rel",
  DEVSTD = "dev-std",
  TOP = "top",
  BOTTOM = "bottom",
  NOTGT = "not-gt",
  NOTLT = "not-lt",
  NOTEQ = "not-eq",
  NOTDEVABS = "not-dev-abs",
  NOTDEVREL = "not-dev-rel",
  NOTDEVSTD = "not-dev-std",
  NOTTOP = "not-top",
  NOTBOTTOM = "not-bottom",
}

enum MapFunction {
  MAP = "map"
}

enum ReduceFunction {
  MIN = "min",
  MAX = "max",
  MODE = "mode",
  AVGMEAN = "avg-mean",
  AVGMEANW = "avg-mean-w",
  AVGMEDIAN = "avg-median",
  AVGMEDIANW = "avg-median-w",
  DEVSTD = "dev-std",
  DEVAVG = "dev-avg",
  DEVMED = "dev-med",
  DEVMAX = "dev-max",
}

export enum RadonType {
  Array = "Array",
  Boolean = "Boolean",
  Float = "Float",
  Int = "Int",
  Map = "Map",
  Mixed = "Mixed",
  Null = "Null",
  Result = "Result",
  String = "String",
}

export enum ArrayMethod {
  Count = "ARRAY_COUNT",
  Every = "ARRAY_EVERY",
  Filter = "ARRAY_FILTER",
  Flatten = "ARRAY_FLATTEN",
  Get = "ARRAY_GET",
  Map = "ARRAY_MAP",
  Reduce = "ARRAY_REDUCE",
  Some = "ARRAY_SOME",
  Sort = "ARRAY_SORT",
  Take = "ARRAY_TAKE",
}

const arrayCount: RadonMethod = {
  name: ArrayMethod.Count,
  structure: `${ArrayMethod.Count}`,
  arguments: [],
  outputType: RadonType.Int,
}

const arrayEvery: RadonMethod = {
  name: ArrayMethod.Every,
  structure: `[ ${ArrayMethod.Every}, function ]`,
  arguments: [
    {
      name: "function",
      optional: false,
      kind: "FUNCTION_FILTER",
    },
  ],
  outputType: RadonType.Boolean,
}

const arrayFilter: RadonMethod = {
  name: ArrayMethod.Filter,
  structure: `[ ${ArrayMethod.Filter}, function ]`,
  arguments: [{
    name: "function",
    optional: false,
    kind: "FUNCTION_FILTER",
  }],
  outputType: RadonType.Array,
}

const arrayFlatten: RadonMethod = {
  name: ArrayMethod.Flatten,
  structure: `[ ${ArrayMethod.Flatten}, depth ]`,
  arguments: [{
    name: "depth",
    optional: true,
    kind: "RADON_TYPE",
  }],
  outputType: RadonType.Mixed,
}

const arrayGet: RadonMethod = {
  name: ArrayMethod.Get,
  structure: `[ ${ArrayMethod.Get}, index ]`,
  arguments: [{
    name: "index",
    optional: false,
    kind: "RADON_TYPE",
  }],
  outputType: RadonType.Mixed,
}

const arrayMap: RadonMethod = {
  name: ArrayMethod.Map,
  structure: `[ ${ArrayMethod.Map}, operator]`,
  arguments: [{
    name: "operator",
    optional: false,
    kind: "FUNCTION_MAP",
  }],
  outputType: RadonType.Mixed,
}

const arrayReduce: RadonMethod = {
  name: ArrayMethod.Reduce,
  structure: `[ ${ArrayMethod.Reduce}, function]`,
  arguments: [{
    name: "function",
    optional: false,
    kind: "FUNCTION_REDUCE",
  }],
  outputType: RadonType.Mixed,
}

const arraySome: RadonMethod = {
  name: ArrayMethod.Some,
  structure: `[ ${ArrayMethod.Some}, function]`,
  arguments: [{
    name: "function",
    optional: false,
    kind: "FUNCTION_FILTER",
  }],
  outputType: RadonType.Boolean,
}

const arraySort: RadonMethod = {
  name: ArrayMethod.Sort,
  structure: `[ ${ArrayMethod.Sort}, mapFunction, ascending]`,
  arguments: [{
    name: "mapFunction",
    optional: false,
    kind: "FUNCTION_MAP",
  }, {
    name: "ascending",
    optional: false,
    kind: "RADON_TYPE",
  }],
  outputType: RadonType.Array,
}

export const arrayTake: RadonMethod = {
  name: ArrayMethod.Take,
  structure: `[ ${ArrayMethod.Take}, min, max ]`,
  arguments: [{
    name: "min",
    optional: true,
    kind: "RADON_TYPE",
  }, {
    name: "max",
    optional: true,
    kind: "RADON_TYPE",
  }],
  outputType: RadonType.Array,
}

export enum BooleanMethod {
  Match = "BOOLEAN_MATCH",
  Neg = "BOOLEAN_NEG",
  ToString = "BOOLEAN_TOSTRING",
}

export const booleanMatch: RadonMethod = {
  name: BooleanMethod.Match,
  structure: `[ ${BooleanMethod.Match}, [key, value] ]`,
  arguments: [{
    name: "categories",
    optional: false,
    kind: "RADON_TYPE",
  }, {
    name: "default",
    optional: false,
    kind: "RADON_TYPE",
  }],
  outputType: RadonType.Mixed,
}

export const booleanNeg: RadonMethod = {
  name: BooleanMethod.Neg,
  structure: `${BooleanMethod.Neg}`,
  arguments: [],
  outputType: RadonType.Boolean,
}

export const booleanToString: RadonMethod = {
  name: BooleanMethod.ToString,
  structure: `${BooleanMethod.ToString}`,
  arguments: [],
  outputType: RadonType.String,
}

export enum FloatMethod {
  Abs = "FLOAT_ABS",
  Ceil = "FLOAT_CEIL",
  Floor = "FLOAT_FLOOR",
  Modulo = "FLOAT_MODULO",
  Mult = "FLOAT_MULT",
  Neg = "FLOAT_NEG",
  Pow = "FLOAT_POW",
  Recip = "FLOAT_RECIP",
  Round = "FLOAT_ROUND",
  Sum = "FLOAT_SUM",
  ToString = "FLOAT_TOSTRING",
  Trunc = "FLOAT_TRUNC",
}

export const floatAbs: RadonMethod = {
  name: FloatMethod.Abs,
  structure: `${FloatMethod.Abs}`,
  arguments: [],
  outputType: RadonType.Float,
}

export const floatCeil: RadonMethod = {
  name: FloatMethod.Ceil,
  structure: `${FloatMethod.Ceil}`,
  arguments: [],
  outputType: RadonType.Int,
}

export const floatFloor: RadonMethod = {
  name: FloatMethod.Floor,
  structure: `${FloatMethod.Floor}`,
  arguments: [],
  outputType: RadonType.Int,
}

export const floatModulo: RadonMethod = {
  name: FloatMethod.Modulo,
  structure: `[ ${FloatMethod.Modulo}, modulus ]`,
  arguments: [{
    name: "modulus",
    optional: false,
    kind: "RADON_TYPE",
  }],
  outputType: RadonType.Float,
}

export const floatMult: RadonMethod = {
  name: FloatMethod.Mult,
  structure: `[ ${FloatMethod.Mult}, factor]`,
  arguments: [{
    name: "factor",
    optional: false,
    kind: "RADON_TYPE",
  }],
  outputType: RadonType.Float,
}

export const floatNeg: RadonMethod = {
  name: FloatMethod.Neg,
  structure: `${FloatMethod.Neg}`,
  arguments: [],
  outputType: RadonType.Float,
}

export const floatPow: RadonMethod = {
  name: FloatMethod.Pow,
  structure: `[ ${FloatMethod.Pow}, exponent]`,
  arguments: [{
    name: "exponent",
    optional: false,
    kind: "RADON_TYPE",
  }],
  outputType: RadonType.Float,
}

export const floatRecip: RadonMethod = {
  name: FloatMethod.Recip,
  structure: `${FloatMethod.Recip}`,
  arguments: [],
  outputType: RadonType.Float,
}

export const floatRound: RadonMethod = {
  name: FloatMethod.Round,
  structure: `${FloatMethod.Round}`,
  arguments: [],
  outputType: RadonType.Int,
}

export const floatSum: RadonMethod = {
  name: FloatMethod.Sum,
  structure: `[${FloatMethod.Sum}, addend]`,
  arguments: [{
    name: "addend",
    optional: false,
    kind: "RADON_TYPE",
  }],
  outputType: RadonType.Float,
}

export const floatToString: RadonMethod = {
  name: FloatMethod.ToString,
  structure: `[${FloatMethod.ToString}, decimals]`,
  arguments: [{
    name: "decimals",
    optional: false,
    kind: "RADON_TYPE",
  }],
  outputType: RadonType.String,
}

export const floatTrunc: RadonMethod = {
  name: FloatMethod.Trunc,
  structure: `${FloatMethod.Trunc}`,
  arguments: [],
  outputType: RadonType.Int,
}

export enum IntMethod {
  Abs = "INT_ABS",
  Match = "INT_MATCH",
  Modulo = "INT_MODULO",
  Mult = "INT_MULT",
  Neg = "INT_NEG",
  Pow = "INT_POW",
  Recip = "INT_RECIP",
  Round = "INT_ROUND",
  Sum = "INT_SUM",
  ToFloat = "INT_TOFLOAT",
  ToString = "INT_TOSTRING",
}

export const intAbs: RadonMethod = {
  name: IntMethod.Abs,
  structure: `${IntMethod.Abs}`,
  arguments: [],
  outputType: RadonType.Int,
}

export const intModulo: RadonMethod = {
  name: IntMethod.Modulo,
  structure: `[ ${IntMethod.Modulo}, modulus ]`,
  arguments: [{
    name: "modulus",
    optional: false,
    kind: "RADON_TYPE",
  }],
  outputType: RadonType.Int,
}

export const inttMult: RadonMethod = {
  name: IntMethod.Mult,
  structure: `[ ${IntMethod.Mult}, factor]`,
  arguments: [{
    name: "factor",
    optional: false,
    kind: "RADON_TYPE",
  }],
  outputType: RadonType.Int,
}

export const intNeg: RadonMethod = {
  name: IntMethod.Neg,
  structure: `${FloatMethod.Neg}`,
  arguments: [],
  outputType: RadonType.Int,
}

export const intPow: RadonMethod = {
  name: IntMethod.Pow,
  structure: `[ ${IntMethod.Pow}, exponent]`,
  arguments: [{
    name: "exponent",
    optional: false,
    kind: "RADON_TYPE",
  }],
  outputType: RadonType.Float,
}

export const intRecip: RadonMethod = {
  name: IntMethod.Recip,
  structure: `${IntMethod.Recip}`,
  arguments: [],
  outputType: RadonType.Float,
}

export const intSum: RadonMethod = {
  name: IntMethod.Sum,
  structure: `[${IntMethod.Sum}, addend]`,
  arguments: [{
    name: "addend",
    optional: false,
    kind: "RADON_TYPE",
  }],
  outputType: RadonType.Int,
}

export const intToFloat: RadonMethod = {
  name: IntMethod.ToFloat,
  structure: `${IntMethod.ToFloat}`,
  arguments: [],
  outputType: RadonType.Float,
}

export const intToString: RadonMethod = {
  name: IntMethod.ToString,
  structure: `[${IntMethod.ToString}, base]`,
  arguments: [{
    name: "base",
    optional: true,
    kind: "RADON_TYPE",
  }],
  outputType: RadonType.String,
}

export enum MapMethod {
  Entries = "MAP_ENTRIES",
  Get = "MAP_GET",
  Keys = "MAP_KEYS",
  Values = "MAP_VALUES",
}

export const mapEntries: RadonMethod = {
  name: MapMethod.Entries,
  structure: `${MapMethod.Entries}`,
  arguments: [],
  outputType: RadonType.Array,
}

export const mapGet: RadonMethod = {
  name: MapMethod.Get,
  structure: `[ ${MapMethod.Get}, key]`,
  arguments: [{
    name: "key",
    optional: false,
    kind: "RADON_TYPE",
  }],
  outputType: RadonType.Mixed,
}

export const mapKeys: RadonMethod = {
  name: MapMethod.Keys,
  structure: `${MapMethod.Keys}`,
  arguments: [],
  outputType: RadonType.Array,
}

export const mapValues: RadonMethod = {
  name: MapMethod.Values,
  structure: `${MapMethod.Values}`,
  arguments: [],
  outputType: RadonType.Array,
}

export enum MixedMethod {
  ToArray = "MIXED_TOARRAY",
  ToBoolean = "MIXED_TOBOOLEAN",
  ToFloat = "MIXED_TOFLOAT",
  ToInt = "MIXED_TOINT",
  ToMap = "MIXED_TOMAP",
}

export const mixedToArray: RadonMethod = {
  name: MixedMethod.ToArray,
  structure: `[ ${MixedMethod.ToArray}, type ]`,
  arguments: [{
    name: "type",
    optional: true,
    kind: "RADON_TYPE",
  }],
  outputType: RadonType.Array,
}

export const mixedToBoolean: RadonMethod = {
  name: MixedMethod.ToBoolean,
  structure: `${MixedMethod.ToBoolean}`,
  arguments: [],
  outputType: RadonType.Boolean,
}

export const mixedToFloat: RadonMethod = {
  name: MixedMethod.ToFloat,
  structure: `${MixedMethod.ToFloat}`,
  arguments: [],
  outputType: RadonType.Float,
}

export const mixedToInt: RadonMethod = {
  name: MixedMethod.ToInt,
  structure: `[ ${MixedMethod.ToInt}, base ]`,
  arguments: [{
    name: "base",
    optional: true,
    kind: "RADON_TYPE",
  }],
  outputType: RadonType.Int,
}

export const mixedToMap: RadonMethod = {
  name: MixedMethod.ToMap,
  structure: `[ ${MixedMethod.ToMap}, keyType, valueType ]`,
  arguments: [{
    name: "keyType",
    optional: true,
    kind: "RADON_TYPE",
  }, {
    name: "ValueType",
    optional: true,
    kind: "RADON_TYPE",
  }],
  outputType: RadonType.Map,
}

export enum NullMethod {
  Null = "NULL"
}

export enum ResultMethod {
  Get = "RESULT_GET",
  GetOr = "RESULT_GETOR",
  IsOk = "RESULT_ISOK",
}

export const resultGet: RadonMethod = {
  name: ResultMethod.Get,
  structure: `${ResultMethod}`,
  arguments: [],
  outputType: RadonType.Mixed,
}

export const resultGetOr: RadonMethod = {
  name: ResultMethod.GetOr,
  structure: `${ResultMethod.GetOr}`,
  arguments: [
    {
      name: "default",
      optional: false,
      kind: "RADON_TYPE",
    },
  ],
  outputType: RadonType.Mixed,
}

export const resultIsOk: RadonMethod = {
  name: ResultMethod.IsOk,
  structure: `${ResultMethod.IsOk}`,
  arguments: [],
  outputType: RadonType.Boolean,
}

export enum StringMethod {
  Hash = "STRING_HASH",
  Length = "STRING_LENGTH",
  Match = "STRING_CATEGORIZE",
  ParseJson = "STRING_PARSEJSON",
  ParseXml = "STRING_PARSEXML",
  ToBoolean = "STRING_TOBOOLEAN",
  ToFloat = "STRING_TOFLOAT",
  ToInt = "STRING_TOINT",
  ToLowerCase = "STRING_TOLOWERCASE",
  ToUpperCase = "STRING_TOUPPERCASE",
}

export const stringHashInfo: RadonMethod = {
  name: "STRING_HASH",
  structure: "[ STRING_HASH, function ]",
  arguments: [{
    name: "function",
    optional: false,
    kind: "FUNCTION_HASH",
  }],
  outputType: RadonType.String,
}

const stringLengthInfo: RadonMethod = {
  name: "STRING_LENGTH",
  structure: "STRING_LENGTH",
  arguments: [],
  outputType: RadonType.Int,
}

const stringCategorizeInfo: RadonMethod = {
  name: "STRING_CATEGORIZE",
  structure: "[ STRING_CATEGORIZE, [ /** `[key, value]` pairs **/ ], default]",
  arguments: [
    {
      name: "categories",
      optional: false,
      kind: "RADON_TYPE",
    },
    {
      name: "default",
      optional: true,
      kind: "RADON_TYPE",
    },
  ],
  outputType: RadonType.Mixed,
}

const stringParseJson: RadonMethod = {
  name: "STRING_PARSEJSON",
  structure: "STRING_PARSEJSON",
  arguments: [],
  outputType: RadonType.Mixed,
}

const stringParseXml: RadonMethod = {
  name: "STRING_PARSEXML",
  structure: "STRING_PARSEXML",
  arguments: [],
  outputType: RadonType.Map,
}

const stringToBoolean: RadonMethod = {
  name: "STRING_TOBOOLEAN",
  structure: "STRING_TOBOOLEAN",
  arguments: [],
  outputType: RadonType.Boolean,
}

const stringToFloat: RadonMethod = {
  name: StringMethod.ToFloat,
  structure: `${StringMethod.ToFloat}`,
  arguments: [],
  outputType: RadonType.Float,
}

const stringToInt: RadonMethod = {
  name: StringMethod.ToInt,
  structure: `[ ${StringMethod.ToInt}, base ]`,
  arguments: [{
    name: "base",
    optional: true,
    kind: "RADON_TYPE",
  }],
  outputType: RadonType.Int,
}

const stringToLowerCase: RadonMethod = {
  name: StringMethod.ToLowerCase,
  structure: `${StringMethod.ToLowerCase}`,
  arguments: [],
  outputType: RadonType.String,
}

const stringToUpperCase: RadonMethod = {
  name: StringMethod.ToUpperCase,
  structure: `${StringMethod.ToUpperCase}`,
  arguments: [],
  outputType: RadonType.String,
}

export function getRadonFunctionsByType(type: RadonFunction): Array<RadonMethodName> {
  type RadonFunctionMap = { [K in RadonFunction]: () => Array<RadonMethodName> }
  const radonFunctionMap: RadonFunctionMap = {
    FUNCTION_FILTER: () => objectValues(FilterFunction),
    FUNCTION_REDUCE: () => objectValues(ReduceFunction),
    FUNCTION_MAP: () => objectValues(MapFunction),
    FUNCTION_HASH: () => objectValues(HashFunction),
  }

  return radonFunctionMap[type]()
}

export function getMethodsByType(type: RadonType) {
  type RadonTypeMap = { [K in RadonTypeName]: () => Array<RadonMethodName> }

  const radonTypeMap: RadonTypeMap = {
    Array: () => objectValues(ArrayMethod),
    Boolean: () => objectValues(BooleanMethod),
    Float: () => objectValues(FloatMethod),
    Int: () => objectValues(IntMethod),
    Map: () => objectValues(MapMethod),
    Mixed: () => objectValues(MixedMethod),
    Null: () => objectValues(NullMethod),
    Result: () => objectValues(ResultMethod),
    String: () => objectValues(StringMethod),
  }

  return radonTypeMap[type]()
}

export function getMethodInformation(method: RadonMethodName) {
  type MethodInformationMap = { [K in RadonMethodName]: RadonMethod }
  const methodInformationMap: MethodInformationMap = {
    // array
    ARRAY_COUNT: arrayCount,
    ARRAY_EVERY: arrayEvery,
    ARRAY_FILTER: arrayFilter,
    ARRAY_FLATTEN: arrayFlatten,
    ARRAY_GET: arrayGet,
    ARRAY_MAP: arrayMap,
    ARRAY_REDUCE: arrayReduce,
    ARRAY_SOME: arraySome,
    ARRAY_SORT: arraySort,
    ARRAY_TAKE: arrayTake,
    // Boolean
    BOOLEAN_MATCH: booleanMatch,
    BOOLEAN_NEG: booleanNeg,
    BOOLEAN_TOSTRING: booleanToString,
    // Float
    FLOAT_ABS: floatAbs,
    FLOAT_CEIL: floatCeil,
    FLOAT_FLOOR: floatFloor,
    FLOAT_MODULO: floatModulo,
    FLOAT_MULT: floatMult,
    FLOAT_NEG: floatNeg,
    FLOAT_POW: floatPow,
    FLOAT_RECIP: floatRecip,
    FLOAT_ROUND: floatRound,
    FLOAT_SUM: floatSum,
    FLOAT_TOSTRING: floatToString,
    FLOAT_TRUNC: floatTrunc,
    // Int
    INT_ABS: intAbs,
    INT_MODULO: intModulo,
    INT_MULT: inttMult,
    INT_NEG: intNeg,
    INT_POW: intPow,
    INT_RECIP: intRecip,
    INT_SUM: intSum,
    INT_TOFLOAT: intToFloat,
    INT_TOSTRING: intToString,
    // Map
    MAP_ENTRIES: mapEntries,
    MAP_GET: mapGet,
    MAP_KEYS: mapKeys,
    MAP_VALUES: mapValues,
    // Mixed
    MIXED_TOARRAY: mixedToArray,
    MIXED_TOBOOLEAN: mixedToBoolean,
    MIXED_TOFLOAT: mixedToFloat,
    MIXED_TOINT: mixedToInt,
    MIXED_TOMAP: mixedToMap,
    // Result
    RESULT_GET: resultGet,
    RESULT_GETOR: resultGetOr,
    RESULT_ISOK: resultIsOk,
    // String
    STRING_HASH: stringHashInfo,
    STRING_LENGTH: stringLengthInfo,
    STRING_CATEGORIZE: stringCategorizeInfo,
    STRING_PARSEJSON: stringParseJson,
    STRING_PARSEXML: stringParseXml,
    STRING_TOBOOLEAN: stringToBoolean,
    STRING_TOFLOAT: stringToFloat,
    STRING_TOINT: stringToInt,
    STRING_TOLOWERCASE: stringToLowerCase,
    STRING_TOUPPERCASE: stringToUpperCase,
  }

  return methodInformationMap[method]
}
