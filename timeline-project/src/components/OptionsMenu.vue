<template>
    <!-- Botão flutuante para acessar as opções da aplicação. -->
    <v-speed-dial
      fab
      bottom
      right
      fixed
      v-model="fab"
      :transition="'slide-y-reverse-transition'"
    >
    <!-- Lógica para alternar entre ícones do menu flutuante. -->
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          fab
        >
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
    
    <!-- Botão de acesso à página do perfil do usuário. -->
      <v-btn 
        fab
        small>
        <v-icon>mdi-account</v-icon>
      </v-btn>

    <!-- Botão para a publicação de um novo post.-->
      <v-btn
          fab
          small
          @click="emitOpenNewPublicationDialog">
          <v-icon>mdi-pencil-plus-outline</v-icon>
      </v-btn>

      <v-btn 
        fab
        small
        @click="removeAllPublications">
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>

      <v-btn 
        fab
        small
        @click="changeTheme">
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn>
    </v-speed-dial>
</template>

<script>
export default {
    data: () => ({
      fab: false
    }),
    methods: {
        removeAllPublications: function () {
            this.$store.dispatch('removeAllPublications')
        },
        changeTheme: function () {
            this.$store.dispatch('darkTheme/switchTheme')
        },
        emitOpenNewPublicationDialog: function () {
          this.$emit('open-new-publication-dialog')
        }
    }
}
</script>

<style>
</style>