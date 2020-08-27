<template>
  <v-app>
    <v-main>
      <!-- Componente da barra de status com evento para remoção de
           todas publicações. -->
      <StatusBarCard 
        @remove-all-publications='removeAllPublications'></StatusBarCard>
      <!-- Componente para a criação de uma nova publicação. -->
      <div class="new-publication-container">
        <NewPublication @add-new-publication='addNewPublication'></NewPublication>
      </div>
      <!-- Inserção das publicações já existentes. -->
      <div class='publications-container'>
        <div v-for='(pub, i) in publications' :key='i'>
          <PublicationCard 
            :textProp="pub.text" 
            :imgProp="pub.img" 
            @remove-single-publication='removeSinglePublication'
            @modified-text='modifyText'></PublicationCard>
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
      publications: []
    }
  },
  methods: {
    // Método para a remoção de todas as publicações.
    removeAllPublications: function () {
      this.publications = []
    },
    // Método para a remoção de uma única publicação.
    removeSinglePublication: function (text, img) {
      let i = 0
      // Procura-se a publicação do array publications
      // cujo conteúdo é o mesmo dos argumentos text e img.
      for (let p of this.publications) {
        if (p.text === text && p.img === img) {
          break
        }
        i++
      }
      this.publications.splice(i, 1)
    },
    // Adiciona uma nova publicação.
    addNewPublication: function (newText, newImg) {
      let newImgData = undefined
      // Se há uma imagem, então ela será recuperada do localStorage.
      if (newImg != undefined) {
        newImgData = localStorage.getItem(newImg)
      }
      this.publications.push({ text: newText, img: newImgData })
    },
    // Método para a edição do texto de uma publicação já postada.
    modifyText: function (oldText, img, newText) {
      let i = 0
      for (let p of this.publications) {
        if (p.text === oldText && p.img === img) {
          break
        }
        i++
      }
      this.publications[i].text = newText
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
