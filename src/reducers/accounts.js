export function login (initialState = null, action) {
    switch (action.type) {
        case 'LOGIN_COMPLETE':
            return action.payload;
        default:
            return initialState;
    }
}
export function register (initialState = null, action) {
    switch (action.type) {
        case 'REGISTER_COMPLETE':
            return action.payload;
        default:
            return initialState;
    }
}

