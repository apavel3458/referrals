/* eslint-disable vue/valid-template-root */
<template>
<div>bah</div>
</template>

<script>
import Moment from 'moment'
export default {
    methods: {
        formatDate (d) {
            const ndate = new Moment(d)
            if (!ndate.isValid()) {
                return '---'
            } else {
                return ndate.format('YYYY-MM-DD')
            }
        },
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
