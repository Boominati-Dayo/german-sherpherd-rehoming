"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home } from "lucide-react";

export default function AdminLogin() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = document.cookie.includes("admin_token=");
            if (token) {
                setIsAuthenticated(true);
                router.push("/admin");
            }
        };
        checkAuth();
    }, [router]);

    if (isAuthenticated) {
        return null;
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                document.cookie = "admin_token=authenticated; path=/; max-age=86400; SameSite=Strict";
                router.push("/admin");
            } else {
                setError("Invalid credentials");
            }
        } catch {
            setError("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex bg-brand-forest-900 min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-3xl shadow-2xl">
                <div className="text-center">
                    <h1 className="text-2xl font-black text-brand-forest-900 uppercase tracking-tight">Admin Login</h1>
                    <p className="text-brand-forest-600 text-sm mt-2">Enter your credentials to access the dashboard</p>
                </div>
                {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-black text-brand-forest-700 uppercase">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="rounded-xl h-12 border-brand-forest-200"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-xs font-black text-brand-forest-700 uppercase">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="rounded-xl h-12 border-brand-forest-200"
                        />
                    </div>
                    <Button 
                        type="submit" 
                        disabled={loading}
                        className="w-full h-12 bg-brand-orange-700 text-white font-black uppercase tracking-wider rounded-full hover:bg-brand-orange-800"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>
                
                <div className="pt-4 border-t border-brand-forest-100">
                    <Link 
                        href="/" 
                        className="flex items-center justify-center gap-2 text-brand-forest-600 hover:text-brand-orange-700 font-medium transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Back to Main Site
                    </Link>
                </div>
            </div>
        </div>
    );
}
