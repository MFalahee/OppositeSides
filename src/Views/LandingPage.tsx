import * as React from 'react'
import * as THREE from 'three'
import { Typography, Space } from 'antd'
import { Copyright, CustomTitle, Slideshow, ErrorBoundary} from '../Components/index'

// 3d imports
import GlobeModel from '../Helpers/GlobeModel';
import Stars from '../Helpers/Instances';
import SunModel from '../Helpers/SunModel';
import { Canvas, invalidate, ThreeEvent, useFrame } from '@react-three/fiber';
import { EffectComposer, Select, Selection, GodRays, Outline, Bloom, Noise} from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';




const { useState, Suspense } = React



//  people ask me where I'm from. I point to my hand. incorporate this somehow?
// did you know that only 15% of land has antipode? ~ source
//  
const introSlides = [
    'In a time of great uncertainty-',
    'When our basic ideals are causing deadly fights between us,',
    // Transition
    'We know so much about what plagues the world and our society,',
    'Yet, we can\'t seem to come together to stop it.',
    // Transition
    'Aren\'t you sick of it?',
    'I am.',
    // Transition
    'I made a whimsical website that finds your antipode.',
    'Yeah, I didn\'t know that was a thing before this project either.',
    'An [[Antipode]] is the opposite side of the planet from where you are standing (or most likely sitting) right now.',
    'Lets shoot a line straight through the earth and see where it hits...', 
    // Transition to google maps page --> Ask for location --> Animate mini globe.
];

/* 
@@@TODO
I'd like to add a couple transitions w/ the animation synced to the text.
use tensorflowjs to track face via webcam and control the camera of the canvas || fallback is the movement with the mouse?
*/
const LandingPage : React.FC = (props) => { 
    const [titleBool, setTitleBool] = useState(false);
    const [mousePos, setMousePos] = useState({x: 0, y: 0});
    const [sunPosition, setSunPos] = useState<THREE.Vector3>(new THREE.Vector3(-100, 0, 0))
    const [globePosition, setGlobePos] = useState<THREE.Vector3>(new THREE.Vector3(0, 5, 0));
    const [cameraPosition, setCameraPos ] = useState<THREE.Vector3>(new THREE.Vector3(10, 0, 0));
    
    
    let geo = new THREE.SphereGeometry(0.1, 10, 10);
    let mat= new THREE.MeshBasicMaterial({
        color: '#ffea00',
        wireframe: true,
        wireframeLinewidth: 2,
        transparent: true,
        opacity: 0.5,
        visible: true,
                        });
    let godMesh = new THREE.Mesh(geo, mat);
    let godMesh2 = new THREE.Mesh(geo, mat);
    godMesh.position.set(-100, 0, 0);
    godMesh2.position.set(-100, 0, 0);
    godMesh2.material.color.set('#ff7b00');
    function sunClick(e: ThreeEvent<MouseEvent>) {
        console.log(e.eventObject.parent.getObjectById(1))
    }

    return(
        <div className="view-wrapper" role="group" aria-label="vw">
            <div className='canvas-wrapper' role="group" aria-label="cw">
                <ErrorBoundary >
                <Canvas
                    frameloop="demand"
                    className="canvas-element" 
                    style={{height:"100vh", width:"100vw", backgroundColor: 'black'}}
                    camera={{fov: 100, position: cameraPosition, near: 0.5, far: 1000}}
                    resize={{scroll: true, debounce: {scroll: 50, resize: 0}}}
                > 
                <Selection>
                    <Suspense fallback={null}>
                    <EffectComposer 
                        autoClear={false}

                    >
                        <GodRays 
                            sun={godMesh}
                            blendFunction={BlendFunction.SCREEN}
                            samples={64}
                            density={0.7}
                            decay={0.90}
                            weight={1}
                            exposure={0.5} // A constant attenuation coefficient.
                            clampMax={1} // An upper bound for the saturation of the overall effect.
                            kernelSize={KernelSize.SMALL} // The blur kernel size. Has no effect if blur is disabled.
                            blur={1} // Whether the god rays should be blurred to reduce artifacts.
                        />
                        <GodRays 
                            sun={godMesh2}
                            blendFunction={BlendFunction.SCREEN}
                            samples={64}
                            density={0.9}
                            decay={0.95}
                            weight={0.8}
                            exposure={1} // A constant attenuation coefficient.
                            clampMax={1} // An upper bound for the saturation of the overall effect.
                            kernelSize={KernelSize.SMALL} // The blur kernel size. Has no effect if blur is disabled.
                            blur={1} // Whether the god rays should be blurred to reduce artifacts.
                        />
                        <Outline blur edgeStrength={1}/>
                        <Bloom intensity={0.5} luminanceSmoothing={0.025} luminanceThreshold={0.4}/>
                        <Noise premultiply={true} opacity={0.6} blendFunction={BlendFunction.ADD} />
                    </EffectComposer>
                            <SunModel scale={5} position={sunPosition} onClick={e=> sunClick(e)}/>
                            <GlobeModel scale={3} position={globePosition} /> 
                            <hemisphereLight intensity={0.7} groundColor={'black'} color={'white'} />
                            <Stars radius={500} />                            
                            <ambientLight intensity={0.1} castShadow={true} />        
                    </Suspense>
                   
                </Selection>
                </Canvas>
                </ErrorBoundary>
            </div>
            <Space className="landing-page" direction="vertical" size="large" style={{ width: '75%' }}>
                <div className="style-div">
                    <Typography className="lp-typo">
                    {(titleBool) ? <CustomTitle title="Opposite Sides"/> : null}
                    <Slideshow slides={introSlides} />
                </Typography>
                </div>
            </Space>
            <Copyright />
            
        </div>
    )
}

export default LandingPage;