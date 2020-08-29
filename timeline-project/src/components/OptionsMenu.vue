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
          <v-icon v-else>mdi-menu-open</v-icon>
        </v-btn>
      </template>
    
    <!-- Botão de acesso à página do perfil do usuário. -->
    <!-- REFACTOR: Tornar acesso à página do perfil dinâmico, i.e.,
        dependente do nome do usuário logado. -->
      <v-btn 
        fab
        small
        @click='$router.push(`/profile/Eu`)'>
        <v-icon>mdi-account</v-icon>
      </v-btn>

    <!-- Botão para a publicação de um novo post.-->
      <v-btn
          fab
          small
          @click="emitOpenNewPublicationDialog">
          <v-icon>mdi-pencil-plus-outline</v-icon>
      </v-btn>

      <!-- Botão para a remoção de todas publicações na linha do tempo. -->
      <v-btn 
        fab
        small
        @click="emitOpenRemoveAllPublicationsDialog">
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>

      <!-- Botão para alternar entre o modo escuro/claro. -->
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
    emitOpenRemoveAllPublicationsDialog: function () {
      this.$emit('remove-all-publications-dialog')
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