import { PublicRoute } from "@/components/PublicRoute";
import { RegisterForm } from "@/components/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <PublicRoute>
      <div className="flex justify-center items-center min-h-screen">
        <div className="">
          <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
          <RegisterForm />
          <p className="text-sm py-2">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </PublicRoute>
  );
}
