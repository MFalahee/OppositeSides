import * as React from 'react'
import { Typography } from 'antd'

// this will be the main view containing the google map, the search bar for address, and the input field for clicking find my location
const LandingPage : React.FC = (props) => { 
    return(
        <div className="view-wrapper">
            <Typography type="title">
               In a time where the phrase 'opposite sides' usually prompts political strife or outrage, I set out to make a totally whimsical project.
               Something to distract from looming supreme court decisions or simply waste some time. 
            </Typography>
        </div>
    )
}

export default LandingPage

