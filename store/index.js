import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        hasLogin: false,
        token: null,
		avatar:null,
		userFlag:false,
		info:null
    },
    mutations: {
		updateInfo(state, userInfo) {
			state.info = userInfo
		},
        login(state, userInfo) {
            state.token = userInfo.access_token;
			state.info = userInfo
            state.hasLogin = true;
			uni.setStorageSync('token', userInfo.access_token);
        },
        logout(state) {
            state.token = null;
			state.info = null;
			state.avatar = null;
            state.hasLogin = false;
			state.userFlag = false;
			uni.removeStorageSync('token');
        },
		upavatar(state,avatar) {
			state.avatar = avatar;
		},
		setFlag(state,flag) {
			if(Number(flag) < 5){
				state.userFlag = false
			}else{
				state.userFlag = true
			}
		}
    }
})

export default store
