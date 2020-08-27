<template>
    <v-card outline>
        <v-textarea
            v-model='newPublicationText'
            placeholder="No que você está pensando?">
        </v-textarea>
        <v-file-input 
            prepend-icon='mdi-image'
            :chips='true'
            @change="setNewPublicationImage"></v-file-input>
        <v-btn @click="emitAddNewPublication">
            <v-icon>mdi-check</v-icon>
        </v-btn>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            newPublicationText: '',
            newPublicationImg: undefined
        }
    },
    methods: {
        emitAddNewPublication: function () {
            if (this.newPublicationText !== '' || this.newPublicationImg !== undefined) {
                this.$emit('add-new-publication', this.newPublicationText, this.newPublicationImg)
                this.newPublicationText = ''
                this.newPublicationImg = undefined
            }
        },
        setNewPublicationImage: function (file) {
            if (file !== undefined) {
                var reader = new FileReader()
                this.newPublicationImg = file.name
                reader.readAsDataURL(file)
                reader.onload = function () {
                    localStorage.setItem(file.name, reader.result)
                }
                reader.onerror = function (error) {
                    console.log(error)
                }
            }
        }
    }
}
</script>