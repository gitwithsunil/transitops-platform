import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import Menu from './components/Menu';
import Dashboard from './pages/Dashboard';

// Core Ionic CSS
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      {/* IonSplitPane automatically shows the menu on desktop and hides it on mobile */}
      <IonSplitPane contentId="main-content">
        <Menu />
        
        <IonRouterOutlet id="main-content">
          <Route path="/" exact={true}>
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/dashboard" exact={true}>
            <Dashboard />
          </Route>
          {/* We will add /vehicles, /drivers, /trips routes here later */}
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;