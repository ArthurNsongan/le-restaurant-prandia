import { useEffect, useState } from 'react'
import close from './x.svg'


function Toast() {

    const [isTerm, setisTerm] = useState(false)
    
    useEffect(()=> {
        setTimeout(()=>{ setisTerm(true); console.log("Terminated") }, 3000)
    })

    return isTerm === false ? (
        <div className="toast d-flex align-items-center">
            Notification
            <img src={close} />
        </div>) : '';
}

export default Toast