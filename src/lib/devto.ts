import { Article } from "@/types/article";

const BASE_URL = "https://dev.to/api";

export async function getArticles(tag?: string): Promise<Article[]> {
  const url = tag
    ? `${BASE_URL}/articles?tag=${tag}&per_page=12`
    : `${BASE_URL}/articles?per_page=12`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];

  const data = await res.json();
  if (!Array.isArray(data)) return [];

  return data.filter((a: Article) => Boolean(a?.slug));
}

export async function getArticleById(id: number): Promise<Article> {
  const res = await fetch(`${BASE_URL}/articles/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Articulo no encontrado");

  const data = await res.json();

  // La API devuelve tag_list como string en el detalle y como array en el listado
  if (typeof data.tag_list === "string") {
    data.tag_list = data.tag_list.split(", ").filter(Boolean);
  }

  return data;
}

export async function searchArticles(query: string): Promise<Article[]> {
  const res = await fetch(
    `${BASE_URL}/articles?per_page=9&tag=${encodeURIComponent(query)}`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  const data: Article[] = await res.json();
  return data.filter((a) => Boolean(a?.slug));
}