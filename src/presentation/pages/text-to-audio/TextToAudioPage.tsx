
import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxSelect, GptMessageAudio } from "../../components"
import { textToAudioUseCase } from "../../../core/use-cases"

const voices = [
  { id: "nova", text: "Nova" },
  { id: "alloy", text: "Alloy" },
  { id: "echo", text: "Echo" },
  { id: "fable", text: "Fable" },
  { id: "onyx", text: "Onyx" },
  { id: "shimmer", text: "Shimmer" },
]

interface TextMessage {
  text: string
  isGpt: boolean
  type: 'text'
}

interface audioMessage {
  text: string
  isGpt: boolean
  type: 'audio'
  audio: string
}

type Message = TextMessage | audioMessage


export const TextToAudioPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string, selectedVoice: string) => {
    setIsLoading(true)
    setMessages(prev => [...prev, { text, isGpt: false, type: 'text' }])

    const { ok, message, audioUrl } = await textToAudioUseCase(text, selectedVoice)

    setIsLoading(false)
    if (!ok) return
    setMessages(prev => [...prev, { text: message, isGpt: true, type: 'audio', audio: audioUrl! }])
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text='Tu escribe y yo como IA te genero el audio' />

          {
            messages.map((message, index) => (
              message.isGpt
                ? (
                  message.type === 'audio'
                    ? (<GptMessageAudio key={index} text={message.text} audio={message.audio} />
                    ) : (<MyMessage key={index} text={message.text} />))
                : (<MyMessage key={index} text={message.text} />)
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

      <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeholder="Excribe aquí lo que deseas"
        options={voices}
      />
    </div>
  )
}
