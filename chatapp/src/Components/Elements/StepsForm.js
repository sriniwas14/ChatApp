import React, { useState, useEffect} from 'react'

export function CustomTab(props){
    return (<div className={`stepsTab ${props.className}`} onClick={props.onClick} >
        <div><span className="stepsTabNumber">{ props.index }</span></div>
        <div className="stepsTapValue">{ props.value }</div>
    </div>)
}

export function StepsForm(props) {
    const [selectedTab, setSelectedTab] = useState(props.steps[0].value)

    return (
        <div>
            <div className="stepsTabs">
                {
                    props.steps.map((step, index) => <CustomTab value={step.value} index={index} onClick={()=> setSelectedTab(step.value)} className={ selectedTab===step.value ? "active" : "" } />)
                }
            </div>
            {
                props.children.map((child)=> {
                   return child.key===selectedTab ? child : ""
                })
            }
        </div>
    )
}


export function Step(props){
    return (
        <div>
            { props.children }
        </div>
    )
}
/***
<StepsForm steps={[{ value: "Personal" },{ value: "Password" },{ value: "Address" }]}>
                <Step key="Personal">Personal</Step>
                <Step key="Password">Password</Step>
            </StepsForm>
            ***/