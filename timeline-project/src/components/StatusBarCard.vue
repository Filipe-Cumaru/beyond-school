<template>
    <v-app-bar fixed>
        <v-dialog v-model="errorDialog" max-width='600px'>
            <v-container class="grey lighten-5">
                <h3>Erro ao tentar realizar logout. Tente novamente.</h3>
            </v-container>
        </v-dialog>
        <v-btn icon v-if="enableGoBackButtonProp">
            <v-icon @click='$router.push("/")'>mdi-arrow-left</v-icon>
        </v-btn>
        <v-icon>mdi-cloud</v-icon>
        <v-card-title>BeyondTimeline</v-card-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="logout">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    data: () => ({
        errorDialog: false
    }),
    props: ['enableGoBackButtonProp'],
    methods: {
        logout: async function () {
            const success = await this.$store.dispatch('userManagement/logout')
            if (success) {
                this.$router.push('/')
            }
            else {
                this.errorDialog = true
            }
        }
    }
}
</script>

<style scoped>

</style>