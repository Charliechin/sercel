import { FormEvent, useEffect, useState } from "react"
import { IText } from "../../interfaces/IText"
import { API } from "aws-amplify"
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'


const UploadText = () => {
  // put
  const [author, setAuthor] = useState('')
  const [textBody, setTextBody] = useState('')
  // get
  const [text, setText] = useState<IText[] | []>([])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    API.post('textAPI', '/texts', {
      body: {
        author,
        text: textBody
      }
    })

  }

  useEffect(() => {
    API
      .get('textAPI', '/texts/text', {})
      .then(res => setText([...text, ...res]))
  }, [text])

  return (
    <Authenticator>
      {({ signOut }) => (
        <>
          <form onSubmit={handleSubmit}>
            <input value={author} placeholder="Jane Austen" onChange={(e) => setAuthor(e.target.value)} />
            <input value={textBody} placeholder="Lorem Ipsum" onChange={(e) => setTextBody(e.target.value)} />
            <button type="submit">Add text</button>
            <button onClick={signOut}>Sign out</button>
          </form>
        </>
      )}
    </Authenticator>
  )
}

export default UploadText