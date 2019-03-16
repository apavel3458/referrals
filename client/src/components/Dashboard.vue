<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
       <v-card>
        <v-toolbar color="blue" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>

          <v-toolbar-title>Dashboard</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon @click="searchActive = !searchActive">search</v-icon>
          </v-btn>
          <v-text-field
              v-if="searchActive"
              v-model="searchText"
              label="Search Name, Referring Name"></v-text-field>

          <v-btn icon>
            <v-icon>check_circle</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list two-line>
          <v-list-group
            v-for="(referral, index) in referrals"
            :key="referral.id"
            v-model="referral.active"
            :prepend-icon="referral.action"
            append-icon=""
            no-action
          >

            <template v-slot:activator>
              <v-list-tile
                :key="referral.id"
                ripple
                @click="open(referral)"
                 :class="{item: (index!=referrals.length-1 && activeReferral!=referral)}">
                <v-list-tile-content>
                  <v-list-tile-title>
                    <span class="ptName">{{ referral.lastName }}, {{ referral.firstName }}</span>
                    ({{formatDate(referral.dob)}})
                  </v-list-tile-title>
                  <v-list-tile-sub-title class="text--primary">
                      <span class="subsubtitle">Test: </span>{{referral.testSelected}}
                      <span class="subsubtitle">Referring: </span> {{ referral.referringName }}
                  </v-list-tile-sub-title>
                  <v-list-tile-sub-title>
                      <span class="subsubtitle">Test Date:</span> (Pending)
                      <span class="subsubtitle">Appointment:</span> (Pending)
                  </v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-list-tile-action-text>{{fromNow(referral)}}</v-list-tile-action-text>
                  <div class="actionButtonWrapper">
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn @click.stop="deleteReferral(referral)" icon ripple class="actionButton" v-on="on">
                          <v-icon
                            color="red lighten-3">
                            delete
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Delete</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn :to="{name: 'edit-referral', params: {referralId: referral.id}}" icon ripple v-on="on" class="actionButton">
                          <v-icon
                            color="blue lighten-2">
                            edit
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Edit</span>
                    </v-tooltip>
                  </div>
                </v-list-tile-action>

              </v-list-tile>
            </template>

            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title class="text--primary">
                  <span class="subsubtitle">Attending: </span> {{referral.referringAttending}}
                  <span class="subsubtitle">Contact E-mail:</span>{{referral.referringEmail}}
                </v-list-tile-sub-title>
                <v-list-tile-sub-title class="text--primary">
                  <span class="subsubtitle">Date Seen in ER:</span>{{formatDate(referral.dateSeenInER)}}
                </v-list-tile-sub-title>
                <v-list-tile-sub-title class="text--primary">
                  <span class="subsubtitle">Comments: </span> {{referral.comments}}
                </v-list-tile-sub-title>

              </v-list-tile-content>

              <!--v-list-tile-action>
                <v-icon>delete</v-icon>
              </v-list-tile-action-->
            </v-list-tile>
            <v-divider
            :key="index"></v-divider>
          </v-list-group>

        </v-list>
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ReferralService from '@/services/ReferralService'
import Moment from 'moment'
import _ from 'lodash'

export default {
  data () {
    return {
      referrals: [],
      activeReferral: null,
      searchActive: true,
      searchText: ''
    }
  },
  components: {
  },
  watch: {
    searchText (search) {
      const route = {
        name: 'dashboard'
      }
      if (this.searchText !== '') {
        route.query = {
          search: this.searchText
        }
      }
      this.$router.push(route)
      this.search()
    },
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.searchText = value
      }
    }
  },
  methods: {
    async deleteReferral (obj) {
      if (confirm(`Are you sure you want to delete ${obj.firstName} ${obj.lastName} referral?`)) {
        try {
          // eslint-disable-next-line no-unused-vars
          const result = await ReferralService.delete(obj)
          this.referrals.splice(this.referrals.indexOf(obj), 1)
        } catch (err) {
          alert(`Error deleting entry: ${err}`)
        }
      }
    },
    fromNow (referral) {
      return new Moment(referral.createdAt).fromNow()
    },
    formatDate (d) {
      return new Moment(d).format('YYYY-MM-DD')
    },
    open (ref) {
      this.activeReferral = ref
    },
    search: _.debounce(async function () {
      this.referrals = (await ReferralService.index(this.searchText)).data
    }, 700)

  },
  async mounted () {
    this.referrals = (await ReferralService.index(this.searchText)).data
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error {
  }
  .ptName {
    font-weight: bold;
  }
  .subsubtitle {
    color: #529a52;
    padding-left: 10px;
  }
  .actionButton {

  }
  .actionButtonWrapper {

  }
  .item {
    border-bottom: 1px solid #e4e4e4;
  }
</style>
