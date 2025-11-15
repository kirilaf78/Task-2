import { test, expect } from '@playwright/test';

test.describe('API tests', () => {
  test.use({
    extraHTTPHeaders: {
      'x-api-key': 'reqres-free-v1',
    },
  });
  test('GET /api/login', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/login');
    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(json.data).toHaveLength(6);
  });

  test('POST /api/register - success', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/register', {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'anypassword',
      },
    });
    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(typeof json.id).toBe('number');
    expect(typeof json.token).toBe('string');
  });

  test('POST /api/register - failure', async ({ request }) => {
    const testCases = [
      {
        payload: { email: 'eve.holt@reqres.in' },
        errorMessage: 'Missing password',
      },
      {
        payload: { password: 'anypassword' },
        errorMessage: 'Missing email or username',
      },
      {
        payload: { email: 'undefined@email.com', password: 'anypassword' },
        errorMessage: 'Note: Only defined users succeed registration',
      },
    ];

    for (const testCase of testCases) {
      const response = await request.post('https://reqres.in/api/register', {
        data: testCase.payload,
      });
      expect(response.status()).toBe(400);
      const json = await response.json();
      expect(json.error).toBe(testCase.errorMessage);
    }
  });
});