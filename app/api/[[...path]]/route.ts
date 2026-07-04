import type { NextRequest } from "next/server"

import { handleApiRequest } from "@/server"

type RouteContext = {
  params: Promise<{ path?: string[] }>
}

async function routeHandler(request: NextRequest, context: RouteContext) {
  const params = await context.params
  return handleApiRequest(request, params)
}

export const GET = routeHandler
export const POST = routeHandler
export const PUT = routeHandler
export const PATCH = routeHandler
export const DELETE = routeHandler
