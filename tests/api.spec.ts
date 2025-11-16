import { test, expect } from "@playwright/test";
import { validCredentials, failedCredentials } from "../test_data";
import { RegisterSuccessSchema } from "../schemas";

test.describe("API tests", () => {
  test("GET /api/login", async ({ request }) => {
    const response = await request.get("/api/login");
    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(json.data).toHaveLength(6);
  });

  test("POST /api/register - success, valid types", async ({ request }) => {
    const response = await request.post("/api/register", {
      data: validCredentials.credentials,
    });
    expect(response.status()).toBe(200);
    const json = await response.json();
    const validation = RegisterSuccessSchema.safeParse(json);
    expect(
      validation.success,
      `Schema validation failed: ${validation.error?.message}`
    ).toBe(true);
  });

  for (const testCase of failedCredentials) {
    test(`POST /api/register - failure (${testCase.name})`, async ({
      request,
    }) => {
      const response = await request.post("/api/register", {
        data: testCase.payload,
      });

      expect(response.status()).toBe(400);
      const json = await response.json();
      expect(json.error).toBe(testCase.errorMessage);
    });
  }
});
