<style scoped>
    .card .card-content .card-title{
        margin-bottom: 0;
    }
    .card .card-content p.timestamp{
        color:#999;
        margin-bottom: 10px;
    }
    .delete-btn{
        color:red!important;
    }
    .cardBody{
        width:100%!important;
        min-height: 9vh!important;
        overflow:hidden!important;
        display:inline-block!important;
        text-overflow: ellipsis!important;
    }
</style>

<template>
    <div>
        <div class="row">
            <div class="col s6">
                <!-- Form -->
                <PostForm @postCreated="addPost" :edittingPost="edittingPost"/>
            </div>
            <div class="col s3" style="margin:50px">
                <p>Limit number of posts</p>
                <input type="number" v-model="postLimit">
                <button @click="setLimit()" class="waves-effect waves-light btn">Set Limit</button>
            </div>
        </div>
    <div class="row">
        <div class="col s6" v-for="(post, index) in posts" :index="index" :item="post" :key="post.id">
            <div class="card">
                <div class="card-content">
                    <p class="card-title">{{post.title | strLimit(40)}}</p>
                    <p class="timestamp">{{post.createdAt | formatDate}}</p>
                    <p class='cardBody'>{{post.body | strLimit(150)}}</p>
                </div>
                <div class="card-action">
                    <a href="#" @click="editPost(post)">Edit</a>
                    <a href="#" class='delete-btn' @click="deletePost(post.id)">Delete</a>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import PostForm from '../components/PostForm.vue';
import HttpService from '../services/HttpService';
const httpService = new HttpService();
export default {
    name: "Home",
    components:{
        PostForm
    },
    data () {
        return {
            posts: [],
            postLimit: 5,
            edittingPost: null,
        }
    },
    methods:{
        addPost(post){
            // check if this was for editing
            if(this.posts.find(p=> p.id === post.id)){
                //lets fine the index of the post that was changed
                const i = this.posts.findIndex(p => p.id === post.id);
                this.posts.splice(i,1,post);
            }else this.posts.unshift(post);
        },
        editPost(post){
            this.edittingPost = post
        },        
        deletePost(postId){
            httpService.deletePost(postId)
                .then(()=>{
                    this.posts = this.posts.filter(post => post.id !== postId);
                    console.log("Post Deleted")
                })
                .catch(err=>{
                    console.error(err)
                });
        },
        setLimit(){
            httpService.getPosts(this.postLimit)
                .then(res =>this.posts = res.data)
                .catch(err => console.error(err));
        }
    },
    created(){
        httpService.getAllPosts()
            .then(res => {
                this.posts = res.data;
                console.log(this.posts);
            })
            .catch(err=>console.error(err));
    },
    filters:{        
        formatDate(date){
            date = new Date(date);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        },
        strLimit(string,limit){
            if (!string) return '';
            string = string.toString();

            if (string.length <= limit) {
                return string;
            }
            return string.substr(0, limit) + '...';
        }
    }
}
</script>