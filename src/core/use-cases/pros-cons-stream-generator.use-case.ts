export async function* prosConsStreamGeneratorUseCase(prompt: string) {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_GPT_API_KEY}`,
        },
        body: JSON.stringify({ prompt }),
        //TODO: abortSignal
      }
    );

    if (!resp.ok)
      throw new Error("No se puede realizar la comparación de pros y contras");

    const reader = resp.body!.getReader();
    if (!reader) {
      console.log("No se pudo generar el reader");
      return null;
    }

    const decoder = new TextDecoder("utf-8");

    let text = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;

      yield text;
    }
  } catch (error) {
    console.log(error);

    return null;
  }
}
