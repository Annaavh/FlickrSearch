import React from 'react'
import SearchImgs from './components/SearchImgs'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App(){
  return (
    <div>
        <DndProvider backend={HTML5Backend}>
            <SearchImgs/>
        </DndProvider>  
    </div>
  )
}

export default App;