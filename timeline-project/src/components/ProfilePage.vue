<template>
  <v-main>
      <div class="statusbar-container">
        <StatusBarCard :enableGoBackButtonProp="true"></StatusBarCard>
      </div>
      <!-- Inserção das publicações do usuário. -->
      <div 
        v-if="!userIsPrivate"
        class='publications-container'>
        <div v-for='pub of getPublicationsFromUser' :key='pub.timestamp'>
          <PublicationCard 
            :textProp="pub.text" 
            :imgProp="pub.img"
            :userProp="pub.username" ></PublicationCard>
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
  data: () => ({
    userIsPrivate: false
  }),
  components: {
    PublicationCard,
    StatusBarCard
  },
  computed: {
      ...mapGetters('userManagement', ['getUserPublicStatus']),
      ...mapGetters(['getPublicationsFromUser'])
  },
  async created() {
    await this.$store.dispatch('queryUserPublications', this.$route.params.name)
    const isPrivate = await this.$store.dispatch('queryUserIsPrivate', this.$route.params.name)
    this.userIsPrivate = isPrivate
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