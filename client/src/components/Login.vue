<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <panel title="Login">
          <v-form @submit.prevent="login()" id="submitLoginForm">
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
                <div class="error" v-html="error" />
                <v-btn @click.prevent="login()" color="info">Login</v-btn>
          </v-flex>
          </v-form>
       </panel>

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
  components: {},
  methods: {
    async login () {
      const response = await AuthenticationService.login({
        email: this.email,
        password: this.password
      })
      //alert(JSON.stringify(response))
      if (response.error) {
        this.error = response.error
      } else {
        this.$store.dispatch('setToken', response.token)
        this.$store.dispatch('setUser', response.user)
        this.$router.push({
          name: 'dashboard'
        })
      }
    }
  },
  mounted() {
    this.error = this.$route.params.error || ''
    this.$store.dispatch('setToken', null)
    this.$store.dispatch('setUser', null)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error {
  }
</style>
