import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            username: window.localStorage.getItem('user' || '[]') == null ? 
                '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username
        },
        userinfo: {
            name: '',
            id: '',
            email: ''
        }
    },
    mutations: {
        login(state, user){
            state.user = user
            window.localStorage.setItem('user', JSON.stringify(user))
        },
        logout(state){
            state.user = []
            state.userinfo = []
            window.localStorage.removeItem('user')
        },
        setUserinfo(state, payload){
            state.userinfo.name = payload.username
            state.userinfo.id = payload.uid
            state.userinfo.email = payload.email
        }
    }
})