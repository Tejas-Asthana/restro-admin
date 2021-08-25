import { CONSOLE_LOG } from "../actions/types";

const initialState = {
  consoleLogger: false,
  data: "initial text",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CONSOLE_LOG:
      return {
        consoleLogger: !state.consoleLogger, // will be set to true on alternative calls
        data: action.payload.data,
      };
    default:
      return state;
  }
}
