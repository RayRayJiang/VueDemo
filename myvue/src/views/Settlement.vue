<template>
    <div class="settlement">
        <div class="address">
            请填写收货地址 <span class="iconfont icon-tianxiedizhi"></span>
        </div>
        <SettleItem v-for="(item) in settleList" :key="item._id" :item="item"/>
        <div class="settlenav">
            <div class="left">
                <span>实付: </span>
                <span>￥{{totalPrice.toFixed(2)}}</span>
            </div>
            <div class="right">结算</div>
        </div>
       <mt-radio
            align="right"
            title="选择支付方式"
            :options="options">
        </mt-radio>

    </div>
</template>

<script>
    import SettleItem from '@/components/SettleItem.vue';

    export default {
        name: "Settlement",
        data() {
            return {
                // value: false,
                options: [
                    "支付宝",
                    "银联支付",
                    "建行龙支付",
                    "浦发快捷支付"
                ],
                id: "",
                settleList: [],
                totalPrice: 0
            }
        },
        components: {
            SettleItem
        },
        methods: {
            reqSettlelist() {
                this.$axios.post('/api/car/settlement', {
                    id: this.id
                }).then((res) => {
                    const { code, msg, list } = res;
                    if(code == 1){
                        this.settleList = list;
                        for(var i = 0; i < list.length; i++){
                            this.totalPrice += list[i].buyNum * list[i].goodsPrice;
                        }
                    }else{
                        Toast(msg);
                    }
                })
            },
        },
        mounted() {
            this.id = this.$route.params.id;
            this.reqSettlelist();
        },
    }
</script>

<style lang="scss" scoped>
    .settlement{
        background-color: #f5f5f5;
    }
    .address{
        height: 2.5rem;
        font-size: .3rem;
        line-height: 2.5rem;
        background-color: #fff;
        font-weight: bold;
        margin-bottom: .2rem;
        border-bottom: 2px dashed orangered;
        span{
            font-weight: normal;
            font-size: 0.4rem;
            padding-left: 0.2rem;
        }
    }
    .settlenav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 999;
        font-size: 0.3rem;
        box-sizing: border-box;
        background-color: #fff;
        height: .9rem;

        .right{
            width: 2rem;
            line-height: .9rem;
            background-color: red;
            color: #fff;
            border-top: 1px solid red;
        }
        .left{
            flex: 1;
            height: 0.9rem;
            color: red;
            font-weight: bold;
            line-height: 0.9rem;
            text-align: left;
            padding-left: 0.5rem;
            border-top: 1px solid #e2e2e2;
        }
    }
    /deep/.mint-radiolist{
        margin-bottom: 1.5rem;
        .mint-radiolist-title{
            font-size: .3rem;
            color: #000;
            font-weight: bold;
            padding: 0.1rem 0;
        }
    }
</style>