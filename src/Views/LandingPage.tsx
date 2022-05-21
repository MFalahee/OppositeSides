import * as React from 'react'
import { Typography, Space, Divider} from 'antd'
import { Copyright, ExpandIcon, CustomTitle, ErrorBoundary } from '../Components/index'
import GlobeModel from '../Helpers/GlobeModel';
import { Canvas } from '@react-three/fiber';
const { Text, Title, Link, Paragraph } = Typography
const {useEffect, useState, Suspense} = React

// this will be the main view containing the google map, the search bar for address, and the input field for clicking find my location
const LandingPage : React.FC = (props) => { 
    const [showPeriod, setShowPeriod] = useState('hidden')
    const [showFirstContent, setShowFirstContent] = useState(true);
    const [showSecondContent, setShowSecondContent] = useState(false);
    const [showThirdContent, setShowThirdContent] = useState(false);
    const [titleBool, setTitleBool] = useState(false);
    
    function handleHiddenClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (showPeriod === 'hidden') {
            setShowPeriod('visible')
        } else {
        setShowPeriod('hidden')
        }
    }

    function handleArrowClick(e: React.MouseEvent, index: number) {
        if (index === 0) {
            setShowFirstContent(true)
            setShowSecondContent(false)
            setShowThirdContent(false)
        } else if (index === 1) {
            setShowFirstContent(false)
            setShowSecondContent(true)
            setShowThirdContent(false)
        } else if (index === 2) {
            setShowFirstContent(false)
            setShowSecondContent(false)
            setShowThirdContent(true)
            setTitleBool(true)
        }
    }
    

    useEffect(() => {
        }, [])
    
    return(
        // I'd like to make the little arrows on the side of the page clickable to hide the section of text, or expand. The first section will be displayed by default.
        <div className="view-wrapper">
            <div className='canvas-wrapper'>
                <ErrorBoundary >
                <Canvas 
                    className="canvas-element" 
                    style={{height:"100vh", width:"100vw"}}
                    camera={{fov: 60, position: [0,-10,15]}}>
                    <Suspense fallback={null}>
                            <GlobeModel scale={0.1}/>
                            <ambientLight intensity={0.2} />
                    </Suspense>
                </Canvas>
                </ErrorBoundary>
                </div>
            <Space className="landing-page" direction="vertical" size="large" style={{ width: '75%' }}>
                <div className="style-div">
                    <Typography className="lp-typo">
                    {(titleBool) ? <CustomTitle title="Opposite Sides"/> : null}
                    <Space id="expandable" className={showFirstContent ? "visible" : ""}>
                        <Paragraph className="hook-text">
                            In a time of 
                                <Text strong> great </Text>
                                uncertainty, where the phrase
                                <Text italic> opposite sides </Text> 
                                usually precedes political strife or outrage- I've set out to make a totally whimsical website that flips the world.
                                This isn't all that
                                <Text italic> much </Text> 
                                in 2022, but it is atleast something to distract myself with learning- and 
                                hopefully,<Text italic> you, </Text> 
                                with humor. Look, it'll at least be marginally better to be here than taking a stroll through the endless downpour of depressing media 
                                <Text> blah</Text><Text italic>blah</Text><Text strong>blah </Text>
                            </Paragraph>
                        
                    </Space>
                    <ExpandIcon index={0} isExpanded={showFirstContent} expandClick={handleArrowClick} collapseClick={e => null}/>
                    <Divider className='lp-divider' />
                    <Space id="expandable" className={showSecondContent ? "visible" : ""}>
                        <Paragraph className="inspo-text" >
                            This website was inspired by an idea from a 
                            <Text italic> much </Text>
                            younger me- distracted in history class. I was looking at the pages of the textbook in front of me- mostly pictures of men with flags or maps of past conflicts and battles. 
                            I wasn't interested, so I started to daydream about burrowing straight down underneath my desk. I had no clue what I'd find, I just thought it'd be fun to explore.
                            <Text className={showPeriod}>(...ok you got me it was to escape class as well)</Text>
                            <Text strong onClick={handleHiddenClick}>. 
                            </Text>    
                            Thanks to a little learning and code, I now am able to create a fun tool that will help you find your way through the world. (Though, be warned, it's mostly water.) 
                        </Paragraph>
                    </Space>
                    <ExpandIcon index={1} isExpanded={showSecondContent} expandClick={handleArrowClick} collapseClick={e => null}/>
                    <Divider className='lp-divider' />
                    <Space id="expandable" className={showThirdContent ? "visible" : ""}>
                        <Paragraph className="thank-you">
                            I hope you enjoy this website. Thank you for stopping by.
                        </Paragraph>

                        {/* I want to create a special effect here to transition to the actual website, 
                            as we display the title for the first time
                         */}
                        
                    </Space>
                    <ExpandIcon index={2} isExpanded={showThirdContent} expandClick={handleArrowClick} collapseClick={e => null} />
                </Typography>
                </div>
            </Space>
            <Copyright />
            
        </div>
    )
}

export default LandingPage

