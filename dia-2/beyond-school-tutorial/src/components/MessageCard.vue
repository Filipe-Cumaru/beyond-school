<template>
    <v-card outlined class='ma-3' 
        :class='{"teal accent-4": messageProp.user == "friend", "grey lighten-2": messageProp.user != "friend"}'>
        <v-card-subtitle class="font-weight-bold">{{ messageProp.user == 'friend' ? nameProp : 'Eu' }}</v-card-subtitle>
        <v-card-text>{{ messageProp.text }}</v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['nameProp', 'messageProp']
}
</script>