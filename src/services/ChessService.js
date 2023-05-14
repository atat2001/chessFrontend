import http from "./http-common";

class ChessService{
    async getPosition(){
        return http.get("/position");

    }
    async putMove(move, promotionType){
        return http.put("/move", {
            move:move,
            promotionType:promotionType,
            headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080'
          }});
    }
    async undo(val){
        var url = '/undo/'+ val;
        return http.put(url);
    }
    async save(){
        return http.get("/save");
    }
    async loadGame(id){
        var url = '/load/' + id;
        return http.put(url);
    }

}

export default new ChessService()