import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 w-full max-w-[1120px] items-center px-6 sm:px-10">
          <a href="/" className="flex items-baseline gap-3">
            <span className="font-serif text-[22px] leading-none">Hideaway</span>
            <span className="hidden text-[10px] uppercase tracking-[0.24em] text-muted-foreground sm:inline">
              Spring Resort
            </span>
          </a>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col justify-center px-6 py-24 sm:px-10">
        <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-4 max-w-lg font-serif text-[2.6rem] leading-[1.05] tracking-[-0.01em] sm:text-[3.4rem]">
          This path doesn&apos;t lead to the spring.
        </h1>
        <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">
          The page you were looking for isn&apos;t here. Head back to the resort
          and start again.
        </p>
        <a
          href="/"
          className="mt-9 inline-flex h-11 w-fit items-center gap-2 bg-primary px-5 text-[13px] font-medium tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="size-4" strokeWidth={1.5} />
          Back to the resort
        </a>
      </main>
    </div>
  );
}
