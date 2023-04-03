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
</style>
