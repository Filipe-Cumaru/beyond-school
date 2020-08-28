<template>
  <div class="text-right">
    <v-menu top :offset-y="true">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="handleItemClick(item.onclick)"
        >
          <v-list-item-title>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
    data: () => ({
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