<template>
        <div class="chessBoard">
        <div v-for="n in 64" v-bind:key="((8-Math.floor((n-1)/8)) + 10 * ((n-1)%8 + 1))" :class="{buttonWhite: (8-Math.floor((n-1)/8)+ ((n-1)%8 + 1) ) % 2 == 0, buttonBlack: (8-Math.floor((n-1)/8)+ ((n-1)%8 + 1) ) % 2 == 1}"   @click="move(((8-Math.floor((n-1)/8)) + 10 * ((n-1)%8 + 1)))"></div>
        </div>
</template>

<script>
    import ChessService from '../services/ChessService'
    const boardsize = 100; 
    export default{
        name: '',
        data(){
            return {    
            isWhite: true,
            castle:[true,true,true,true],
            enPassant: null,
            lastClicked: [0,0]
            }
        },
        props:{
            position:"",
        },
        methods:{
            printId(key){
                console.log(key)
            },
            move(move){
                ChessService.putMove(move).then((response) =>{
                    if(response.status == 200){
                        console.log(response);
                        if(response.data == 1){
                            console.log("do later");
                        }
                    }
                    else{
                        console.log(response);
                    }
                })
            }

        }
    }
</script>

<style>
.buttonWhite {
    border: 1px outset gray;
    background-color: white;
    width: min(12.5vh, 12.5vw);
    height: min(12.5vh, 12.5vw);
    cursor:pointer;
}
.buttonBlack {
    border: 1px outset gray;
    background-color: black;
    width: min(12.5vh, 12.5vw);
    height: min(12.5vh, 12.5vw);
    cursor:pointer;
}
.chessBoard{
    width: min(100vh, 100vw);
    height: min(100vh, 100vw);
    margin-left: auto;
    margin-right: auto;
    background: brown;
    display: grid;
    grid-template-columns: repeat(8,1fr);
}


</style>

