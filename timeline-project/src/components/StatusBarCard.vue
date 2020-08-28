<template>
    <v-app-bar fixed>
        <v-btn v-if="enableGoBackButtonProp">
            <v-icon @click='$router.push("/")'>mdi-arrow-left</v-icon>
        </v-btn>
        <v-card-title>BeyondTimeline</v-card-title>
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
    props: ['enableGoBackButtonProp'],
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

<style scoped>

</style>