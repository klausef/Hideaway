import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "convex/react";
import { ArrowLeft, ArrowUpRight, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const requests = useQuery(api.bookings.list);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between gap-6 px-6 sm:px-10">
          <div className="flex items-baseline gap-3">
            <a href="/" className="font-serif text-[22px] leading-none">
              Hideaway
            </a>
            <span className="hidden text-[10px] uppercase tracking-[0.24em] text-muted-foreground sm:inline">
              Staff inbox
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="/"
              className="hidden items-center gap-1.5 text-[12px] text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              <ArrowLeft className="size-3.5" strokeWidth={1.5} />
              View site
            </a>
            <Button
              type="button"
              variant="ghost"
              onClick={handleSignOut}
              className="h-9 rounded-none px-3 text-[12px] tracking-wide"
            >
              <LogOut className="size-3.5" strokeWidth={1.5} />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1120px] px-6 py-16 sm:px-10 lg:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              Booking requests
            </p>
            <h1 className="mt-4 font-serif text-[2.4rem] leading-none tracking-[-0.01em] sm:text-[3rem]">
              The inbox.
            </h1>
          </div>
          <p className="max-w-xs text-sm leading-6 text-muted-foreground">
            {user?.email
              ? `Signed in as ${user.email}. `
              : ""}
            Requests from the Book now form arrive here in real time.
          </p>
        </div>

        <div className="mt-12 border-t border-border">
          {requests === undefined ? (
            <div className="divide-y divide-border">
              {[0, 1, 2].map((row) => (
                <div key={row} className="grid gap-4 py-7 sm:grid-cols-[9rem_1fr]">
                  <div className="h-4 w-24 animate-pulse bg-muted" />
                  <div className="space-y-3">
                    <div className="h-4 w-1/3 animate-pulse bg-muted" />
                    <div className="h-3 w-2/3 animate-pulse bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : requests.length === 0 ? (
            <div className="flex flex-col items-start gap-4 py-16">
              <p className="font-serif text-2xl">No requests yet.</p>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                When a guest sends the booking form, their details will appear
                on this page. The list updates by itself — no need to refresh.
              </p>
              <Button
                asChild
                variant="outline"
                className="mt-2 h-10 rounded-none px-4 text-[12px] tracking-wide"
              >
                <a href="/">
                  Open the site
                  <ArrowUpRight className="size-3.5" />
                </a>
              </Button>
            </div>
          ) : (
            <>
              <p className="border-b border-border py-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {requests.length} request{requests.length === 1 ? "" : "s"} ·
                Newest first
              </p>
              <ul className="divide-y divide-border">
                {requests.map((request) => (
                  <li
                    key={request._id}
                    className="grid gap-5 py-8 sm:grid-cols-[9rem_1fr] sm:gap-8"
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        Visit
                      </p>
                      <p className="mt-2 font-serif text-xl leading-tight">
                        {prettyVisitDate(request.visitDate)}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {request.guests} {request.guests === 1 ? "guest" : "guests"}
                      </p>
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <p className="text-base">{request.name}</p>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          {receivedLabel(request.createdAt)}
                        </p>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                        <a
                          href={`tel:${request.phone.replace(/[^+\d]/g, "")}`}
                          className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
                        >
                          {request.phone}
                        </a>
                        {request.email && (
                          <a
                            href={`mailto:${request.email}`}
                            className="break-all text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
                          >
                            {request.email}
                          </a>
                        )}
                      </div>

                      {request.message && (
                        <p className="mt-4 max-w-2xl border-l border-border pl-4 text-sm leading-6 text-muted-foreground">
                          {request.message}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <p className="mt-12 border-t border-border pt-6 text-xs leading-5 text-muted-foreground">
          Confirm each visit by phone or text before the guest travels. Anyone
          with a staff account can read this inbox.
        </p>
      </main>
    </div>
  );
}

function prettyVisitDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-PH", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function receivedLabel(timestamp: number) {
  const date = new Date(timestamp);
  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();
  if (sameDay) {
    return `Today · ${date.toLocaleTimeString("en-PH", {
      hour: "numeric",
      minute: "2-digit",
    })}`;
  }
  return date.toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
