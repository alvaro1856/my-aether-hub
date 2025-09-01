import { z } from "zod";

export const createUserSchema = z.object({
email: z.string().email(),
name: z.string().min(1).max(120).optional(),
role: z.enum(["ADMIN", "USER"]).optional(),
});

export const updateUserSchema = z.object({
name: z.string().min(1).max(120).optional(),
role: z.enum(["ADMIN", "USER"]).optional(),
});

export const createFeedbackSchema = z.object({
userId: z.string().uuid().optional(),
message: z.string().min(1).max(4000),
rating: z.number().int().min(1).max(5).optional(),
});

export const updateFeedbackSchema = z.object({
status: z.enum(["NEW", "REVIEWED", "CLOSED"]).optional(),
rating: z.number().int().min(1).max(5).optional(),
});

export const createContactSchema = z.object({
name: z.string().min(1).max(120),
email: z.string().email(),
subject: z.string().max(160).optional(),
message: z.string().min(1).max(4000),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreateFeedbackInput = z.infer<typeof createFeedbackSchema>;
export type UpdateFeedbackInput = z.infer<typeof updateFeedbackSchema>;
export type CreateContactInput = z.infer<typeof createContactSchema>;