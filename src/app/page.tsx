import Link from "next/link";
import { getArticles } from "@/lib/devto";
import ArticleCard from "@/components/ArticleCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tech Portal — Artículos de desarrollo",
  description: "Portal de artículos técnicos sobre desarrollo web moderno.",
};

const TAGS = ["javascript", "typescript", "react", "nextjs", "webdev"];

export default async function HomePage() {
  const articles = await getArticles();

  // Este log SIEMPRE aparece en la terminal del servidor
  console.log(">>> ARTICLES COUNT:", articles.length);
  console.log(">>> PRIMER ARTICULO:", articles[0]?.slug ?? "VACIO");

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Artículos técnicos
          </h1>
          <p className="text-gray-500">
            Total cargados: {articles.length}
          </p>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {TAGS.map((t) => (
            <Link
              key={t}
              href={`/?tag=${t}`}
              className="px-4 py-1.5 rounded-full text-sm border bg-white text-gray-600 border-gray-200 hover:border-blue-300 transition-all"
            >
              {t}
            </Link>
          ))}
        </div>

        {articles.length === 0 ? (
          <p className="text-red-500 text-center py-16 text-lg">
            Array vacío — revisa la terminal
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                priority={index === 0}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}