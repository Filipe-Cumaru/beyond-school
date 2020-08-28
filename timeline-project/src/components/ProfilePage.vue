<template>
  <v-main>
      <StatusBarCard :enableGoBackButtonProp='true'></StatusBarCard>
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
      ...mapGetters('usersStatus', ['getUserPublicStatus'])
  }
}
</script>

<style>
  .publications-container {
    width: 100%;
    padding-top: 0px;
    padding-bottom: 56px;
    margin-top: 64px;
  }
  .warning-container {
    width: 100%;
    padding-top: 0px;
    padding-bottom: 56px;
    margin-top: 64px;
  }
</style>