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
                    <v-list-item v-if="userProp === getName" @click="dialog = true">
                        Editar publicação
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-card-title>
        <v-card-text>{{ textProp }}</v-card-text>
        <!-- Componente para a exibição da imagem, se existente. -->
        <v-img v-if='imgProp != ""'
            :src='imgURL'
            height='100%'
            width='100%'></v-img>
    </v-card>
    </v-main>
</template>

<script>
import { storage } from '../firebase'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            // Texto modificado, caso edição.
            modifiedText: this.$props.textProp,
            // Flag para ativar/desativar a caixa de diálogo de edição.
            dialog: false,
            imgURL: undefined
        }
    },
    computed: {
        ...mapGetters('userManagement', ['getName'])
    },
    props: ['textProp', 'imgProp', 'userProp'],
    methods: {
        // Método para a remoção de uma única publicação.
        removeSinglePublication: function () {
            this.$store.dispatch('removeSinglePublication', [this.$props.textProp, this.$props.imgProp])
        },
        saveModifiedText: async function () {
            await this.$store.dispatch('editPublicationText', {
                oldText: this.$props.textProp, 
                newText: this.modifiedText,
                img: this.$props.imgProp,
                name: this.$props.userProp
            })
            this.dialog = false
        },
        openProfilePage: function (username) {
            this.$router.push(`/profile/${username}/${false}`)
        }
    },
    async created() {
        if (this.$props.imgProp !== '') {
            const url = await storage.ref().child(this.$props.imgProp).getDownloadURL()
            this.imgURL = url
        }
    }
}
</script>