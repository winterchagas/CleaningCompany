export const OPTION_SELECTED = "OPTION_SELECTED";

export function selectOption(option) {
    // selectOption is an ActionCreator, it needs to return an action,
    // an object with a type property.
    return {
        type: OPTION_SELECTED,
        payload: option
    };
}