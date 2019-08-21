<template>
    <div class="goodsitem" @click="ToDetail(item._id)">
        <img :src="$commonUrl + item.goodsImg" alt="">
        <h3>{{item.goodsName}}</h3>
        <p class="tag">{{item.goodsTitle}}</p>
        <p class="title">
            <span>{{item.goodsTag}}</span>
        </p>
        <div class="pricebox">
            <span class="price">￥{{item.goodsPrice}}</span>
            <span>已售{{item.goodsNum}}份</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GoodsItem",
        props: ['item'],
        methods: {
            ToDetail(id) {
                this.$router.push('/goods/detail/' + id);
            }
        },
    }
</script>

<style lang="scss" scoped>

    .goodsitem{
        width: 48%;
        padding: 0 0.05rem;
        margin-bottom: .2rem;
        img{
            height: 3rem;
            width: 100%;
            object-fit: cover;
        }
        h3{
            padding: 0.1rem 0;
        }
        .tag{
            color: #949494;
            padding: 0.1rem 0 0.2rem;
        }
        .title{
            height: 0.4rem;
            color: #fff;
            span{
                background-color: #cca976;
            }
        }
        .pricebox{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.2rem 0.3rem;
            .price{
                color: #ff5d13;
            }
        }
    }

</style>