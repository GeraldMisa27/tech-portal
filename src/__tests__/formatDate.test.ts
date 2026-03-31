import { describe, it, expect } from "vitest";
import { formatDate } from "@/lib/formatDate";

describe("formatDate", () => {
  it("formatea una fecha ISO valida en español", () => {
    const result = formatDate("2024-01-15T10:30:00Z");
    expect(result).toContain("2024");
    expect(result).toContain("enero");
    expect(result).toContain("15");
  });

  it("devuelve cadena vacia si recibe null", () => {
    expect(formatDate(null)).toBe("");
  });

  it("devuelve cadena vacia si recibe undefined", () => {
    expect(formatDate(undefined)).toBe("");
  });

  it("devuelve cadena vacia si recibe string vacio", () => {
    expect(formatDate("")).toBe("");
  });
});