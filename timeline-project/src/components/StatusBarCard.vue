<template>
    <v-app-bar fixed>
        <v-btn icon v-if="enableGoBackButtonProp">
            <v-icon @click='$router.push("/")'>mdi-arrow-left</v-icon>
        </v-btn>
        <v-icon>mdi-cloud</v-icon>
        <v-card-title>BeyondTimeline</v-card-title>
    </v-app-bar>
</template>

<script>
export default {
    props: ['enableGoBackButtonProp'],
}
</script>

<style scoped>

</style>