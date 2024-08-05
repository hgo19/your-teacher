import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: "#F8F9FA",
    secondary: "#FFFFFF",
    inputBorder: "#CED4DA",
    button: "#007BFF",
    buttonHover: "#0056b3",
    text: "#212529",
    heading: "#343A40",
  },
  styles: {
    global: {
      body: {
        bg: "primary",
        color: "text",
      },
    },
  },
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            borderColor: "inputBorder",
            _hover: {
              borderColor: "inputBorder",
            },
            _focus: {
              borderColor: "inputBorder",
              boxShadow: "0 0 0 1px #007BFF",
            },
          },
        },
      },
    },
    Button: {
      baseStyle: {
        bg: "button",
        color: "white",
        _hover: {
          bg: "buttonHover",
        },
      },
    },
    Heading: {
      baseStyle: {
        color: "heading",
      },
    },
  },
});

export default theme;
