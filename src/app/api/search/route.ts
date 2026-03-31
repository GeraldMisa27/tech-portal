import { NextResponse } from "next/server";
import { searchArticles } from "@/lib/devto";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.trim().length === 0) {
    return NextResponse.json(
      { error: "El parametro q es requerido" },
      { status: 400 }
    );
  }

  if (query.trim().length < 2) {
    return NextResponse.json(
      { error: "La busqueda debe tener al menos 2 caracteres" },
      { status: 400 }
    );
  }

  try {
    const articles = await searchArticles(query.trim());
    return NextResponse.json(
      { articles, total: articles.length, query },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Error en /api/search:", error);
    return NextResponse.json(
      { error: "Error interno al buscar articulos" },
      { status: 500 }
    );
  }
}

//http://localhost:3001/api/search?q=react