<template>
  <div class="about">
    <h1>{{ id ? '编辑' : '新建'}}设备单位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="单位名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async save() {

      if(this.id){
        await this.$http.put(`rest/deviceUnits/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/deviceUnits", this.model);
      }
      console.log("save")
    
      this.$router.push("/deviceUnits/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch(){
      const res = await this.$http.get(`rest/deviceUnits/${this.id}`)
      this.model = res.data
    },
    // async fetchParents(){
    //   const res = await this.$http.get(`rest/deviceUnits`)
    //   this.parents = res.data
    // }
  },
  created(){
    // this.fetchParents()
    this.id && this.fetch()
  }
};
</script>
