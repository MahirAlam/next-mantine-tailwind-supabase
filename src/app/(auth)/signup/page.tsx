"use client";
import { useSupabase } from "@/app/Providers";
import { userSignInFormValidator } from "@/lib/user/validation";
import { SignInFormData } from "@/types/user/sign";

import {
  Alert,
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { AuthResponse } from "@supabase/supabase-js";
import Link from "next/link";
import { useState } from "react";

import { BiLockAlt } from "react-icons/bi";
import { FiMail } from "react-icons/fi";

export default function SignIn() {
  const [res, setRes] = useState<AuthResponse>();
  const { supabase } = useSupabase();

  const form = useForm<SignInFormData>({
    validate: zodResolver(userSignInFormValidator),
    initialValues: {
      email: "",
      password: "",
      conformPassword: "",
      terms: true,
    },
  });

  const submitForm = async (val: SignInFormData) => {
    const DataRes = await supabase.auth.signUp({
      email: val.email,
      password: val.password,
      options: {
        data: {
          first_name: val.email + val.password,
        },
      },
    });

    setRes(DataRes);
  };

  return (
    <>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome Mr.?!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{" "}
          <Anchor size="sm" href={"user/login"} component={Link}>
            Login Here
          </Anchor>
        </Text>

        <form onSubmit={form.onSubmit(submitForm)}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              required
              withAsterisk
              label="Email"
              aria-label="Type Your Email Address"
              placeholder="you@email.com"
              icon={<FiMail className="text-lg" />}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              required
              withAsterisk
              label="Password"
              className="my-4"
              placeholder="Password"
              aria-label="Type Your password"
              icon={<BiLockAlt className="text-lg" />}
              {...form.getInputProps("password")}
              description="Password must include at least one uppercase, one lowercase letter and one number"
            />
            <PasswordInput
              required
              withAsterisk
              label="Conform Password"
              placeholder="Conform Password"
              aria-label="Type Your again password"
              icon={<BiLockAlt className="text-lg" />}
              {...form.getInputProps("conformPassword")}
            />
            <Group position="apart" className="my-4">
              <Checkbox
                label="I agree to sell my privacy"
                {...form.getInputProps("terms", { type: "checkbox" })}
              />
            </Group>

            {res?.data.user && (
              <Alert
                className="my-4"
                color="green"
                title={"Account Registration Successful"}
              >
                Your Account Has been Registered Successfully.
              </Alert>
            )}

            {res?.error && (
              <Text
                className="my-4 font-semibold capitalize"
                align="center"
                color="red"
              >
                {res?.error?.message}
              </Text>
            )}

            <Button fullWidth type="submit">
              Sign Up
            </Button>
          </Paper>
        </form>
      </Container>
    </>
  );
}
