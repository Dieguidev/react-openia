export async function* translateStreamUseCase(
  prompt: string,
  lang: string,
  abosrtSignal: AbortSignal
) {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/translate-stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_GPT_API_KEY}`,
        },
        body: JSON.stringify({ prompt, lang }),
        //TODO: abortSignal
        signal: abosrtSignal,
      }
    );

    if (!resp.ok) throw new Error("No se pudo traducir el texto");

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
