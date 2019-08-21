<template>
    <div class="settleitem">
        <img :src="$commonUrl + item.goodsImg" class="goodsimg" @click="ToDetail(item.goodsId)">
        <div class="info">
            <p class="goodsname">{{item.goodsName}}</p>
            <p class="skus">规格: {{item.buySku}}</p>
            <div class="bottom">
                <div class="price">￥{{item.goodsPrice}}</div>
                <div class="changenum">
                    ×{{item.buyNum}}
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "SettleItem",
        props: ['item'],
        methods: {
            ToDetail(id) {
                this.$router.push('/goods/detail/' + id);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .settleitem{
        display: flex;
        align-items: center;
        padding: 0.1rem 0.2rem;
        background-color: #fff;
        margin: 0.1rem 0;
        .goodsimg{
            width: 2rem;
            height: 2rem;
            padding-left: 0.5rem;
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
            }
        }
        .msg{
            padding: 0.2rem 0.3rem;
        }
    }

</style>