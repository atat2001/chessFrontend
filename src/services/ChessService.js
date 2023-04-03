import http from "./http-common";

class ChessService{
    getPosition(){
        return http.get("/position");

    }
    putMove(move){
        return http.put("/move", {
            move:move,
            headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080'
          }});
    }

}

export default new ChessService()