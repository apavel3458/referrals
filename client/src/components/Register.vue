<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
          <panel title="Register New User">
                <v-flex xs12 sm12 md8 offset-md2>
                  <form name="tab-tracker-form" autocomplete="off">
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
                      autocomplete="new-password"
                      v-model="password">
                    </v-text-field>
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
import Panel from '@/components/Panel'
export default {
  name: 'HelloWorld',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  components: {Panel},
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'dashboard'
        })
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
