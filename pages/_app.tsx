import "tailwindcss/tailwind.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { SearchContextProvider } from "hooks/SearchResultsContext";
import { LoggerContextProvider } from "hooks/useLogger";
import { PusherProvider } from "hooks/PusherContext";
import { FullscreenContextProvider } from "hooks/useFullscreen";
import Pusher from "pusher-js";
const queryClient = new QueryClient();
const pusher = new Pusher("cd9121d850b869bd73fa", {
  cluster: "eu",
});
function MyApp({ Component, pageProps }) {
  return (
    <FullscreenContextProvider>
      <PusherProvider pusher={pusher}>
        <QueryClientProvider client={queryClient}>
          <LoggerContextProvider>
            <SearchContextProvider>
              <Component {...pageProps} />
            </SearchContextProvider>
          </LoggerContextProvider>
        </QueryClientProvider>
      </PusherProvider>
    </FullscreenContextProvider>
  );
}

export default MyApp;
