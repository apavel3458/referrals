<template>
<div>
    <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-text-field label="First Name" required v-model="user.firstName"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  label="Last Name"
                  required
                  v-model="user.lastName"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email*" required v-model="user.email"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" type="password" v-model="user.password"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
</div>
</template>

<script>

export default {
    props: {
        user: {
            type: Object,
            required: true
        }
  },
    data() {
        return {
            
        }
    },
    watchers: {
    },
    methods: {
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
