"use client";
import { useSupabase } from "@/app/Providers";
import { userLoginFormValidator } from "@/lib/user/validation";
import { LoginFormData } from "@/types/user/sign";

import {
  Alert,
  Anchor,
  Button,
  Container,
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

  const form = useForm<LoginFormData>({
    validate: zodResolver(userLoginFormValidator),
    initialValues: {
      email: "",
      password: "",
      // terms: true,
    },
  });

  const submitForm = async (val: LoginFormData) => {
    const DataRes = await supabase.auth.signInWithPassword({
      email: val.email,
      password: val.password,
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
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" href={"user/signin"} component={Link}>
            Create account
          </Anchor>
        </Text>

        <form onSubmit={form.onSubmit(submitForm)}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              withAsterisk
              label="Email"
              aria-label="Type Your Email Address"
              placeholder="you@email.com"
              icon={<FiMail className="text-lg" />}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              className="my-4"
              placeholder="Password"
              aria-label="Type Your password"
              icon={<BiLockAlt className="text-lg" />}
              {...form.getInputProps("password")}
            />
            {/* <Group position="apart" className="my-4">
              <Checkbox
                label="I agree to sell my privacy"
                {...form.getInputProps("terms", { type: "checkbox" })}
              />
            </Group> */}

            {res?.data.user && (
              <Alert className="my-4" color="green" title={"Login Successful"}>
                You Have Successfully logged in.
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
              Login
            </Button>
          </Paper>
        </form>
      </Container>
    </>
  );
}
