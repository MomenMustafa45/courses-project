import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "../src/store/store.ts";
import { Provider } from "react-redux";
import AppProvider from "./ControlPanel/context/AppProvider.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import i18next from "i18next";
import arLang from "./ControlPanel/languages/ar.json"
import heLang from "./ControlPanel/languages/he.json"
import { I18nextProvider } from "react-i18next";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "ar",
  resources: {
    ar: {
      global: arLang
    },
    he: {
      global: heLang
    }
  }
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <I18nextProvider i18n={i18next}>
          <Provider store={store}>
            <App />
          </Provider>
        </I18nextProvider>
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
