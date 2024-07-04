import { LoginForm } from "@/components/LoginForm";
import { PublicRoute } from "@/components/PublicRoute";

export default function LoginPage() {
  return (
    <PublicRoute>
      <div className="flex justify-center items-center min-h-screen">
        <div className="">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <LoginForm />
          <p className="text-sm py-2">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-500"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </PublicRoute>
  );
}
