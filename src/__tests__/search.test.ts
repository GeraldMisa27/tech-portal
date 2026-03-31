import { describe, it, expect, vi, beforeEach } from "vitest";

const mockArticles = [
  {
    id: 1,
    title: "React Testing Guide",
    slug: "react-testing-guide",
    description: "A guide to testing React",
    path: "/user/react-testing-guide",
    tag_list: ["react", "testing"],
    tags: "react, testing",
    cover_image: null,
    social_image: null,
    published_at: "2024-01-15T10:30:00Z",
    reading_time_minutes: 5,
    url: "https://dev.to/user/react-testing-guide",
    user: {
      name: "Test User",
      username: "testuser",
      profile_image: "https://via.placeholder.com/150",
    },
  },
];

describe("GET /api/search", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.resetModules();
  });

  it("devuelve 400 si el parametro q no existe", async () => {
    const { GET } = await import("@/app/api/search/route");
    const request = new Request("http://localhost:3000/api/search");
    const response = await GET(request);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toBeDefined();
  });

  it("devuelve 400 si el parametro q tiene menos de 2 caracteres", async () => {
    const { GET } = await import("@/app/api/search/route");
    const request = new Request("http://localhost:3000/api/search?q=a");
    const response = await GET(request);
    expect(response.status).toBe(400);
  });

  it("devuelve 200 con articulos si el parametro q es valido", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockArticles,
    } as Response);

    const { GET } = await import("@/app/api/search/route");
    const request = new Request("http://localhost:3000/api/search?q=react");
    const response = await GET(request);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.articles).toBeDefined();
    expect(body.total).toBeDefined();
    expect(body.query).toBe("react");
  });
});