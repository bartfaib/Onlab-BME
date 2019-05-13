
<template>
  <div class="PCs">
    <h1>Edit Post</h1>
      <div class="form">
        <div>
          <input type="text" name="title" placeholder="Márka" v-model="brand">
        </div>
        <div>
          <input type="text" name="title" placeholder="CPU" v-model="cpu">
        </div>
        <div>
          <input type="number" name="title" placeholder="Memória" v-model="memory">
        </div>
        <div>
          <input type="text" name="title" placeholder="Típus" v-model="type">
        </div>
        <div>
          <input type="text" name="title" placeholder="Videókártya" v-model="vga">
        </div>
        <div>
          <button class="app_post_btn" @click="updatePC">Update</button>
        </div>
      </div>
  </div>
</template>

<script>
import PCsService from '@/services/PCService'
export default {
  name: 'EditPost',
  data () {
    return {
      brand: '',
      cpu: '',
      memory: '',
      type: '',
      vga: ''
    }
  },
  mounted () {
    this.getPC()
  },
  methods: {
    async getPC () {
      const response = await PCsService.getPC({
        id: this.$route.params.id
      })
      this.brand = response.data.brand
      this.cpu = response.data.cpu
      this.memory = response.data.memory
      this.type = response.data.type
      this.vga = response.data.vga
    },
    async updatePC () {
      await PCsService.updatePC({
        id: this.$route.params.id,
        brand: this.brand,
        cpu: this.cpu,
        memory: this.memory,
        type: this.type,
        vga: this.vga
      })
      this.$router.push({ name: 'PCs' })
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
