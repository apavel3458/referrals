<template>
  <v-toolbar dense dark color="primary">
    <v-toolbar-side-icon></v-toolbar-side-icon>

    <v-toolbar-title class="white--text">
      <span class="home" @click="navigateTo({name: 'root'})">
      LHSC Cardiology Referrals
      </span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>

    </v-toolbar-items>

    <v-toolbar-items>
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
        <v-btn  v-if="!$store.state.isUserLoggedIn"
          flat
          dark
          @click="navigateTo('register')">
            Register
        </v-btn>
        <v-btn  v-if="$store.state.isUserLoggedIn"
          flat
          dark
          @click="logout">
          Log Out
        </v-btn>
    </v-toolbar-items>

    <v-btn icon
      v-if="!$store.state.isUserLoggedIn"
      click="navigateTo('register')">
      <v-icon>account_box</v-icon>
    </v-btn>

    <div
      v-if="$store.state.isUserLoggedIn"
      class="headerElement">
      <v-icon>account_box</v-icon><span class="headerElementSpan">{{$store.state.user.email}}</span>
    </div>

    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>

export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser, null')
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
  line-height: 1;
  vertical-align: text-top;
}
</style>
