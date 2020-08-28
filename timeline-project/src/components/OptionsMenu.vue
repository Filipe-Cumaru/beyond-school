<template>
    <v-card>
    <v-speed-dial
      fab
      bottom
      right
      fixed
      v-model="fab"
      :transition="'slide-y-reverse-transition'"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          fab
        >
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-btn 
        fab
        small
        @click="handleItemClick(item.onclick)"
        v-for="(item, index) in this.items" :key=index>
        <v-icon> {{ item.icon }} </v-icon>
      </v-btn>
    </v-speed-dial>
    </v-card>
</template>

<script>
export default {
    data: () => ({
      fab: false,
      items: [
        { icon: 'mdi-account', onclick: 1},
        { icon: 'mdi-pencil-plus-outline', onclick: 2},
        { icon: 'mdi-trash-can-outline', onclick: 3},
        { icon: 'mdi-brightness-6', onclick: 4},
      ]
    }),
    methods: {
        handleItemClick: function (key) {
            switch (key) {
                case 3:
                    this.removeAllPublications()
                    break;
                case 4:
                    this.changeTheme()
                    break;
                default:
                    break;
            }
        },
        removeAllPublications: function () {
            this.$store.dispatch('removeAllPublications')
        },
        changeTheme: function () {
            this.$store.dispatch('darkTheme/switchTheme')
        }
    }
}
</script>

<style>
</style>