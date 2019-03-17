import axios from 'axios'
import conf from '@/config/config'

export default () => {
  return axios.create(conf)
}
