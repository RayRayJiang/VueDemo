<template>
    <div class="userinfo">
        <div class="top">
            <div class="picture">头像</div>
            <div class="loginbtn" @click="toLogin" v-if="!token">登录</div>
            <div class="username" v-if="token">
                <span class="name">{{userName}}</span>
                <span class="exit" @click="exitLogin">退出</span>
            </div>
        </div>
        <div class="indent">
            <p>我的订单</p>
            <ul>
                <li>
                    <em class="iconfont icon-daifukuan"></em>
                    <span>待付款</span>
                </li>
                <li>
                    <em class="iconfont icon-daifahuo"></em>
                    <span>待发货</span>
                </li>
                <li>
                    <em class="iconfont icon-dsh"></em>
                    <span>待收货</span>
                </li>
                <li>
                    <em class="iconfont icon-wodezuiai"></em>
                    <span>我的订单</span>
                </li>
            </ul>
        </div>
        <div class="server">
            <p>我的服务</p>
            <ul>
                <li>
                    <em class="iconfont icon-gerenziliao"></em>
                    <span>个人资料</span>
                </li>
                <li>
                    <em class="iconfont icon-kefu"></em>
                    <span>在线客服</span>
                </li>
                <li>
                    <em class="iconfont icon-fapiao"></em>
                    <span>我的发票</span>
                </li>
                <li>
                    <em class="iconfont icon-guanyuwomen"></em>
                    <span>关于我们</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {mapActions} from 'vuex';
    export default {
        name: "Userinfo",
        data() {
            return {

            }
        },
        computed: mapState(['userName', 'token']),
        methods: {
            ...mapActions(['reqCarnum']),
            toLogin() {
                this.$router.push('/user/login');
            },
            // 点击退出
            exitLogin() {
                // 退出时清空本地和store里的token
                this.$store.state.token = "";
                localStorage.setItem('token', "");
                this.reqCarnum();
            }
        },  
    }
</script>

<style lang="scss" scoped>
    .userinfo{
        height: 100vh;
        background-color: #e9e9e9;
    }
    .top{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 0.2rem 0;
        background-color: #fff;
        .picture{
            width: 2rem;
            height: 2rem;
            line-height: 2rem;
            border-radius: 50%;
            background-color: orange;
            margin: 0.2rem;
        }
        .loginbtn{
            width: 1.5rem;
            height: 0.5rem;
            line-height: 0.5rem;
            color: #fff;
            background-color:#d8961b;
        }
        .username{
            font-size: 0.4rem;
            font-weight: bold;
            color: #d8961b;
            .name{
                padding: 0.1rem 0.2rem;
            }
            .exit{
                color: rgb(235, 70, 70);
            }
        }
    }
    .indent{
        background-color: #fff;
        margin: 0.2rem 0;
        padding: 0.3rem 0;
    }

    .server{
        background-color: #fff;
        padding: 0.3rem 0;
    }

    ul{
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0.6rem 0;
        li{
            display: flex;
            flex-direction: column;
            em{
                color: #d8961b;
                font-size: 0.4rem;
                padding-bottom: 0.1rem;
            }
        }
    }
</style>