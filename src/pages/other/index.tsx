import { HashRouter, Route, Switch } from "react-router-dom";

export const OtherPageComponent = ({ match }) => {
  const Carnitas = () => <div>Carnitas</div>;

  console.log(match);

  return (
    <div>
      therPageComponent
      <Route path={match.url + "/carnitas"} component={Carnitas} />
    </div>
  );
};
