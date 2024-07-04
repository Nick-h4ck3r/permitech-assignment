import { RegisterForm } from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <RegisterForm />
        <p className="text-sm py-2">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
