import {
  VuePageComponent,
  ReactPageComponent,
  DefaultPageComponent,
  WebpackPageComponent,
  ReduxPageComponent,
  NodePageComponent,
  OtherPageComponent,
} from "../pages";
import { HashRouter, Route, Switch } from "react-router-dom";

export type AppRouteComponent = {
  path: string;
  component: React.FC<any>;
  title: string;
};

export const routes: AppRouteComponent[] = [
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
  {
    path: "/other",
    component: OtherPageComponent,
    title: "other 相关",
  },
  // should be last
  {
    path: "/",
    component: DefaultPageComponent,
    title: "default",
  },
];

export const RouteContainer = () => (
  <HashRouter>
    <Switch>
      {routes.map((item) => (
        <Route key={item.path} path={item.path} component={item.component} />
      ))}
    </Switch>
  </HashRouter>
);
