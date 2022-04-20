import axios from 'axios'
import auth from './authService'

// axios.defaults.headers.common.post['Content-Type'] = 'application/json' // Ejemeplo de que se puede usar con solo post
axios.defaults.headers.common['x-auth-token'] = auth.x()

axios.interceptors.response.use(null, error =>{
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500

    if(!expectedError){
        console.log('Logging the error', error)
        alert('An unexpected error occurred.')
    }

    return Promise.reject(error)
})




export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}