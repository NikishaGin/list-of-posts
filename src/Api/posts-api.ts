import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    withCredentials: true,
})


export const PostsApi = {
    getPosts() {
        return instance.get('posts');
    },
}