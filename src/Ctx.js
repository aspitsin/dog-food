import React from "react";

export default React.createContext({
    user: {},
    setUser: () => {},
    token: "",
    setToken: () => {},
    api: {},
    setApi: () => {},
    goods: [],
    setGoods: () => {},
    searchData: [],
    setSearchData: () => {},
    favorites: [],
    setFavorites: () => {},
    basket: [],
    setBasket: () => {},
    users: [],
    setUsers: () => {},
});