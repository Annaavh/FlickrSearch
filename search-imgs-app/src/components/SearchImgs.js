import React, { useEffect, useState } from "react"
import '../index.css';
import { useDrop } from "react-dnd";
import Picture from "./Picture";

function SearchImgs() {

  const [pictures,setPictures] = useState([])
  const [searchInp,setSearchinp] = useState("")
  const [isOpen,setIsOpen] = useState(false)
  const [imgsArray,setImgsArray] = useState([])
  
  let inpArr = searchInp &&  searchInp.split(" ")

  useEffect(() =>{
    reloadingImgs()
  },[])

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  const addImageToBoard = (id) => {
    const pictureList = pictures.filter((item) => id === item.props.id)[0];
    const div = document.getElementsByClassName('.content');
    imgsArray && pictureList && imgsArray.map((item,index)=>{
        if(item.photos.photo.slice(0,5).indexOf(pictureList) !== -1){
          let srcPath = 'https://farm'+pictureList.farm+'.staticflickr.com/'+pictureList.server+'/'+pictureList.id+'_'+pictureList.secret+'.jpg';
          div[index].innerHTML+=<Picture src={srcPath} id={pictureList.id} />
        }
    })
  };

  
  function reloadingImgs(){
    Promise.all(
      inpArr && inpArr.map((item) =>fetch("https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=65c99e591e23322ef1248f131eeebf94&tags="+item+"&format=json&nojsoncallback=1"))
      )
      .then(function(res){
        return Promise.all(res.map((item)=>item.json()))
      })
      .then((imgs)=>{
        setImgsArray(imgs);
        let imgsArr = imgs.reduce((acc,val,index)=>{
          acc.push(...val.photos.photo.slice(0,5))
          return acc;
      },[])
      
     
      let picArray = imgsArr.map((pic)=>{
        let srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
        return <Picture src={srcPath} key={pic.id} id={pic.id} />
      })
      setPictures(picArray)
    })
  }

  const handleClick = () =>{
    reloadingImgs()
  }
  
  const handleBtnClick = () =>{
     setIsOpen(!isOpen)
  }

  return (
    <div className="App">
      <div className="inpBtn">
        <input value={searchInp} onChange={(e)=>setSearchinp(e.target.value)} type="text" placeholder="Search..."/>
        <button onClick={handleClick}>SEARCH</button>
      </div>

      <div className="imgs">
        {pictures}
      </div>

      <div className="imgBaskets">
        {
          inpArr && inpArr.map((item)=>{
          return (
            <div ref={drop}> 
              <button onClick={handleBtnClick}>{item}</button>
              {isOpen && <div  className="content"></div>}
            </div>
          )
          })
        }
      </div>
      
    </div>
  );
}

export default SearchImgs;
