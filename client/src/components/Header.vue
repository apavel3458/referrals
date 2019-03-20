<template>
  <v-toolbar dense dark color="primary">
    <v-toolbar-side-icon></v-toolbar-side-icon>

    <v-toolbar-title class="white--text">
      <span class="home" @click="navigateTo({name: 'root'})">
      LHSC Cardiology Referrals
      </span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
            v-if="$store.state.isUserLoggedIn"
            flat
            dark
            @click="navigateTo('dashboard')">
          Dashboard
        </v-btn>
        <v-btn
            v-if="$store.state.isUserLoggedIn"
            flat
            dark
            @click="navigateTo('users')">
          Users
        </v-btn>
        <v-btn
          v-if="!$store.state.isUserLoggedIn"
            flat
            dark
            @click="navigateTo('login')">
          Login
        </v-btn>

      <v-btn icon
        v-if="!$store.state.isUserLoggedIn"
        @click="navigateTo('register')">
        <v-icon>account_box</v-icon>
      </v-btn>

      
      <v-btn flat dark v-if="$store.state.isUserLoggedIn">
        <v-icon>account_box</v-icon>
        {{$store.state.user.email}}
      </v-btn>
      </v-toolbar-items>

      <v-tooltip bottom v-if="isUserLoggedIn">
        <template v-slot:activator="{ on }">
          <v-btn icon
            v-on="on"
            @click="logout()">
            <v-icon>exit_to_app</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>

      <v-btn icon>
            <v-icon>more_vert</v-icon>
      </v-btn>


  </v-toolbar>
</template>

<script>
import {mapState} from 'vuex'

export default {
  components: {},
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}

</script>

<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  color: rgb(218, 218, 218);
}
.headerElement {
  vertical-align: middle;
}
.headerElementSpan {
  line-height: 4;
  vertical-align: middle;
}
</style>
