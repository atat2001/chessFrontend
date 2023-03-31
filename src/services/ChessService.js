import axios from "axios";

const CHESS_API_POSITION = 'http://localhost:8080/api/chess/position'
const CHESS_API_MOVE = 'http://localhost:8080/api/chess/move/'
class ChessService{
    getPosition(){
        return axios.get(CHESS_API_POSITION);

    }
}

export default new ChessService()