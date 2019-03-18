import { post } from '@/utils/request'

export function login(username, password) {
  return post({
    url: '/api/login',
    data: {
      username: username,
      password: password
    }
  })
}

export function getInfo(token) {
  return post({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return post({
    url: '/user/logout',
    method: 'post'
  })
}
