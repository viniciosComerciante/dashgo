import {
  FormLabel,
  FormControl,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, ...rest }: InputProps,
  ref
) => {
  return (
    <FormControl>
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
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
