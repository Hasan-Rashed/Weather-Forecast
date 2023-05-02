import React, {useContext} from 'react'
import { UserContext } from './context/Context';

const Consumer = () => {

  const user = useContext(UserContext);
  
  return (
    <div>Consumer
      {/* <h1>{`${user}`}</h1> */}
      {
        user.map((item, index) => {
          return (
            <h1 key={index}>{item.name}</h1>
          )
        })
      }
    </div>
  )
}

export default Consumer