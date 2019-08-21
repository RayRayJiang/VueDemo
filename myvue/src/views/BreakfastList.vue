<template>
    <div class="breakfastlist">
        <img src="../assets/images/fastBanner.jpg" alt="">
        <GoodsItem v-for="(item) in list" :key="item._id" :item='item' />
    </div>
</template>

<script>
    import GoodsItem from "@/components/GoodsItem.vue";
    export default {
        name: "BreakfastList",
        data() {
            return {
                list: []
            }
        },
        components: {
            GoodsItem
        },
        methods: {
            ReqTypelist() {
                this.$axios.post('/api/goods/typelist', {
                    goodsType: 1
                }).then((res) => {
                    const { code, msg, list } = res;
                    if(code == 1){
                        this.list = list;
                    }else{
                        Toast(msg);
                    }
                })
            },
        },
        mounted() {
            this.ReqTypelist();
        },
    }
</script>

<style lang="scss" scoped>
	.breakfastlist{
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
        margin-bottom: 1.5rem;
        img{
            width: 100vw;
            height: 2.5rem;
        }
	}
</style>