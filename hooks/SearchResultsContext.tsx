import React, { useContext, createContext, useState } from "react";

// type ContextType={
//   results:any[]
//   setResults:React.Dispatch<React.SetStateAction<[]>>
//   isOpen:boolean
//   setIsOpen:React.Dispatch<React.SetStateAction<boolean>>
// }
export const SearchContext = createContext([]);

// const reducer = (state: State, action: Action) => {
//   switch (action.type) {
//     case "hello world": {
//       return { s: "hello world" };
//     }
//     default:
//       return;
//   }
// };
export const SearchContextProvider: React.FC = ({ children }) => {
  // const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, {
  //   s: "",
  // });
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SearchContext.Provider value={[results, setResults, isOpen, setIsOpen]}>
      {children}
    </SearchContext.Provider>
  );
};
// export default () => {
//   const [results, setResults] = useContext(SearchContext);
//   return { data, dispatch };
// };
