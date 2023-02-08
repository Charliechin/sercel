import { withAuthenticator } from "@aws-amplify/ui-react"
import { useEffect, useState } from "react"
import TypingComponent from "../TypingComponent/TypingComponent"
import { IText } from "../../interfaces/IText"
import useFetchData from "../../hooks/useFetch"
import { Box, Button, useDisclosure } from "@chakra-ui/react"
import MyModal from "../Modal/Modal"


const Game = () => {

  const [result, setResult] = useState({
    wpm: 0,
    accuracy: '',
    duration: 0,
    correctChar: 0,
    errors: 0
  })

  const [data, loading] = useFetchData<IText[]>()

  const [currentQuote, setCurrentQuote] = useState<IText>({
    author: 'Friedrich Nietzsche',
    text: 'That which does not kill us makes us stronger'
  })

  const [isCompleted, setIsCompleted] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (result.wpm === 0 || isNaN(result.wpm)) return
    if (result.duration === 0) return
    setIsCompleted(true)
  }, [result])




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
      <Box className="border-2 p-4 rounded-lg" mb={5}>
        <h1 className="mb-2">{currentQuote.author}</h1>
        {loading ?
          <p>Loading...</p> :
          <TypingComponent
            text={currentQuote.text}
            setResult={setResult}
          />
        }
      </Box>

      {isCompleted ?
        <Button size="lg" colorScheme="blue" onClick={onOpen}>Submit Score</Button> :
        null
      }

      <MyModal
        title="Submit score"
        isOpen={isOpen}
        onClose={onClose}
      >
        <p>hola</p>
      </MyModal>
    </div>
  )
}

export default withAuthenticator(Game)