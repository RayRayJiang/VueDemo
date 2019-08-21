<template>
    <div class="cakelist"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
        <div class="navtop" ref="top">
            <div class="all" @click="onAll">全部</div>
            <div class="goodsnum" @click="showSort('goodsNum')">
                <span>销量</span>
                <img src="../assets/images/sort.jpg" v-show="rank == 'goodsNum'" :class="{asc: order == 1}">
            </div>
            <div class="goodsprice" @click="showSort('goodsPrice')">
                <span>价格</span>
                <img src="../assets/images/sort.jpg" v-show="rank == 'goodsPrice'" :class="{asc: order == 1}">
            </div>
            <div class="skus" @click="onTaste">口味筛选</div>
        </div>
        <ul class="taste" v-show="isTaste">
            <li v-for="(item,index) in typeList" :key="index" @click="chooseTaste(item.tasteName)" :class="{active: goodsTaste == item.tasteName}">{{item.tasteName}}</li>
        </ul>
        <GoodsItem v-for="(item) in list" :key="item._id" :item="item" />
        <span v-show="loadDown">没数据了，老哥!</span>
        <BackTop />
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import GoodsItem from "@/components/GoodsItem.vue";
    import BackTop from "@/components/BackTop.vue";
    export default {
        name: "CakeList",
        data() {
            return {
                pageNum: 1,
                loading: true, // 关闭或开启加载更多数据
                loadDown: false,
                list: [],
                typeList: [
                    {tasteName: "雪域口味"},
                    {tasteName: "水果口味"},
                    {tasteName: "奶油口味"},
                    {tasteName: "芝士口味"},
                    {tasteName: "巧克力口味"},
                    {tasteName: "慕斯口味"},
                ],
                isTaste: false,
                rank: "",
                order: 0,
                goodsTaste: "",
                catch_scrollTop: 0
            }
        },
        components:{
            GoodsItem,
            BackTop
        },
        methods: {
            ReqTypelist(type, pageNum) {
                return this.$axios.post('/api/goods/cakelist', {
                    goodsType: type,
                    pageNum: pageNum,
                    rank: this.rank,
                    order: this.order,
                    goodsTaste: this.goodsTaste
                })
            },
            cakeList(val) {
                // 调用该函数时，可根据是否传参，来清空某些传给后台的关键字
                if(val){
                    this.rank = "";
                    this.goodsTaste = ""
                }
                this.ReqTypelist(3,1).then((res) => {
                    const { code, msg, list } = res;
                    if(code == 1){
                        this.list = list;
                        // 进入页面时，只加载第一页
                        this.pageNum = 1;
                        // 初次进入时开启无限加载
                        this.loading = false;
                        // 初次进入时隐藏数据加载完成的提示语
                        this.loadDown = false;
                    }else{
                        Toast(msg);
                    }
                })
            },
            // 向上滑动加载更多数据
            loadMore() {
                // 关闭无限加载
                this.loading = true;
                this.ReqTypelist(3,this.pageNum + 1).then((res) => {
                    const { code, msg, list } = res;
                    if(code == 1){
                        if(list.length){
                            this.list = this.list.concat(list);
                            this.pageNum += 1;
                            // 数据存在时再开启无限加载
                            this.loading = false;
                        }else{
                            // 数据全部加载完后，关闭无限加载，显示加载完成的提示语
                            this.loading = true;
                            this.loadDown = true;
                        }
                    }else{
                        Toast(msg);
                    }
                })
            },
            // 口味选择栏
            onTaste() {
                this.isTaste = ! this.isTaste;
            },
            // 排序
            showSort(rank) {
                // 排序依据没有改变，即点击同一排序按钮多次
                if(this.rank == rank){
                    this.order = -this.order // 让升降序的图标改变方向
                // 排序依据改变
                }else{
                    this.rank = rank;
                    this.order = 1;
                }
                this.cakeList();
            },
            // 口味分类查询
            chooseTaste(tastename) {
                this.goodsTaste = tastename;
                this.cakeList();
                this.isTaste = false;
            },
            onAll() {
                this.cakeList('all');
                this.isTaste = false;
            }
        },
        mounted() {
            this.cakeList();
        },

        // 记录页面的滑动位置
        activated() {
            // 再次回来的时候,直接滚动到之前离开时候保存的位置
            window.scrollTo(0, this.catch_scrollTop);
        },
        // 离开路由之前,它会在deactivated之前调用
        beforeRouteLeave(to, from, next) {
            // 获取顶部状态栏距离父元素顶部的距离,赋给一个新的变量
            this.catch_scrollTop = this.$refs.top.offsetTop;
            // 必须调用next,否则就不会离开当前路由
            next();
        }
        
    }
</script>

<style lang="scss" scoped>
	.cakelist{
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
        margin-bottom: 1.5rem;
	}
    .navtop{
        width: 100vw;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: sticky;
        top: 0;
        left: 0;
        padding: 0.3rem 0.2rem;
        background-color: rgb(242, 250, 235);
        .goodsnum,.goodsprice{
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 0.3rem;
                height: 0.27rem;
                &.asc{
                    transform: rotate(180deg);
                }
            }
        }
    }
    .taste{
        width: 100vw;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: fixed;
        top: 0.9rem;
        left: 0;
        padding: 0.2rem;
        background-color: rgb(220, 250, 255);
        flex-wrap: wrap;
        li{
            width: 33%;
            padding: 0.1rem 0;
            &.active{
                color: rgb(253, 99, 99);
                font-weight: bold;
            }
        }
    }
</style>

