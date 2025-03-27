import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export type ApiResponse<T> = {
  data?: T;
  error?: string;
  message?: string;
};

export type ApiErrorResponse = ApiResponse<never>;

export async function checkAuth(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return null;
    }
    return token;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

export function createErrorResponse(
  message: string,
  status: number = 500
): Response {
  return new Response(
    JSON.stringify({ error: message }),
    {
      status,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

export function createSuccessResponse<T>(
  data: T,
  message?: string,
  status: number = 200
): Response {
  return new Response(
    JSON.stringify({ data, message }),
    {
      status,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

export const UNAUTHORIZED_ERROR = createErrorResponse('Unauthorized', 401);
export const FORBIDDEN_ERROR = createErrorResponse('Forbidden', 403);
export const NOT_FOUND_ERROR = createErrorResponse('Not found', 404);
