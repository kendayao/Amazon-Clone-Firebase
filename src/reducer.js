export const initialState = {
    basket: "",
};

const reducer = (state=initialState, action)=>{
    console.log(action)
    switch(action.type){
        case 'ADD TO BASKET':
            return{
                ...state,
                basket: action.item
            };
        default:
            return state

    }
}

export default reducer