import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { type FormEvent, type ReactNode, useState } from "react";

const fieldClasses =
  "h-11 rounded-none border-border bg-transparent px-3 text-sm shadow-none placeholder:text-muted-foreground/70 focus-visible:border-foreground focus-visible:ring-0";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  visitDate: "",
  guests: "2",
  message: "",
};

function todayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

function prettyDate(iso: string) {
  if (!iso) return "";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-PH", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BookingDialog({
  triggerLabel = "Book now",
  className,
  variant = "default",
}: {
  triggerLabel?: string;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
}) {
  const createRequest = useMutation(api.bookings.create);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [reference, setReference] = useState("");
  const [confirmedDate, setConfirmedDate] = useState("");

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) {
      setStatus("idle");
      setErrors({});
      setServerError(null);
    } else if (status === "sent") {
      setForm(initialForm);
      setReference("");
      setConfirmedDate("");
    }
  }

  function update(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (form.name.trim().length < 2) {
      nextErrors.name = "Please enter your name.";
    }
    if (!/^[+()\d\s.-]{7,24}$/.test(form.phone.trim())) {
      nextErrors.phone = "Enter a contact number we can reach you on.";
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "That email address doesn't look right.";
    }
    if (!form.visitDate) {
      nextErrors.visitDate = "Choose the day you'd like to visit.";
    } else if (form.visitDate < todayISO()) {
      nextErrors.visitDate = "Please choose today or a future date.";
    }
    const guests = Number(form.guests);
    if (!Number.isInteger(guests) || guests < 1 || guests > 200) {
      nextErrors.guests = "Enter a group size between 1 and 200.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("sending");
    setServerError(null);
    try {
      const id = await createRequest({
        name: form.name,
        phone: form.phone,
        ...(form.email.trim() ? { email: form.email } : {}),
        visitDate: form.visitDate,
        guests,
        ...(form.message.trim() ? { message: form.message } : {}),
      });
      setReference(id.slice(-6).toUpperCase());
      setConfirmedDate(form.visitDate);
      setStatus("sent");
    } catch (error) {
      console.error("Booking request failed:", error);
      setStatus("idle");
      setServerError(
        error instanceof ConvexError && typeof error.data === "string"
          ? error.data
          : "We couldn't send your request. Please try again or call us.",
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={variant}
          size="lg"
          className={cn(
            "h-12 rounded-none px-6 text-[13px] font-medium tracking-wide",
            className,
          )}
        >
          {triggerLabel}
          <ArrowUpRight className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-h-[92svh] gap-0 overflow-y-auto rounded-none border-border bg-background p-0 shadow-xl sm:max-w-xl"
        showCloseButton={status !== "sent"}
      >
        {status === "sent" ? (
          <div className="flex flex-col items-start gap-6 p-7 sm:p-10">
            <DialogTitle className="sr-only">Booking request received</DialogTitle>
            <DialogDescription className="sr-only">
              Your booking request has been sent to the resort.
            </DialogDescription>
            <span className="flex size-12 items-center justify-center rounded-full border border-border">
              <Check className="size-5" strokeWidth={1.5} />
            </span>
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Request received
              </p>
              <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
                Salamat, {form.name.trim().split(" ")[0]}.
              </h2>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                We&apos;ve sent your request for{" "}
                <span className="text-foreground">{prettyDate(confirmedDate)}</span>{" "}
                for {guestsLabel(Number(form.guests))}. We&apos;ll call or text{" "}
                {form.phone.trim()} to confirm — please wait for our reply before
                travelling.
              </p>
            </div>
            <div className="w-full border-t border-border pt-4 text-xs text-muted-foreground">
              Reference <span className="text-foreground">{reference}</span>
            </div>
            <Button
              type="button"
              className="h-11 w-full rounded-none text-[13px] tracking-wide sm:w-auto sm:px-8"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="border-b border-border p-6 sm:p-8">
              <DialogHeader className="gap-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Booking request
                </p>
                <DialogTitle className="font-serif text-3xl font-normal leading-tight sm:text-4xl">
                  Reserve a day at the spring.
                </DialogTitle>
                <DialogDescription className="max-w-md text-sm leading-6">
                  Tell us when you&apos;re coming and how many are in your group.
                  Your visit is confirmed once we reply.
                </DialogDescription>
              </DialogHeader>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="booking-name" className="text-[13px] font-normal">
                    Full name
                  </Label>
                  <Input
                    id="booking-name"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                    className={fieldClasses}
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    required
                  />
                  {errors.name && <FieldError>{errors.name}</FieldError>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="booking-phone" className="text-[13px] font-normal">
                    Mobile number
                  </Label>
                  <Input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    className={fieldClasses}
                    placeholder="09XX XXX XXXX"
                    aria-invalid={Boolean(errors.phone)}
                    required
                  />
                  {errors.phone && <FieldError>{errors.phone}</FieldError>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="booking-email" className="text-[13px] font-normal">
                    Email <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    id="booking-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    className={fieldClasses}
                    placeholder="you@email.com"
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && <FieldError>{errors.email}</FieldError>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="booking-date" className="text-[13px] font-normal">
                    Visit date
                  </Label>
                  <Input
                    id="booking-date"
                    name="visitDate"
                    type="date"
                    min={todayISO()}
                    value={form.visitDate}
                    onChange={(event) => update("visitDate", event.target.value)}
                    className={fieldClasses}
                    aria-invalid={Boolean(errors.visitDate)}
                    required
                  />
                  {errors.visitDate && <FieldError>{errors.visitDate}</FieldError>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="booking-guests" className="text-[13px] font-normal">
                    Guests
                  </Label>
                  <Input
                    id="booking-guests"
                    name="guests"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={200}
                    value={form.guests}
                    onChange={(event) => update("guests", event.target.value)}
                    className={fieldClasses}
                    aria-invalid={Boolean(errors.guests)}
                    required
                  />
                  {errors.guests && <FieldError>{errors.guests}</FieldError>}
                </div>

                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="booking-message" className="text-[13px] font-normal">
                    Anything we should know?{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Textarea
                    id="booking-message"
                    name="message"
                    value={form.message}
                    onChange={(event) => update("message", event.target.value)}
                    className="min-h-24 resize-none rounded-none border-border bg-transparent px-3 py-3 text-sm shadow-none placeholder:text-muted-foreground/70 focus-visible:border-foreground focus-visible:ring-0"
                    placeholder="Cottages, a birthday, children in the group…"
                    maxLength={800}
                  />
                </div>
              </div>

              {serverError && (
                <p className="mt-5 border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                  {serverError}
                </p>
              )}

              <Button
                type="submit"
                disabled={status === "sending"}
                className="mt-6 h-12 w-full rounded-none text-[13px] font-medium tracking-wide"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending request…
                  </>
                ) : (
                  <>
                    Send booking request
                    <ArrowUpRight className="size-4" />
                  </>
                )}
              </Button>

              <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
                Prefer to talk?{" "}
                <a
                  href="tel:+639274346675"
                  className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
                >
                  0927 434 6675
                </a>
                . Proper swimwear is required; children must be supervised.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function FieldError({ children }: { children: ReactNode }) {
  return <p className="text-xs text-destructive">{children}</p>;
}

function guestsLabel(count: number) {
  return `${count} ${count === 1 ? "guest" : "guests"}`;
}
