import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from './assets/js/axios'

export default new Vuex.Store({
	state: {
		token: "",
		userName: "",
		carNum: 0,
	},
	mutations: {
		changeToken(state, data) {
			state.token = data;
		},
		changeCarNum(state, data){
			state.carNum = data;
		}
	},
	actions: {
		reqCarnum({commit,state}) {
			// 此处无需再传参数token，已设置全局请求参数token
			axios.post('/api/car/list').then((res) => {
				const { code, msg, list, userName } = res;
				if(code == 1){
					state.userName = userName;
					let num = 0;
					for(var i = 0; i < list.length; i++){
						num += list[i].buyNum;
					}
					commit('changeCarNum', num);
				}else{
					console.log(msg);
				}
			})
		},
		}
})
