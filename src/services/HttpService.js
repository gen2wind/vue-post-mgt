import axios from 'axios';

//let APIBaseURL = '';
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"){
    //APIBaseURL = 'http://localhost/jsonapi/';
    axios.defaults.baseURL = 'http://localhost/jsonapi/';
}else{
    //APIBaseURL = 'https://gen2wind-jsonapi.herokuapp.com/';
    axios.defaults.baseURL = 'https://gen2wind-jsonapi.herokuapp.com/';
}


export default  class HttpService{
    getAllPosts(){
        //return axios.get(`${APIBaseURL}/posts`);
        return axios.get('/posts');
    }

    getPosts(limit){
        return axios.get(`/posts?page=1&limit=${limit}`);
    }

    writePost(post){ 
        // Use because of put request as php://input does not work with enctype="multipart/form-data"
        // Could have used params = new FormData(); // because it supports binary 
        const params = new URLSearchParams();        
        params.append('title', post.title);
        params.append('body', post.body);
        if(post.id){
            // This means its for editing
            params.append('id', post.id);
            return axios.put('/post',params);
        }else{
            return axios.post('/post',params);
        }
    }

    deletePost(postId){
        return axios.delete(`/post/${postId}`);
    }

}