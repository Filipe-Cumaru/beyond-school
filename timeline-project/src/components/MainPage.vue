<template>
  <v-main>
    <!-- Caixa de diálogo para criar uma nova publicação. -->
    <v-dialog v-model="newPulicationDialog" persistent scrollable max-width="600px">
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

    <!-- Componente da barra de status com evento para remoção de
          todas publicações. -->
    <div class="statusbar-container">
      <StatusBarCard :enableGoBackButtonProp="false"></StatusBarCard>
    </div>

    <!-- Inserção das publicações já existentes. -->
    <div class='publications-container'>
      <div v-for='(pub, i) in getPublications' :key='i'>
        <PublicationCard 
          :textProp="pub.text" 
          :imgProp="pub.img"
          :userProp="pub.user"></PublicationCard>
      </div>
    </div>

    <OptionsMenu 
      @open-new-publication-dialog='newPulicationDialog=true'
      @remove-all-publications-dialog='removeAllPublicationsDialog=true'></OptionsMenu>
      
    </v-main>
</template>

<script>
import PublicationCard from "./PublicationCard.vue"
import StatusBarCard from "./StatusBarCard.vue"
import OptionsMenu from './OptionsMenu.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    PublicationCard,
    StatusBarCard,
    OptionsMenu
  },
  data: () => ({
    newPulicationDialog: false,
    removeAllPublicationsDialog: false,
    // Texto da publicação.
    newPublicationText: '',
    // Dados da imagem da publicação.
    newPublicationImg: undefined
  }),
  computed: {
    ...mapGetters(['getPublications']),
    ...mapGetters('darkTheme', ['getEnableDarkTheme'])
  },
  methods: {
    // Método para adicionar uma nova publicação ao store.
    addNewPublication: function () {
      if (this.newPublicationText !== '' || this.newPublicationImg !== undefined) {
        this.$store.dispatch('addPublication', { text: this.newPublicationText, img: this.newPublicationImg })
        this.newPublicationText = ''
        this.newPublicationImg = undefined
      }
      this.newPulicationDialog = false
    },
    // Método para carregar uma nova imagem.
    setNewPublicationImage: function (file) {
      // Se uma imagem foi selecionada...
      if (file !== undefined) {
        // ... o arquivo é lido como base64 e o valor é
        // repassado ao componente pai usando o localStorage.
        var reader = new FileReader()
        reader.readAsDataURL(file)
        this.newPublicationImg = file.name
        reader.onload = function () {
          localStorage.setItem(file.name, reader.result)
        }
        reader.onerror = function (error) {
          console.log(error)
        }
      }
    },
    discardChanges: function () {
      this.newPublicationText = ''
      this.newPublicationImg = undefined
      this.newPulicationDialog = false
    },
    removeAllPublications: function () {
      this.$store.dispatch('removeAllPublications')
      this.removeAllPublicationsDialog = false
    }
  },
  beforeMount() {
    this.$vuetify.theme.dark = this.getEnableDarkTheme
  }
}
</script>

<style>
  .statusbar-container {
    width: 100%;
    padding-top: 64px;
    padding-bottom: 0px;
  }
  .publications-container {
    width: 100%;
    padding-top: 0px;
    padding-bottom: 56px;
    margin: 0;
  }
</style>