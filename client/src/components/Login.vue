<template>
  <div>
    <v-card
      class="mx-auto"
      style="max-width: 500px;"
    >
      <v-system-bar
        dark
      >
        <v-spacer></v-spacer>
      </v-system-bar>
      <v-toolbar
        cards
        dark
        flat
      >
        <v-card-title class="title font-weight-regular">Bejelentkezés</v-card-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form
        ref="form"
        v-model="form"
        @submit="onSubmit"
      >
        <v-text-field
          v-model="email"
          :rules="[rules.required]"
          box
          label="Email address"
          type="email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="[rules.required]"
          box
          label="Password"
          style="min-height: 96px"
          type="password"
        ></v-text-field>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          flat
          @click="$refs.form.reset()"
        >
          Törlés
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!form"
          :loading="isLoading"
          class="white--text"
          depressed
          color="black"
          @click="onSubmit"
        >Bejelentkezes</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
import axios from 'axios'
export default {
  data: () => ({
    email: undefined,
    form: false,
    isLoading: false,
    password: undefined,
    rules: {
      required: v => !!v || 'Kötelező kitölteni.'
    }
  }),
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      var email = this.email
      var password = this.password
      var user = { email, password }
      axios.post(`http://localhost:8081/users`, user)
        .then(response => {
          localStorage.setItem('jwtToken', response.data.token)
          this.$router.push({
            name: 'PCs'
          })
        })
        .catch(e => {
          console.log(e)
          this.errors.push(e)
        })
    },
    async getUser () {
      const response = await UserService.fetchUser()
      return response.data.User
    },
    login () {
      var Users = this.getUser()
      console.log(Users)
      for (var i = 0; i < Users.length; i++) {
        if (Users.getUser[i].username === this.email && Users[i].password === this.password) {
          console.log('BEJELENTKEZVE')
          return true
        }
      }
      console.log('Sikerltelen belépés')
      return false
    }
  }
}
</script>
