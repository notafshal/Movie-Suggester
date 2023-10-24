import { BrowserRouter, Switch, Route } from "react-router-dom";

import Index from "../pages/Index";
import ViewMovie from "../pages/ViewMovie";
import AddMovie from "../pages/AddMovie";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Index} exact />
        <Route path="/view/:id" component={ViewMovie} exact />
        <Route path="/add" component={AddMovie} exact />
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
