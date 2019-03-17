<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
          <panel title="Register New User">
                <v-flex xs12 sm12 md10 offset-md1>
                  <form name="tab-tracker-form" autocomplete="off">
                    <v-text-field
                      label="First Name"
                      type="text"
                      name="firstName"
                      v-model="user.firstName">
                    </v-text-field>
                    <v-text-field
                      label="First Name"
                      type="text"
                      name="lastName"
                      v-model="user.lastName">
                    </v-text-field>
                    <v-text-field
                      label="E-Mail"
                      type="email"
                      name="email"
                      v-model="user.email">
                    </v-text-field>
                    <v-text-field
                      label="Password"
                      type="password"
                      name="password"
                      autocomplete="new-password"
                      v-model="user.password">
                    </v-text-field>
                    <div>
                      <vue-recaptcha
                        ref="recaptcha"
                        @verify="onVerify"
                        @expired="onExpired"
                        :sitekey="sitekey">
                      </vue-recaptcha>
                    </div>
                  </form>
                </v-flex>
                <div class="error" v-html="error" />
                <v-btn color="info" @click="register">Register</v-btn>
          </panel>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import VueRecaptcha from 'vue-recaptcha';
export default {
  name: 'HelloWorld',
  data () {
    return {
      user: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      recaptchaToken: ''
      },
      error: '',
      sitekey: '6LejLpgUAAAAAG0OivRXLro19nNSy0wUe94qgiJw',
    }
  },
  components: {VueRecaptcha},
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register(this.user)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'dashboard'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    onVerify (token) {
      this.user.recaptchaToken = token
    },
    onExpired () {
      this.user.recaptchaToken = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error {
  }
</style>
