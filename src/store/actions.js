import {
	getUser,
	signout
} from '../service/getData'
import {
	GET_USERINFO,
	OUT_LOGIN
} from './mutation-types.js'
export default {
    async getUserInfo({commit}){
        let res=await getUser();
        commit(GET_USERINFO,res.data.Data);
    },
    async usersignout({commit}){
		let res=await signout();
		commit(OUT_LOGIN,res.data.Data);
		return res;
	}
}