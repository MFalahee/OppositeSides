import * as React from 'react'
import * as THREE from 'three'
import { Typography, Space } from 'antd'
import { Copyright, CustomTitle, Slideshow, ErrorBoundary} from '../Components/index'

// 3d imports

import Stars from '../Helpers/Instances';
import SunModel from '../Helpers/SunModel';
import { animated, useSpring } from 'react-spring'
import '@react-spring/three'
import GlobeModel from '../Helpers/GlobeModel';
import MovementAnchor from '../Helpers/MovementAnchor';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Select, Selection, GodRays, Outline, Bloom, Noise} from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';
import generateStarPositions from '../Helpers/setupStars';
import { Scene } from 'three';


const { useState, Suspense } = React
const startingPos = new THREE.Vector3(2,2,8);
const middlePos = new THREE.Vector3(2, 0, 1);
const finalPos = new THREE.Vector3(-40,-5,-20);

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
    'I know I am.',
    // Transition
    "I don't even know what to do about the unrest inside me most days.",
    "I'm not even sure what to do about it right now, as I make this website.",
    // Transition
    'So, I made something a little pointless. Do you know what an Antipode is?',
    'Yeah, I didn\'t know it was a thing before this project either.',
    'An [[Antipode]] is the opposite side of the planet from where you are standing (or most likely sitting) right now.',
    `I'll help you find your antipode. Though, fair warning, it's probably just..  ${'💧'}`,
    // 'Unless you are accessing this website sometime in the not so distant future.',
    // Transition
    // Transition to google maps page --> Ask for location --> Animate mini globe.
];

// Globe animation positions
/* 
@@@TODO
I'd like to add a couple transitions w/ the animation synced to the text.
use tensorflowjs to track face via webcam and control the camera of the canvas || fallback is the movement with the mouse?
*/
const LandingPage : React.FC = (props) => { 
    const [titleBool, setTitleBool] = useState(false);
    const [mousePos, setMousePos] = useState({x: 0, y: 0});
    const [sunPosition, setSunPos] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0))
    const [globePosition, setGlobePos] = useState<THREE.Vector3>(startingPos);
    const [cameraPosition, setCameraPos ] = useState<THREE.Vector3>(new THREE.Vector3(10, 0, 0));
    const [globeHoverBool, setGlobeHoverBool] = useState(false);
    const [sunHoverBool, setSunHoverBool] = useState(false);
    const [stars, setStars] = useState<Float32Array>(generateStarPositions(50000));
    const [slideIndex, setSlideIndex] = useState<number>(0);
    const [active, setActive] = useState<boolean>(false);
    const [anchorBool, setAnchorBool] = useState(false);
    let geo = new THREE.SphereGeometry(0.1, 10, 10);
    let mat= new THREE.MeshBasicMaterial({
        color: '#ffea00',
        wireframe: false,
        transparent: true,
        opacity: 1,
        visible: false,
    });
    let godMesh = new THREE.Mesh(geo, mat);
    let godMesh2 = new THREE.Mesh(geo, mat);
    godMesh.position.set(sunPosition.x, sunPosition.y, sunPosition.z);
    godMesh.material.visible = true;
    godMesh2.position.set(sunPosition.x, sunPosition.y, sunPosition.z);
    godMesh2.material.color.set('#ff7b00');
    godMesh2.material.visible = true;

    React.useEffect(() => {
        if (document.querySelector('.slide-counter') !== null) {
            if (slideIndex != Number(document.querySelector('.slide-counter').innerHTML[0])) {
            let temp = document.querySelector('.slide-counter').innerHTML[0]
            setSlideIndex(Number(temp));
            if (!active) {
                setActive(true);
            }
            }
        }}, [stars])
        
    function Rig() {
        const { camera, mouse, scene } = useThree();
        const vec = new THREE.Vector3()
        return useFrame(() => camera.position.lerp(vec.set(camera.position.x, mouse.y * 1, mouse.x * 3), 0.02))
        }

    function moveStars(event: MouseEvent, stars: THREE.Group) {
        // I want this function to set the current rotation of Points towards the position of the cursor.
        // This effect should make the stars rotate smoothly around the screen towards the cursor.
        let w = window.innerWidth;
        let h = window.innerHeight;
        let x = event.clientX;
        let y = event.clientY;
        if (stars) {
            let x_pos = ((x / w) * 2) + 1;
            let y_pos = ((y / h) * 2) + 1;
            stars.rotation.x = (y_pos * 0.3);
            stars.rotation.y = (x_pos * 0.3);
        }
    }
    return(
        <div className="view-wrapper" role="group" aria-label="vw">
            <div className='canvas-wrapper' role="group" aria-label="cw">
                <Canvas
                    gl={{powerPreference: 'high-performance', antialias: false}}
                    frameloop="always"
                    className="canvas-element" 
                    style={{height:"100vh", width:"100vw", backgroundColor: 'black'}}
                    camera={{fov: 50, position: cameraPosition, near: 0.5, far: 1000}}
                    resize={{scroll: true, debounce: {scroll: 50, resize: 0}}}
                > 
                <Selection>
                    <Suspense fallback={null}>
                            <SunModel scale={0.05} position={sunPosition} />
                            <GlobeModel scale={5} position={globePosition} />
                            <Stars radius={500} stars={stars} fn={moveStars}/>           
                            <EffectComposer>
                    <GodRays 
                        sun={godMesh}
                        blendFunction={BlendFunction.SCREEN}
                        samples={128}
                        density={1}
                        decay={0.9}
                        weight={1}
                        exposure={1} // A constant attenuation coefficient.
                        clampMax={1} // An upper bound for the saturation of the overall effect.
                        kernelSize={KernelSize.SMALL} // The blur kernel size. Has no effect if blur is disabled.
                        blur={1} // Whether the god rays should be blurred to reduce artifacts.
                    />
                    <GodRays 
                        sun={godMesh2}
                        blendFunction={BlendFunction.SCREEN}
                        samples={128}
                        density={1}
                        decay={0.9}
                        weight={1}
                        exposure={1} // A constant attenuation coefficient.
                        clampMax={1} // An upper bound for the saturation of the overall effect.
                        kernelSize={KernelSize.SMALL} // The blur kernel size. Has no effect if blur is disabled.
                        blur={1} // Whether the god rays should be blurred to reduce artifacts.
                    />
                    <Bloom intensity={0.5} luminanceSmoothing={0.025} luminanceThreshold={0.4}/> 
                    <Noise premultiply={true} opacity={0.4} blendFunction={BlendFunction.ADD} />
                </EffectComposer>   
                    </Suspense>
                    
                </Selection>
                <hemisphereLight intensity={0.7} groundColor={'black'} color={'white'} />
                <ambientLight intensity={0.1} castShadow={true} />
                {/* <Rig /> */}
                </Canvas>
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