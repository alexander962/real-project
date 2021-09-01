export default {
    state:{
        loggedIn:false,
        user: null,
        token: null
    },
    mutations:{
        SET_token(state,payload){
            state.token = payload
        },
        SET_user(state,payload){
            state.user = payload
        },
        SET_loggedIn(state,payload){
            state.loggedIn = payload
        }
    },
    actions:{
        performLoginAction({commit}, payload){
            return new Promise( (resolve, reject) => {
                axios.post('/api/auth/login',{
                    name:payload.name,
                    password:payload.password
                    }).then(res =>{
                        commit('SET_token', res.data.access_token)
                        commit('SET_user', res.data.user)
                        commit('SET_loggedIn', true)
                        resolve(res)
                    }
                    ).catch( err => {
                        reject(err)
                    })
            })
        },
        performRegisterAction({commit}, payload){
            return new Promise( (resolve, reject) => {
                axios.post('/api/auth/register',{
                    name:payload.name,
                    email:payload.email,
                    password:payload.password,
                    password_confirmation:payload.password_confirmation,
                    accept_rules:payload.accept_rules,
                    ref: payload.ref
                    }).then(res =>{
                        commit('SET_token', res.data.access_token)
                        commit('SET_user', res.data.user)
                        commit('SET_loggedIn', true)
                        resolve(res)
                    }
                    ).catch( err => {
                        reject(err)
                    })
            })
        },
        performLogoutAction({state,commit}){
            return new Promise( (resolve, reject) => {
                axios.post('/api/auth/logout',{
                    token:state.token
                    }).then(res =>{
                        commit('SET_token', null)
                        commit('SET_user', null)
                        commit('SET_loggedIn', false)
                        resolve(res)
                    }
                    ).catch( err => {
                        reject(err)
                    })
            })
        },
        // UpdateUserProfile({commit,state}, payload){
        //     return new Promise( (resolve, reject) => {
        //         axios
        //         .patch('/api/auth/update',{
        //             name:payload.name,
        //             email:payload.email,
        //             token:state.token
        //             }).then(res =>{
        //                 commit('SET_user', res.data.user)
        //                 resolve(res)
        //             }
        //             ).catch( err => {
        //                 reject(err)
        //             })
        //     })
        // }
    },
    getters:{
        get_loggedIn(state){
            return state.loggedIn
        },
        get_user(state){
            return state.user
        }
    }
}
