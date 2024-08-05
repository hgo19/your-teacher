import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Text,
  HStack,
  Button,
  VStack,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import api from "../../../@global/api/api";
import { useAuth } from "../../../@global/context/auth-context"; // Certifique-se de importar o contexto de autenticação

interface Book {
  id: number;
  author: string;
  title: string;
  publishedAt: string;
  fileUrl: string;
}

interface BooksListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BooksModal: React.FC<BooksListModalProps> = ({ isOpen, onClose }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(response.data);
      } catch (error) {
        console.error("Erro ao carregar livros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [token]);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Erro ao deletar livro:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Listagem de Livros</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <Flex align={"center"} justify={"center"}>
              <Spinner size="xl" />
            </Flex>
          ) : (
            <VStack spacing="4" align="stretch">
              {books.length === 0 ? (
                <Text>Nenhum livro encontrado.</Text>
              ) : (
                books.map((book) => (
                  <HStack
                    key={book.id}
                    spacing="4"
                    p="2"
                    borderWidth="1px"
                    borderRadius="md"
                    _hover={{ bg: "gray.100" }}
                    align="center"
                    justify="space-between"
                  >
                    <Box>
                      <Text fontWeight="bold">{book.title}</Text>
                      <Text fontSize="sm">{book.author}</Text>
                      <Text fontSize="sm">{book.publishedAt}</Text>
                    </Box>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDelete(book.id)}
                    >
                      Excluir
                    </Button>
                  </HStack>
                ))
              )}
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BooksModal;
