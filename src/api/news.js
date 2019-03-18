import { post } from '@/utils/request'
export function newsSave(obj) {
  return post({
    url: '/api/news/save',
    data: {
      title: obj.title,
      description: obj.description
    }
  })
}
