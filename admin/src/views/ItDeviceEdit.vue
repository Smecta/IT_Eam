<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}设备</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="设备编号">
            <el-input v-model="model.device_number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="设备名称">
            <el-input v-model="model.device_name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="设备类型">
            <el-select v-model="model.device_categories" multiple>
              <el-option
                v-for="item of device_categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="设备详细">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入详细"
              v-model="model.device_detail"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="设备数量">
            <el-input
              placeholder="请输入数量"
              prefix-icon="el-icon-coin"
              v-model="model.device_count"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="设备单位">
            <el-select v-model="model.device_unit">
              <el-option
                v-for="item of device_unit"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备价值">
            <el-input
              placeholder="请输入价格"
              prefix-icon="el-icon-money"
              v-model="model.device_price"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="登记日期">
            <el-date-picker
              v-model="model.record_date"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="折旧年限">
            <el-input
              placeholder="请输入年限-笔记本4年-台式机5年"
              prefix-icon="el-icon-time"
              v-model="model.depreciable_life"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="使用人员">
            <el-input
              placeholder="请输入姓名"
              prefix-icon="el-icon-user-solid"
              v-model="model.device_user"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="使用部门">
            <el-input
              placeholder="请输入部门"
              prefix-icon="el-icon-ship"
              v-model="model.device_department"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备位置">
            <el-input
              placeholder="请输入位置"
              prefix-icon="el-icon-location"
              v-model="model.device_location"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入备注信息"
          v-model="model.remark"
        ></el-input>
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
      device_categories: [],
      device_unit: "",
      model: {
        device_number: "",
        device_name: "",
        device_detail: "",
        device_count: 1,
        device_price: "",
        record_date: "",
        depreciable_life: "",
        device_user: "",
        device_department: "",
        device_location: "",
        remark: ""
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/itDevices/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/itDevices", this.model);
      }
      console.log("save");

      this.$router.push("/itDevices/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/itDevices/${this.id}`);
      // this.model = res.data;
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetch_device_categories() {
      const res = await this.$http.get(`rest/deviceCategories`);
      this.device_categories = res.data;
    },
    async fetch_device_unit() {
      const res = await this.$http.get(`rest/deviceUnits`);
      this.device_unit = res.data;
    }
    // async fetchParents(){
    //   const res = await this.$http.get(`rest/deviceUnits`)
    //   this.parents = res.data
    // }
  },
  created() {
    this.fetch_device_categories();
    this.fetch_device_unit();
    // this.fetchParents()
    this.id && this.fetch();
  }
};
</script>
