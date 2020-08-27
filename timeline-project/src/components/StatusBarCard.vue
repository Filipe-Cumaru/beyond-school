<template>
    <v-app-bar fixed>
        Passarinho
        <v-btn @click="removeAllPublications">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    methods: {
        removeAllPublications: function () {
            this.$store.dispatch('removeAllPublications')
        }
    }
}
</script>