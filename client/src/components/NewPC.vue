<template>
  <div class="PCs">
    <h1>Add PC</h1>
      <div class="form">
        <div>
          <input type="number" name="title" placeholder="Azonosító" v-model="id">
        </div>
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
          <button class="app_PC_btn" @click="addPC">Add</button>
        </div>
      </div>
  </div>
</template>

<script>
import PCsService from '@/services/PCService'
export default {
  name: 'NewPC',
  data () {
    return {
      id: '',
      brand: '',
      cpu: '',
      memory: '',
      type: '',
      vga: '',
      score: '',
      title: '',
      description: ''
    }
  },
  methods: {
    async addPC () {
      await PCsService.addPC({
        id: this.id,
        brand: this.brand,
        cpu: this.cpu,
        memory: this.memory,
        type: this.type,
        vga: this.vga,
        score: 0,
        title: this.title,
        description: this.description
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
.app_PC_btn {
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
