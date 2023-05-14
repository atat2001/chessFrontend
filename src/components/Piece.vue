<template>
    <img v-if="type == 1" v-bind:src="require('../assets/white_pawn.png')" />
    <img v-if="type == 11" v-bind:src="require('../assets/black_pawn.png')" />
    <img v-if="type == 2" v-bind:src="require('../assets/white_rook.png')" />
    <img v-if="type == 12" v-bind:src="require('../assets/black_rook.png')" />
    <img v-if="type == 3" v-bind:src="require('../assets/white_knight.png')" />
    <img v-if="type == 13" v-bind:src="require('../assets/black_knight.png')" />
    <img v-if="type == 4" v-bind:src="require('../assets/white_bishop.png')" />
    <img v-if="type == 14" v-bind:src="require('../assets/black_bishop.png')" />
    <img v-if="type == 5" v-bind:src="require('../assets/white_queen.png')" />
    <img v-if="type == 15" v-bind:src="require('../assets/black_queen.png')" />
    <img v-if="type == 6" v-bind:src="require('../assets/white_king.png')" />
    <img v-if="type == 16" v-bind:src="require('../assets/black_king.png')" />
    <div v-if="type == 17" class="chessBoard">
        <img v-if="type == 17" v-bind:src="require('../assets/white_rook.png')" class="promotion" @click="promotedPiece(2)"/>
        <img v-if="type == 17" v-bind:src="require('../assets/white_knight.png')" class="promotion" @click="promotedPiece(3)"  />
        <img v-if="type == 17" v-bind:src="require('../assets/white_bishop.png')" class="promotion" @click="promotedPiece(4)"/>
        <img v-if="type == 17" v-bind:src="require('../assets/white_queen.png')" class="promotion" @click="promotedPiece(5)"/>
    </div>



</template>

<script>
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
            Promotion:17,

    }
    export default{
        name: '',
        data(){
            return {
        }
        },
        props:{
            index: Number,
            id: Number,
            type: PieceType
        },
        methods: {
            promotion(){
                this.type = 17;
            },
            promotedPiece(nr){
                console.log(this.$parent);
                this.$parent.setPromotedPiece(nr);
            }
        },  
        created(){
        }
    }
</script>

<style scoped>
img {
    width: min(10vh, 10vw);
    height: min(10vh, 10vw);
    }
.promotion {
    width: min(5vh, 5vw);
    height: min(5vh, 5vw);
    border: 1px outset green;
    }
div {
  width: 50%;
  height: 50%;
  box-sizing: border-box;
  border: 1px solid black;
  float: left;
  padding: 16px;
}
.inner {
  width: 50%;
  height: 50%;
  box-sizing: border-box;
  border: 1px solid black;
  float: left;
  padding: 16px;
  cursor:pointer;
}
.chessBoard{
    width: min(10vh, 10vh);
    height: min(10vh, 10vh);   
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    border: 1px outset green;
}

/*    <div v-if="type == 17" @click="this.$parent.">r</div>
    <div v-if="type == 17">b</div>
    <div v-if="type == 17">n</div>
    <div v-if="type == 17">q</div>*/
</style>
