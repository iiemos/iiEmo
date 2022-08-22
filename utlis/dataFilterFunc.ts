//引入所有essay下.ts文件 （文章详情页的数据）

const files = import.meta.glob("../data/essay/**.ts")

// 获取所有文章列表
export const dataFilterList = async() => {
  const list = []
  for (const key in files) {
    const res = await files[key]()
    const name = key.split('/')[key.split('/').length - 1].split('.')[0]
    list.push({id: name, ...res.default})
  }
  return list
}

// 获取所有标签
export const dataFilterTags = async(tag) => {
  const list = []
  for (const key in files) {
    const res = await files[key]()
    list.push(res.default.tags)
  }
  return list
}
// 根据标签获取列表
export const dataFilterTagsList = async(tag) => {
  const list = []
  for (const key in files) {
    const res = await files[key]()
    if(res.default.tags == tag) {
      list.push(res.default)
    }
  }
  return list
}

// 获取所有分类
export const dataFilterType = async(type) => {
  const list = []
  for (const key in files) {
    const res = await files[key]()
    list.push(res.default.type)
  }
  return list
}

// 获取分类获取列表
export const dataFilterTypeList = async(type) => {
  const list = []
  for (const key in files) {
    const res = await files[key]()
    if(res.default.tags == type) {
      list.push(res.default)
    }
  }
  return list
}

// 根据id获取文章详情
export const dataFilterDesc = async(id) => {
  for (const key in files) {
    const res = await files[key]()
    const name = key.split('/')[key.split('/').length - 1]
    if (`${id}.ts` == name) return res.default
  }
}
