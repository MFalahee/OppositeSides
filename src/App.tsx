import './Styles/root.scss'
import * as React from 'react'
import { MainView } from './Views/index'
import { ErrorBoundary } from './Components/index'

const App : React.FC = () => {
  return ( 
    <div className = "App" >
      <ErrorBoundary >
      <MainView />
      </ErrorBoundary >
    </div>
  );
}
//need to rework this all into a router and have the landing page be the default page
//currently the main page is the landing page which is not the best design

export default App;