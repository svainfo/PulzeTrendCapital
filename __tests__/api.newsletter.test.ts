import { NextRequest } from "next/server";
import { POST } from "@/app/api/newsletter/route";

// Helper to build a NextRequest
function makeRequest(body: unknown) {
  return new NextRequest("http://localhost/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/newsletter", () => {
  it("returns 200 for valid email", async () => {
    const res = await POST(makeRequest({ email: "test@example.com" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  it("returns 422 for invalid email", async () => {
    const res = await POST(makeRequest({ email: "not-an-email" }));
    expect(res.status).toBe(422);
    const json = await res.json();
    expect(json.success).toBe(false);
  });

  it("returns 400 for non-JSON body", async () => {
    const req = new NextRequest("http://localhost/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "invalid-json{{",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 200 for duplicate email (no enumeration)", async () => {
    await POST(makeRequest({ email: "dup@example.com" }));
    const res = await POST(makeRequest({ email: "dup@example.com" }));
    expect(res.status).toBe(200);
  });
});
