<template>
  <v-app>
    <v-main>
      <StatusBarCard></StatusBarCard>
      <div class='publications-container'>
        <div v-for='(pub, i) in publications' :key='i'>
          <PublicationCard :textProp="pub.text" :imgProp="pub.img"></PublicationCard>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import PublicationCard from "./components/PublicationCard.vue"
// import NewPublicationScreen from "./components/NewPublicationScreen.vue"
import StatusBarCard from "./components/StatusBarCard.vue"
export default {
  components: {
    PublicationCard,
    // NewPublicationScreen,
    StatusBarCard
  },
  data() {
    return {
      publications: [
        { text: 'dale', img: '../assets/logo.png' },
        { text: 'uma publi massa', img: undefined }
      ]
    }
  },
  methods: {

  },
  computed: {

  }
}
</script>

<style>
  .publications-container {
    width: 100%;
    padding-top: 64px;
    padding-bottom: 56px;
  }
</style>
