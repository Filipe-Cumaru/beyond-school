<template>
    <v-card outline>
        <v-textarea
            v-model='newPublicationText'
            placeholder="No que você está pensando?">
        </v-textarea>
        <v-btn>
            <v-icon>mdi-image</v-icon>
        </v-btn>
        <v-btn @click="emitAddNewPublication">
            <v-icon>mdi-check</v-icon>
        </v-btn>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            newPublicationText: ''
        }
    },
    methods: {
        emitAddNewPublication: function () {
            this.$emit('add-new-publication', this.newPublicationText)
            this.newPublicationText = ''
        }
    }
}
</script>