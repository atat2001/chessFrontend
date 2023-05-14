<template>
        <div class="chessBoard">
            <div v-for="n in 64" v-bind:key="getKey(n)" :class="{
                    buttonBlack: (getStyle(n)) == 0, buttonWhite:(getStyle(n)) == 1,
                    buttonBlackHighlighted: (getStyle(n)) == 2, buttonWhiteHighlighted: (getStyle(n)) == 3,
                    buttonBlackPossible: (getStyle(n)) == 4, buttonWhitePossible: (getStyle(n)) == 5
                }" style="display:flex; justify-content:center; align-items:center"   @click="move(getKey(n))">
            <Piece :id="getKey(n)" :ref="'piece' + getKey(n)" :type="positionList[n-1]" :index="n"></Piece>
            </div>
        </div>
        <div v-if="false">
            <h1>{{ this.positionList }}</h1>
            <h1>{{ this.position }}</h1>
            <h1> {{ this.checkmateWhite ? 'white' : 'not white' }}</h1>
            <h1>{{ this.checkmateBlack ? 'black' : 'not black' }}</h1>
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
        Promotion: 17,

    }
    export default{
        name: '',
        data(){
            return {
                promotion: -1,
                trigger: 0,
                promotedPiece: -1
            }
        },
        props:{
            position: String,
            checkmateBlack: Boolean,
            checkmateWhite: Boolean,
            highlight: Number,
            possibleMoves: Array
        },
        components:{
            Piece
        },
        methods:{
            printId(key){
                console.log(key);
            },
            move(move){
                var isWhite;
                /*if(this.ref['piece' + this.highlight].PieceType == 1){
                    isWhite = true;
                }
                else if(this.ref['piece' + this.highlight].PieceType == 11){
                    isWhite = false;
                }
                else{
                    this.$parent.move(move);
                }
                if(this.getKey(move) < 19 || this.getKey(move) > 80){
                    this.ref['piece' + this.move].PieceType = 17;
                    // var promotion = await this.ref['piece' + this.move].getPromotion();
                }*/
                if(typeof this.highlight !== 'undefined'){
                    console.log(this.$refs)
                    if(this.highlight != null && [9,11,1].includes(Math.abs(move-this.highlight)) && (move%10)%7 == 1){
                        console.log("type:")
                        console.log('piece' + move);
                        console.log((this.$refs['piece' + this.highlight])[0]);
                        if((this.$refs['piece' + this.highlight])[0].type%10 == 1){
                            this.promotedPiece = -1;
                            this.promotion = (this.$refs['piece' + move])[0].index - 1;
                            // added unwatch
                            const unwatch = this.$watch('promotedPiece', (newVal, oldVal) => {this.$parent.move(move, newVal);unwatch();this.promotion = -1;});
                            this.trigger++;
                            console.log(this.positionList);
                            
                        }
                        else{
                        this.$parent.move(move, 3);}
                    }
                    else{
                        this.$parent.move(move, 3);
                    }
                }
                else{
                    this.$parent.move(move, 3);
                }
            },
            // this will get the key of the element, since this renders from up do down, 1 will be 18, 2 will be 28 etc...
            getKey(n){
                return ((8-Math.floor((n-1)/8)) + 10 * ((n-1)%8 + 1));
            },
            getStyle(n){
                const key = this.getKey(n);
                var white = (this.getKey(n) % 10 + (this.getKey(n)-this.getKey(n) % 10) / 10)%2;
                if(this.highlight != undefined && this.highlight != 0 && key == this.highlight){
                    white += 2;
                }
                if(this.possibleMoves.includes(key)){
                    white += 4;
                }
                return white;
            },
            setPromotedPiece(nr){
                this.promotedPiece = nr;
            }
        },
        computed:{
            positionList: {
                get(){
                    console.log(this.trigger);
                    if(this.position == ""){
                        return [];
                    }
                    var returner = Array(64);
                    const size = this.position.length;
                    var i = 0;
                    var decrement = 0;
                    var promot = false;
                    while(i < size){
                        if(i-decrement == this.promotion){
                            promot = true;
                        }   
                        switch(this.position[i]){
                            case '/':
                                promot = false;
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
                                    if(i-decrement == this.promotion){
                                        returner[i-decrement] = PieceType.Promotion;
                                        promot = false;
                                    }   
                                    decrement--;
                                    iter++;
                                }
                                decrement++;
                                i++;
                                break;
                        }
                        if(promot){
                            returner[i-decrement - 1] = PieceType.Promotion;
                            promot=false;
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
    display: flex;
}
.buttonBlack {
    border: 1px outset gray;
    background-color: rgb(41, 41, 87);
    width: min(12.5vh, 12.5vw);
    height: min(12.5vh, 12.5vw);
    cursor:pointer;
    display: flex;
}
.buttonWhiteHighlight {
    border: 1px outset gray;
    background-color: rgb(163, 163, 163);
    width: min(12.5vh, 12.5vw);
    height: min(12.5vh, 12.5vw);
    cursor:pointer;
    display: flex;
}
.buttonBlackHighlight {
    border: 1px outset gray;
    background-color: rgb(87, 87, 194);
    width: min(12.5vh, 12.5vw);
    height: min(12.5vh, 12.5vw);
    cursor:pointer;
    display: flex;
}
.buttonWhitePossible {
    border: 1px outset gray;
    background-color: rgba(255, 255, 255, 0.815);
    width: min(12.5vh, 12.5vw);
    height: min(12.5vh, 12.5vw);
    cursor:pointer;
    display: flex;
}
.buttonBlackPossible {
    border: 1px outset gray;
    background-color: rgba(41, 41, 87, 0.76);
    width: min(12.5vh, 12.5vw);
    height: min(12.5vh, 12.5vw);
    cursor:pointer;
    display: flex;
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

