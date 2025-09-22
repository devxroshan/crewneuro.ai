import z from "zod";

export const userSchema = z.object({
  email: z.string().email("Invalid email address."),
  name: z.string().min(1, "Name is required."),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }
    ),
});
