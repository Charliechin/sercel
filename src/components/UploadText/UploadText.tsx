import { FormEvent, useState } from "react"
import { API } from "aws-amplify"
import '@aws-amplify/ui-react/styles.css'
import { Button } from "@chakra-ui/react"
import { withAuthenticator } from "@aws-amplify/ui-react"


const UploadText = () => {
  // put
  const [author, setAuthor] = useState('')
  const [textBody, setTextBody] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    API.post('textAPI', '/texts', {
      body: {
        author,
        text: textBody
      }
    })

  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={author} placeholder="Jane Austen" onChange={(e) => setAuthor(e.target.value)} />
        <br />
        <input value={textBody} placeholder="Lorem Ipsum" onChange={(e) => setTextBody(e.target.value)} />
        <br />
        <br />
        <Button colorScheme="blue" type="submit">Add text</Button>
      </form>
    </>
  )
}

export default withAuthenticator(UploadText)