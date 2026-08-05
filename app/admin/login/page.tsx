import { login } from "./actions";
import { ShieldCheck } from "lucide-react";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const resolvedParams = await searchParams;
  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-xl border border-gray-100">
        
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-[#091522] rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6 text-yellow-400" />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-[#091522]">
            Admin Portal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 font-medium">
            Sign in to manage your website content.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" action={login}>
          <div className="rounded-md shadow-sm space-y-4">
            
            {/* Error Message */}
            {resolvedParams?.error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center border border-red-100">
                {resolvedParams.error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-[#091522] mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-[#091522] rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm font-medium transition-colors"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-[#091522] mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-[#091522] rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm font-medium transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-extrabold rounded-md text-black bg-[#f6c000] hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all shadow-sm"
            >
              Sign In to Dashboard
            </button>
          </div>
        </form>

      </div>
    </main>
  );
}
