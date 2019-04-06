import Vue from 'vue'
import emitonoff from "emitonoff";
import { passwordMeterFsm } from "./fsm";
import PasswordMeter from "./PasswordMeter";
import { commandHandlers, effectHandlers } from "./passwordVueMachineDef";
import { makeVueStateMachine } from "vue-state-driven";
import { getEventEmitterAdapter } from "./helpers"
import "./styles.css";

Vue.config.productionTip = false

makeVueStateMachine({
  name: 'App',
  renderWith: PasswordMeter,
  props: ["screen", "input", "password"],
  fsm: passwordMeterFsm,
  commandHandlers,
  effectHandlers,
  subjectFactory: getEventEmitterAdapter(emitonoff).subjectFactory,
  options: { initialEvent: { START: void 0 } },
  Vue
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App />'
})
