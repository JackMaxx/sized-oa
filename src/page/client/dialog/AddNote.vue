<!--
 * @Author: zhangwt
 * @LastEditors: zhangwt
 * @Description: 沟通记录
 * @Date: 2022.8.15
 -->
 <template>
  <div>
    <div class="content-box" id="gundong">
      <div ref="content" v-for="item in messageList" :key="item.createTime">
        <div :key="item.uuid">
          <div>
            <span class="content-time">{{item.createTime}}</span>
          </div>
          <span class="content-message" v-html="item.message"></span>
        </div>
      </div>
    </div>
    <div style="height: 150px;" v-if="isView">
      <el-input type="textarea" v-model="taskForm.remark" placeholder="请填写"></el-input>
      <div class="add-content" :style="actionButton">
        <s-button type="default" @click="handleClick">发 送</s-button>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
export default {
  data () {
    return {
      content: '',
      messageList: []
    }
  },
  props: {
    orderUuid: {
      type: String,
      default: ''
    },
    isView: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.getMessageList()
  },
  methods: {
    getMessageList () {
      this.$get(`/suninfo-itsm/itsmOrderOper/getCommunicateRec/${this.orderUuid}`).then(res => {
        if (res.success) {
          this.messageList = res.data || []
        }
        this.setBottom()
      })
    },
    handleClick () {
      const params = {
        orderUuid: this.orderUuid,
        message: this.content
      }
      if (this.content) {
        this.$post('/suninfo-itsm/itsmOrderOper/saveCommunicateRec', params).then(res => {
          if (res.success) {
            this.content = ''
            this.$message.success('发表成功')
            this.getMessageList()
          } else {
            this.$message.error('发表失败')
          }
        })
      } else {
        this.$message.success('发表内容不能为空')
      }
    },
    setBottom () {
      this.$nextTick(() => {
        const msg = document.getElementById('gundong') // 获取对象
        msg.scrollTop = msg.scrollHeight // 滚动高度
      })
    }
  }
}
</script>
<style scoped>
.content-box {
  height: calc(100vh - 600px);
  margin-bottom: 5px;
  font-size: 14px;
  overflow: auto;
}
.content-message {
  display: block;
  margin: 8px 0 12px 0;
  min-height: 20px;
  border-radius: 5px;
  overflow: auto;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
}
.content-time {
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
}
.add-content {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
  margin-right: 5px;
}
</style>
