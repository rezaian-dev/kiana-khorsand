import { z } from "zod";

export const phone = z.string().regex(/^09\d{9}$/);
export const role = z.enum(["user", "admin"]);
export const status = z.enum(["draft", "published", "hidden"]);
export const appointmentStatus = z.enum([
  "pending",
  "confirmed",
  "completed",
  "cancelled",
  "no_show",
]);
export const paymentStatus = z.enum(["pending", "paid", "failed", "refunded"]);
export const mode = z.enum(["online", "in_person"]);
const slug = z
  .string()
  .min(1)
  .regex(/^[a-z0-9-]+$/);
const date = z.date();

// Better Auth owns the core models; these schemas describe their app-visible shape.
export const user = z.object({
  name: z.string(),
  email: z.email(),
  username: phone,
  role,
  image: z.string().nullable().optional(),
  createdAt: date.optional(),
  updatedAt: date.optional(),
});
export const session = z.object({
  token: z.string(),
  userId: z.string(),
  expiresAt: date,
});
export const account = z.object({
  userId: z.string(),
  providerId: z.string(),
  accountId: z.string(),
  password: z.string().optional(),
});
export const verification = z.object({
  identifier: z.string(),
  value: z.string(),
  expiresAt: date,
});

export const settings = z.object({
  _id: z.literal("site"),
  profile: z.object({
    name: z.string(),
    title: z.string(),
    bio: z.string(),
    licence: z.string(),
    years: z.number().int().nonnegative().nullable(),
  }),
  contact: z.object({
    phone: z.string(),
    email: z.string(),
    address: z.string(),
    instagram: z.string(),
    telegram: z.string(),
    whatsapp: z.string(),
  }),
  cancellation: z.string(),
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    reminder: z.boolean().default(false),
    weekly: z.boolean().default(false),
  }),
  images: z.object({
    hero: z.string().nullable(),
    portrait: z.string().nullable(),
    logo: z.string().nullable().default(null),
    favicon: z.string().nullable().default(null),
    og: z.string().nullable().default(null),
  }),
});
export const section = z.object({
  kind: z.string(),
  title: z.string(),
  body: z.string(),
  image: z.string().nullable(),
  items: z.array(z.string()),
});
export const page = z.object({
  slug: z.enum([
    "home",
    "about",
    "approach",
    "fees",
    "privacy",
    "terms",
    "cancellation",
  ]),
  title: z.string(),
  description: z.string(),
  sections: z.array(section),
});
export const area = z.object({
  slug,
  title: z.string(),
  description: z.string(),
  body: z.string(),
  image: z.string().nullable(),
  status,
  updatedAt: date,
});
export const article = z.object({
  slug,
  title: z.string(),
  excerpt: z.string(),
  body: z.string(),
  category: z.string(),
  tags: z.array(z.string()).optional(),
  cover: z.string().nullable(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  status,
  publishedAt: date.nullable(),
  updatedAt: date,
});
export const workshop = z.object({
  slug,
  title: z.string(),
  description: z.string(),
  body: z.string(),
  mode,
  price: z.number().int().nonnegative(),
  discount: z
    .object({
      percent: z.number().int().min(1).max(90),
      startsAt: date,
      endsAt: date,
    })
    .nullable()
    .optional(),
  capacity: z.number().int().positive().nullable(),
  approvalRevision: z.number().int().nonnegative().optional(),
  startsAt: date.nullable(),
  endsAt: date.nullable().optional(),
  status,
  cover: z.string().nullable(),
});
export const testimonial = z.object({
  slug,
  userId: z.string().optional(),
  name: z.string(),
  quote: z.string(),
  category: z.string(),
  experience: z.string().max(120).optional(),
  avatar: z.string().nullable(),
  status,
  createdAt: date,
});
export const faq = z.object({
  slug,
  title: z.string(),
  status,
  questions: z.array(z.object({ question: z.string(), answer: z.string() })),
});
export const service = z.object({
  slug,
  name: z.string(),
  mode,
  duration: z.number().int().positive(),
  price: z.number().int().nonnegative(),
  status,
  features: z.array(z.string()),
});
export const availability = z.object({
  key: z.string(),
  weekday: z.number().int().min(0).max(6),
  start: z.string(),
  end: z.string(),
  slots: z.array(z.string()),
  blocks: z.array(
    z.object({
      id: z.string().uuid().optional(),
      from: date,
      to: date,
      reason: z.string(),
    }),
  ),
});
export const appointment = z.object({
  userId: z.string(),
  serviceId: z.string(),
  startsAt: date,
  endsAt: date,
  status: appointmentStatus,
  price: z.number().int().nonnegative(),
  note: z.string(),
  createdAt: date,
});
export const payment = z.object({
  userId: z.string(),
  appointmentId: z.string().nullable(),
  invoice: z.string(),
  amount: z.number().int().nonnegative(),
  description: z.string().max(180).optional(),
  issuedAt: date.optional(),
  status: paymentStatus,
  paidAt: date.nullable(),
  method: z.string(),
});
export const note = z.object({
  userId: z.string(),
  title: z.string(),
  body: z.string(),
  tags: z.array(z.string()),
  pinned: z.boolean(),
  createdAt: date,
  updatedAt: date,
});
export const meetingNote = z.object({
  userId: z.string(),
  kind: z.enum(["appointment", "workshop"]),
  referenceId: z.string(),
  // Stored as authenticated AES-GCM ciphertext, never as plain clinical notes.
  encryptedBody: z.string(),
  updatedAt: date,
});
export const thread = z.object({
  userId: z.string(),
  createdAt: date,
  updatedAt: date,
});
export const message = z.object({
  threadId: z.string(),
  userId: z.string(),
  sender: z.enum(["client", "clinician", "support", "system"]),
  body: z.string(),
  meetUrl: z.string().optional(),
  readAt: date.nullable(),
  createdAt: date,
});
export const assessment = z.object({
  slug,
  title: z.string(),
  introduction: z.string(),
  status,
  questions: z.array(
    z.object({
      prompt: z.string(),
      options: z.array(
        z.object({ label: z.string(), value: z.number().int() }),
      ),
    }),
  ),
  bands: z.array(
    z.object({
      min: z.number().int(),
      max: z.number().int(),
      label: z.string(),
      interpretation: z.string(),
    }),
  ),
});
export const result = z.object({
  userId: z.string().nullable(),
  assessmentId: z.string(),
  answers: z.array(z.number().int()),
  score: z.number().int(),
  band: z.string(),
  createdAt: date,
});
export const articleCover = z.object({
  slug,
  image: z.unknown(),
  updatedAt: date,
});
export const avatar = z.object({
  userId: z.string(),
  image: z.unknown(),
  updatedAt: date,
});

export const enrollment = z.object({
  userId: z.string(),
  workshopId: z.string(),
  createdAt: date,
  status: z.enum(["pending", "active", "cancelled"]),
  attendedAt: date.nullable().optional(),
  priceAtRequest: z.number().int().nonnegative().optional(),
  discountPercentAtRequest: z.number().int().nonnegative().optional(),
});
export const workshopReview = z.object({
  workshopId: slug,
  userId: z.string(),
  name: z.string(),
  rating: z.number().int().min(1).max(5),
  body: z.string().min(30).max(1000),
  status: z.enum(["pending", "published", "hidden"]),
  createdAt: date,
});
export const contact = z.object({
  name: z.string(),
  phone,
  email: z.string().optional(),
  userId: z.string().optional(),
  subject: z.string(),
  body: z.string(),
  status: z.enum(["new", "read", "closed"]),
  createdAt: date,
});
export const limit = z.object({
  key: z.string(),
  count: z.number().int().nonnegative(),
  expiresAt: date,
});

export const models = {
  users: user,
  sessions: session,
  accounts: account,
  verifications: verification,
  settings,
  pages: page,
  areas: area,
  articles: article,
  workshops: workshop,
  testimonials: testimonial,
  faqs: faq,
  services: service,
  availability,
  appointments: appointment,
  payments: payment,
  notes: note,
  meetingNotes: meetingNote,
  threads: thread,
  messages: message,
  assessments: assessment,
  results: result,
  enrollments: enrollment,
  workshopReviews: workshopReview,
  avatars: avatar,
  articleCovers: articleCover,
  contacts: contact,
  limits: limit,
} as const;
