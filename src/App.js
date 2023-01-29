 //CSS
import './App.css';

//React
import {useCallback , useEffect , useState} from 'react';

//components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

//data
import {wordsList} from './data/words'

const stages = [
  {id:1 , name: 'start'},
  {id:2 , name: 'game'},
  {id:3 , name: 'end'}
]



function App() {

  const [gameStage,setGameStage] = useState(stages[0].name)

  const [pickCategory,setPickCategory] = useState('')
  const [pickWord,setPickWord] = useState('')
  const [letters,setLetters] = useState([])
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters,setWrongLetters] = useState([])
  const [guesses,setGuesses] = useState(3)
  const [score,setScore] = useState(0)

const pickWordAndCategory = useCallback(() => {

    //pick category random
      const categories = Object.keys(wordsList)
      const category = categories[Math.floor(Math.random() * categories.length)]
    
    //pick a random word
    const word = wordsList[category][Math.floor(Math.random() * wordsList[category].length)]
    
    
    return { word , category}
  },[wordsList])
      
  const startGame = useCallback(() => {
      setGuessedLetters([])

      const { word,category } = pickWordAndCategory()
      let wordLetters = word.split('')
      wordLetters = wordLetters.map((letter) => letter.toLowerCase())

      setPickWord(word)
      setPickCategory(category)
      setLetters(wordLetters)
      
      setGameStage(stages[1].name)
    },[pickWordAndCategory])

  
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    if(guessedLetters.includes(normalizedLetter || wrongLetters.includes(normalizedLetter))){
      console.log('letter include')
      return
    }

    //in case of correct or incorrect letter
    if(letters.includes(normalizedLetter)){
      setGuessedLetters(actualState => 
        [...actualState,normalizedLetter]
        )
      }else{
        setWrongLetters(actualState => 
          [...actualState,normalizedLetter,]
          )
          setGuesses(actualGuesses => actualGuesses - 1)
          
          guesses === 1 && setGameStage(stages[2].name)
        }
        
      }
      
      //restarts the game
      const retry = () => {
        setGuesses(3)
        setScore(0)
        setGuessedLetters([])
        setWrongLetters([])
        setGameStage(stages[0].name)
      }
      
   //check in case of victory
   useEffect(()=>{
        const uniqueLetters =[ ...new Set(letters)]
        
        if(guessedLetters.length === uniqueLetters.length){
          startGame()
          setScore(actualScore => actualScore + 100)
       }
   },[guessedLetters])


  return (
    <div className="App">
      {gameStage === 'start'  && <StartScreen startGame = {startGame} />}
      {gameStage === 'game'  && 
       <Game verifyLetter = {verifyLetter} 
          pickCategory = {pickCategory}
          pickWord = {pickWord}
          letters = {letters}
          guessedLetters ={guessedLetters}
          wrongLetters = {wrongLetters}
          guesses = {guesses}
          score = {score}
          gameStage = {setGameStage}
      />}

      {gameStage === 'end'  && <GameOver retry = {retry} score={score}/>}
    </div>
  );
}

export default App;
