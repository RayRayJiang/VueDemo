<template>
	<div class="home">
		<div class="swiper-container">
			<mt-swipe :auto="2000">
					<mt-swipe-item v-for="(item) in imglist" :key="item._id">
						<img :src="$commonUrl + item.goodsImg" @click="toDetail(item._id)" />
					</mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="homelist">
			<img class="fuli" src="../assets/images/fuli.jpg" alt="">
			<img class="fuli" src="../assets/images/fuli2.jpg" alt="">
			<h2>生日蛋糕<span class="iconfont icon-klinerightmove"></span></h2>
			<ul class="goodslist">
				<GoodsItem v-for="(item) in cakeList" :key="item._id" :item="item" />
			</ul>
			<img class="fuli" src="../assets/images/milkBanner1.jpg" alt="">
			<img class="fuli" src="../assets/images/milkBanner2.jpg" alt="">
			<h2>下午茶歇<span class="iconfont icon-klinerightmove"></span></h2>
			<div class="teabox">
				<ul class="tealist">
					<GoodsItem v-for="(item) in teaList" :key="item._id" :item="item" />
				</ul>
			</div>
		</div>
		<BackTop />
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import GoodsItem from "@/components/GoodsItem.vue";
import BackTop from "@/components/BackTop.vue";

export default {
	name: "home",
	data() {
		return {
		imglist: [],
		cakeList: [],
		teaList: []
		};
	},
	components: {
		GoodsItem,
		BackTop
	},
	methods: {
		// 根据商品类型获取列表
		ReqTypelist(type) {
			return this.$axios.post('/api/goods/typelist', {
				goodsType: type
			})
		},
		// 获取蛋糕列表
		ReqCake() {
			this.ReqTypelist(3).then((res) => {
				const { code, msg, list } = res;
				if(code == 1){
					this.cakeList = list;
				}else{
					Toast(msg);
				}
			})
		},
		// 获取下午茶列表
		ReqTea() {
			this.ReqTypelist(2).then((res) => {
				const { code, msg, list } = res;
				if(code == 1){
					this.teaList = list;
				}else{
					Toast(msg);
				}
			})
		},
		// 轮播图
		reqSwiper() {
			this.$axios.post('/api/goods/swiper').then((res) => {
				const { code, msg, list } = res;
				if(code == 1) {
					this.imglist = list;
				}else{
					console.log(msg);
				}
			})
		},
		toDetail(id) {
			this.$router.push('/goods/detail/' + id)
		}
	},
	mounted() {
		this.ReqCake();
		this.ReqTea();
		this.reqSwiper();
	},
};
</script>

<style lang="scss" scoped>

.swiper-container {
    height: 7rem;
	padding: 0.2rem;
    /deep/.mint-swipe {
        .mint-swipe-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .mint-swipe-indicator {
            width: 0.2rem;
            height: 0.2rem;
            margin: 0 0.1rem;
            opacity: 0.5;
            &.is-active {
                background-color: rgb(255, 0, 0);
            }
        }
    }
}
.homelist{
	.fuli{
		width: 100vw;
		height: 3rem;
	}
	h2{
		padding: 0.2rem 0;
		span{
			font-size: 0.3rem;
			padding-left: 0.15rem;
		}
	}
	.goodslist{
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
	}
	.teabox{
		width: 100vw;
		overflow-y: scroll;
		margin-bottom: 1.5rem;
		.tealist{
			width: 200%;
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
	}
}

</style>

