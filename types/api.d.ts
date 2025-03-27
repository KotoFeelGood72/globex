import { NextRequest } from 'next/server';

export interface RouteHandlerContext<T = any> {
  params: T;
}

export type RouteHandler<T = any> = (
  req: NextRequest,
  context: RouteHandlerContext<T>
) => Promise<Response>;
