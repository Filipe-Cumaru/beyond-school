<template>
  <v-main>
      <!-- Componente da barra de status com evento para remoção de
           todas publicações. -->
      <StatusBarCard :enableGoBackButtonProp="false"></StatusBarCard>
      <!-- Componente para a criação de uma nova publicação. -->
      <div class="new-publication-container">
        <NewPublication></NewPublication>
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
      <OptionsMenu></OptionsMenu>
    </v-main>
</template>

<script>
import PublicationCard from "./PublicationCard.vue"
import NewPublication from "./NewPublication.vue"
import StatusBarCard from "./StatusBarCard.vue"
import OptionsMenu from './OptionsMenu.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    PublicationCard,
    NewPublication,
    StatusBarCard,
    OptionsMenu
  },
  computed: {
    ...mapGetters(['getPublications']),
    ...mapGetters('darkTheme', ['getEnableDarkTheme'])
  },
  beforeMount() {
    this.$vuetify.theme.dark = this.getEnableDarkTheme
  }
}
</script>

<style>
  .new-publication-container {
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