<template>
  <v-main>
    <v-dialog v-model="existentEmailDialog" max-width='600px'>
        <v-container class="grey lighten-5">
            <h3>E-mail já cadastrado.</h3>
        </v-container>
    </v-dialog>

    <v-dialog v-model="newAccountDialog" persistent scrollable max-width="600px">
    <v-container class="grey lighten-5">
      <v-text-field 
        v-model="newAccountEmail"
        label="E-mail"
        :rules='[rules.required]'>
      </v-text-field>
      <v-text-field
        v-model="newAccountPassword"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        :rules='[rules.required, rules.min]'
        label="Senha"
        @click:append="showPassword = !showPassword">
      </v-text-field>
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
        newAccountPassword: '',
        rules: {
            min: v => v.length >= 6 || 'A senha deve conter pelo menos 6 caracteres',
            required: value => !!value || 'Campo obrigatório'
        },
        existentEmailDialog: false
    }),
    methods: {
        loginWithEmail: function () {

        },
        createNewAccount: async function () {
            const info = await this.$store.dispatch('userManagement/createNewAccount', 
                { email: this.newAccountEmail, password: this.newAccountPassword })
            if (info.success) {
                this.newAccountEmail = ''
                this.newAccountPassword = ''
                this.newAccountDialog = false
            }
            else if (info.errorCode === 'auth/email-already-in-use') {
                this.existentEmailDialog = true
            }
        },
        loginWithGoogle: function () {

        }
    }
}
</script>

<style>

</style>