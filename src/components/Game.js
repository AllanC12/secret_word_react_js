import './Game.css'
import {useState ,useRef} from 'react'
 
const Game = ({verifyLetter , 
  pickCategory , 
  pickWord ,
  letters , 
  guessedLetters , 
  wrongLetters ,
  guesses , 
  score}) => {

  const [letter,setLetter] = useState('')
  const inputRefLetter = useRef(null)

  const handleSubmit = (e) =>{
    e.preventDefault()
    
    verifyLetter(letter)
    
    setLetter('')
    inputRefLetter.current.focus()

    
  }

    return (
    <div className="game">
       <p className="points">
          <span>Pontuação: {score}</span>
       </p>
       <h3 className="tip">
        Dica sobre a palavra:
           <span>{pickCategory}</span>
       </h3>
       <p>Você ainda tem {guesses} tentativas</p>
       <div className="wordContainer">

         {
          letters.map((letter , index) => (
            guessedLetters.includes(letter) ? (
              <span key={index} className="letter">{letter}</span>
              ):(
                <span key={index} className="blankSquare"></span>
            )
          ))
         }

       </div>
       <div className="letterContainer">
           <p>Tente adivinhar uma letra da palavra:</p>
           <form onSubmit={handleSubmit}>
             <input type="text"
              name='letter' 
              maxLength="1" 
              required
              ref={inputRefLetter}
              value={letter}
              onChange={(e)=> setLetter(e.target.value)}/>
             <button>Jogar!</button>
           </form>
           <div className="wrongLettersContainer">
                <p>Letras ja utilizadas</p>
                 {
                  wrongLetters.map((letter,index)=> (
                  <span key={index}> {letter} ,</span>
                  ))
                 }
              </div>
       </div>
    </div>
  )
}

export default Game