<template>
    <div class="goodsdetail">
        <!-- 顶部部导航 -->
        <ul class="top">
            <li v-for="(item,index) in topList" :key="index" :class="{active: item.type === type}" @click="chooseTop(item.type)">{{item.name}}</li>
        </ul>
         
        <!-- 遮罩层 -->
            <div class="shadow" v-show="isShow" @click="Hideshadow"></div>

        <!-- 弹框 -->
        <transition name="popup">
            <div class="goodsinfo" v-if="isShow">
                <div class="infoimg">
                    <img :src="$commonUrl + info.goodsImg" alt="">
                    <div class="right">
                        <p>{{info.goodsName}}</p>
                        <span>￥{{skusPrice}}</span>
                        <div class="buynum">
                            <span class="reduce" @click="Reduce">-</span>
                            <div class="num">{{buynum}}</div>
                            <span class="add" @click="Increase">+</span>
                        </div>
                    </div>
                </div>
                <div class="goodskus">
                    <p>建议食用人数</p>
                    <!-- 规格选项栏 -->
                    <ul class="infoskus">
                        <li v-for="(item,index) in info.goodsSkus" :key="index" :class="{active: buysku == item}" @click="chooseSkus(item,index)">{{item}}</li>
                    </ul>
                </div>
                <div class="weight">
                    <span v-for="(item,index) in skusList[index].list" :key="index">{{item}}</span>
                </div>
                <div class="btn">
                    <div class="buysoon">立即购买</div>
                    <div class="addcar" @click="addCar">加入购物车</div>
                </div>
            </div>
        </transition>

        <!-- 物品详情 -->
        <div class="content" v-if="info"> <!-- 需判断info的属性值是否是null -->
            <img :src="$commonUrl + info.goodsImg" alt="">
            <p class="goodsname">{{info.goodsName}}</p>
            <p class="taste">
                <span>口味:{{info.goodsTaste}}</span>
                <span class="sweetness">甜度: {{info.goodsSweet}}</span>
            </p>
            <p class="price">￥{{info.goodsPrice}}</p>
            <div class="skus" @click="Showshadow">
                <span>已选规格: {{buysku}}</span>
                <span class="iconfont icon-klinerightmove"></span>
            </div>
        </div>

        <!-- 底部导航 -->
        <div class="nav">
            <div class="tel">
                <span class="iconfont icon-kefu"></span>
                <p>客服</p>
            </div>
            <div class="home" @click="toHome">
                <span class="iconfont icon-zhuye"></span>
                <p>首页</p>
            </div>
            <div class="car" @click="toCar">
                <span class="iconfont icon-gouwuche1"></span>
                <p>购物车</p>
            </div>
            <div class="addcar" @click="Showshadow">加入购物车</div>
            <div class="carnum" v-if="token">{{carNum}}</div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import {mapState} from 'vuex';
    import {mapActions} from 'vuex';

    export default {
        name: "GoodsDetail",
        data() {
            return {
                id: "",
                topList: [
                    {type: 1, name: "商品"},
                    {type: 2, name: "评价"},
                    {type: 3, name: "详情"},
                    {type: 4, name: "推荐"}
                ],
                type: 1,
                info: null, // 商品详情信息
                isShow: false,
                buynum: 1, // 购买数量
                buysku: "2-4人食", // 选的商品规格
                index: 0,
                skusPrice: 218, // 选中规格时对应的价格
                skusList:[
                    {skuType: "2-4人食", price: 218, list: ["约454g", "约13*13*3cm", "含5套餐具"]},
                    {skuType: "5-8人食", price: 298, list: ["约1090g", "约15*15*3cm", "含10套餐具"]},
                    {skuType: "9-12人食", price: 458, list: ["约1635g", "约20*20*3cm", "含15套餐具"]},
                    {skuType: "15-20人食", price: 680, list: ["约2725g", "约33*33*3cm", "含20套餐具"]}
                ]
            }
        },
        computed: mapState(['token', 'carNum']),
        methods: {
            chooseTop(itemtype) {
                this.type = itemtype;
            },
            // 商品加入购物车
            addCar() {
                if(!this.buysku){
                    Toast("请选择商品规格");
                    return false;
                }
                this.$axios.post('/api/car/add', {
                    goodsId: this.id,
                    buyNum: this.buynum,
                    buySku: this.buysku,
                    skusPrice: this.skusPrice,
                    isChoose: false
                }).then((res) => {
                    const { code, msg } = res;
                    if(code == 1){
                        Toast("加入购物车成功");
                        this.reqCarnum();
                    }else if(code == -2){ // token过期
                        Toast({
                            message: "请先登录",
                            duration: 1000
                        });
                        setTimeout(() => {
                            this.$router.push('/user/login');
                        }, 1000);
                    }else{
                        Toast(msg);
                    }
                })
                this.isShow = false;
            },
            // 获取详情页商品信息
            reqGoodsDetail() {
                this.$axios.post('/api/goods/detail', {
                    goodsId: this.id
                }).then((res) => {
                    const { code, msg, data } = res;
                    if(code == 1){
                        this.info = data;
                    }else{
                        Toast(msg);
                    }
                })
            },
            // 回首页
            toHome() {
                this.$router.push('/home')
            },
            // 遮罩层的显隐
            Showshadow() {
                if(!this.token){
                    Toast({
                        message: "请先登录",
                        duration: 1000
                    });
                    setTimeout(() => {
                        this.$router.push('/user/login');
                    }, 1000);
                }else{
                    this.isShow = true;
                }
            },
            // 跳转购物车页面
            toCar() {
                if(!this.token){
                    Toast({
                        message: "请先登录",
                        duration: 1000
                    });
                    setTimeout(() => {
                        this.$router.push('/user/login');
                    }, 1000);
                }else{
                    this.$router.push('/goods/carlist');
                }
            },
            // 点击遮罩层隐藏弹框
            Hideshadow() {
                this.isShow = false;
            },
            // 加购买数量
            Increase() {
                this.buynum++;
            },
            // 减购买数量
            Reduce() {
                if(this.buynum > 1){
                    this.buynum--;
                }else{
                    Toast("数量至少为1");
                }
            },
            // 选择商品规格
            chooseSkus(itemskus,index) {
                if(this.buysku == itemskus){
                    this.buysku = "";
                }else{
                    this.buysku = itemskus;
                    this.index = index;
                    this.skusPrice = this.skusList[index].price;
                }
            },
            ...mapActions(['reqCarnum'])
        },
        mounted() {
            // 获取被点击商品的id
            this.id = this.$route.params.id;
            this.reqGoodsDetail();
        },
    }
</script>

<style lang="scss" scoped>

    .top{
        height: 0.8rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: sticky;
        top: 0;
        left: 0;
        background-color: #fff;
        box-sizing: border-box;
        border-bottom: 1px solid rgb(204, 204, 204);
        li{
            height: 0.73rem;
            line-height: 0.73rem;
            padding: 0rem 0.15rem;
            border-bottom: 3px solid #fff;
            &.active{
                color: red;
                border-bottom: 3px solid red;
            }
        }
    }
    .content{
        display: flex;
        flex-direction: column;
        text-align: left;
        height: 100vh;
        img{
            height: 6rem;
            padding-bottom: 0.3rem;
        }
        p{
            padding: 0.2rem 0.4rem;
        }
        .goodsname{
            font-weight: bold;
            font-size: 0.3rem;
        }
        .price{
            color: red;
        }
        .skus{
            padding: 0.2rem 0.4rem;
            background-color: #f1f1f1;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .taste{
            display: flex;
            span{
                width: 50%;
            }
        }
    }

    .nav{
        height: 0.9rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: #fff;
        padding-left: 0.9rem;
        border-top: 1px solid rgb(204, 204, 204);
        p{
            font-size: 0.25rem;
            color: rgb(224, 164, 86);
        }
        span{
            font-size: 0.3rem;
            color: rgb(224, 164, 86);
        }
        .addcar{
            width: 2rem;
            line-height: 0.9rem;
            color: #fff;
            background-color: rgb(255, 28, 28);
        }
        .carnum{
            width: 0.25rem;
            height: 0.25rem;
            text-align: center;
            line-height: 0.25rem;
            font-size: 0.2rem;
            background-color: red;
            padding: 0.05rem;
            border-radius: 50%;
            color: #fff;
            position: absolute;
            top: 0rem;
            left: 4.2rem;
        }
    }

    .shadow{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        background-color: rgba(0, 0, 0, .5);
    }

    .popup-enter,.popup-leave-to{
        transform: translateY(100%);
    }
    .popup-enter-to,.popup-leave{
        transform: translateY(0);
    }
    .popup-enter-active,.popup-leave-active{
        transition: all 0.5s ease;
    }

    .goodsinfo{
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 1000;
        width: 100vw;
        display: flex;
        box-sizing: border-box;
        padding: 0 0.3rem;
        flex-direction: column;
        background-color: #fff;
        padding-bottom: 0.1rem;
        border-bottom: 1px solid #000;
        div{
            padding: 0.1rem 0;
        }
        .infoimg{
            display: flex;
            align-items: center;
            padding: 0 0.5rem;
            img{
                width: 2rem;
                height: 2rem;
                position: relative;
                top: -0.3rem;
            }
            .right{
                padding-left: 0.4rem;
                span{
                    color: red;
                }
                p{
                    padding-bottom: 0.2rem;
                }
                .buynum{
                    width: 1.5rem;
                    height: 0.5rem;
                    display: flex;
                    align-items: center;
                    padding-top: 0.2rem;
                    .reduce,.add{
                        width: 0.3rem;
                        color: #000;
                        background-color: #d1d1d1;
                    }
                    .num{
                        flex: 1;
                    }
                }

            }
        }
        .goodskus{
            display: flex;
            flex-direction: column;
            p{
                text-align: left;
                padding: 0 0 0.3rem 0.25rem;
                color: #666;
            }
            .infoskus{
                display: flex;
                justify-content: space-around;
                align-items: center;
                li{
                    padding: 0.1rem 0.2rem;
                    background-color: #eee;
                    border: 1px solid #eee;
                    color: #ccb11a;
                    &.active{
                        border-color: red;
                        color: red;
                    }
                }
            }
        }
        .weight{
            height: 0.3rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 0.2rem 0;
        }
        .btn{
            height: .6rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding: 0.1rem 0;
            div{
                width: 48%;
                height: 100%;
                border-radius: .2rem;
                line-height: 0.45rem;
            }
            .buysoon{
                color: #f34545;
                border: 1px solid #f34545;
            }
            .addcar{
                background-color: #f34545;
                color:#fff;
            }

        }
    }

</style>