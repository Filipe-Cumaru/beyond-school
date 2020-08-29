<template>
    <v-main>
    <!-- Caixa de diálogo para a edição do texto publicado. -->
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-container class="grey lighten-5">
        <v-textarea
          v-model='modifiedText'
          placeholder="Digite o novo texto">
        </v-textarea>
        <v-row>
          <v-col class="text-center">
            <v-btn icon color="red" @click="dialog = false; modifiedText = textProp">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
          <v-col class="text-center">
            <v-btn icon color="success" @click="saveModifiedText">
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
    <v-card outlined class='ma-3'>
        <v-card-title @click='openProfilePage(userProp)'>
            <v-icon>mdi-account-circle</v-icon>
            {{ userProp }}
            <v-spacer></v-spacer>
            <v-menu bottom offset-y close-on-click>
                <template v-slot:activator="{on, attrs}">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item @click="removeSinglePublication">
                        Ocultar publicação
                    </v-list-item>
                    <v-list-item @click="dialog = true">
                        Editar publicação
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-card-title>
        <v-card-text>{{ textProp }}</v-card-text>
        <!-- Componente para a exibição da imagem, se existente. -->
        <v-img v-if='imgProp != undefined'
            :src='imgProp'
            height='100%'
            width='100%'></v-img>
    </v-card>
    </v-main>
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