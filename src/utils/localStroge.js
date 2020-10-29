export default {
    save(obj){
        let str = JSON.stringify(obj);
        localStorage.setItem("vuetodos",str)
    },
    get(){
        let str = localStorage.getItem("vuetodos");
        let obj = JSON.parse(str);
        if(obj == null){
            return{
                todos:[],
                visibility:"all"
            }
        }else{
            return obj
        }
    }
}