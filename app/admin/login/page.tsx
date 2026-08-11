import { login } from "./actions";
import { ShieldCheck } from "lucide-react";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const resolvedParams = await searchParams;
  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-[#fcfbf9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100">
        
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-[#1b1b1b] rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6 text-[#bf5e42]" />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-[#111]">
            Admin Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500 font-medium">
            Sign in to manage your website content.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" action={login}>
          <div className="space-y-4">
            
            {/* Error Message */}
            {resolvedParams?.error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center border border-red-100">
                {resolvedParams.error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-[#111] mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-[#111] rounded-lg focus:outline-none focus:ring-[#bf5e42] focus:border-[#bf5e42] focus:z-10 sm:text-sm font-medium transition-colors"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-[#111] mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-[#111] rounded-lg focus:outline-none focus:ring-[#bf5e42] focus:border-[#bf5e42] focus:z-10 sm:text-sm font-medium transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-extrabold rounded-lg text-white bg-[#bf5e42] hover:bg-[#b55239] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bf5e42] transition-all shadow-sm"
            >
              Sign In to Dashboard
            </button>
          </div>
        </form>

      </div>
    </main>
  );
}
