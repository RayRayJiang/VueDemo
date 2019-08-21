<template>
    <div class="login">
        <img src="../assets/images/logo.png" alt="">
        <p>
            <span class="iconfont icon-yonghu"></span>
            <input type="text" placeholder="请输入用户昵称/手机号" v-model="keyWord">
        </p>
        <p>
            <span class="iconfont icon-mima"></span>
            <input type="password" placeholder="请输入密码" v-model="userPwd">
        </p>
        <mt-button type="primary" @click="onLogin">立即登录</mt-button>
        <!-- <div class="other">------其它方式登录------</div> -->
        <img class="other" src="../assets/images/other-login.png" alt="">
        <div class="othericon">
            <em class="iconfont icon-dengluweixin53a657"></em>
            <em class="iconfont icon-QQ"></em>
            <em class="iconfont icon-weibo"></em>
        </div>
        <router-link to="/user/register" replace>没有账号,去注册</router-link>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import { mapMutations } from 'vuex';
    import { mapActions } from 'vuex';

    export default {
        name: "Login",
        data() {
            return {
                keyWord: "",
                userPwd: ""
            }
        },
        methods: {
            ...mapMutations(['changeToken']),
            ...mapActions(['reqCarnum']),
            onLogin() {
                const { keyWord, userPwd } = this;
                if(!keyWord || !userPwd){
                    Toast("输入内容不能为空");
                    return false;
                }
                this.$axios.post('/api/users/login', {
                    keyWord,
                    userPwd
                }).then((res) => {
                    const { code, msg, token } = res;
                    if(code == 1){
                        Toast("登录成功");
                        // 把token存到本地
                        localStorage.setItem('token', token);
                        // 同时存到仓库store,以方便其它路由调用
                        this.changeToken(token);
                        // 重新执行store里的请求，根据用户名得到购物车商品总数量显示在底下导航栏里
                        this.reqCarnum();
                        // 返回上一页
                        this.$router.back();
                    }else{
                        Toast(msg);
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
        .login{
        img{
            padding: 1rem 0;
        }
        p{  
            width: 90%;
            margin: auto;
            display: flex;
            align-items: center;
            padding: .2rem .1rem;
            border-bottom: 1px solid rgb(226, 226, 226);
            span{
                padding: 0 0.15rem;
                font-size: 0.3rem
            }
            input{
                flex:1;
                height: 0.7rem;
                font-size: 0.27rem;
                border: none;
                outline: none;
            }
        }
        .mint-button{
            width: 90%;
            margin: auto;
            margin-top: 0.7rem;
        }
        .other{
            padding: 0.9rem 0 0.4rem;
        }
        .othericon{
            display: flex;
            width: 3rem;
            margin: auto;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 0.3rem;
            em{
                font-size: .6rem;
            }
        }
        a{
            text-decoration: none;
            color: blue;
        }
    }

</style>

