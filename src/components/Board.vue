<template>
        <div class="chessBoard">
            <div v-for="n in 64" v-bind:key="getKey(n)" :class="{buttonWhite: (getStyle(n)) == 1, buttonBlack: (getStyle(n)) == 0}" style="display:flex; justify-content:center; align-items:center"   @click="move(getKey(n))">
            
            <Piece :id="getKey(n)" :type="positionList[n-1]" :index="n"></Piece>
            </div>
        </div>
        <div>
            <h1>{{ positionList }}</h1>
            <h1>{{ position }}</h1>
        </div>


</template>

<script>
    import ChessService from '../services/ChessService'
    import Piece from './Piece.vue'
    const PieceType = {
        None: 0,
        WPawn: 1,
        WRook: 2,
        WKnight: 3,
        WBishop: 4,
        WQueen: 5,
        WKing: 6,
        BPawn: 11,
        BRook: 12,
        BKnight: 13,
        BBishop: 14,
        BQueen: 15,
        BKing: 16,

    }
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
            position: String,
        },
        components:{
            Piece
        },
        methods:{
            printId(key){
                console.log(key)
            },
            move(move){
                ChessService.putMove(move).then((response) =>{
                    if(response.status == 200){
                        if(response.data == 1){
                            this.$parent.getPosition();
                        }
                    }
                    else{
                        console.log(response);
                    }
                })
            },
            getKey(n){
                return ((8-Math.floor((n-1)/8)) + 10 * ((n-1)%8 + 1));
            },
            getStyle(n){
                return (this.getKey(n) % 10 + (this.getKey(n)-this.getKey(n) % 10) / 10)%2;
            }
        },
        computed:{
            positionList: {
                get(){
                    if(this.position == ""){
                        return [];
                    }
                    var returner = Array(64);
                    const size = this.position.length;
                    var i = 0;
                    var decrement = 0;
                    while(i < size){

                        switch(this.position[i]){
                            case '/':
                                i++;
                                decrement++;
                                break;
                            case 'p':
                                returner[i-decrement] = PieceType.BPawn;
                                i++;
                                break;
                            case 'P':
                                returner[i-decrement] = PieceType.WPawn;
                                i++;
                                break;
                            case 'r':
                                returner[i-decrement] = PieceType.BRook;
                                i++;
                                break;
                            case 'R':
                                returner[i-decrement] = PieceType.WRook;
                                i++;
                                break;
                            case 'n':
                                returner[i-decrement] = PieceType.BKnight;
                                i++;
                                break;
                            case 'N':
                                returner[i-decrement] = PieceType.WKnight;
                                i++;
                                break;
                            case 'b':
                                returner[i-decrement] = PieceType.BBishop;
                                i++;
                                break;
                            case 'B':
                                returner[i-decrement] = PieceType.WBishop;
                                i++;
                                break;
                            case 'q':
                                returner[i-decrement] = PieceType.BQueen;
                                i++;
                                break;
                            case 'Q':
                                returner[i-decrement] = PieceType.WQueen;
                                i++;
                                break;
                            case 'k':
                                returner[i-decrement] = PieceType.BKing;
                                i++;
                                break;
                            case 'K':
                                returner[i-decrement] = PieceType.WKing;
                                i++;
                                break;
                            default:
                                var iter = 0;
                                while(parseInt(this.position[i]) > iter){
                                    returner[i-decrement] = PieceType.None;
                                    decrement--;
                                    iter++;
                                }
                                decrement++;
                                i++;
                                break;
                        }
                    }
                    return returner;
                }
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
    background-color: rgb(41, 41, 87);
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

