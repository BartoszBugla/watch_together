import "tailwindcss/tailwind.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { SearchContextProvider } from "hooks/SearchResultsContext";
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchContextProvider>
        {" "}
        <Component {...pageProps} />
      </SearchContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
