<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm8 offset-sm2>
              <v-card>
        <v-toolbar color="blue" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>

          <v-toolbar-title>Dashboard</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>check_circle</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list two-line>
          <template v-for="(referral, index) in referrals">
            <v-list-tile
              :key="referral.id"
              avatar
              ripple
              @click="open(referral)">
              <v-list-tile-content>
                <v-list-tile-title>{{ referral.lastName }}, {{ referral.firstName }} ({{referral.dob}})</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">Referring Name: {{ referral.referringName }} E-mail: {{referral.referringEmail}}</v-list-tile-sub-title>
                <v-list-tile-sub-title>Seen: {{ referral.dateSeenInER }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text>Test</v-list-tile-action-text>
                <v-icon
                  color="grey lighten-1"
                >
                  star_border
                </v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider
              v-if="index + 1 < referrals.length"
              :key="'d-' + index"
            ></v-divider>
          </template>
        </v-list>
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Panel from '@/components/Panel'
import ReferralService from '@/services/ReferralService'
export default {
  data () {
    return {
      referrals: [],
      activeReferral: null
    }
  },
  components: {
    Panel
  },
  watch: {
    referrals (newval) {
      let tt = ''
      newval.forEach((nn) => {
        tt = tt + nn.id
      })
      alert(tt)
    }
  },
  methods: {
    async login () {
    },
    open (ref) {
      this.activeReferral = ref
    }
  },
  async mounted () {
    this.referrals = (await ReferralService.index()).data
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error {
  }
</style>
