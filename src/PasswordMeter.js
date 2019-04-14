import { CLICKED_SUBMIT, GREEN_INPUT, INIT_SCREEN, SUBMITTED_PASSWORD, TYPED_CHAR } from "./properties"

export default {
  template: `
     <section v-if="!submittedPassword">
      <label for="password">Enter password</label>
      <input type="password" name="password" id="password" v-on:input="PASSWORD_FIELD_CHANGED" />

      <meter v-if="isUnknown" max="4" id="password-strength-meter"></meter>
      <meter v-else-if="isStrong" max="4" id="password-strength-meter" value="4"></meter>
      <meter v-else="!isStrong" max="4" id="password-strength-meter" value="1"></meter>
      
      <p id="password-strength-text"></p>
      <button v-on:click="PASSWORD_SUBMITTED">Submit</button>
     </section>
    <section v-else="submittedPassword">That's all folks! Submitted password is {{password}}</section>
  `,
  props: ["screen", "input", "password", "next"],
  computed: {
    submittedPassword: function () {
      return this.screen === SUBMITTED_PASSWORD
    },
    isUnknown : function(){
      return this.screen === INIT_SCREEN
    },
    isStrong : function(){
      return this.screen === GREEN_INPUT
    },
  },
  methods: {
    // reminder : do not use fat arrow functions!
    PASSWORD_FIELD_CHANGED: function passwordChangedEventHandler(ev) {
      this.next({ [TYPED_CHAR]: ev.target.value })
    },
    PASSWORD_SUBMITTED: function buttonEventHandler(ev) {
      this.next({ [CLICKED_SUBMIT]: void 0 })
    },
  }
};

