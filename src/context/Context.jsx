import React, {createContext} from "react";

const Context = createContext(); // Context.Provider, Context.Consumer
const DataProvider = Context.Provider;

export {Context, DataProvider};