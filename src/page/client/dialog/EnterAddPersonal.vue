<!--
 * @Author: zhangwt
 * @LastEditors: zhangwt
 * @Description: 客户端 / 人才录入 / 企业 / 添加
 * @Date: 2022.6.23
 -->
 <template>
  <el-form :model="taskForm" :rules="rules" ref="taskForm" label-width="100px" class="demo-ruleForm"
    label-position="left">
    <div>
      <el-form-item label="企业名称" prop="businessName">
        <el-input v-model="taskForm.businessName" placeholder="请输入企业名称" :disabled="isShow"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contact">
        <el-input v-model="taskForm.contact" placeholder="请输入联系人" :disabled="isShow"></el-input>
      </el-form-item>
      <el-form-item label="公司所在地址" prop="address">
        <el-cascader :disabled="isShow" size="large" :options="options" v-model="taskForm.address"
          @change="handleChange">
        </el-cascader>
      </el-form-item>
    </div>
    <div style="display:flex;">
      <el-form-item label="专业" prop="certificate" clearable>
        <el-select :disabled="isShow" v-model="taskForm.certificate" placeholder="请选择" width="120% !important">
          <el-option v-for="(item, index) in specializedList" :key="index" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <div class="select-shuang">
        <el-form-item label="" prop="profession" clearable>
          <el-select :disabled="isShow" v-model="taskForm.profession" placeholder="请选择" width="120% !important">
            <el-option v-for="(el, indx) in specializedsList" :label="el.name" :value="el.value" :key="indx">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    </div>
    <el-form-item label="手机号" prop="iphoneNumber">
      <el-input :disabled="isShow" v-model="taskForm.iphoneNumber" maxlength="11"></el-input>
    </el-form-item>
    <el-form-item label="备用手机号" prop="alIphoneNumber">
      <el-input :disabled="isShow" v-model="taskForm.alIphoneNumber" maxlength="11"></el-input>
    </el-form-item>
  </el-form>
</template>
<script type="text/babel">
import { regionData, CodeToText } from 'element-china-area-data'
import { intersectObj } from '@/util/tool'
export default {
  data () {
    // 校验企业名称
    const checBusiness = (rule, value, callback) => {
      if (value !== this.name) {
        if (value) {
          this.$get(`/businessManage/checkBusinessName/?businessName=${value}`)
            .then(({ data }) => {
              if (!data.success) {
                callback(new Error('该企业已经存在！'))
              } else {
                callback()
              }
            })
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      options: regionData,
      specializedsList: [],
      specializedList: [
        {
          name: '一级建造师',
          value: '一级建造师',
          specializedsList: [
            {
              name: '建筑工程',
              value: '建筑工程'
            },
            {
              name: '机电工程',
              value: '机电工程'
            },
            {
              name: '市政公用',
              value: '市政公用'
            },
            {
              name: '公路工程',
              value: '公路工程'
            },
            {
              name: '水利水电',
              value: '水利水电'
            },
            {
              name: '通信工程',
              value: '通信工程'
            },
            {
              name: '铁路工程',
              value: '铁路工程'
            },
            {
              name: '港口与航道',
              value: '港口与航道'
            },
            {
              name: '民航机场',
              value: '民航机场'
            },
            {
              name: '矿业工程',
              value: '矿业工程'
            }
          ]
        },
        {
          name: '二级建造师',
          value: '二级建造师',
          specializedsList: [
            {
              name: '建筑工程',
              value: '建筑工程'
            },
            {
              name: '机电工程',
              value: '机电工程'
            },
            {
              name: '市政公用',
              value: '市政公用'
            },
            {
              name: '公路工程',
              value: '公路工程'
            },
            {
              name: '水利水电',
              value: '水利水电'
            },
            {
              name: '通信工程',
              value: '通信工程'
            }
          ]
        },
        {
          name: '公用设备工程师',
          value: '公用设备工程师',
          specializedsList: [
            {
              name: '给排水',
              value: '给排水'
            },
            {
              name: '暖通空调',
              value: '暖通空调'
            },
            {
              name: '动力',
              value: '动力'
            }
          ]
        },
        {
          name: '电气工程师',
          value: '电气工程师',
          specializedsList: [
            {
              name: '发输变电 ',
              value: '发输变电'
            },
            {
              name: '供配电',
              value: '供配电'
            }
          ]
        },
        {
          name: '结构工程师',
          value: '结构工程师',
          specializedsList: [
            {
              name: '一级结构',
              value: '一级结构'
            },
            {
              name: '二级结构',
              value: '二级结构'
            }
          ]
        },
        {
          name: '注册建筑',
          value: '注册建筑',
          specializedsList: [
            {
              name: '一级建筑',
              value: '一级建筑'
            },
            {
              name: '二级建筑',
              value: '二级建筑'
            }
          ]
        },
        {
          name: '土木工程工程师',
          value: '土木工程工程师',
          specializedsList: [
            {
              name: '岩土工程师',
              value: '岩土工程师'
            },
            {
              name: '注册水利工程师',
              value: '注册水利工程师'
            }
          ]
        },
        {
          name: '咨询师 ',
          value: '咨询师 ',
          specializedsList: [
            {
              name: '建筑咨询师',
              value: '建筑咨询师'
            },
            {
              name: '市政咨询师',
              value: '市政咨询师'
            },
            {
              name: '水利咨询师',
              value: '水利咨询师'
            },
            {
              name: '火电咨询师',
              value: '火电咨询师'
            },
            {
              name: '其他',
              value: '其他'
            }
          ]
        },
        {
          name: '监理',
          value: '监理',
          specializedsList: [
            {
              name: ' 建设部监理',
              value: ' 建设部监理'
            },
            {
              name: '交通部监理',
              value: '交通部监理'
            },
            {
              name: '水利部监理',
              value: '水利部监理'
            }
          ]
        },
        {
          name: '造价',
          value: '造价',
          specializedsList: [
            {
              name: '土建',
              value: '土建'
            },
            {
              name: '安装',
              value: '安装'
            }
          ]
        },
        {
          name: '规划师',
          value: '规划师',
          specializedsList: [
            {
              name: '规划师',
              value: '规划师'
            }
          ]
        },
        {
          name: '其他证书',
          value: '其他证书',
          specializedsList: [
            {
              name: '消防',
              value: '消防'
            },
            {
              name: '城市规划师',
              value: '城市规划师'
            },
            {
              name: '环评工程师',
              value: '环评工程师'
            },
            {
              name: '安全工程师',
              value: '安全工程师'
            },
            {
              name: '安全评价师',
              value: '安全评价师'
            },
            {
              name: '咨询师',
              value: '咨询师'
            },
            {
              name: '建筑',
              value: '建筑'
            },
            {
              name: '机电',
              value: '机电'
            },
            {
              name: '水利',
              value: '水利'
            },
            {
              name: '水电',
              value: '水电'
            },
            {
              name: '其他',
              value: '其他'
            }
          ]
        }
      ],
      name: '',
      taskForm: {
        iphoneNumber: null,
        alIphoneNumber: null,
        certificate: '',
        profession: '',
        businessName: '',
        contact: '',
        province: '',
        city: '',
        county: '',
        address: [],
        addressShow: []
      },
      rules: {
        businessName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          {
            validator: checBusiness,
            trigger: 'blur'
          }
        ],
        iphoneNumber: [
          { pattern: /^\d+$/, message: '电话号码格式不对，只能输入数字', trigger: 'blur' }
        ],
        alIphoneNumber: [
          { pattern: /^\d+$/, message: '电话号码格式不对，只能输入数字', trigger: 'blur' }
        ],
        // address: [
        //   { required: true, message: '请选择公司地址', trigger: 'change' }
        // ],
        contact: [
          { required: true, message: '请输入联系人', trigger: 'change' }
        ],
        certificate: [
          { required: true, message: '请选择专业', trigger: 'change' }
        ],
        profession: [
          { required: true, message: '请选择专业', trigger: 'change' }
        ]
      }
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    enterprise: {
      type: Number,
      default: null
    },
    rowData: {
      type: Object,
      default: null
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    'taskForm.certificate': {
      handler (val) {
        if (val) {
          this.specializedList.forEach(item => {
            if (item.value === val) {
              this.specializedsList = item.specializedsList
            }
          }
          )
        }
      }
    }
  },
  mounted () {
    if (this.rowData) {
      this.taskForm = intersectObj(this.taskForm, this.rowData)
      this.taskForm.address = this.rowData.addressShow.split(',')
      this.name = this.rowData.businessName
    }
  },
  methods: {
    handleChange () {
      this.taskForm.addressShow = this.taskForm.address
      this.taskForm.province = CodeToText[this.taskForm.address[0]]
      this.taskForm.city = CodeToText[this.taskForm.address[1]]
      this.taskForm.county = CodeToText[this.taskForm.address[2]]
    }
  }
}
</script>
<style scoped>
</style>
