<template>
  <v-app>
    <v-main>
      <StatusBarCard 
        @remove-all-publications='removeAllPublications'></StatusBarCard>
      <div class="new-publication-container">
        <NewPublication @add-new-publication='addNewPublication'></NewPublication>
      </div>
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
      publications: [
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
    },
    addNewPublication: function (newText, newImg) {
      let newImgData = undefined
      if (newImg != undefined) {
        newImgData = localStorage.getItem(newImg)
      }
      this.publications.push({ text: newText, img: newImgData })
    }
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
