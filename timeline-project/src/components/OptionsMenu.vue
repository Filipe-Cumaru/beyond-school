<template>
  <v-main>
    <!-- Caixa de diálogo para apagar todas publicações na linha do tempo. -->
    <v-dialog v-model="removeAllPublicationsDialog" persistent scrollable max-width="600px">
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <h3>Deseja apagar todas as publicações da linha do tempo?</h3>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-btn @click="removeAllPublications">
            Sim
          </v-btn>
        </v-col>
        <v-col class="text-center">
          <v-btn @click="removeAllPublicationsDialog = false">
            Não
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    </v-dialog>

    <!-- Caixa de diálogo para criar uma nova publicação. -->
    <v-dialog v-model="newPublicationDialog" persistent scrollable max-width="600px">
      <v-container class="grey lighten-5">
        <v-textarea
          v-model='newPublicationText'
          placeholder="No que você está pensando?">
        </v-textarea>
        <v-file-input 
          prepend-icon='mdi-image'
          :chips='true'
          placeholder='Clique para selecionar imagem'
          @change="setNewPublicationImage"></v-file-input>
        <v-row>
          <v-col class="text-center">
            <v-btn icon color="red" @click="discardChanges">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
          <v-col class="text-center">
            <v-btn icon color="success" @click="addNewPublication">
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>

    <!-- Botão flutuante para acessar as opções da aplicação. -->
    <v-speed-dial
      fab
      bottom
      right
      fixed
      v-model="fab"
      :transition="'slide-y-reverse-transition'"
    >
    <!-- Lógica para alternar entre ícones do menu flutuante. -->
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          fab
        >
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-menu-open</v-icon>
        </v-btn>
      </template>
    
    <!-- Botão de acesso à página do perfil do usuário. -->
      <v-btn 
        fab
        small
        @click='$router.push(`/profile/${getName}/${true}`)'>
        <v-icon>mdi-account-details</v-icon>
      </v-btn>

    <!-- Botão para a publicação de um novo post.-->
      <v-btn
          fab
          small
          @click="newPublicationDialog=true">
          <v-icon>mdi-pencil-plus-outline</v-icon>
      </v-btn>

      <!-- Botão para a remoção de todas publicações na linha do tempo. -->
      <v-btn 
        fab
        small
        @click="removeAllPublicationsDialog=true">
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>

      <!-- Botão para alternar entre o modo escuro/claro. -->
      <v-btn 
        fab
        small
        @click="changeTheme">
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    fab: false,
    newPublicationDialog: false,
    removeAllPublicationsDialog: false,
    // Texto da publicação.
    newPublicationText: '',
    // Dados da imagem da publicação.
    newPublicationImg: ''
  }),
  methods: {
    changeTheme: function () {
      this.$store.dispatch('darkTheme/switchTheme')
    },
    // Método para adicionar uma nova publicação ao store.
    addNewPublication: async function () {
      if (this.newPublicationText !== '' || this.newPublicationImg !== '') {
        const publication = {
          text: this.newPublicationText,
          img: this.newPublicationImg,
          timestamp: Date.now(),
          username: this.getName
        }
        const success = this.$store.dispatch('addPublication', publication)
        if (success) {
          this.newPublicationText = ''
          this.newPublicationImg = ''
        }
      }
      this.newPublicationDialog = false
    },
    // Método para carregar uma nova imagem.
    setNewPublicationImage: function (file) {
      this.newPublicationImg = file
    },
    discardChanges: function () {
      this.newPublicationText = ''
      this.newPublicationImg = undefined
      this.newPublicationDialog = false
    },
    removeAllPublications: function () {
      this.$store.dispatch('removeAllPublications')
      this.removeAllPublicationsDialog = false
    }
  },
  computed: {
    ...mapGetters('userManagement', ['getName'])
  }
}
</script>

<style>
</style>