<template>
    <div>
        <h1>{{ position }}</h1>
        
    </div>
</template>

<script>
    import ChessService from '../services/ChessService'
    export default{
        name: '',
        data(){
            return { position: '',
        }
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
            this.getPosition()
        }
    }
</script>
