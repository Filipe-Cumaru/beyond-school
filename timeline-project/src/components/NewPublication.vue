<template>
    <v-card outline>
        <!-- Caixa de texto para a entrada. -->
        <v-textarea
            v-model='newPublicationText'
            placeholder="No que você está pensando?">
        </v-textarea>
        <!-- Componente para a seleção do arquivo de imagem. -->
        <v-file-input 
            prepend-icon='mdi-image'
            :chips='true'
            placeholder='Clique para selecionar imagem'
            @change="setNewPublicationImage"></v-file-input>
        <!-- Botão para confirmar a publicação do post. -->
        <v-btn @click="addNewPublication">
            <v-icon>mdi-check</v-icon>
        </v-btn>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            // Texto da publicação.
            newPublicationText: '',
            // Dados da imagem da publicação.
            newPublicationImg: undefined
        }
    },
    methods: {
        // Método para adicionar uma nova publicação ao store.
        addNewPublication: function () {
            if (this.newPublicationText !== '' || this.newPublicationImg !== undefined) {
                this.$store.dispatch('addPublication', { text: this.newPublicationText, img: this.newPublicationImg })
                this.newPublicationText = ''
                this.newPublicationImg = undefined
            }
        },
        // Método para carregar uma nova imagem.
        setNewPublicationImage: function (file) {
            // Se uma imagem foi selecionada...
            if (file !== undefined) {
                // ... o arquivo é lido como base64 e o valor é
                // repassado ao componente pai usando o localStorage.
                var reader = new FileReader()
                reader.readAsDataURL(file)
                this.newPublicationImg = file.name
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