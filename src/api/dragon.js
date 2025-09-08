import axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = '/api'

const api = axios.create({
  baseURL,
  timeout: 5000
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    console.log('发送请求:', config.url)
    return config
  },
  error => {
    console.error('请求错误:', error)
    ElMessage.error('请求发送失败')
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    console.log('收到响应:', response.data)
    return response
  },
  error => {
    console.error('响应错误:', error)
    if (error.code === 'ECONNABORTED') {
      ElMessage.error('请求超时，请检查网络连接')
    } else if (error.response) {
      ElMessage.error(`服务器错误: ${error.response.status}`)
    } else {
      ElMessage.error('网络错误，请检查后端服务是否启动')
    }
    return Promise.reject(error)
  }
)

// 奶龙管理接口
export const dragonApi = {
  // 获取所有奶龙
  getAllDragons() {
    return api.get('/dragons')
  },
  
  // 获取单个奶龙
  getDragon(id) {
    return api.get(`/dragons/${id}`)
  },
  
  // 添加奶龙
  addDragon(data) {
    return api.post('/dragons', data)
  },
  
  // 更新奶龙
  updateDragon(data) {
    return api.put('/dragons', data)
  },
  
  // 删除奶龙
  deleteDragon(id) {
    return api.delete(`/dragons/${id}`)
  },
  
  // 根据类型查询奶龙
  getDragonsByType(type) {
    return api.get(`/dragons/type/${type}`)
  },
  
  // 根据状态查询奶龙
  getDragonsByStatus(status) {
    return api.get(`/dragons/status/${status}`)
  }
}

// 奶龙类型管理接口
export const dragonTypeApi = {
  // 获取所有奶龙类型
  getAllTypes() {
    return api.get('/dragon-types')
  },
  
  // 获取单个奶龙类型
  getType(id) {
    return api.get(`/dragon-types/${id}`)
  },
  
  // 添加奶龙类型
  addType(data) {
    return api.post('/dragon-types', data)
  },
  
  // 更新奶龙类型
  updateType(data) {
    return api.put('/dragon-types', data)
  },
  
  // 删除奶龙类型
  deleteType(id) {
    return api.delete(`/dragon-types/${id}`)
  },
  
  // 根据类型名称查询
  getTypeByName(typeName) {
    return api.get(`/dragon-types/name/${typeName}`)
  }
} 