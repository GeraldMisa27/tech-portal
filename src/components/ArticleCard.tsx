import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";
import { formatDate } from "@/lib/formatDate";

interface ArticleCardProps {
  article: Article;
  priority?: boolean;
}

export default function ArticleCard({ article, priority = false }: ArticleCardProps) {
  const tags = Array.isArray(article.tag_list) ? article.tag_list : [];
  const coverImage = article.cover_image || article.social_image || null;

  return (
    <Link
      href={`/articles/${article.id}`}
      className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      <div className="relative w-full h-48 bg-gray-100">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={article.title}
            fill
            priority={priority}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
            <span className="text-2xl text-indigo-300">{ }</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="text-base font-semibold text-gray-900 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
          {article.title}
        </h2>

        <p className="text-sm text-gray-500 line-clamp-2 flex-1">
          {article.description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50 mt-auto">
          <div className="flex items-center gap-2">
            {article.user?.profile_image && (
              <div className="relative w-6 h-6 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src={article.user.profile_image}
                  alt={article.user.name}
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </div>
            )}
            <span className="text-xs text-gray-500">{article.user?.name}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>{article.reading_time_minutes} min</span>
            <span>{formatDate(article.published_at)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}