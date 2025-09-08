<template>
  <div class="dragons-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>奶龙管理</span>
          <el-button type="primary" @click="handleAdd">添加奶龙</el-button>
        </div>
      </template>
      
      <!-- 搜索区域 -->
      <div class="search-area">
        <el-input
          v-model="searchQuery"
          placeholder="请输入奶龙名称或编号"
          class="search-input"
          @input="handleSearch"
        />
        <el-select v-model="selectedType" placeholder="选择类型" @change="handleTypeChange">
          <el-option
            v-for="type in dragonTypes"
            :key="type.id"
            :label="type.typeName"
            :value="type.typeName"
          />
        </el-select>
        <el-select v-model="selectedStatus" placeholder="选择状态" @change="handleStatusChange">
          <el-option label="健康" value="健康" />
          <el-option label="生病" value="生病" />
          <el-option label="休息" value="休息" />
        </el-select>
      </div>

      <!-- 表格区域 -->
      <el-table :data="dragons" style="width: 100%" v-loading="loading">
        <el-table-column prop="dragonNumber" label="编号" width="120" />
        <el-table-column prop="name" label="名称" width="120" />
        <el-table-column prop="type" label="类型" width="120" />
        <el-table-column prop="color" label="颜色" width="120" />
        <el-table-column prop="age" label="年龄" width="80" />
        <el-table-column prop="status" label="状态" width="100" />
        <el-table-column prop="location" label="位置" width="120" />
        <el-table-column prop="description" label="描述" />
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
      :title="dialogType === 'add' ? '添加奶龙' : '编辑奶龙'"
      width="50%"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item label="名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="form.dragonNumber" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type">
            <el-option
              v-for="type in dragonTypes"
              :key="type.id"
              :label="type.typeName"
              :value="type.typeName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="颜色">
          <el-input v-model="form.color" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="form.age" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status">
            <el-option label="健康" value="健康" />
            <el-option label="生病" value="生病" />
            <el-option label="休息" value="休息" />
          </el-select>
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="form.location" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.description" />
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
import { dragonApi, dragonTypeApi } from '../api/dragon'

const dragons = ref([])
const dragonTypes = ref([])
const loading = ref(false)
const dialogVisible = ref(false)
const dialogType = ref('add')
const searchQuery = ref('')
const selectedType = ref('')
const selectedStatus = ref('')

const form = ref({
  name: '',
  dragonNumber: '',
  type: '',
  color: '',
  age: 0,
  status: '健康',
  location: '',
  description: ''
})

// 获取所有奶龙
const fetchDragons = async () => {
  loading.value = true
  try {
    const res = await dragonApi.getAllDragons()
    if (res.data.code === 1) {
      dragons.value = res.data.data
    }
  } catch (error) {
    ElMessage.error('获取奶龙列表失败')
  } finally {
    loading.value = false
  }
}

// 获取所有奶龙类型
const fetchDragonTypes = async () => {
  try {
    const res = await dragonTypeApi.getAllTypes()
    if (res.data.code === 1) {
      dragonTypes.value = res.data.data
    }
  } catch (error) {
    ElMessage.error('获取奶龙类型列表失败')
  }
}

// 添加奶龙
const handleAdd = () => {
  dialogType.value = 'add'
  form.value = {
    name: '',
    dragonNumber: '',
    type: '',
    color: '',
    age: 0,
    status: '健康',
    location: '',
    description: ''
  }
  dialogVisible.value = true
}

// 编辑奶龙
const handleEdit = (row) => {
  dialogType.value = 'edit'
  form.value = { ...row }
  dialogVisible.value = true
}

// 删除奶龙
const handleDelete = (row) => {
  ElMessageBox.confirm('确定要删除这条奶龙记录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      const res = await dragonApi.deleteDragon(row.id)
      if (res.data.code === 1) {
        ElMessage.success('删除成功')
        fetchDragons()
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
      const res = await dragonApi.addDragon(form.value)
      if (res.data.code === 1) {
        ElMessage.success('添加成功')
        dialogVisible.value = false
        fetchDragons()
      }
    } else {
      const res = await dragonApi.updateDragon(form.value)
      if (res.data.code === 1) {
        ElMessage.success('更新成功')
        dialogVisible.value = false
        fetchDragons()
      }
    }
  } catch (error) {
    ElMessage.error(dialogType.value === 'add' ? '添加失败' : '更新失败')
  }
}

// 搜索
const handleSearch = () => {
  // 实现搜索逻辑
}

// 按类型筛选
const handleTypeChange = async () => {
  if (selectedType.value) {
    try {
      const res = await dragonApi.getDragonsByType(selectedType.value)
      if (res.data.code === 1) {
        dragons.value = res.data.data
      }
    } catch (error) {
      ElMessage.error('获取奶龙列表失败')
    }
  } else {
    fetchDragons()
  }
}

// 按状态筛选
const handleStatusChange = async () => {
  if (selectedStatus.value) {
    try {
      const res = await dragonApi.getDragonsByStatus(selectedStatus.value)
      if (res.data.code === 1) {
        dragons.value = res.data.data
      }
    } catch (error) {
      ElMessage.error('获取奶龙列表失败')
    }
  } else {
    fetchDragons()
  }
}

onMounted(() => {
  fetchDragons()
  fetchDragonTypes()
})
</script>

<style scoped>
.dragons-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-area {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
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