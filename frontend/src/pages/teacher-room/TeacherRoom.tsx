import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Image,
  Center,
  HStack,
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import {
  AiOutlineFileSearch,
  AiOutlineUpload,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { useDisclosure } from "@chakra-ui/react";
import UploadModal from "./components/UploadModal";
import { useForm } from "react-hook-form";
import api from "../../@global/api/api";
import { useAuth } from "../../@global/context/auth-context";
import { animated, useSpring } from "@react-spring/web";
import BooksModal from "./components/BooksModal";

interface FormData {
  question: string;
}

const TeacherRoom: React.FC = () => {
  const {
    isOpen: isUploadOpen,
    onOpen: onUploadOpen,
    onClose: onUploadClose,
  } = useDisclosure();
  const {
    isOpen: isBooksOpen,
    onOpen: onBooksOpen,
    onClose: onBooksClose,
  } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAuth();

  const springProps = useSpring({
    opacity: answer ? 1 : 0,
    transform: answer ? "translateY(0)" : "translateY(-20px)",
    config: { tension: 250, friction: 20 },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await api.post(
        "/teacher/ask",
        {
          question: data.question,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setAnswer(response.data.message);
      console.log("Pergunta enviada com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao enviar pergunta:", error);
    } finally {
      setLoading(false);
    }
  };

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
        <HStack spacing="4" align="start">
          <Image
            src="/teacher.svg"
            alt="Robô"
            boxSize="150px"
            objectFit="cover"
            ml="4"
          />
          <VStack align="start" ml="4">
            <Text fontSize="lg" fontWeight="bold">
              Resposta:
            </Text>
            <animated.div style={springProps}>
              <Text>{answer}</Text>
            </animated.div>
          </VStack>
        </HStack>
      </Center>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb="4" isInvalid={!!errors.question}>
          <FormLabel htmlFor="question">Faça sua pergunta</FormLabel>
          <Input
            id="question"
            placeholder="Digite sua pergunta aqui"
            {...register("question", { required: "Pergunta é obrigatória" })}
          />
        </FormControl>

        <HStack spacing="4" justify="center">
          <Button
            leftIcon={loading ? <Spinner size="sm" /> : <AiOutlineFileSearch />}
            colorScheme="teal"
            isLoading={loading}
            loadingText="Carregando"
            onClick={onBooksOpen}
          >
            Listar livros
          </Button>

          <Button
            leftIcon={loading ? <Spinner size="sm" /> : <AiOutlineUpload />}
            colorScheme="teal"
            onClick={onUploadOpen}
            isLoading={loading}
            loadingText="Carregando"
          >
            Upload Livro
          </Button>

          <Button
            leftIcon={
              loading ? <Spinner size="sm" /> : <AiOutlineQuestionCircle />
            }
            colorScheme="teal"
            type="submit"
            isLoading={loading}
            loadingText="Carregando"
          >
            Realizar pergunta
          </Button>
        </HStack>
      </form>

      <UploadModal isOpen={isUploadOpen} onClose={onUploadClose} />
      <BooksModal isOpen={isBooksOpen} onClose={onBooksClose} />
    </Box>
  );
};

export default TeacherRoom;
