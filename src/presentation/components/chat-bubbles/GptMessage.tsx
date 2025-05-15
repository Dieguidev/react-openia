import Markdown from "react-markdown"

interface GptMessageProps {
  text: string
}

export const GptMessage = ({ text }: GptMessageProps) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 flex-shrink-0">

        </div>
        <div className="relative ml-3 text-sm bg-black/25  pt-3 pb-2 px-4 shadow rounded-xl">
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </div>
  )
}
