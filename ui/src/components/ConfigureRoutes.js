import { Switch, Route } from 'react-router-dom';

import Home from './Home';

const ConfigureRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  )
};

export default ConfigureRoutes;
