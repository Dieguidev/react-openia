import type { TranslateResponse } from "../../interfaces/translate.response";

export const translateTextUseCase = async (prompt: string, lang: string) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_GPT_API_KEY}`,
      },
      body: JSON.stringify({ prompt, lang }),
    });

    if (!resp.ok) throw new Error("No se pudo traducir el texto");

    const data = (await resp.json()) as TranslateResponse;
    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo traducir el texto",
    };
  }
};
