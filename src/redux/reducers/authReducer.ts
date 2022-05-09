const initialState = {
    token: "",
    version: "",
    apiurl: "",
};

const authReducer = (state = initialState , action) => {

    switch(action.type){
        case "SET_TOKEN" : {
            return  {
                ...state, 
                token: action.payload.token,
                version: action.payload.version,
                apiurl: action.payload.apiurl
            }
        }
        case "DO_LOGOUT" : {
            return initialState; 
        }
        default: {
            return state;
        }
    }
}

export default authReducer;   