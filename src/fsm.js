import { NO_OUTPUT, NO_STATE_UPDATE, createStateMachine } from "state-transducer";
import {
  INIT,
  START,
  WEAK,
  STRONG,
  DONE,
  RENDER,
  CLICKED_SUBMIT,
  TYPED_CHAR,
  INIT_SCREEN,
  GREEN_INPUT,
  RED_INPUT,
  SUBMITTED_PASSWORD
} from "./properties";

const NO_ACTIONS = () => ({ outputs: NO_OUTPUT, updates: NO_STATE_UPDATE });

const initialExtendedState = {
  input: ""
};
const states = {
  [INIT]: "",
  [STRONG]: "",
  [WEAK]: "",
  [DONE]: ""
};
const initialControlState = INIT;
const events = [TYPED_CHAR, CLICKED_SUBMIT, START];
const transitions = [
  { from: INIT, event: START, to: WEAK, action: displayInitScreen },
  { from: WEAK, event: CLICKED_SUBMIT, to: WEAK, action: NO_ACTIONS },
  {
    from: WEAK,
    event: TYPED_CHAR,
    guards: [
      { predicate: isPasswordWeak, to: WEAK, action: displayInputInRed },
      { predicate: isPasswordStrong, to: STRONG, action: displayInputInGreen }
    ]
  },
  {
    from: STRONG,
    event: TYPED_CHAR,
    guards: [
      { predicate: isPasswordWeak, to: WEAK, action: displayInputInRed },
      { predicate: isPasswordStrong, to: STRONG, action: displayInputInGreen }
    ]
  },
  {
    from: STRONG,
    event: CLICKED_SUBMIT,
    to: DONE,
    action: displaySubmittedPassword
  }
];

function displayInitScreen() {
  return {
    updates: NO_STATE_UPDATE,
    outputs: [{ command: RENDER, params: { screen: INIT_SCREEN, props: void 0 } }]
  };
}

function displayInputInRed(extendedState, eventData) {
  return {
    updates: [{ input: eventData }],
    outputs: [{ command: RENDER, params: { screen: RED_INPUT, props: eventData } }]
  };
}

function displayInputInGreen(extendedState, eventData) {
  return {
    updates: [{ input: eventData }],
    outputs: [{ command: RENDER, params: { screen: GREEN_INPUT, props: eventData } }]
  };
}

function displaySubmittedPassword(extendedState, eventData) {
  const password = extendedState.input;
  return {
    updates: NO_STATE_UPDATE,
    outputs: [
      {
        command: RENDER,
        params: { screen: SUBMITTED_PASSWORD, props: password }
      }
    ]
  };
}

const pwdFsmDef = {
  initialControlState,
  initialExtendedState,
  states,
  events,
  transitions,
  updateState
};

// Guards
function isPasswordStrong(extendedState, eventData) {
  return hasLetters(eventData) && hasNumbers(eventData);
}

function isPasswordWeak(extendedState, eventData) {
  return !isPasswordStrong(extendedState, eventData);
}

function hasLetters(str) {
  return str.match(/[a-z]/i);
}

function hasNumbers(str) {
  return /\d/.test(str);
}

// The simplest update function possible :-)
function updateState(extendedState, extendedStateUpdates) {
  return extendedStateUpdates.slice(-1)[0];
}

const passwordMeterFsm= createStateMachine(pwdFsmDef, {
    debug: { console }
});

export { passwordMeterFsm };
