/* eslint-disable vue/valid-template-root */
<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <v-card>
            <v-toolbar color="indigo lighten-1" dark>
                <v-toolbar-side-icon></v-toolbar-side-icon>
                <v-toolbar-title>Users</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-toolbar>

            <v-data-table
            :headers="computedHeaders"
            :items="users"
            :search="search"
            :rows-per-page-items="rowsPerPage"
            class="userTable"
            >

            <template v-slot:headerCell="props" class="pa-0">
                <span class="pa-0">
                    {{ props.header.text }}
                </span>
            </template>
            
            <template v-slot:items="props">
                <td class="text-xs-center pa-0" :class="{inactive:!props.item.active}">{{ props.item.firstName }}</td>
                <td class="text-xs-center pa-0" :class="{inactive:!props.item.active}">{{ props.item.lastName }}</td>
                <td class="text-xs-center pa-0" :class="{inactive:!props.item.active}">{{ props.item.email }}</td>
                <td class="text-xs-center pa-0" :class="{inactive:!props.item.active}" v-if="!$vuetify.breakpoint.smAndDown">{{ formatDate(props.item.lastLogin) }}</td>
                <td class="text-xs-center pa-0" :class="{inactive:!props.item.active}">
                    <v-btn :class="[{activate:props.item.active}]"
                     fab small outline color="purple lighten-2" 
                     v-if="!props.item.active"
                     class="ma-0 pa-0" @click="toggleDisableUser(props.item)">
                        <v-icon>
                            remove_circle
                        </v-icon>
                    </v-btn>
                    <v-btn :class="[{activate:props.item.active}]"
                     fab small outline color="green lighten-2" 
                     v-if="props.item.active"
                     class="ma-0 pa-0" @click="toggleDisableUser(props.item)">
                        <v-icon>
                            text_format
                        </v-icon>
                    </v-btn>
                </td>
                <td class="text-xs-center pa-0 text-no-wrap" :class="{inactive:!props.item.active}">

                    <v-btn small fab outline color="blue lighten-2" @click="editUserDialog(props.item)">
                        <v-icon>
                            build
                        </v-icon>
                    </v-btn>
                    
                    <v-btn small fab outline color="red lighten-3" class="ma-0 pa-0" icon @click="deleteUser(props.item)">
                          <v-icon>
                            delete
                          </v-icon>
                    </v-btn>
            </td>
            </template>
            <v-alert v-slot:no-results :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
            </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>

                        <v-dialog v-model="dialog" persistent max-width="600px">
                        <v-card>
                            <v-card-title>
                            <span class="headline">Edit User: {{dialogUser.id}}</span>
                            </v-card-title>
                            <v-card-text>
                                <user-edit v-bind:user="dialogUser"></user-edit>
                            </v-card-text>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" flat @click="updateUser(dialogUser)">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

  </v-container>

</template>

<script>
import UserService from '@/services/UserService'
import Moment from 'moment'
import UserEdit from './UserEdit'

export default {
    components: {UserEdit},
    data() {
        return {
            search: '',
            dialog: false,
            dialogUser: {},
            users: [],
            headers: [
                { text: 'Last Name', value: 'lastName' },
                {
                    text: 'First Name',
                    align: 'left',
                    sortable: true,
                    value: 'firstName'
                },
                { text: 'E-Mail', value: 'email', align: 'center'},
                { text: 'Last Login', value: 'lastLogin', align: 'center', hide: 'smAndDown'},
                { text: 'Active?', value: 'active', align: 'center', width: 20},
                { text: 'Actions', value: 'actions', align: 'center'}
            ],
            rowsPerPage: [10,20,25, {"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}]
        }
    },
    computed: {
        computedHeaders () {
            return this.headers.filter(h => !h.hide || !this.$vuetify.breakpoint[h.hide])  
        }
    },
    methods: {
        formatDate (d) {
            const ndate = new Moment(d)
            if (!ndate.isValid()) {
                return '---'
            } else {
                return ndate.format('YYYY-MM-DD')
            }
        },
        async toggleDisableUser (user) {
            const action = user.active?'BLOCK': 'ACTIVATE'
            if (!confirm(`Are you sure you want to ${action} ${user.firstName} ${user.lastName} (${user.email})`)) {
                return
            }
            const index = this.users.indexOf(user)
            const selected = this.users[index]
            selected.active = !selected.active
            selected.loginAttempts = 0
            try {
                if ((await UserService.put(selected)).data.error) {
                    throw new Error("Server Error")
                }
            } catch (err) {
                alert("Error on page: " + err)
                selected.active = !selected.active //change it back
            }
        },
        async updateUser(user) {
            try {
                if ((await UserService.put(user)).data.error) {
                    throw new Error("Server Error")
                }
            } catch (err) {
                alert("Error on page: " + err)
                this.dialog = false
                await this.loadData()
            }
            this.dialog = false
        },
        async deleteUser(user) {
            if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName} (${user.email})?`)) {
                try {
                    const reply = (await UserService.delete(user)).data
                    if (reply.error) {
                        throw new Error("Server Error: " + reply.error)
                    }
                    this.users.splice(this.users.indexOf(user), 1)
                } catch (err) {
                    alert("Error on page: " + err)
                    await this.loadData()
                }
            }
        },
        editUserDialog(user) {
            this.dialogUser = user
            this.dialog = true
        },
        async loadData() {
            this.users = (await UserService.index(this.search)).data
        },


    },
    async mounted() {
        await this.loadData()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userTable >>> th {
    padding: 0px;
}
.inactive {
    background-color: rgb(255, 246, 240);
    color: #afafaf;
}
</style>
