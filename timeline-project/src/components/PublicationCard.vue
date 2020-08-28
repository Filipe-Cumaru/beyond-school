<template>
    <v-card outlined class='ma-3'>
        <!-- Caixa de diálogo para a edição do texto publicado. -->
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <!-- Botão de edição-->
                <v-btn
                v-bind="attrs"
                v-on="on"
                >
                    <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
            </template>
            <!-- Caixa de texto dentro da caixa de diálogo onde o novo
                texto será digitado. -->
            <v-card>
                <v-card-actions>
                    <v-textarea
                        v-model='modifiedText'
                        placeholder="Digite o novo texto">
                    </v-textarea>
                    <v-btn @click="saveModifiedText">
                        <v-icon>mdi-check</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- Botão para excluir uma publicação -->
        <v-btn @click='removeSinglePublication'>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card-title @click='openProfilePage(userProp)'>
            {{ userProp }}
        </v-card-title>
        <!-- Componente para a exibição da imagem, se existente. -->
        <v-img v-if='imgProp != undefined'
            :src='imgProp'
            height='100%'
            width='100%'></v-img>
        <v-card-text>{{ textProp }}</v-card-text>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            // Texto modificado, caso edição.
            modifiedText: this.$props.textProp,
            // Flag para ativar/desativar a caixa de diálogo de edição.
            dialog: false
        }
    },
    props: ['textProp', 'imgProp', 'userProp'],
    methods: {
        // Método para a remoção de uma única publicação.
        removeSinglePublication: function () {
            this.$store.dispatch('removeSinglePublication', [this.$props.textProp, this.$props.imgProp])
        },
        saveModifiedText: function () {
            this.$store.dispatch('editPublicationText', [this.$props.textProp, this.$props.imgProp, this.modifiedText])
            this.dialog = false
        },
        openProfilePage: function (username) {
            this.$router.push(`/profile/${username}`)
        }
    }
}
</script>