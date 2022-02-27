import React from 'react'
import { useDrag } from "react-dnd";

const Picture = ({id,src}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: { id: id },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }));
  return (
    <img style={{opacity:isDragging?"0.6":"1",border:"1px solid pink"}} ref={drag} src={src} />
  )
}

export default Picture;