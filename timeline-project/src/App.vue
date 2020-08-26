<template>
  <v-app>
    <v-main>
      <StatusBarCard @remove-all-publications='removeAllPublications'></StatusBarCard>
      <div class='publications-container'>
        <div v-for='(pub, i) in publications' :key='i'>
          <PublicationCard 
            :textProp="pub.text" 
            :imgProp="pub.img" 
            @remove-single-publication='removeSinglePublication'></PublicationCard>
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
    removeAllPublications: function () {
      this.publications = []
    },
    removeSinglePublication: function (text, img) {
      let i = 0
      for (let p of this.publications) {
        if (p.text === text && p.img === img) {
          break
        }
        i++
      }
      this.publications.splice(i, 1)
    }
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
