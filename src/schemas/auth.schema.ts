import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  role: z.enum(["admin", "user"]).default("user") // ← Adicione default ou torne opcional
});

export type RegisterSchema = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export type LoginSchema = z.infer<typeof LoginSchema>;
