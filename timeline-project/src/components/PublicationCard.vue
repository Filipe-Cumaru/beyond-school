<template>
    <v-card outlined class='ma-3'>
        <!-- FIXME: Display image -->
        <v-btn>
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <img v-if='imgProp != undefined' src=''>
        <v-card-text>{{ textProp }}</v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['textProp', 'imgProp']
}
</script>