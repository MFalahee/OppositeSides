import * as React from 'react'
import * as THREE from 'three'
import { Typography, Space, Button } from 'antd'
import { Copyright, CustomTitle, Slideshow, ErrorBoundary} from '../Components/index'
import { Link } from 'react-router-dom';

// 3d imports

import Stars from '../Helpers/Instances';
import SunModel from '../Helpers/SunModel';
import { animated, useSpring } from 'react-spring'
import '@react-spring/three'
import GlobeModel from '../Helpers/GlobeModel';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Select, Selection, GodRays, Outline, Bloom, Noise} from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';
import generateStarPositions from '../Helpers/setupStars';
import { Scene } from 'three';


const { useState, Suspense } = React
const startingPos = new THREE.Vector3(2,2,8);
const middlePos = new THREE.Vector3(2, 0, 1);
const finalPos = new THREE.Vector3(-40,-5,-20);

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
    "I don't know what to do about the uncertainty myself most days.",
    'So, I made something a little pointless. Do you know what an [[Antipode]] is?',
    'Your [[Antipode]] is the opposite side of the {planet} from where you are standing (or most likely sitting) right now.',
    "SKIP HERE--> TO ANTIPODE",
    // Transition
    "I'm sure you've noticed us inhabitants of planet earth have a tendency to divide eachother into groups;",
    "Leaders and followers, politicians and their constituents, Landowners or immigrants, or teachers, even homeless.",
    "All people, All named differently by us. All with different values and goals.",
    "Except, we have one great thing in common no matter what- we are all on this beautiful planet.",
    "WE ARE ALL ON THIS PLANET TOGETHER. That is fact.",
    // Transition
    "This is going to make it simple. You either have an antipode on land, or you don't.",
    // 'Unless you are accessing this website sometime in the not so distant future.',
];

// Globe animation positions
/* 
@@@TODO
I'd like to add a couple transitions w/ the animation synced to the text.
*/

const LandingPage : React.FC = (props) => { 
    const [titleBool, setTitleBool] = useState(false);
    const [sunPosition, setSunPos] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0))
    const [globePosition, setGlobePos] = useState<THREE.Vector3>(startingPos);
    const [cameraPosition, setCameraPos ] = useState<THREE.Vector3>(new THREE.Vector3(10, 0, 0));
    const [stars, setStars] = useState<Float32Array>(generateStarPositions(50000));

    let geo = new THREE.SphereGeometry(0.05, 16, 16)
    let mat=  new THREE.MeshBasicMaterial({
        color: '#ffea00',
        wireframe: false,
        transparent: true,
        opacity: 1,
        visible: false,
    });
    let godMesh = new THREE.Mesh(geo, mat);
    let godMesh2 = new THREE.Mesh(geo, mat);
    godMesh.position.set(0, 0, 0);
    godMesh.material.visible = true;
    godMesh2.position.set(0, 0, 0);
    godMesh2.material.color.set('#ff7b00');
    godMesh2.material.visible = true;

    React.useEffect(() => {
        }, [])
        
    function Rig() {
        const { camera, mouse, scene } = useThree();
        console.log(scene)
        const vec = new THREE.Vector3()
        return useFrame(() => camera.position.lerp(vec.set(camera.position.x, mouse.y * 1, mouse.x * 3), 0.02))
    }


    function moveStars(event: MouseEvent, stars: THREE.Group) {
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
                <Rig />
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