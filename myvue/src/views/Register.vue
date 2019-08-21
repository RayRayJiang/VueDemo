<template>
    <div class="register">
        <img src="../assets/images/logo.png" alt="">
        <p>
            <span class="iconfont icon-shouji"></span>
            <input type="text" placeholder="请输入手机号码" v-model="userTel">
        </p>
        <p>
            <span class="iconfont icon-yonghu"></span>
            <input type="text" placeholder="请输入用户昵称" v-model="userName">
        </p>
        <p>
            <span class="iconfont icon-mima"></span>
            <input type="password" placeholder="请设置密码" v-model="userPwd">
        </p>
        <mt-button type="primary" @click="onRegister">立即注册</mt-button>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "Register",
        data() {
            return {
                userName: "",
                userPwd: "",
                userTel: ""
            }
        },
        methods: {
            onRegister() {
                const { userName, userPwd, userTel } = this;
                if(!userName || !userPwd || !userTel){
                    Toast("输入内容不能为空");
                    return false;
                }else if(!(/^1[3456789]\d{9}$/.test(userTel))){
                    Toast("请输入正确的手机号");
                    return false;
                }
                this.$axios.post('/api/users/register', {
                    userName,
                    userPwd,
                    userTel
                }).then((res) => {
                    const { code, msg } = res
                    if(code == 1){
                        Toast({
                            message: "注册成功",
                            duration: 2000
                        })
                        setTimeout(() => {
                            // 使用replace方法，跳转过去之后，自动删除上一页
                            this.$router.replace('/user/login');
                        }, 2000);
                    }else{
                        Toast(msg);
                    }
                })
            }
        },
        
    }
</script>

<style lang="scss" scoped>
    .register{
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
    }



</style>