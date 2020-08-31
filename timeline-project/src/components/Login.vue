<template>
  <v-main>
    <v-dialog v-model="errorDialog" max-width='600px'>
        <v-container class="grey lighten-5">
            <h3>{{ errorMessage }}</h3>
        </v-container>
    </v-dialog>

    <v-dialog v-model="newAccountDialog" persistent scrollable max-width="600px">
    <v-container class="grey lighten-5">
      <v-text-field
        v-model="newAccountName"
        label="Nome do usuário"
        :rules='[rules.required]'>
      </v-text-field>
      <v-checkbox
        v-model="newAccountPrivate"
        label="Perfil privado"
        hint="Se selecionado, seu perfil não será visto pelos outros usuários."
        :persistent-hint='true'>
      </v-checkbox>
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

    <v-img class="center" width="80px" height="55px" src="../assets/beyond_logo.png"></v-img>

    <h2 class="text-center">BeyondTimeline</h2>

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
        newAccountName: '',
        newAccountPrivate: false,
        rules: {
            min: v => v.length >= 6 || 'A senha deve conter pelo menos 6 caracteres',
            required: value => !!value || 'Campo obrigatório'
        },
        errorDialog: false,
        errorMessage: ''
    }),
    methods: {
        loginWithEmail: async function () {
            const info = await this.$store.dispatch('userManagement/loginWithEmail', 
                { email: this.email, password: this.password })
            console.log(info)
            if (info.success) {
                this.email = ''
                this.password = ''
                this.$router.push('/mainpage')
            }
            else if (info.errorCode === 'auth/wrong-password' || info.errorCode === 'auth/user-not-found') {
                this.errorDialog = true
                this.errorMessage = 'E-mail ou senha incorreta'
            }
        },
        createNewAccount: async function () {
            const info = await this.$store.dispatch('userManagement/createNewAccount', 
                { email: this.newAccountEmail, 
                  password: this.newAccountPassword, 
                  name: this.newAccountName,
                  isPrivate: this.newAccountPrivate })
            if (info.success) {
                this.newAccountEmail = ''
                this.newAccountPassword = ''
                this.newAccountName = ''
                this.newAccountDialog = false
            }
            else if (info.errorCode === 'auth/email-already-in-use') {
                this.errorDialog = true
                this.errorMessage = 'E-mail já cadastrado'
            }
            else if (info.errorCode === 'firebase') {
              this.errorDialog = true
              this.errorMessage = 'Problema no registro da conta no servidor. Tente novamente.'
            }
        },
        loginWithGoogle: async function () {
            const info = await this.$store.dispatch('userManagement/loginWithGoogle')
            if (info.success) {
                this.email = ''
                this.password = ''
                this.$router.push('/mainpage')
            }
            else {
                console.log(info)
            }
        }
    }
}
</script>

<style>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>