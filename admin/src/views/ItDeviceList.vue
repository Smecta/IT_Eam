<template>
  <div class="about">
    <h1>设备列表</h1>
    <div class="searchBox">
      <el-input
        prefix-icon="el-icon-search"
        v-model="searchTableInfo"
        placeholder="请输入搜索内容"
        style="width:240px"
      ></el-input>
    </div>
    <el-table
      :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
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
        <template slot-scope="scope">{{
          scope.row.record_date | dateYMDFormat
        }}</template>
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
        :total="tableData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTableInfo: "",
      currentPage: 1,
      pagesize: 10,
      items: [],
    };
  },
  methods: {
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
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
  computed: {
    // 根据计算属性模糊搜索
    tableData() {
      const searchTableInfo = this.searchTableInfo;
      if (searchTableInfo) {
        // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        // 注意： filter() 不会对空数组进行检测。
        // 注意： filter() 不会改变原始数组。
        return this.items.filter(data => {
          console.log("success" + data);
          // some() 方法用于检测数组中的元素是否满足指定条件;
          // some() 方法会依次执行数组的每个元素：
          // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
          // 如果没有满足条件的元素，则返回false。
          // 注意： some() 不会对空数组进行检测。
          // 注意： some() 不会改变原始数组。
          return Object.keys(data).some(key => {
            // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
            // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(searchTableInfo) > -1
            );
          });
        });
      }
      return this.items;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style>
.fenye {
  text-align: right;
  margin-top: 2rem;
  margin-right: 2rem;
}
</style>
