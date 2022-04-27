import React, {createContext} from 'react';
const UsernameContext = createContext({
    username: "",
    setUsername: (instance) => {}
});
export default UsernameContext;
