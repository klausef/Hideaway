import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

/** Strip surrounding whitespace and cap length so a stray paste cannot bloat a row. */
function clean(value: string | undefined, max: number) {
  const trimmed = value?.trim() ?? "";
  return trimmed.slice(0, max);
}

export const create = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    visitDate: v.string(),
    guests: v.number(),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const name = clean(args.name, 80);
    const phone = clean(args.phone, 24);
    const email = clean(args.email, 120);
    const message = clean(args.message, 800);
    const visitDate = clean(args.visitDate, 10);

    if (name.length < 2) {
      throw new ConvexError("Please enter your name.");
    }
    if (!/^[+()\d\s.-]{7,24}$/.test(phone)) {
      throw new ConvexError("Please enter a contact number we can reach you on.");
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new ConvexError("That email address doesn't look right.");
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(visitDate)) {
      throw new ConvexError("Please choose a visit date.");
    }
    const today = new Date().toISOString().slice(0, 10);
    if (visitDate < today || Number.isNaN(Date.parse(`${visitDate}T00:00:00Z`))) {
      throw new ConvexError("Please choose today or a future date.");
    }
    if (!Number.isInteger(args.guests) || args.guests < 1 || args.guests > 200) {
      throw new ConvexError("Please enter a group size between 1 and 200.");
    }

    const bookingId = await ctx.db.insert("bookingRequests", {
      name,
      phone,
      ...(email ? { email } : {}),
      visitDate,
      guests: args.guests,
      ...(message ? { message } : {}),
      createdAt: Date.now(),
    });

    return bookingId;
  },
});

/** Staff-only inbox. The dashboard route is protected, but the check lives here too. */
export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new ConvexError("Sign in to view booking requests.");
    }

    return await ctx.db
      .query("bookingRequests")
      .withIndex("by_created")
      .order("desc")
      .take(100);
  },
});
