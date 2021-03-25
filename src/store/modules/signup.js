import Signup from '@/services/signup.js';

const state = {
    
};

const getters = {

};

const actions = {
    createUser(){
        return new Promise((resolve, reject) => {
            Signup.createUser().then(res =>{
                resolve(res.data.data.res)
            }).catch(error => {
                reject(error)
            });
        })
    }
};

const mutations = {};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}