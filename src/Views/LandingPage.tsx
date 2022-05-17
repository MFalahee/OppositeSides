import * as React from 'react'
import { Typography } from 'antd'

// this will be the main view containing the google map, the search bar for address, and the input field for clicking find my location
const LandingPage : React.FC = (props) => { 
    return(
        <div className="view-wrapper">
            <Typography>
               In a time where the phrase 'opposite sides' usually precedes political strife or outrage, I set out to make a totally whimsical project.
               Something to distract from looming supreme court decisions or simply waste some time. 

               This website was inspired by a younger me, bored in class. I wanted to dig a hole straight down beneath my desk, just to see what was on the opposite side of the earth.

               Thanks to science and a little code, I can now fulfill younger me's dream of finding a way to see the world from the other side.

                I hope you enjoy this project. Thanks for stopping by.
            </Typography>
        </div>
    )
}

export default LandingPage

