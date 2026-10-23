import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { type FormEvent, Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

interface AuthProps {
  redirectAfterAuth?: string;
}

function resolveRedirectAfterAuth(
  returnTo: string | null,
  fallback = "/dashboard",
) {
  if (returnTo?.startsWith("/") && !returnTo.startsWith("//")) {
    return returnTo;
  }
  return fallback;
}

const fieldClasses =
  "h-12 rounded-none border-border bg-transparent px-3 text-sm shadow-none placeholder:text-muted-foreground/70 focus-visible:border-foreground focus-visible:ring-0";

function Auth({ redirectAfterAuth }: AuthProps = {}) {
  const { isLoading: authLoading, isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = resolveRedirectAfterAuth(
    searchParams.get("returnTo"),
    redirectAfterAuth,
  );
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(redirect);
    }
  }, [authLoading, isAuthenticated, navigate, redirect]);

  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      setStep({ email: formData.get("email") as string });
      setIsLoading(false);
    } catch (signInError) {
      console.error("Email sign-in error:", signInError);
      setError(
        signInError instanceof Error
          ? signInError.message
          : "Failed to send the sign-in code. Please try again.",
      );
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      navigate(redirect);
    } catch (verifyError) {
      console.error("OTP verification error:", verifyError);
      setError("That code didn't work. Check your email and try again.");
      setIsLoading(false);
      setOtp("");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between px-6 sm:px-10">
          <a href="/" className="flex items-baseline gap-3">
            <span className="font-serif text-[22px] leading-none">Hideaway</span>
            <span className="hidden text-[10px] uppercase tracking-[0.24em] text-muted-foreground sm:inline">
              Spring Resort
            </span>
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" strokeWidth={1.5} />
            Back to site
          </a>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-16 sm:py-24">
        <div className="w-full max-w-sm">
          <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            Staff access
          </p>

          {step === "signIn" ? (
            <>
              <h1 className="mt-4 font-serif text-[2.4rem] leading-[1.05] tracking-[-0.01em]">
                Sign in to the inbox.
              </h1>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Enter your email and we&apos;ll send a six-digit code. Only
                resort staff need an account.
              </p>

              <form onSubmit={handleEmailSubmit} className="mt-9">
                <div className="grid gap-2">
                  <Label htmlFor="staff-email" className="text-[13px] font-normal">
                    Email address
                  </Label>
                  <Input
                    id="staff-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@email.com"
                    className={fieldClasses}
                    disabled={isLoading}
                    required
                  />
                </div>

                {error && (
                  <p className="mt-3 text-xs leading-5 text-destructive">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="mt-6 h-12 w-full rounded-none text-[13px] font-medium tracking-wide"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending code…
                    </>
                  ) : (
                    <>
                      Send sign-in code
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
              </form>
            </>
          ) : (
            <>
              <h1 className="mt-4 font-serif text-[2.4rem] leading-[1.05] tracking-[-0.01em]">
                Check your email.
              </h1>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                We sent a six-digit code to{" "}
                <span className="text-foreground">{step.email}</span>.
              </p>

              <form onSubmit={handleOtpSubmit} className="mt-9">
                <input type="hidden" name="email" value={step.email} />
                <input type="hidden" name="code" value={otp} />

                <div className="flex justify-center">
                  <InputOTP
                    value={otp}
                    onChange={setOtp}
                    maxLength={6}
                    disabled={isLoading}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && otp.length === 6 && !isLoading) {
                        const form = (event.target as HTMLElement).closest("form");
                        form?.requestSubmit();
                      }
                    }}
                  >
                    <InputOTPGroup>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {error && (
                  <p className="mt-3 text-center text-xs leading-5 text-destructive">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                  className="mt-6 h-12 w-full rounded-none text-[13px] font-medium tracking-wide"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Verifying…
                    </>
                  ) : (
                    <>
                      Verify and continue
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="mt-2 h-10 w-full rounded-none text-[12px] text-muted-foreground"
                  onClick={() => {
                    setStep("signIn");
                    setOtp("");
                    setError(null);
                  }}
                  disabled={isLoading}
                >
                  Use a different email
                </Button>
              </form>
            </>
          )}

          <p className="mt-10 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">
            Just visiting? You don&apos;t need an account —{" "}
            <a
              href="/"
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            >
              book from the resort page
            </a>
            .
          </p>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between px-6 text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:px-10">
          <p>© 2026 Hideaway Spring Resort</p>
          <p className="hidden sm:block">Maramag · Bukidnon</p>
        </div>
      </footer>
    </div>
  );
}

export default function AuthPage(props: AuthProps) {
  return (
    <Suspense>
      <Auth {...props} />
    </Suspense>
  );
}
