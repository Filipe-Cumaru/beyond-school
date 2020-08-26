<template>
    <v-app-bar fixed>
        Facelivro
        <v-btn @click="addNewPublication">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn @click="emitRemoveAllPublications">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    methods: {
        addNewPublication: function () {
            return
        },
        emitRemoveAllPublications: function () {
            this.$emit('remove-all-publications')
        }
    }
}
</script>