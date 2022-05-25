import * as React from 'react'
import { Typography, Space } from 'antd'
import { Copyright, CustomTitle, ErrorBoundary, Slideshow } from '../Components/index'
import GlobeModel from '../Helpers/GlobeModel';
import Stars from '../Helpers/Instances';
import { Canvas } from '@react-three/fiber';
const { useState, Suspense} = React

const introSlides = [
    'In a time of great uncertainty-',
    'When we know so much about what plagues the world and ourselves,',
    'Yet, we can\'t seem to come together to stop it.',
    'When the extreme between the opposite sides of any argument seem to devolve into a fight,',
    'Aren\'t you sick of it?',
    'I am.',
    'So I made a whimsical website that finds your antipode.',
    'Yeah, I didn\'t know that was a thing either.',
    'Antipode means the opposite side of the world from where you are right now.',
    'Lets shoot a line straight through the earth and see where it hits.',
];



// this will be the main view containing the google map, the search bar for address, and the input field for clicking find my location
const LandingPage : React.FC = (props) => { 
    const [titleBool, setTitleBool] = useState(false);
    return(
        // If we could request location here, we could include the antipode in the 3d model as we talk about it.
        // I'd like to make the little arrows on the side of the page clickable to hide the section of text, or expand. The first section will be displayed by default.
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