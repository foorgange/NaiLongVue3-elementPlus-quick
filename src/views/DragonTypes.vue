<template>
  <div class="dragon-types-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>奶龙类型管理</span>
          <el-button type="primary" @click="handleAdd">添加类型</el-button>
        </div>
      </template>
      
      <!-- 搜索区域 -->
      <div class="search-area">
        <el-input
          v-model="searchQuery"
          placeholder="请输入类型名称"
          class="search-input"
          @input="handleSearch"
        />
      </div>

      <!-- 表格区域 -->
      <el-table :data="dragonTypes" style="width: 100%" v-loading="loading">
        <el-table-column prop="typeName" label="类型名称" width="150" />
        <el-table-column prop="description" label="描述" width="200" />
        <el-table-column prop="characteristics" label="特征" width="200" />
        <el-table-column prop="careRequirements" label="护理要求" width="200" />
        <el-table-column prop="diet" label="饮食" width="150" />
        <el-table-column prop="habitat" label="栖息环境" width="150" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '添加奶龙类型' : '编辑奶龙类型'"
      width="50%"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item label="类型名称">
          <el-input v-model="form.typeName" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.description" />
        </el-form-item>
        <el-form-item label="特征">
          <el-input type="textarea" v-model="form.characteristics" />
        </el-form-item>
        <el-form-item label="护理要求">
          <el-input type="textarea" v-model="form.careRequirements" />
        </el-form-item>
        <el-form-item label="饮食">
          <el-input v-model="form.diet" />
        </el-form-item>
        <el-form-item label="栖息环境">
          <el-input v-model="form.habitat" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { dragonTypeApi } from '../api/dragon'

const dragonTypes = ref([])
const loading = ref(false)
const dialogVisible = ref(false)
const dialogType = ref('add')
const searchQuery = ref('')

const form = ref({
  typeName: '',
  description: '',
  characteristics: '',
  careRequirements: '',
  diet: '',
  habitat: ''
})

// 获取所有奶龙类型
const fetchDragonTypes = async () => {
  loading.value = true
  try {
    const res = await dragonTypeApi.getAllTypes()
    if (res.data.code === 1) {
      dragonTypes.value = res.data.data
    }
  } catch (error) {
    ElMessage.error('获取奶龙类型列表失败')
  } finally {
    loading.value = false
  }
}

// 添加奶龙类型
const handleAdd = () => {
  dialogType.value = 'add'
  form.value = {
    typeName: '',
    description: '',
    characteristics: '',
    careRequirements: '',
    diet: '',
    habitat: ''
  }
  dialogVisible.value = true
}

// 编辑奶龙类型
const handleEdit = (row) => {
  dialogType.value = 'edit'
  form.value = { ...row }
  dialogVisible.value = true
}

// 删除奶龙类型
const handleDelete = (row) => {
  ElMessageBox.confirm('确定要删除这个奶龙类型吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      const res = await dragonTypeApi.deleteType(row.id)
      if (res.data.code === 1) {
        ElMessage.success('删除成功')
        fetchDragonTypes()
      }
    } catch (error) {
      ElMessage.error('删除失败')
    }
  })
}

// 提交表单
const handleSubmit = async () => {
  try {
    if (dialogType.value === 'add') {
      const res = await dragonTypeApi.addType(form.value)
      if (res.data.code === 1) {
        ElMessage.success('添加成功')
        dialogVisible.value = false
        fetchDragonTypes()
      }
    } else {
      const res = await dragonTypeApi.updateType(form.value)
      if (res.data.code === 1) {
        ElMessage.success('更新成功')
        dialogVisible.value = false
        fetchDragonTypes()
      }
    }
  } catch (error) {
    ElMessage.error(dialogType.value === 'add' ? '添加失败' : '更新失败')
  }
}

// 搜索
const handleSearch = async () => {
  if (searchQuery.value) {
    try {
      const res = await dragonTypeApi.getTypeByName(searchQuery.value)
      if (res.data.code === 1) {
        dragonTypes.value = res.data.data
      }
    } catch (error) {
      ElMessage.error('搜索失败')
    }
  } else {
    fetchDragonTypes()
  }
}

onMounted(() => {
  fetchDragonTypes()
})
</script>

<style scoped>
.dragon-types-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-area {
  margin-bottom: 20px;
}

.search-input {
  width: 300px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 