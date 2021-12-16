import {
  VuePageComponent,
  ReactPageComponent,
  DefaultPageComponent,
  WebpackPageComponent,
  ReduxPageComponent,
  NodePageComponent,
} from "../pages";
import { HashRouter, Route, Switch } from "react-router-dom";

export type AppRouteComponent = {
  path: string;
  component: React.FC<any>;
  title: string;
};

export const routes: AppRouteComponent[] = [
  // default component
  {
    path: "/",
    component: DefaultPageComponent,
    title: "default",
  },
  {
    path: "/vue",
    component: VuePageComponent,
    title: "vue 相关",
  },
  {
    path: "/react",
    component: ReactPageComponent,
    title: "react 相关",
  },
  {
    path: "/redux",
    component: ReduxPageComponent,
    title: "redux 相关",
  },
  {
    path: "/webpack",
    component: WebpackPageComponent,
    title: "webpack 相关",
  },
  {
    path: "/node",
    component: NodePageComponent,
    title: "node 相关",
  },
];

export const RouteContainer = () => (
  <HashRouter>
    <Switch>
      {routes.map((item) => (
        <Route key={item.path} exact path={item.path} component={item.component} />
      ))}
    </Switch>
  </HashRouter>
);
