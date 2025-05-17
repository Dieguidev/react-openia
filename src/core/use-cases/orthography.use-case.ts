import type { OrthographyResponse } from "../../interfaces";

export const orthographyUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/ortography-check`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_GPT_API_KEY}`,
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!resp.ok)
      throw new Error("No se puede realizar la correcion ortográfica");

    const data = (await resp.json()) as OrthographyResponse;

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: "No se puede realizar la correcion ortográfica",
    };
  }
};
