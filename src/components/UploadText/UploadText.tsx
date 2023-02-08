import { FormEvent, useState } from "react"
import { API } from "aws-amplify"
import '@aws-amplify/ui-react/styles.css'
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react"
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
      <div className="container mx-auto flex flex-col p-4">
        <div className="mb-4">Save a quote to DynamoDB</div>
        <form onSubmit={handleSubmit}>
          <FormControl mb={5}>
            <FormLabel>Author</FormLabel>
            <Input value={author} placeholder='Author' onChange={(e) => setAuthor(e.target.value)} />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel>Quote</FormLabel>
            <Input value={textBody} placeholder='Author' onChange={(e) => setTextBody(e.target.value)} />
          </FormControl>
          {/* <input value={author} placeholder="Jane Austen" onChange={(e) => setAuthor(e.target.value)} /> */}
          {/* <br /> */}
          {/* <input value={textBody} placeholder="Lorem Ipsum" onChange={(e) => setTextBody(e.target.value)} /> */}
          <Button colorScheme="blue" type="submit">Add text</Button>
        </form>
      </div>
    </>
  )
}

export default withAuthenticator(UploadText)