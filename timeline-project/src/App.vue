<template>
  <v-app>
    <v-main>
      <!-- Componente da barra de status com evento para remoção de
           todas publicações. -->
      <StatusBarCard></StatusBarCard>
      <!-- Componente para a criação de uma nova publicação. -->
      <div class="new-publication-container">
        <NewPublication></NewPublication>
      </div>
      <!-- Inserção das publicações já existentes. -->
      <div class='publications-container'>
        <div v-for='(pub, i) in $store.getters.getPublications' :key='i'>
          <PublicationCard 
            :textProp="pub.text" 
            :imgProp="pub.img" ></PublicationCard>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import PublicationCard from "./components/PublicationCard.vue"
import NewPublication from "./components/NewPublication.vue"
import StatusBarCard from "./components/StatusBarCard.vue"
export default {
  components: {
    PublicationCard,
    NewPublication,
    StatusBarCard
  },
  data() {
    return {
      user: 'Eu'
    }
  },
  methods: {
    
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
