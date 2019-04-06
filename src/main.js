import PasswordMeter from "./PasswordMeter"
import Vue from 'vue'
import { events } from "./properties";
import emitonoff from "emitonoff";
import { commandHandlers, effectHandlers, passwordMeterFsm } from "./fsm";
import { makeVueStateMachine } from "vue-state-driven";
import {getEventEmitterAdapter} from "./helpers"

Vue.config.productionTip = false

const options = { initialEvent: { START: void 0 } };

makeVueStateMachine({
  name: 'App',
  renderWith: PasswordMeter,
  props: ["input", "password"],
  fsm: passwordMeterFsm,
  commandHandlers,
  effectHandlers,
  subjectFactory: () => getEventEmitterAdapter(emitonoff),
  options,
  Vue
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>'
})
