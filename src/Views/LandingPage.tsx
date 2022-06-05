import * as React from 'react'
import { Typography, Space } from 'antd'
import { Copyright, CustomTitle, Slideshow, ErrorBoundary} from '../Components/index'
import GlobeModel from '../Helpers/GlobeModel';
import Stars from '../Helpers/Instances';
import { Canvas } from '@react-three/fiber';

const { useState, Suspense } = React

const introSlides = [
    'In a time of great uncertainty-',
    'When our basic ideals are causing deadly fights between us,',
    // Transition
    'We know so much about what plagues the world and our society,',
    'Yet, we can\'t seem to come together to stop it.',
    // Transition
    'Aren\'t you sick of it?',
    'I am.',
    // break
    // extra info if curious
    'I made a whimsical website that finds your antipode.',
    'Yeah, I didn\'t know that was a thing either.',
    'An [[Antipode]] is the opposite side of the planet from where you are standing (most likely sitting) right now.',
    'Lets shoot a line straight through the earth and see where it hits.',
];

// I'd like to add a couple transitions w/ the animation synced to the text.
// this will be the main view containing the google map, the search bar for address, and the input field for clicking find my location

// laurel liked the idea of the globe rotating towards your mouse as you move it around.
// I'd have to add an event listener for mousemove and track the coordinates/pass them to the globe model.


const LandingPage : React.FC = (props) => { 
    const [titleBool, setTitleBool] = useState(false);
    const [mousePos, setMousePos] = useState({x: 0, y: 0});


    // React.useEffect(() => {
    //     document.addEventListener('mousemove', onDocMouseMove);
    // },[]);
    // function onDocMouseMove(event: MouseEvent) {
    //     console.log(`new x: ${event.clientX}`);
    //     console.log(`new y:${event.clientY}`);
    //     // need to use new coordinates to inform rotation of the stars
    // }

    return(
        // If we could request location here, we could include the antipode in the 3d model as we talk about it.
        // I'd like to make the little arrows on the side of the page clickable to hide the section of text, or expand. The first section will be displayed by default.
        <div className="view-wrapper" role="group" aria-label="vw">
            <div className='canvas-wrapper' role="group" aria-label="cw">
                <ErrorBoundary >
                <Canvas
                    frameloop="demand"
                    className="canvas-element" 
                    style={{height:"100vh", width:"100vw", backgroundColor: 'black'}}
                    camera={{fov: 25, position: [0,-15,0]}}
                    resize={{scroll: true, debounce: {scroll: 50, resize: 0}}}
                >
                    <Suspense fallback={null}>
                            <GlobeModel scale={10} position={7.7}/>
                            <Stars radius={300}/>                            
                            <ambientLight intensity={0.2} castShadow={true} />
                            <directionalLight intensity={0.5} position={[0,1,1]}/>
                            <directionalLight intensity={1} color={'red'} position={[0,15,0]}/>
                    </Suspense>
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