<template>
    <v-app-bar fixed>
        Passarinho
        <v-btn @click="emitRemoveAllPublications">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    methods: {
        emitRemoveAllPublications: function () {
            this.$emit('remove-all-publications')
        }
    }
}
</script>