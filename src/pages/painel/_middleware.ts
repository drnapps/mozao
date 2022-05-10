import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { verify } from "jsonwebtoken";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    const secret = '65417B70A1A7BD08A6189F4D309D90979CBE7B56';
    const { cookies } = req;
    const jwt = cookies.drntoken;
    console.log(jwt);
    const url = req.nextUrl.clone();
    try {
        const auth = verify(jwt, secret);
    //    auth.username
        if (url.pathname == "/login") {
            url.pathname = "/painel";
        }
    } catch (err) {
        url.pathname = "/login";
    }

    return NextResponse.rewrite(url);
}