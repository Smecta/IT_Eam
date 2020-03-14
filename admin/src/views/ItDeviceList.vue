<template>
  <div class="about">
    <h1>设备列表</h1>
    <el-table
      :data="items.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
    >
      <!-- <el-table-column prop="_id" label="ID" width="240"> </el-table-column> -->
      <!-- <el-table-column prop="parent.name" label="上级分类"> </el-table-column> -->
      <el-table-column prop="device_number" label="设备编号"> </el-table-column>
      <el-table-column prop="device_name" label="设备名称"> </el-table-column>
      <el-table-column prop="device_count" label="设备数量"> </el-table-column>
      <!-- <el-table-column prop="device_unit" label="设备单位"> </el-table-column> -->
      <el-table-column prop="device_price" label="设备价格"> </el-table-column>
      <el-table-column prop="device_user" label="使用人员"> </el-table-column>
      <el-table-column prop="device_department" label="使用部门">
      </el-table-column>
      <el-table-column prop="record_date" label="登记日期">
        <template slot-scope="scope">{{scope.row.record_date| dateYMDFormat}}</template>
      </el-table-column>
      <el-table-column prop="device_location" label="设备位置">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/itDevices/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="fenye">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="items.length"
    >
    </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      items: []
    };
  },
  methods: {
    handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
    },
    async fetch() {
      const res = await this.$http.get("rest/itDevices");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`是否确定要删除设备 "${row.device_name}" ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`rest/itDevices/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style>
.fenye{
  text-align: right;
  margin-top: 2rem;
  margin-right: 2rem;
}
</style>