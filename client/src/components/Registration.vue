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
        <v-card-title class="title font-weight-regular">Regisztráció</v-card-title>
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
      >
        <v-text-field
          v-model="email"
          :rules="[rules.email]"
          box
          label="Email cím"
          type="email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="[rules.password]"
          box
          label="Jelszó"
          style="min-height: 96px"
          type="password"
        ></v-text-field>

        <v-text-field
          v-model="repassword"
          :rules="passwordConfirmation"
          box
          label="Jelszó megerősítése"
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
          @click="addUser"
        >Regisztráció</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
export default {
  data: () => ({
    email: undefined,
    form: false,
    isLoading: false,
    password: undefined,
    repassword: undefined,
    rules: {
      email: v => !!(v || '').match(/@/) || 'Kérlek létező e-mail címet adj meg.',
      length: len => v => !!(v || '').length >= len || `Túl rövid: ${len}`,
      password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
        'A jelszónak tartalmaznia kell kis, nagy és különleges karaktereket!',
      required: v => !!v || 'Ezt ki kell tölteni!'
    }
  }),
  computed: {
    passwordConfirmation () {
      return [
        () => (this.password === this.repassword) || 'Egyeznie kell a két jelszónak!',
        v => !!v || 'Ki kell tölteni a mezőt'
      ]
    }
  },
  methods: {
    async addUser () {
      await UserService.addUser({
        username: this.email,
        password: this.password
      })
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
