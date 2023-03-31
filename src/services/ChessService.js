import axios from "axios";

const CHESS_API_BASE_URL = 'http://localhost:8080/api/chess/position'

class ChessService{
    getPosition(){
        return axios.get(CHESS_API_BASE_URL);
    }
}

export default new ChessService()