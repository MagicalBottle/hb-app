<template>
    <div>

    </div>
</template>

<script>

import {login} from '../../service/getData'
export default {
    data(){
        return{
             
        }
    },

	mounted(){
           login().then(res => {
            this.guessCity = res.name;
            this.guessCityid = res.id;
        })
    },

    components:{
        
    },

    computed:{
       
    },

    methods:{
        
    },
}

</script>
