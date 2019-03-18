<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="新闻标题" prop="title">
        <el-input v-model="form.title"/>
      </el-form-item>
      <!-- <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai"/>
          <el-option label="Zone two" value="beijing"/>
        </el-select>
      </el-form-item> -->
      <el-form-item label="新闻描述" prop="description">
        <el-input v-model="form.description" type="input"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { newsSave } from '@/api/news'
export default {
  data() {
    return {
      form: {
        title: '',
        content: '',
        description: ''
      },
      formRules: {
        title: [{ required: true, trigger: 'blur', message: '标题不得为空' }],
        description: [{ required: true, trigger: 'blur', message: '描述不得为空' }]
      },
    }
  },
  methods: {
    onSubmit() {
      var that = this
      this.$refs.form.validate(valid => {
        if(valid) {
          newsSave(that.form).then((res)=>{
            this.$message({
              message: '提交成功',
              type: 'success'
            })
          }).catch(()=>{

          })
          
        }
      })
      
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

