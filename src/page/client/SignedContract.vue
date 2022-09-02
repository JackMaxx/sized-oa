<!--
 * @Author: zhangwt
 * @LastEditors: zhangwt
 * @Description: 客户端 / 证书库
 * @Date: 2022.6.23
 -->
<template>
  <div class="updata">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="realName" label="人才姓名"></el-table-column>
      <el-table-column prop="professionStr" label="专业"></el-table-column>
      <el-table-column prop="socialSecurity" label="社保">
        <template slot-scope="scope">
          {{ scope.row.socialSecurity | switchType }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button @click="check(scope.row)" type="text" size="small">
            查看
          </el-button>
          <el-button @click="details(scope.row)" type="text" size="small">资料上传</el-button>
          <el-button @click="cooperation(scope.row)" type="text" size="small">匹配合作</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 20, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="匹配合作" :visible.sync="transferOutVisible" width="600px" :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-form :model="transForm" v-if="transferOutVisible" :rules="transRules" ref="transForm" label-width="100px"
        class="demo-ruleForm" label-position="right">
        <el-form-item label="公司名称：" prop="personnelName">
          <el-select v-model="transForm.personnelName" placeholder="请选择公司">
            <el-option v-for="(item, index) in personnelNameList" :label="item.businessName" :value="item.uuid"
              :key="index">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="transferOutVisible = false">取 消</el-button>
        <el-button type="primary" @click="transferOut">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="资料上传" :visible.sync="certificateVisible" width="600px" :close-on-click-modal="false"
      :close-on-press-escape="false" class="dialog-wrap">
      <el-scrollbar>
        <el-upload class="upload-demo" :action="action" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
          :file-list="fileList" list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-scrollbar>
    </el-dialog>
    <el-dialog :visible.sync="dialogUpload" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog :title="titleCheck" :visible.sync="dialogVisible" width="600px" class="dialog-wrap"
      :close-on-click-modal="false" :close-on-press-escape="false">
      <add-personal ref="personalForm" :isShow="isShowCheck" :rowData="rowDataCheck" v-if="dialogVisible">
      </add-personal>
      <span slot="footer" class="dialog-footer" v-if="!isShowCheck">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/babel">
import addPersonal from './dialog/AddPersonal.vue'
export default {
  components: {
    addPersonal
  },
  data () {
    return {
      fileList: [],
      dialogImageUrl: '',
      dialogUpload: false,
      dialogVisible: false,
      talentUuid: '',
      titleCheck: '',
      isShowCheck: true,
      rowDataCheck: null,
      personnelNameList: [],
      tableData: [],
      certificateForm: {
        qualifications: []
      },
      action: '',
      currentPage4: 1,
      current: 1,
      size: 10,
      total: 0,
      targetUuid: '',
      transferOutVisible: false,
      certificateVisible: false,
      transForm: {
        personnelName: ''
      },
      transRules: {
        personnelName: [{ required: true, message: '请选择公司名称', trigger: 'change' }]
      }
    }
  },
  filters: {
    switchType (val) {
      switch (val) {
        case 0:
          return '不唯一'
        case 1:
          return '唯一'
        default:
          return ''
      }
    }
  },
  created () {
    this.$EventBus.$on('getAuthList', () => {
      this.getList(this.current, this.size)
    })
  },
  mounted () {
    this.getList(this.current, this.size)
  },
  methods: {
    getCertDetails (talentUuid) {
      this.$get(`/talentManage/getCertDetails/${talentUuid}`).then(({ data }) => {
        if (data.success) {
          data.data.forEach(item => {
            item.name = item.attacthmentName
            item.url = item.staticPath
          })
          this.fileList = data.data
          console.log(this.fileList)
        }
      })
    },
    handleRemove (file, fileList) {
      const uuid = file.response.data.uuid
      this.$get(`${window.location.origin}/talentManage/uploadData/${uuid}`)
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogUpload = true
    },
    check (row) {
      this.titleCheck = '查看'
      this.dialogVisible = true
      this.isShowCheck = true
      this.rowDataCheck = row
    },
    getList (current, size) {
      const params = {
        current: current,
        size: size
      }
      this.$post(`/talentManage/getCertStoreList`, params).then(({ data }) => {
        if (data.success) {
          this.tableData = data.data.records
          this.total = data.data.total
        } else {
          this.$message({ type: 'error', message: data.msg })
        }
      })
    },
    handleSizeChange (val) {
      this.size = val
      this.getList(this.current, val)
    },
    handleCurrentChange (val) {
      this.current = val
      this.getList(val, this.size)
    },
    // 资料上传
    details (row) {
      this.talentUuid = row.uuid
      this.action = `${window.location.origin}/talentManage/uploadData/${row.uuid}`
      this.getCertDetails(row.uuid)
      this.certificateVisible = true
    },
    // 匹配合作
    cooperation (row) {
      this.transferOutVisible = true
      this.targetUuid = row.uuid
      this.$post(`/businessManage/getCoopList`, {}).then((res) => {
        if (res.data.success) {
          this.personnelNameList = res.data.data
        } else {
          this.$message({ type: 'error', message: res.data.msg })
        }
      })
    },
    // 匹配合作（确定）
    transferOut () {
      this.$refs.transForm.validate((valid) => {
        if (valid) {
          this.$get(`/orderInfo/cooperation/${this.targetUuid}/${this.transForm.personnelName}`).then(({ data }) => {
            if (data.success) { // 记住用户名
              this.$message.success(data.msg)
              this.getList(this.current, this.size)
              this.transferOutVisible = false
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    },
    // 资料上传
    certificateSubmit () {
      this.$refs.taskForm.validate((valid) => {
        if (valid) {
          const params = this.taskForm
          console.log(params)
          this.$post(`/talentManage/uptCertDetails`, params).then(({ data }) => {
            if (data.success) { // 记住用户名
              this.$message.success(data.msg)
              this.getList(this.current, this.size)
              this.certificateVisible = false
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.lable-img {
  display: flex;
  align-items: center;
}
.image {
  display: flex;
}
.upload-demo {
  padding-bottom: 20px;
}
</style>
