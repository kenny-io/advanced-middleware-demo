import type { NextRequest } from "next/server";
import { MiddlewareRequest } from "@netlify/next";

export async function middleware(nextRequest: NextRequest) {
  const pathname = nextRequest.nextUrl.pathname;

  const middlewareRequest = new MiddlewareRequest(nextRequest);

  if (pathname.startsWith("/static")) {
    const response = await middlewareRequest.next();

    const message = `You're visiting this site from 
                     ${nextRequest?.geo?.city}, 
                     ${nextRequest?.geo?.country}. I know where you live now, lock your doors`;

    response.replaceText("#message", message);
    response.setPageProp("message", message);

    console.log(response);

    return response;
  }
}
