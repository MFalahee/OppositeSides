import * as React from 'react'
import { BrowserRouter as Router, Routes, Link, Route} from 'react-router-dom'


// d
import { MainView, LandingPage, TestView } from './Views/index'

// style sheet
import './Styles/root.scss'
/*

export interface RouteProps {
  location?: H.Location;
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  render?: (props: RouteComponentProps<any>) => React.ReactNode;
  children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
  path?: string | string[];
  exact?: boolean;
  sensitive?: boolean;
  strict?: boolean;
}

*/

const App : React.FC = () => {
  console.log(Route)
  return ( 
    <Router >
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path='/oppo' element={<MainView />}/>
        <Route path='/messaround' element={<TestView />}/>
      </Routes>
    </Router>
  );
}
//need to rework this all into a router and have the landing page be the default page
//currently the main page is the landing page which is not the best design

export default App;