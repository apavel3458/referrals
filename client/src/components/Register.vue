<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
          <panel title="Register New User">
                <v-flex xs12 sm12 md10 offset-md1>
                  <v-form name="registrationForm" @submit.prevent="register" autocomplete="off">
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

                    <v-alert
                      :value="successMessage"
                      color="success"
                      icon="check_circle"
                      outline
                      dismissible
                      style="width: 70%"
                    >
                      {{successMessage}}
                    </v-alert>
                    <v-alert
                      :value="errorMessage"
                      color="error"
                      icon="warning"
                      outline
                      dismissible
                    >
                      {{errorMessage}}
                    </v-alert>
                    <v-btn type="submit" color="info">Register</v-btn>
                  </v-form>
                </v-flex>
                <div class="error" v-html="error" />
                
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
      errorMessage: '',
      sitekey: '6LejLpgUAAAAAG0OivRXLro19nNSy0wUe94qgiJw',
    }
  },
  components: {VueRecaptcha},
  methods: {
    async register () {
      const response = await AuthenticationService.register(this.user)
      if (response.error) {
        this.errorMessage = response.error
      } if (response.success) {
        this.successMessage = response.success
      } else {
        this.$store.dispatch('setToken', response.token)
        this.$store.dispatch('setUser', response.user)
        this.$router.push({
          name: 'dashboard'
        })
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
