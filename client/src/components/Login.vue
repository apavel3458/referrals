<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
          <div class="elevation-2">
              <v-toolbar flat dense class="blue" dark>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <div class="pl-4 pr-4 pt-2 pb-2">
                <v-flex xs12 sm12 md8 offset-md2>
                  <v-text-field
                    label="E-Mail"
                    type="email"
                    name="email"
                    v-model="email"
                    placeholder="E-mail">
                  </v-text-field>
                  <v-text-field
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    v-model="password">
                  </v-text-field>
                </v-flex>
                <br/>
                <div class="error" v-html="error" />
                <v-btn color="info" @click="login">Login</v-btn>
              </div>
          </div>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'HelloWorld',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        // console.log(response.token)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error {
  }
</style>
