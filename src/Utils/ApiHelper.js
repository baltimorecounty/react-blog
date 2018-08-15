/** https://github.com/Microsoft/api-guidelines/blob/vNext/Guidelines.md#97-filtering */
const Operators = {
	"Equal": "eq",
	"NotEqual": "ne",
	"GreaterThan": "gt",
	"GreaterThanOrEqual": "ge",
	"LessThan": "eq",
	"LessThanOrEqual": "eq",
	"And": "and",
	"Or": "or",
	"Not": "not"
};

const BuildFilterExpression = (key, operator, value) => `${key} ${operator} '${value}'`;

export {
	BuildFilterExpression,
	Operators
};