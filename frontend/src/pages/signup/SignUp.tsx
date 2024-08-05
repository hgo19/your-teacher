import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import api from "../../@global/api/api";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../@global/context/auth-context";

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>();
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post("/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      });

      setToken(response.data.token);
      navigate(from, { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response);
      } else {
        console.error("Error:", error);
      }
    }
  };

  const password = watch("password");

  return (
    <Box
      w="400px"
      p="8"
      mx="auto"
      my="10"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="4">
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.passwordConfirmation}>
            <FormLabel htmlFor="passwordConfirmation">
              Confirm Password
            </FormLabel>
            <Input
              id="passwordConfirmation"
              type="password"
              placeholder="Confirm Password"
              {...register("passwordConfirmation", {
                required: "Password confirmation is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <FormErrorMessage>
              {errors.passwordConfirmation &&
                errors.passwordConfirmation.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            mt="4"
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
            alignSelf={"flex-end"}
          >
            Register
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;
