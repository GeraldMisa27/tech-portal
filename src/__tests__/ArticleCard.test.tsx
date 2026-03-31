import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ArticleCard from "@/components/ArticleCard";
import { Article } from "@/types/article";

const mockArticle: Article = {
  id: 1,
  title: "Articulo de prueba sobre React",
  description: "Descripcion del articulo de prueba",
  slug: "articulo-de-prueba",
  path: "/testuser/articulo-de-prueba",
  cover_image: null,
  social_image: null,
  published_at: "2024-01-15T10:30:00Z",
  tag_list: ["react", "typescript", "webdev"],
  tags: "react, typescript, webdev",
  reading_time_minutes: 5,
  url: "https://dev.to/testuser/articulo-de-prueba",
  user: {
    name: "Test User",
    username: "testuser",
    profile_image: "https://via.placeholder.com/150",
  },
};

describe("ArticleCard", () => {
  it("renderiza el titulo del articulo", () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText("Articulo de prueba sobre React")).toBeInTheDocument();
  });

  it("renderiza la descripcion del articulo", () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText("Descripcion del articulo de prueba")).toBeInTheDocument();
  });

  it("renderiza los tags correctamente", () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("typescript")).toBeInTheDocument();
  });

  it("renderiza el nombre del autor", () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  it("el link apunta a la ruta correcta por id", () => {
    render(<ArticleCard article={mockArticle} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/articles/1");
  });
});