<template>
    <div>
        <h1>{{ position }}</h1>

    </div>
</template>

<script>
    import ChessService from '../services/ChessService'
    import Board from './Board.vue';
    export default{
        name: '',
        data(){
            return { position: '',
        }
        },
        components:{
            Board,
        },
        methods: {
            getPosition(){
                ChessService.getPosition().then((response) =>{
                    if(response.status == 200){
                    this.position = response.data;
                }
                })
            }
        },  
        created(){
            this.getPosition();
        }
    }
</script>
