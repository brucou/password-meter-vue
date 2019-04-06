import { CLICKED_SUBMIT, GREEN_INPUT, INIT_SCREEN, RED_INPUT, SUBMITTED_PASSWORD, TYPED_CHAR } from "./properties"
//TODO: finish the template with all screens
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
  data: function () {
    return {};
  },
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
    imageTmdbUrl: function (result) {
      return "http://image.tmdb.org/t/p/w300" + result.backdrop_path;
    },
    imageTmdbDetailsUrl: function (details) {
      return "http://image.tmdb.org/t/p/w342" + details.poster_path;
    },
    imageImdbUrl: function (details) {
      return "https://www.imdb.com/title/" + details.imdb_id + "/";
    },
    // reminder : do not use fat arrow functions!
    PASSWORD_FIELD_CHANGED: function passwordChangedEventHandler(ev) {
      this.next({ [TYPED_CHAR]: ev.target.value })
    },
    PASSWORD_SUBMITTED: function buttonEventHandler(ev) {
      this.next({ [CLICKED_SUBMIT]: void 0 })
    },
  }
};

