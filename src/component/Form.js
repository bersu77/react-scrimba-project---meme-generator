import { useEffect, useState } from "react";
import Memedata from "../Memedata";

const Form = () => {
    const [memeImage ,setmemeImage] = useState()
    const [number ,setNumber] = useState(0)
    const [memeText, setmemeText] = useState({
        topText:"",
        bottomText:""
    })
    const [allMeme, setAllMeme] = useState()
    const handleChange = (e) => {
        const {name, value}=e.target
        setmemeText(prevText => {
            return{
                ...prevText,
                [name]:value
            }
        })
    }
    

    
    const handleClick = (e) => {
        e.preventDefault()
        setNumber((prevNum)=>
            prevNum + 1
        )
        console.log(number)

    }
    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then((res)=>res.json())
        .then((res)=>setAllMeme(res.data.memes))
    },[number])
    console.log(allMeme)
 
    return ( 
        <div className="form">
            
            <form action="submit">
                <div className="input">
                    <label htmlFor="top-text"></label>
                    <input 
                    id='top-text' 
                    type="text"
                    name="topText"
                    value={memeText.topText}
                    placeholder="Top text"
                    onChange={handleChange} 
                    />
                    <label htmlFor="bottom-text"></label>
                    <input 
                    id="bottom-text"
                    name="bottomText"
                    value={memeText.bottomText}
                    onChange={handleChange} 
                    type="text"
                    placeholder="Bottom text" />
                </div>
                <button className="new-meme-button" onClick={handleClick}>Get a new meme image 🖼</button>

            </form>
            <div className="meme-section">
               <div className="meme-image">
               {allMeme&&<img 
                src={allMeme[number].url} alt="" />}
               </div>
                
                <div className="meme-text">
                <h1 className="meme--text top" >{memeText.topText}</h1>
                <h1 className="meme--text bottom" >{memeText.bottomText}</h1>
                </div>
                
            </div>
            
           


        </div>
     );
}
 
export default Form;