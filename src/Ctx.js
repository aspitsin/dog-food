import React, {useContext} from "react";

export default React.createContext({
    user: {},
    setUser: () => {},
    token: "",
    setToken: () => {},
    api: {},
    setApi: () => {},
    modalActive: false,
    setModalActive: () => {},
    goods: [],
    setGoods: () => {},
    searchData: [],
    setSearchData: () => {},
});