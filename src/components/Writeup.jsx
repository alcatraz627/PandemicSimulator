import React from 'react'
import { Divider, Typography, Grid, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    divider: {
        margin: '30px',
        backgroundColor: 'darkgrey',
    },
    container: {
        padding: "30px 60px",
    },
    textbox: {
        border: '1px solid lightgrey',
        padding: '40px 30px',
        margin: '10px',
        borderRadius: '10px',
        // background: '#fafafa',
    },
    text: {
        marginTop: '10px',
        textAlign: 'justify',
    }
}))

const TEXT = [
    {
        title: "What is this game about?",
        desc: [
            "This game is a model simulation of the spread of a pandemic through a generic population. It allows modifying the various parameters that have a bearing on how the pandemic outbreak evolves and spreads. ",
            "It simplifies and models a pandemic as a contact transferred state that resides in the host for a duration, in which initially it does not show symptoms(incubation phase), and later manifests itself with visible symptoms, at which stage the individual is hospitalized and has way less interactions with other in the community, and so a much lower rate of transmission."
        ],
    },
    {
        title: "What do the sliders do?",
        desc: [
            "The sliders allow for adjusting the basic characteristics of the incubation period of the disease, human activities that affect the spread and the effect of the virus on humans.",
            "Additionally, they also allow adjusting the conditions of the community in consideration. A community with a high value for the Initial infection carriers will have a different evolution trajectory for the virus, compared to a community with only a few members infected initially."
        ],
    },
    {
        title: "How do actions like social distancing, quarantines and travel restrictions factor in to the evolution of a pandemic?",
        desc: [
            "When modelling the spread of a pandemic, such actions can be broken down into how they affect the basic parameters listed.",
            "For example, imposing travel restrictions directly correspond to a decrease in the average travel radius of people, while other actions like quarantines translate to a reduced transmission rate. ",
            "With a combination of factors like reduced average travel distance(from travel restrictions and mandated travel quarantines), lower transmission rate(arising from self quarantines and social distancing), one can attempt to 'flatten the curve' by making the infection sweep through the population over a longer period of time, thus not overwhelming the support system any community might have. "
        ],
    },
]

const Writeup = () => {
    const classes = useStyles()
    return <div>
        <Divider className={classes.divider} />
        <Grid container className={classes.container}>
            {TEXT.map(({ title, desc }, i) =>
                <Grid key={i} item md={4} sm={6} xs={12}>
                    <div className={classes.textbox} >
                        <Typography variant="h5">{title}</Typography>
                        {desc.map((d, j) => <Typography key={j} className={classes.text} variant="body1">{d}</Typography>)}
                    </div>
                </Grid>
            )}
        </Grid>
    </div>
}

export default Writeup