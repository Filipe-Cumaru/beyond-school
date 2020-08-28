<template>
  <div class="text-center">
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
        { icon: 'mdi-account' },
        { icon: 'mdi-pencil-plus-outline' },
        { icon: 'mdi-trash-can-outline' },
        { icon: 'mdi-brightness-6' },
      ]
    }),
}
</script>

<style>

</style>