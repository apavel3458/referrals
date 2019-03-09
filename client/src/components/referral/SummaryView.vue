/* eslint-disable vue/valid-template-root */
<template>
  <div>
  <v-layout wrap align-top>
    <v-flex xs12 md6 class="infoBox">
      <div class="head">
        {{ patient.lastName }}, {{ patient.firstName }}
      </div>
      <div class="subhead">
        <span class="subsubhead"><span class="infoHeader">DOB:</span> {{ patient.dob | moment("YYYY-MM-DD") }}</span>
        <span class="subsubhead"><span class="infoHeader">LHSC PIN:</span>{{ patient.pin }}</span>
      </div>
    </v-flex>
    <v-flex xs12 md6 class="infoBox">
      <div class="head2">
        Referring: {{ patient.referringAttending }}
      </div>
      <div class="subhead">
        <span class="subsubhead"><span class="infoHeader">Referring Name:</span> ({{ patient.referringEmail }})</span>
        <span class="subsubhead"><span class="infoHeader">Date Seen in ER:</span>{{ patient.dateSeenInER | moment("YYYY-MM-DD") }}</span>
      </div>
    </v-flex>

    <v-flex xs12 md6 infoBox>
      <div class="head2">
        {{ patient.testSelected }}
      </div>
      <div class="subhead">
        <span class="subsubhead"><span class="infoHeader">Instructions to follow</span></span>
      </div>
    </v-flex>
    <v-flex xs12 md6 infoBox>
      <div class="head2">
        Comments:
      </div>
      <div class="subhead">
        {{patient.comments}}
      </div>
    </v-flex>

  </v-layout>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
export default {
  components: {Panel},
  props: {
    patient: {
      type: Object,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.infoBox {
  text-align: left;
}
.head {
  font-weight: bold;
  font-size: 1.2rem;
}
.head2 {
  font-weight: bold;
}
.subhead {
  color: grey;
}
.subsubhead {
  white-space: nowrap;
}
.infoHeader {
  font-weight: bold;
  padding-right: 5px;
  padding-left: 5px;
}
.listBox {
  background-color: transparent;
}

</style>
