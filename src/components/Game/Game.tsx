import { withAuthenticator } from "@aws-amplify/ui-react"
import { useEffect, useState } from "react"
import TypingComponent from "../TypingComponent/TypingComponent"
import { IText } from "../../interfaces/IText"
import useFetchData from "../../hooks/useFetch"

const Game = () => {

  const [result, setResult] = useState({
    wpm: 0,
    accuracy: '',
    duration: 0,
    correctChar: 0,
    errors: 0
  })
  // const [textsFromDB, setTextsFromDB] = useState<IText[] | []>([])

  const [data, loading] = useFetchData<IText[]>()
  const [currentQuote, setCurrentQuote] = useState<IText>({
    author: 'Friedrich Nietzsche',
    text: 'That which does not kill us makes us stronger'
  })
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    if (result.wpm === 0 || isNaN(result.wpm)) return
    if (result.duration === 0) return
  }, [result])





  // if (!loading && data) {
  //   const randomElement = data[Math.floor(Math.random() * data.length)];
  //   setCurrentQuote(randomElement)

  // }

  useEffect(() => {
    if (!data) return
    const randomElement = data[Math.floor(Math.random() * data.length)];
    setCurrentQuote(randomElement)
  }, [data])

  return (
    <div className="container mx-auto flex flex-col p-4">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Type as fast as you can!</h1>
        <h6>React app demo for Sercel</h6>
      </div>
      {/* <h5>Esc to reset</h5> */}
      <div className="border-2 p-4 rounded-lg">
        <h1 className="mb-2">{currentQuote.author}</h1>
        {loading ?
          <p>Loading...</p> :
          <TypingComponent
            // text={"A person may be proud without being vain. Pride relates more to our opinion of ourselves, vanity to what we would have others think of us."}
            text={currentQuote.text}
            setResult={setResult}
            setIsCompleted={setIsCompleted}
          />
        }
      </div>

      {isCompleted ?
        <p>Completed</p> : <p>not Completed</p>
      }
    </div>
  )
}

export default withAuthenticator(Game)