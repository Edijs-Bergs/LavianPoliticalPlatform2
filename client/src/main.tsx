import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Router, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import App from "./App";
import AdminPage from "./pages/admin";
import NotFound from "./pages/not-found";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <Switch>
        <Route path="/" component={App} />
        <Route path="/admin" component={AdminPage} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </QueryClientProvider>
);
