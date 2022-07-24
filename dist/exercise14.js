function toFunctional(func) {
    const fullArgCount = func.length;
    function createSubFunction(curriedArgs) {
        return function () {
            const newCurriedArguments = curriedArgs.concat(Array.from(arguments));
            if (newCurriedArguments.length > fullArgCount) {
                throw new Error('Too many arguments');
            }
            if (newCurriedArguments.length === fullArgCount) {
                return func.apply(this, newCurriedArguments);
            }
            return createSubFunction(newCurriedArguments);
        };
    }
    return createSubFunction([]);
}
export const map = toFunctional((fn, input) => input.map(fn));
export const filter = toFunctional((fn, input) => input.filter(fn));
export const reduce = toFunctional((reducer, initialValue, input) => input.reduce(reducer, initialValue));
export const add = toFunctional((a, b) => a + b);
export const subtract = toFunctional((a, b) => a - b);
export const prop = toFunctional((obj, propName) => obj[propName]);
export const pipe = function (...functions) {
    if (arguments.length === 0) {
        return pipe;
    }
    return function subFunction() {
        let nextArguments = Array.from(arguments);
        let result;
        for (const func of functions) {
            result = func(...nextArguments);
            nextArguments = [result];
        }
        return result;
    };
};
