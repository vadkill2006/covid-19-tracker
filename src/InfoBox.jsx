import { Typography, Card } from '@material-ui/core'
import React from 'react'

const InfoBox = ({ cases, title, total }) => {
    return (
        <>
            <Card >

                <Typography>
                    {title}
                </Typography>
                <h3>
                    {cases}
                </h3>
                <Typography>
                    {total}
                </Typography>
            </ Card>

        </>
    )
}

export default InfoBox
