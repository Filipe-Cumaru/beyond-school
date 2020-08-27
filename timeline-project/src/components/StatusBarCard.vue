<template>
    <v-app-bar fixed>
        BeyondTimeline
        <v-btn @click="removeAllPublications">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
        <v-btn @click='changeTheme'>
            <v-icon>mdi-brightness-6</v-icon>
        </v-btn> 
    </v-app-bar>
</template>

<script>
export default {
    methods: {
        removeAllPublications: function () {
            this.$store.dispatch('removeAllPublications')
        },
        changeTheme: function () {
            this.$store.dispatch('darkTheme/switchTheme')
        }
    }
}
</script>