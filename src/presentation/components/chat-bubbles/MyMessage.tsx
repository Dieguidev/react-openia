

interface MyMessageProps {
  text: string
}

export const MyMessage = ({ text }: MyMessageProps) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500 flex-shrink-0">
          F
        </div>
        <div className="relative ml-3 text-sm bg-indigo-700 pt-3 pb-2 px-4 shadow rounded-xl">
          <div>{text}</div>
        </div>
      </div>
    </div>
  )
}
