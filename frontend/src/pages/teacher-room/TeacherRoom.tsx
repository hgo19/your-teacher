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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  AiOutlineFileSearch,
  AiOutlineUpload,
  AiOutlineQuestionCircle,
  AiOutlineLogout,
} from "react-icons/ai";
import { useForm } from "react-hook-form";
import api from "../../@global/api/api";
import { useAuth } from "../../@global/context/auth-context";
import { animated, useSpring } from "@react-spring/web";
import UploadModal from "./components/UploadModal";
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
  const { token, logout } = useAuth();
  const toast = useToast();

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

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout bem-sucedido.",
      description: "Você foi desconectado.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    window.location.href = "/";
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
          {answer && (
            <VStack align="start" ml="4">
              <Text fontSize="lg" fontWeight="bold">
                Resposta:
              </Text>
              <animated.div style={springProps}>
                <Text>{answer}</Text>
              </animated.div>
            </VStack>
          )}
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

          <Button
            leftIcon={<AiOutlineLogout />}
            colorScheme="red"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </HStack>
      </form>

      <UploadModal isOpen={isUploadOpen} onClose={onUploadClose} />
      <BooksModal isOpen={isBooksOpen} onClose={onBooksClose} />
    </Box>
  );
};

export default TeacherRoom;
