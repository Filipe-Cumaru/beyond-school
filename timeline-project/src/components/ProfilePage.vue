<template>
  <v-main>
      <div class="statusbar-container">
        <StatusBarCard :enableGoBackButtonProp="true"></StatusBarCard>
      </div>
      <!-- Inserção das publicações do usuário. -->
      <div 
        v-if="getUserPublicStatus($route.params.name)"
        class='publications-container'>
        <div v-for='(pub, i) in $store.getters.getPublicationsFromUser($route.params.name)' :key='i'>
          <PublicationCard 
            :textProp="pub.text" 
            :imgProp="pub.img"
            :userProp="pub.user" ></PublicationCard>
        </div>
      </div>
      <div v-else class="warning-container">
          <v-card-title>Este perfil é privado.</v-card-title>
      </div>
  </v-main>
</template>

<script>
import PublicationCard from "./PublicationCard.vue"
import StatusBarCard from "./StatusBarCard.vue"
import { mapGetters } from 'vuex'
export default {
  components: {
    PublicationCard,
    StatusBarCard
  },
  computed: {
      ...mapGetters('userManagement', ['getUserPublicStatus'])
  }
}
</script>

<style>
  .publications-container {
    width: 100%;
    padding-top: 64px;
    padding-bottom: 56px;
    margin-top: 0;
  }
  .warning-container {
    width: 100%;
    padding-top: 0px;
    padding-bottom: 56px;
    margin-top: 64px;
  }
  .statusbar-container {
    width: 100%;
    padding-top: 64px;
    padding-bottom: 0px;
  }
</style>