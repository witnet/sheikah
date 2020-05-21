{ filters: [ { "hierarchicalType": "operator", "id": 5, "label": "deviationAbsolute", "markupType":
"select", "options": [ { "hierarchicalType": "operatorOption", "label": "deviationAbsolute",
"markupType": "option", "outputType": "filterOutput" }, { "hierarchicalType": "operatorOption",
"label": "deviationRelative", "markupType": "option", "outputType": "filterOutput" }, {
"hierarchicalType": "operatorOption", "label": "deviationStandard", "markupType": "option",
"outputType": "filterOutput" }, { "hierarchicalType": "operatorOption", "label": "mode",
"markupType": "option", "outputType": "filterOutput" } ], "outputType": "filterOutput", "scriptId":
4, "selected": { "arguments": [ { "hierarchicalType": "argument", "id": 6, "label": "by",
"markupType": "input", "value": "1" } ], "hierarchicalType": "selectedOperatorOption", "label":
"deviationAbsolute", "markupType": "option", "outputType": "filterOutput" } }, { "hierarchicalType":
"operator", "id": 7, "label": "deviationStandard", "markupType": "select", "options": [ {
"hierarchicalType": "operatorOption", "label": "deviationAbsolute", "markupType": "option",
"outputType": "filterOutput" }, { "hierarchicalType": "operatorOption", "label":
"deviationRelative", "markupType": "option", "outputType": "filterOutput" }, { "hierarchicalType":
"operatorOption", "label": "deviationStandard", "markupType": "option", "outputType": "filterOutput"
}, { "hierarchicalType": "operatorOption", "label": "mode", "markupType": "option", "outputType":
"filterOutput" } ], "outputType": "filterOutput", "scriptId": 4, "selected": { "arguments": [ {
"hierarchicalType": "argument", "id": 8, "label": "by", "markupType": "input", "value": 1 } ],
"hierarchicalType": "selectedOperatorOption", "label": "deviationStandard", "markupType": "option",
"outputType": "filterOutput" } } ], reducer: { "hierarchicalType": "operator", "id": 9, "label":
"averageMean", "markupType": "select", "options": [ { "hierarchicalType": "operatorOption", "label":
"mode", "markupType": "option", "outputType": "filterOutput" }, { "hierarchicalType":
"operatorOption", "label": "averageMean", "markupType": "option", "outputType": "filterOutput" }, {
"hierarchicalType": "operatorOption", "label": "averageMeanWeighted", "markupType": "option",
"outputType": "filterOutput" }, { "hierarchicalType": "operatorOption", "label": "averageMedian",
"markupType": "option", "outputType": "filterOutput" }, { "hierarchicalType": "operatorOption",
"label": "averageMedianWeighted", "markupType": "option", "outputType": "filterOutput" } ],
"outputType": "filterOutput", "scriptId": 4, "selected": { "arguments": [], "hierarchicalType":
"selectedOperatorOption", "label": "averageMean", "markupType": "option", "outputType":
"reducerOutput" } } }
