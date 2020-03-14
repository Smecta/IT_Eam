<template>
  <div class="about">
    <h1>设备单位列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"> </el-table-column>
      <!-- <el-table-column prop="parent.name" label="上级分类"> </el-table-column> -->
      <el-table-column prop="name" label="设备单位名称"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/deviceUnits/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/deviceUnits");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`是否确定要删除设备单位 "${ row.name }" ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/deviceUnits/${row._id}`)
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        })
  
    }
  },
  created() {
    this.fetch();
  }
};
</script>
