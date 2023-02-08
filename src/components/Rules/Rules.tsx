import { Box, ListItem, OrderedList } from "@chakra-ui/react"

const Rules = () => {
  return (
    <div className="container mx-auto flex flex-col p-4">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Rules of the game</h1>
        <h6>Don't worry! It is easy!</h6>
      </div>
      <Box className="border-2 p-4 rounded-lg" mb={5}>
        <OrderedList>
          <ListItem>Log in</ListItem>
          <ListItem>A random text will be displayed on the screen</ListItem>
          <ListItem>Click on the "Type here..." text input to start the typing test</ListItem>
          <ListItem>Start typing the text as fast as you can without making any mistakes</ListItem>
          <ListItem>The app will track your accuracy, wpm(words per minute) and errors in real-time</ListItem>
          <ListItem>To increase your accuracy and wpm, try to type the text again after a few minutes of practice and compare your results to your previous attempts </ListItem>
        </OrderedList>
      </Box>
    </div>
  )
}

export default Rules
