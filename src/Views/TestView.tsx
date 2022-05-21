import * as React from 'react';
import * as ReactDOM from 'react-dom/client'
import GlobeModel from '../Helpers/GlobeModel';
import { Canvas } from '@react-three/fiber';
import { ErrorBoundary } from '../Components';



const TestView: React.FC = () => { 

    
const { Suspense } = React;

    return(
        <div className='test-view'>
            <h1>Test View</h1>
            <div className='canvas-wrapper'>
            <ErrorBoundary >
            <Canvas 
                className="canvas-element" 
                style={{height:"100vh", width:"100vw"}}
                camera={{fov: 60, position: [0,0,15]}}>
                <Suspense fallback={null}>
                        <GlobeModel scale={0.1}/>
                        <ambientLight intensity={0.2} />
                </Suspense>
            </Canvas>
            </ErrorBoundary>
            </div> </div>
    )
}

export default TestView;