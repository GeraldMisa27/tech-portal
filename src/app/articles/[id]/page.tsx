import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleById } from "@/lib/devto";
import { formatDate } from "@/lib/formatDate";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const article = await getArticleById(Number(id));
    return {
      title: `${article.title} — Tech Portal`,
      description: article.description,
      openGraph: {
        title: article.title,
        description: article.description,
        type: "article",
        publishedTime: article.published_at,
        images: article.social_image
          ? [{ url: article.social_image, width: 1200, height: 627 }]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.description,
        images: article.social_image ? [article.social_image] : [],
      },
    };
  } catch {
    return { title: "Artículo no encontrado — Tech Portal" };
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;

  let article;
  try {
    article = await getArticleById(Number(id));
  } catch {
    notFound();
  }

  if (!article?.id) notFound();

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.published_at,
    author: {
      "@type": "Person",
      name: article.user.name,
      url: `https://dev.to/${article.user.username}`,
    },
    image: article.social_image ?? undefined,
    url: article.url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-10">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 mb-8 transition-colors"
          >
            ← Volver al listado
          </Link>

          <article>
            <div className="flex flex-wrap gap-2 mb-4">
              {(Array.isArray(article.tag_list)
                ? article.tag_list
                : String(article.tag_list).split(", ").filter(Boolean)
              ).slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-100"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
              {article.title}
            </h1>

            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
              {article.user?.profile_image && (
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src={article.user.profile_image}
                    alt={article.user.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {article.user.name}
                </p>
                <p className="text-xs text-gray-400">
                  {formatDate(article.published_at)} · {article.reading_time_minutes} min de lectura
                </p>
              </div>
            </div>

            {(article.cover_image || article.social_image) && (
              <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden mb-8 bg-gray-100">
                <Image
                  src={article.cover_image ?? article.social_image!}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            )}

            <p className="text-lg text-gray-600 leading-relaxed mb-8 p-4 bg-white rounded-xl border border-gray-100">
              {article.description}
            </p>

            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Leer artículo completo en Dev.to
              <span>↗</span>
            </a>
          </article>

        </div>
      </main>
    </>
  );
}