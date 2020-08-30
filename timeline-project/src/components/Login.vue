<template>
  <v-main>
    <v-dialog v-model="newAccountDialog" persistent scrollable max-width="600px">
    <v-container class="grey lighten-5">
      <v-text-field v-model="newAccountEmail" label="E-mail"></v-text-field>
      <v-text-field
        v-model="newAccountPassword"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        label="Senha"
        @click:append="showPassword = !showPassword"
      ></v-text-field>
      <v-row>
        <v-col class="text-center">
          <v-btn icon color="success" @click="createNewAccount">
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-col>
        <v-col class="text-center">
          <v-btn icon color="red" @click="newAccountDialog=false; newAccountEmail=''; newAccountPassword=''">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    </v-dialog>

    <v-img src="../assets/beyond_logo.png"></v-img>

    <v-text-field v-model="email" label="E-mail"></v-text-field>

    <v-text-field
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        label="Senha"
        @click:append="showPassword = !showPassword"
    ></v-text-field>

    <v-btn @click="loginWithEmail">Entrar</v-btn>

    <v-btn text @click="newAccountDialog = true">Cadastre-se</v-btn>

    <v-btn icon @click="loginWithGoogle">
        <v-icon>mdi-google</v-icon>
    </v-btn>

  </v-main>
</template>

<script>
export default {
    data: () => ({
        email: '',
        password: '',
        showPassword: false,
        newAccountDialog: false,
        newAccountEmail: '',
        newAccountPassword: ''
    }),
    methods: {
        loginWithEmail: function () {

        },
        createNewAccount: function () {
            this.$store.dispatch('userManagement/createNewAccount', 
                { email: this.newAccountEmail, password: this.newAccountPassword })
            this.newAccountEmail = ''
            this.newAccountPassword = ''
            this.newAccountDialog = false
        },
        loginWithGoogle: function () {

        }
    }
}
</script>

<style>

</style>