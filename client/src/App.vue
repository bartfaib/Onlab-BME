<template>
  <div id="app">
 <v-toolbar dark>
        <v-toolbar-title> Melyiket Vegyem?</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat to="/kereses">Keresés</v-btn>
          <v-btn flat to="/login">Bejelentkezés</v-btn>
          <v-btn flat to="/register">Regisztráció</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
