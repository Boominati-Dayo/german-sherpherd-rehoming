"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, Loader2, CheckCircle, XCircle } from "lucide-react";

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [initialCheck, setInitialCheck] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = document.cookie.includes("admin_token=");
            if (token) {
                setIsAuthenticated(true);
                router.push("/admin");
            } else {
                setInitialCheck(false);
            }
        };
        checkAuth();
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                setSuccess(true);
                document.cookie = "admin_token=authenticated; path=/; max-age=86400; SameSite=Strict";
                setTimeout(() => {
                    router.push("/admin");
                }, 800);
            } else {
                const data = await res.json();
                setError(data.error || "Invalid credentials");
            }
        } catch {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (isAuthenticated || initialCheck) {
        return (
            <div className="flex bg-brand-black-900 min-h-screen items-center justify-center p-4">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-3xl shadow-2xl text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-brand-copper-700" />
                    <p className="text-brand-black-600">Checking authentication...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex bg-brand-black-900 min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-3xl shadow-2xl">
                <div className="text-center">
                    <h1 className="text-2xl font-black text-brand-black-900 uppercase tracking-tight">Admin Login</h1>
                    <p className="text-brand-black-600 text-sm mt-2">Enter your credentials to access the dashboard</p>
                </div>
                
                {success && (
                    <div className="flex items-center justify-center gap-2 p-3 bg-green-50 text-green-700 rounded-xl">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Login successful! Redirecting...</span>
                    </div>
                )}
                
                {error && (
                    <div className="flex items-center justify-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl">
                        <XCircle className="w-5 h-5" />
                        <span className="font-medium">{error}</span>
                    </div>
                )}
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-black text-brand-black-700 uppercase">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading || success}
                            className="rounded-xl h-12 border-brand-black-200"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-xs font-black text-brand-black-700 uppercase">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading || success}
                            className="rounded-xl h-12 border-brand-black-200"
                        />
                    </div>
                    <Button 
                        type="submit" 
                        disabled={loading || success}
                        className="w-full h-12 bg-brand-copper-700 text-white font-black uppercase tracking-wider rounded-full hover:bg-brand-copper-800 disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Logging in...
                            </>
                        ) : success ? (
                            <>
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Success!
                            </>
                        ) : (
                            "Login"
                        )}
                    </Button>
                </form>
                
                <div className="pt-4 border-t border-brand-black-100">
                    <Link 
                        href="/" 
                        className="flex items-center justify-center gap-2 text-brand-black-600 hover:text-brand-copper-700 font-medium transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Back to Main Site
                    </Link>
                </div>
            </div>
        </div>
    );
}
