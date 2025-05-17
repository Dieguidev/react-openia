

interface GptMessageProps {
  userScore: number;
  errors: string[];
  message: string;
}

export const GptOrthographyMessage = ({ errors, message, userScore }: GptMessageProps) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 flex-shrink-0">

        </div>
        <div className="relative ml-3 text-sm bg-black/25  pt-3 pb-2 px-4 shadow rounded-xl">
          <h3 className="text-3xl">Puntaje: {userScore}%</h3>
          <p>{message}</p>
          {
            (errors.length === 0)
              ? <p>No se encontraron errores</p>
              : (
                <>
                  <h3 className="text-2xl">Errores encontrados</h3>
                  <ul className="list-disc">
                    {
                      errors.map((error, index) => (
                        <li key={index} className="text-sm">{error}</li>
                      ))
                    }
                  </ul>
                </>
              )
          }
        </div>
      </div>
    </div>
  )
}
