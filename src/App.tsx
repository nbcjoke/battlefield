import { Router } from "./routes/routes";
import { Header } from "./components/header/header";

import "./App.css";

export const App = () => {
  return (
    <>
      <Header />
      <Router />
    </>
  );
};
