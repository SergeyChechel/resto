const initialState = {
    menu: [], // получаем с сервера
    loading: true,
    items: [] // формируем динамически при добавлении в корзину (предметы в корзине)
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'MENU_LOADED':
           return {
            ...state,
               menu: action.payload,
               loading: false
           };
        case 'MENU_REQUESTED':
            return {
                ...state, 
                menu: state.menu,
                loading: true
            };
        case 'ITEM_ADD_TO_CART':
            const id = action.payload;
            const item = state.menu.find(item => item.id === id);
            const itemInCart = state.items.find(item => item.id === id);
            const itemInCartIndex = state.items.findIndex(item => item.id === id);
            let obj;
            if (itemInCart) {
                itemInCart.quantity = itemInCart.quantity + 1;
                obj = {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemInCartIndex),
                        itemInCart,
                        ...state.items.slice(itemInCartIndex + 1)
                    ]
                };
            } else {
                const newItem = {
                    title: item.title,
                    price: item.price,
                    url: item.url,
                    id: item.id,
                    quantity: 1
                };

                obj = {
                    ...state,
                    items: [
                        ...state.items,
                        newItem
                    ]
                };
            } 
            
            return obj;

            

        case 'ITEM_REMOVE_FROM_CART':
            const index = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === index);
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)

                ]
            }

        default: 
           return state;
    }
};

export default reducer;