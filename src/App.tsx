import * as React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ErrorBoundary } from './Components';
import GlobeModel from './Helpers/GlobeModel';
import Stars from './Helpers/Instances';
import { Canvas } from '@react-three/fiber';

// d
import { MainView, LandingPage, TestView } from './Views/index'

// style sheet
import './Styles/root.scss'
const { useState, Suspense} = React
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
    <div className="view-wrapper">
      <div className='canvas-wrapper'>
                <ErrorBoundary >
                <Canvas
                    frameloop="demand"
                    className="canvas-element" 
                    style={{height:"100vh", width:"100vw", backgroundColor: 'black'}}
                    camera={{fov: 25, position: [0,-15,0]}}
                    resize={{scroll: true, debounce: {scroll: 50, resize: 0}}}
                >
                    <Suspense fallback={null}>
                        {/* globe model position is JUST off the top of the screen */}
                            {/*  */}
                            <GlobeModel scale={10} position={7.7}/>
                            <Stars radius={300}/>
                            
                            <ambientLight intensity={0.2} castShadow={true} />
                            <directionalLight intensity={0.5} position={[0,1,1]}/>
                            <directionalLight intensity={1} color={'red'} position={[0,15,0]}/>
                            
                    </Suspense>
                </Canvas>
                </ErrorBoundary>
      </div>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path='/go' element={<MainView />}/>
        <Route path='/dev' element={<TestView />}/>
      </Routes>
    </Router>
    </div>
  );
}
//need to rework this all into a router and have the landing page be the default page
//currently the main page is the landing page which is not the best design

export default App;