<template>
        <!-- 返回顶部图标 -->
        <img
            src="../assets/images/backTop.png"
            alt=""
            class="icon"
            v-show="isTop"
            @click="backTop"
        />
</template>

<script>
    export default {
        name: "BackTop",
        data() {
            return {
                isTop: false
            }
        },
        props: ['scrollRef'],
        computed: {
            // 确定滚动的对象
            scrollObj() {
                const scrollRef = this.scrollRef;
                // 如果没有传入scrollRef，滚动对象就是window，如果有scrollRef，就在使用这个scrollRef所在的父组件中找到这个带有scrollRef的元素，并找到ref值与scrollRef值相同的那个带有ref的元素(其实就是找滚动内容的父标签)
                return !scrollRef ? window : this.$parent.$refs[scrollRef];
            }
        },
        methods: {
            scrollTop() {
                const scrollObj = this.scrollObj;
                // 如果滚动对象是window，直接获取根元素的scrollTop，如果滚动对象是某个div，就获取它的scrollTop
                const scrollTop = scrollObj == window ? document.documentElement.scrollTop || document.body.scrollTop : scrollObj.scrollTop;
                this.isTop = scrollTop > 600 ? true : false;
            },
            backTop() {
                this.scrollObj.scrollTo(0, 0);
            },
        },
        mounted() {
            // 监听页面滚动,显示返回顶部的图标
             this.scrollObj.onscroll = this.scrollTop;
        },
    }

</script>

<style lang="scss" scoped>
    .icon {
        width: 0.7rem;
        height: 0.7rem;
        position: fixed;
        right: 0.35rem;
        bottom: 1.8rem;
    }
</style>