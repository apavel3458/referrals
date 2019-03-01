<template>
  <v-toolbar dense dark color="primary">
    <v-toolbar-side-icon></v-toolbar-side-icon>

    <v-toolbar-title class="white--text">
      <span class="home" @click="navigateTo({name: 'root'})">
      Cardiology Referral Site
      </span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- TODO: Implement or remove -->
    <!--v-toolbar-items>
      <v-btn flat dark>
        Browse
      </v-btn>
    </v-toolbar-items-->

    <v-toolbar-items>
        <v-btn flat dark @click="navigateTo('login')">
          Login
        </v-btn>
        <v-btn flat dark @click="navigateTo('register')">
          Sign Up
        </v-btn>
    </v-toolbar-items>

    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>refresh</v-icon>
    </v-btn>

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
</style>
