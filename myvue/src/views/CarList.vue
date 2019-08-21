<template>
    <div class="carlist">
        <div class="caritem" v-for="(item) in carList" :key="item._id">
            <img :src="require(`../assets/images/${item.isChoose ? 'chose' : 'unchose'}.png`)" class="chooseone" @click="CheckOne(item)">
            <img :src="$commonUrl + item.goodsImg" class="goodsimg" @click="ToDetail(item.goodsId)">
            <div class="info">
                <p class="goodsname">{{item.goodsName}}</p>
                <p class="skus">规格: {{item.buySku}}</p>
                <div class="bottom">
                    <div class="price">￥{{item.goodsPrice}}</div>
                    <div class="changenum">
                        <span class="reduce" @click="Reduce(item)">-</span>
                        <div class="buynum">{{item.buyNum}}</div>
                        <span class="increase" @click="Increase(item)">+</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="nocontent" v-if="carList.length == 0">
            <img src="../assets/images/no_content.png" alt="">
            <div class="msg">
                <p>您还没有选购任何商品</p>
                <router-link to="/goods/cake">去逛逛</router-link>
            </div>
        </div>
        <div class="bottomnav">
            <div class="checkall" @click="CheckAll">
                <img :src="require('../assets/images/' + (isAll ? 'chose' : 'unchose') + '.png')" alt="">
                <span class="chooseall">全选</span>
            </div>
            <div class="del" @click="DelAll">删除</div>
            <div class="totalmsg">
                <div class="total">
                    <div class="text">应付: &nbsp;</div>
                    <span>￥{{CarTotal}}</span>
                </div>
                <div class="payment" @click="ToSettlement">结算</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import {mapActions} from 'vuex';
    export default {
        name: "CarList",
        data() {
            return {
                carList: []
            }
        },
        computed: {
            // 给属性isAll绑定函数get和set，调用它的属性值时触发函数set，给它赋新的属性值时调用函数set
            isAll: {
                get() {
                    // 用every检测每一个商品是否都选中
                    return this.carList.every(item => {
                        return item.isChoose
                    });
                },
                set(val) {
                    // 把全选按钮是否选中的结果赋给每一个商品
                    this.carList.forEach(item => {
                        return item.isChoose = val
                    });
                }
            },
            // 购物车合计
            CarTotal() {
                let totalPrice = 0;
                for(var i = 0; i < this.carList.length; i++){
                    if(this.carList[i].isChoose){
                        totalPrice += this.carList[i].buyNum * this.carList[i].goodsPrice;
                    }
                }
                return totalPrice;
            },
        },
        methods: {
            // 获取购物车商品列表
            reqCarlist() {
                // 此处无需再传参数token，已设置全局请求参数token
                this.$axios.post('/api/car/list').then((res) => {
                    const { code, msg, list } = res;
                    if(code == 1){
                        this.carList = list;
                    }else{
                        Toast(msg);
                    }
                })
            },
            // 加商品数量
            Increase(item) {
                this.$axios.post('/api/car/update', {
                    id: item._id,
                    num: item.buyNum+1
                }).then((res) => {
                    const { code, msg } = res;
                    if(code == 1){
                        item.buyNum++;
                        this.reqCarnum();
                    }else{
                        Toast(msg);
                    }
                })
            },
            // 减商品数量
            Reduce(item) {
                this.$axios.post('/api/car/update', {
                    id: item._id,
                    num: item.buyNum - 1
                }).then((res) => {
                    const { code, msg } = res;
                    if(code == 1){
                        if(item.buyNum > 1){
                            item.buyNum--;
                        }else{
                            Toast("商品数量至少为1")
                        }
                        this.reqCarnum();
                    }else{
                        Toast(msg);
                    }
                })
            },
            // 单选
            CheckOne(item) {
                item.isChoose = !item.isChoose;
            },
            // 全选
            CheckAll() {
                this.isAll = !this.isAll;
            },
            // 选中删除
            DelAll() {
                const list = this.carList;
                // 没有商品被勾选
                if(!list.some(e => e.isChoose)){
                    Toast("请勾选商品");
                    return false;
                }
                let id = "";
                id = list.filter(e => e.isChoose).map(e => e._id).join();
                this.$axios.post('/api/car/del', {
                    id
                }).then((res) => {
                    const { code, msg } = res;
                    if(code == 1){
                        setTimeout(() => {
                            Toast({
                                message: msg,
                                duration: 500
                            });
                        }, 700);
                        // 数据删除后重新加载页面
                        this.reqCarlist();
                        this.reqCarnum();
                    }else{
                        Toast(msg);
                    }
                })
            },
            ToDetail(id) {
                this.$router.push('/goods/detail/' + id);
            },
            // 跳转到结算页面时，将已勾选的的商品id变成字符串传给结算页面用
            ToSettlement() {
                if(!this.carList.some(e => e.isChoose)){
                    Toast("请勾选商品");
                    return false;
                }
                let id = "";
                id = this.carList.filter(e => e.isChoose).map(e => e._id).join();
                this.$router.push('/goods/settlement/' + id);
            },
            ...mapActions(['reqCarnum']),
        },
        mounted() {
            this.reqCarlist();
        },
    }
</script>

<style lang="scss" scoped>
    .carlist{
        background-color: #fff;
    }
    .caritem{
        display: flex;
        align-items: center;
        padding: 0.1rem 0.2rem;
        background-color: #f5f5f5;
        margin: 0.1rem 0;
        .chooseone{
            width: 0.3rem;
            height: 0.3rem;
            padding: 0 0.2rem;
        }
        .goodsimg{
            width: 2rem;
            height: 2rem;
        }
        .info{
            display:flex;
            flex-direction: column;
            padding-left: 0.3rem;
            p{
                text-align: left;
            }
            .goodsname{
                font-weight: bold;
            }
            .skus{
                padding: 0.2rem 0;
            }
            .bottom{
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 3.5rem;
                padding-top: 0.3rem;
                .price{
                    color: red;
                }
                .changenum{
                    width: 1.5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span{
                        height: 0.3rem;
                        width: 0.3rem;
                        background-color: #d6d6d6;
                    }
                    .buynum{
                        flex: 1;
                        margin: 0 .1rem;
                        background-color: #d6d6d6;
                    }
                }
                
            }
        }
        .msg{
            padding: 0.2rem 0.3rem;
        }
    }
    .nocontent{
        padding-top: 3rem;
        .msg{
            p{
                padding: 0.3rem 0 ;
            }
            a{
                color: red;
            }
        }
    }

    .bottomnav{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 1.3rem;
        height: 0.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left:0.3rem;
        background-color: #fff;
        .checkall{
            display: flex;
            justify-content: space-between;
            align-items: center;
            img{
                width: 0.3rem;
                height: 0.3rem;
                padding-right: 0.1rem;
            }
        }
        .del{
            color:red;
            font-weight: bold;
        }
        .totalmsg{
            width: 4rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .total{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-right: .3rem;
                padding-left: 0.2rem;
                span{
                    color: red;
                    font-weight: bold;
                }
            }
            .payment{
                padding: 0.2rem 0;
                width: 1.5rem;
                color: #fff;
                background-color: red;
            }
        }
    }
</style>