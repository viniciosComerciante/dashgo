import {
  FormLabel,
  FormControl,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, ...rest }: InputProps,
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor="email">{label}</FormLabel>
      <ChakraInput
        name={name}
        ref={ref}
        id={name}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: "gray.900",
        }}
        size="lg"
        {...rest}
      ></ChakraInput>
      {error?.message && (
        <FormErrorMessage>{error?.message?.toString()}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
