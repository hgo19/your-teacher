import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Image,
  Center,
  HStack,
} from "@chakra-ui/react";
import {
  AiOutlineFileSearch,
  AiOutlineUpload,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { useDisclosure } from "@chakra-ui/react";
import UploadModal from "./components/UploadModal";

const TeacherRoom: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      w="800px"
      p="8"
      mx="auto"
      my="10"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Center mb="6">
        <Image
          src="/teacher.svg"
          alt="Robô"
          boxSize="150px"
          objectFit="cover"
        />
      </Center>

      <FormControl mb="4">
        <FormLabel htmlFor="question">Faça sua pergunta</FormLabel>
        <Input id="question" placeholder="Digite sua pergunta aqui" />
      </FormControl>

      <HStack spacing="4" justify="center">
        <Button leftIcon={<AiOutlineFileSearch />} colorScheme="teal">
          Listar livros
        </Button>

        <Button
          leftIcon={<AiOutlineUpload />}
          colorScheme="teal"
          onClick={onOpen}
        >
          Upload Livro
        </Button>

        <Button leftIcon={<AiOutlineQuestionCircle />} colorScheme="teal">
          Realizar pergunta
        </Button>
      </HStack>

      <UploadModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default TeacherRoom;
