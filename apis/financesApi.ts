import axios from 'axios'

const financesApi = axios.create({
    baseURL: '/api/finances'
})

export default financesApi