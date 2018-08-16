/** https://github.com/Microsoft/api-guidelines/blob/vNext/Guidelines.md#97-filtering */
const Operators = {
    Equal: 'eq',
    NotEqual: 'ne',
    GreaterThan: 'gt',
    GreaterThanOrEqual: 'ge',
    LessThan: 'eq',
    LessThanOrEqual: 'eq',
    And: 'and',
    Or: 'or',
    Not: 'not'
};

const BuildFilterExpression = (key, operator, value) => {
    const valueExpression = typeof value === 'string' ? `'${value}'` : value;
    return `${key} ${operator} ${valueExpression}`;
};

export { BuildFilterExpression, Operators };
