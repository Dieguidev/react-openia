import { useState } from "react"
import { GptMessage, MyMessage, TextMessageBox, TextMessageBoxFile, TypingLoader } from "../../components"

interface Message {
  text: string
  isGpt: boolean
}


export const OrthographyPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) => {
    setIsLoading(true)
    setMessages(prev => [...prev, { text, isGpt: false }])

    // Simulate a delay for the response
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Simulate a response from the GPT model
    const gptResponse = "Esto es una respuesta de OpenAI"
    setMessages(prev => [...prev, { text: gptResponse, isGpt: true }])
    setIsLoading(false)
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text='Hola, puedes escribir tu texto en español, y te ayudo con las correcciones' />

          {
            messages.map((message, index) => (
              message.isGpt
                ? <GptMessage key={index} text='esto es de openia' />
                : <MyMessage key={index} text={message.text} />
            ))
          }

          {
            isLoading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
              </div>
            )
          }

        </div>
      </div>

      {/* <TextMessageBox
        onSendMessage={message => handlePost(message)}
        placeholder="Excribe aquí lo que deseas"
        disableCorrections
      /> */}
      <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Excribe aquí lo que deseas"
      />
    </div>
  )
}
