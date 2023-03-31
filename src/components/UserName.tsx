import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

function UserName() {
    const myState = useSelector((state: any) => state.changeUser)
    return (
        <div>
            {myState.email}
        </div>
    )
}

export default UserName