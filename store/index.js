import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        hasLogin: false,
        token: null,
		avatar:null,
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
			uni.removeStorageSync('token');
        },
		upavatar(state,avatar) {
			state.avatar = avatar;
		},
    }
})

export default store
