import {
  userLoginFormValidator,
  userSignInFormValidator,
} from "@/lib/user/validation";
import { z } from "zod";

export type SignInFormData = z.infer<typeof userSignInFormValidator>;
export type LoginFormData = z.infer<typeof userLoginFormValidator>;
