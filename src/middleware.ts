import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("admin_token")?.value;
    
    // Define paths
    const isAdminPath = path.startsWith("/admin");
    const isLoginPath = path === "/admin/login";
    const isApiOrStatic = path.startsWith("/api") || path.startsWith("/_next") || path.startsWith("/static") || path.includes(".") && !path.endsWith(".html");
    
    // Skip middleware for API routes, static files, and the main site pages
    if (isApiOrStatic) {
        return NextResponse.next();
    }
    
    // If admin is logged in and tries to access main site (non-admin), redirect to admin dashboard
    // But allow access to admin paths since the user is logged in
    if (!isAdminPath && token) {
        return NextResponse.redirect(new URL("/admin", request.url));
    }
    
    // If not logged in and trying to access admin (not login), redirect to login
    if (isAdminPath && !isLoginPath && !token) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    
    // If logged in and trying to access login page, redirect to admin dashboard
    if (isLoginPath && token) {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    ],
};
