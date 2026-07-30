import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be under 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be under 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .max(20, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject is too long"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(2000, "Message must be under 2000 characters"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to our Privacy Policy",
  }),
});

export const partnerFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number").max(20),
  country: z.string().min(2, "Please select your country"),
  partnerType: z.enum(["ib", "affiliate", "institutional", "other"], {
    errorMap: () => ({ message: "Please select a partnership type" }),
  }),
  clientsPerMonth: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  message: z
    .string()
    .min(20, "Please provide more details")
    .max(2000, "Message is too long"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to our Privacy Policy",
  }),
});

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type PartnerFormData = z.infer<typeof partnerFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
