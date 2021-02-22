import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';

import { useTransition, animated } from "react-spring";





function App(props) {
  const location = useLocation()
  const transitions = useTransition(location, (location) => location.pathname, {
    config: { duration: 800 },
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  });
  return transitions.map(({ item: location, props, key }) => (

    <animated.div key={key} style={props}>
      <Switch location={location}>
        <Route path='/' exact component={Landing} />
        {/* <Route path='/readmore/:title' component={Readmore} />
        <Route path='/dashboard/' component={Dashboard} />
        <Route path='/login' component={login} /> */}
        {/* <Route path='/translate/:title' component={Translate} />
        <Route path='/test' component={Nopage} /> */}
      </Switch>
    </animated.div>
  ));
}

export default App;
