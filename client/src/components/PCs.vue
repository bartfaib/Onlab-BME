
<template>
  <div class="PCs">
    <h1>PCs</h1>
    <div v-if="PCs.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'NewPC' }" class="">Add PC</router-link>
      </div>
      <table>
        <tr>
          <td width="5%">Title</td>
          <td width="15%">Description</td>
          <td width="5%" align="center">Action</td>
        </tr>
        <tr v-for="(PC, index) in PCs" :key="index">
          <td>{{ PC.title }}</td>
          <td>{{ PC.description }}</td>
          <td align="center">
            <router-link v-bind:to="{ name: 'EditPC', params: { id: PC._id } }">Edit</router-link> |
            <a href="#" @click="deletePC(PC._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no PCs.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'NewPC' }" class="add_PC_link">Add PC</router-link>
    </div>
  </div>
</template>

<script>
import PCsService from '@/services/PCService'
export default {
  name: 'PCs',
  data () {
    return {
      PCs: []
    }
  },
  mounted () {
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
<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background:blacky;
  color: #fff;
}
a {
  color: black;
  text-decoration: none;
}
a.add_PC_link {
  background: black;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
