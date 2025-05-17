import { useState } from "react"
import { GptMessage, GptOrthographyMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components"
import { orthographyUseCase } from "../../../core/use-cases"

interface Message {
  text: string
  isGpt: boolean
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  }
}


export const OrthographyPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) => {
    setIsLoading(true)
    setMessages(prev => [...prev, { text, isGpt: false }])

    const data = await orthographyUseCase(text)
    if (!data.ok) {
      setMessages(prev => [...prev, { text: 'No se pudo realizar la correción', isGpt: true }])
    } else {
      setMessages(prev => [...prev, {
        text: data.message,
        isGpt: true,
        info: {
          errors: data.errors,
          message: data.message,
          userScore: data.userScore
        }

      }])
    }

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
                ? <GptOrthographyMessage
                  key={index}
                  {...message.info!}
                />
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

      <TextMessageBox
        onSendMessage={message => handlePost(message)}
        placeholder="Excribe aquí lo que deseas"
        disableCorrections
      />

    </div>
  )
}
