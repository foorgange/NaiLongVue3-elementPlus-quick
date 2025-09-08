# 奶龙管理系统接口文档

## 通用说明

### 基础URL
```
http://localhost:9090
```

### 响应格式
所有接口的响应格式统一为：
```json
{
    "code": 1,       // 状态码：1表示成功，0表示失败
    "msg": "操作成功", // 提示信息
    "data": {}       // 响应数据，可能为null
}
```

## 奶龙管理接口

### 1. 获取所有奶龙列表
- **请求方式**：GET
- **接口路径**：`/dragons`
- **响应示例**：
```json
{
    "code": 1,
    "msg": "操作成功",
    "data": [
        {
            "id": 1,
            "name": "小白",
            "dragonNumber": "NL001",
            "type": "普通奶龙",
            "color": "白色",
            "age": 2,
            "description": "性格温顺",
            "status": "健康",
            "location": "A区1号笼"
        }
    ]
}
```

### 2. 获取单个奶龙信息
- **请求方式**：GET
- **接口路径**：`/dragons/{id}`
- **路径参数**：
  - id: 奶龙ID
- **响应示例**：
```json
{
    "code": 1,
    "msg": "操作成功",
    "data": {
        "id": 1,
        "name": "小白",
        "dragonNumber": "NL001",
        "type": "普通奶龙",
        "color": "白色",
        "age": 2,
        "description": "性格温顺",
        "status": "健康",
        "location": "A区1号笼"
    }
}
```

### 3. 添加奶龙
- **请求方式**：POST
- **接口路径**：`/dragons`
- **请求体**：
```json
{
    "name": "小白",
    "dragonNumber": "NL001",
    "type": "普通奶龙",
    "color": "白色",
    "age": 2,
    "description": "性格温顺",
    "status": "健康",
    "location": "A区1号笼"
}
```

### 4. 更新奶龙信息
- **请求方式**：PUT
- **接口路径**：`/dragons`
- **请求体**：
```json
{
    "id": 1,
    "name": "小白",
    "dragonNumber": "NL001",
    "type": "普通奶龙",
    "color": "白色",
    "age": 2,
    "description": "性格温顺",
    "status": "健康",
    "location": "A区1号笼"
}
```

### 5. 删除奶龙
- **请求方式**：DELETE
- **接口路径**：`/dragons/{id}`
- **路径参数**：
  - id: 奶龙ID

### 6. 根据类型查询奶龙
- **请求方式**：GET
- **接口路径**：`/dragons/type/{type}`
- **路径参数**：
  - type: 奶龙类型

### 7. 根据状态查询奶龙
- **请求方式**：GET
- **接口路径**：`/dragons/status/{status}`
- **路径参数**：
  - status: 奶龙状态

## 奶龙类型管理接口

### 1. 获取所有奶龙类型
- **请求方式**：GET
- **接口路径**：`/dragon-types`
- **响应示例**：
```json
{
    "code": 1,
    "msg": "操作成功",
    "data": [
        {
            "id": 1,
            "typeName": "普通奶龙",
            "description": "最常见的奶龙品种",
            "characteristics": "性格温顺，产奶量稳定",
            "careRequirements": "需要定期清洁和护理",
            "diet": "以青草为主",
            "habitat": "适宜温度20-25度"
        }
    ]
}
```

### 2. 获取单个奶龙类型
- **请求方式**：GET
- **接口路径**：`/dragon-types/{id}`
- **路径参数**：
  - id: 类型ID

### 3. 添加奶龙类型
- **请求方式**：POST
- **接口路径**：`/dragon-types`
- **请求体**：
```json
{
    "typeName": "普通奶龙",
    "description": "最常见的奶龙品种",
    "characteristics": "性格温顺，产奶量稳定",
    "careRequirements": "需要定期清洁和护理",
    "diet": "以青草为主",
    "habitat": "适宜温度20-25度"
}
```

### 4. 更新奶龙类型
- **请求方式**：PUT
- **接口路径**：`/dragon-types`
- **请求体**：
```json
{
    "id": 1,
    "typeName": "普通奶龙",
    "description": "最常见的奶龙品种",
    "characteristics": "性格温顺，产奶量稳定",
    "careRequirements": "需要定期清洁和护理",
    "diet": "以青草为主",
    "habitat": "适宜温度20-25度"
}
```

### 5. 删除奶龙类型
- **请求方式**：DELETE
- **接口路径**：`/dragon-types/{id}`
- **路径参数**：
  - id: 类型ID

### 6. 根据类型名称查询
- **请求方式**：GET
- **接口路径**：`/dragon-types/name/{typeName}`
- **路径参数**：
  - typeName: 类型名称
