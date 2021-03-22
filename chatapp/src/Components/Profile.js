import { Container, Typography } from '@material-ui/core';
import React from 'react'
import withAuth from "../Context/withData";
import Image from '../assets/Profile.svg'

function Profile(props) {
    return (
        <div>
            <Container >
                <div style={{ display: "flex", padding: 20, borderBottom: "1px solid #e6e6e6" }}>
                    <div>
                        <img style={{ height: 128, width: 128 }} src={Image} />
                    </div>
                    <div style={{ margin: "auto 0", padding: 20 }}>
                        <Typography variant="h5" component="h5">{ props.userDetails.first_name+" "+props.userDetails.last_name }</Typography>
                        <span style={{ cursor: "default", color: "#777777" }}>{ props.userDetails.bio }</span>
                    </div>
                </div>
                <div style={{ padding: "70px 0", textAlign: "center", color: "#777777" }}>
                    Nothing to See Here
                </div>
            </Container>
        </div>
    )
}

export default withAuth(Profile)