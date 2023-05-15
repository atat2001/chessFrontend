<template>
    <div v-if="this.checkmate">
        <Board :ref="'board'" :position="position" :checkmateWhite="checkmateWhite" :checkmateBlack="checkmateBlack" :highlight="highlight" :possibleMoves="possibleMoves"></Board>
    </div>
    <button @click="undo(1)">undo</button>
    <input v-model.number="id" @click="loadGame(id)"/>
    <button @click="save()">save</button>

    <div> <h1 v-if="checkmateWhite">congratulations white</h1></div>
    <div> <h1 v-if="checkmateBlack">congratulations black</h1></div>
</template>

<script>
    import ChessService from '../services/ChessService'
    import Board from './Board.vue';
    export default{
        name: '',
        data(){
            return { 
                position: "",
                checkmateWhite: false,
                checkmateBlack: false,
                submiter: Number,
                possibleMoves: [],
                highlight: 0
        }
        },
        components:{
            Board,
        },
        methods: {
            getPosition(){
                ChessService.getPosition().then((response) =>{
                    if(response.status == 200){
                    this.position = response.data.position;
                    this.checkmateBlack = response.data.checkmateBlack;
                    this.checkmateWhite = response.data.checkmateWhite;
                }
                })
            },
            save(){
                ChessService.save().then((response) => {if(response.status != 200){
                    console.error();
                }});
            },
            async undo(val){
                if(val == null){
                    return;
                }
                ChessService.undo(val).then((response) =>{
                    if(response.status == 200){
                    this.position = response.data.position;
                    this.checkmateBlack = response.data.checkmateBlack;
                    this.checkmateWhite = response.data.checkmateWhite;
                }
                })
            },
            async loadGame(val){
                if(val == null){
                    return;
                }
                ChessService.loadGame(val).then((response) =>{
                    if(response.status == 200){
                    this.position = response.data.position;
                    this.checkmateBlack = response.data.checkmateBlack;
                    this.checkmateWhite = response.data.checkmateWhite;
                }
                })
            },
            move(move, promotionType){
                ChessService.putMove(move, promotionType).then((response) =>{
                    if(response.status == 200){
                        if(response.data != null){
                            this.getPosition();
                            if(response.data.possibleMoves != null && response.data.possibleMoves.length != 0){
                                this.possibleMoves = response.data.possibleMoves;
                                this.highlight = response.data.selected;
                                this.checkmateBlack = response.data.checkmateBlack;
                                this.checkmateWhite = response.data.checkmateWhite;
                            }
                            else{
                                this.checkmateBlack = response.data.checkmateBlack;
                                this.checkmateWhite = response.data.checkmateWhite;
                                this.possibleMoves = [];
                                this.highlight = 0;
                                this.$refs['board'].promotion = -1;
                            }
                        }
                    }
                })
            }
        },
        computed:{
            checkmate:{
                get(){
                    return !this.checkmateBlack && !this.checkmateWhite;
                }
            }
        },
        created(){
            this.getPosition();
        }
    }
</script>
