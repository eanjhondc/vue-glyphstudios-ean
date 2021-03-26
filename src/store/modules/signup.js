import Signup from '@/services/signup.js';

const state = {
    show: false,
    text:'',
};

const getters = {

};

const actions = {
    createUser({commit},data){
        return new Promise((resolve, reject) => {
            Signup.createUser(data).then(res =>{
                resolve(res.data.data.res)
            }).catch(error => {
                commit('showError', error.response.data.message)
                reject(error)
            });
        })
    }
};

const mutations = {
    showError(state,message){
        state.show = true;
        state.text = message
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}