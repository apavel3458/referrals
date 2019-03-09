/* eslint-disable vue/valid-template-root */
<template>
<v-layout>
  <v-flex xs12 md8 offset-md2 wrap>
    <panel title="View Referral" alignCenter="true" color="white" class="panel">
      <summary-view :patient="referral"></summary-view>
    </panel>
  </v-flex>
</v-layout>
</template>

<script>
import ReferralService from '@/services/ReferralService'
import Panel from '@/components/Panel'
import SummaryView from '@/components/referral/SummaryView'

export default {
  data () {
    return {
      referral: {}
    }
  },
  components: { Panel, SummaryView },
  async mounted () {
    const referralId = this.$store.state.route.params.referralId
    this.referral = (await ReferralService.show(referralId)).data
    // console.log(this.referral)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel {
  background-color: white;
}
</style>
