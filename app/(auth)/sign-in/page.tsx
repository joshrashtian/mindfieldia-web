import Link from "next/link";
import { AuthForm } from "./AuthForm";

export default function SignInPage() {
  return (
    <main className="container mx-auto max-w-lg py-12">
      <div className="mb-8 text-center">
        <Link href="/" className="text-muted-foreground hover:text-foreground text-sm">
          ← Back to home
        </Link>
      </div>
      <AuthForm />
    </main>
  );
}
