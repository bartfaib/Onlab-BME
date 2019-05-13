
<template>
  <div class="PCs">
    <v-card >
      <v-card-title>
        Számítógépek a rendszerben
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="PCs"
        :search="search"
        class="elevation-1"
      >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.id}}</td>
        <td class="text-xs-left">{{ props.item.brand }}</td>
        <td class="text-xs-left">{{ props.item.cpu }}</td>
        <td class="text-xs-left">{{ props.item.memory }}</td>
        <td class="text-xs-left">{{ props.item.type }}</td>
        <td class="text-xs-left">{{ props.item.vga }}</td>
        <td class="text-xs-left">{{ props.item.score }}</td>
      </template>
        <template v-slot:no-data>
        <v-alert :value="true" color="red" icon="warning">
          Sajnos még üres a táblázat :(
        </v-alert>
        </template>
      </v-data-table>
    </v-card>
    <div>
      <v-card>
      Jelenleg {{PCs.length}} van a renszerben.<br /><br />
      </v-card>
    </div>
  </div>
</template>

<script>
import PCsService from '@/services/PCService'
export default {
  name: 'PCs',
  data () {
    return {
      search: '',
      headers: [
        { text: 'Azonosító', value: 'id' },
        { text: 'Márka', value: 'brand' },
        { text: 'Cpu Típus', value: 'cpu' },
        { text: 'Memória', value: 'memory' },
        { text: 'Típus', value: 'type' },
        { text: 'Videókártya', value: 'vga' },
        { text: 'Pont', value: 'score' }
      ],
      PCs: []
    }
  },
  mounted () {
    console.log('nemjó')
    this.getPC()
  },
  methods: {
    async getPC () {
      const response = await PCsService.fetchPC()
      this.PCs = response.data.PCs
    },
    async deletePC (id) {
      await PCsService.deletePC(id)
      this.$router.push({ name: 'PCs' })
      this.getPC()
    }
  }
}
</script>
