import * as React from 'react'
import { Typography } from 'antd'

// this will be the main view containing the google map, the search bar for address, and the input field for clicking find my location
const LandingPage : React.FC = (props) => { 
    return(
        <div className="view-wrapper">
            <Typography>
               In a time of great uncertainty when it comes to health and financial security, and where the phrase 'opposite sides' usually precedes political strife or outrage-- I've set out to make a totally whimsical website.
               Something to distract me, mainly, but also(hopefully) you, from looming supreme court decisions and the endless downpour of depressing media coverage.

               This website was inspired by and idea from a younger me, bored in history class. I wanted to dig a hole straight down beneath my desk, just to see what was on the opposite side of the earth.

               Thanks to science and a little code, I can now fulfill younger me's dream of finding a way to see the world from the other side.

                I hope you enjoy this project. Thanks for stopping by.
            </Typography>
        </div>
    )
}

export default LandingPage

