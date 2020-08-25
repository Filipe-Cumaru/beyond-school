<template>
  <v-app>
    <v-main>
      <v-app-bar fixed>
        <v-btn x-large icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        {{ name }}
      </v-app-bar>
      <div class="messages-container">
        <div v-for="(message, i) in messages" :key="i">
          <MessageCard :nameProp='name' :messageProp='message'></MessageCard>
        </div>
      </div>
      <v-app-bar fixed bottom>
        <v-text-field @keyup.enter="send()" v-model='field' label='Digite sua mensagem' solo hide-details></v-text-field>
        <v-btn @click="send()" x-large icon>
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-app-bar>
    </v-main>
  </v-app>
</template>

<script>
  import MessageCard from "./components/MessageCard.vue"
  export default {
    components: {
      MessageCard
    },
    data() {
      return {
        name: 'João',
        messages: [
          { user: 'friend', text: 'bora' },
          { user: 'me', text: 'opa' }
        ],
        field: ''
      }
    },
    methods: {
      send() {
        let message = {
          user: 'me',
          text: this.field
        }
        this.messages.push(message)
        this.field = ''
      }
    }
  }
</script>

<style scoped>
  .messages-container {
    width: 100%;
    padding-top: 64px;
    padding-bottom: 56px;
  }
</style>