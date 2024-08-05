import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useToast,
  Center,
} from "@chakra-ui/react";
import api from "../../../@global/api/api";
import { useAuth } from "../../../@global/context/auth-context";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [author, setAuthor] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [publishedAt, setPublishedAt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { token } = useAuth();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else if (selectedFile) {
      toast({
        title: "Arquivo inválido.",
        description: "Por favor, selecione um arquivo PDF.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUpload = async () => {
    if (!author || !title || !publishedAt) {
      toast({
        title: "Informações incompletas.",
        description: "Por favor, preencha todos os campos.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("author", author);
    formData.append("title", title);
    formData.append("publishedAt", publishedAt);

    try {
      await api.post("/books/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Upload bem-sucedido.",
        description: "O livro foi carregado com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFile(null);
      setAuthor("");
      setTitle("");
      setPublishedAt("");
      onClose();
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      toast({
        title: "Erro no upload.",
        description: "Ocorreu um erro ao carregar o livro. Tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload de Livro</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb="4">
            <FormLabel htmlFor="author">Autor</FormLabel>
            <Input
              id="author"
              placeholder="Nome do Autor"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel htmlFor="title">Título</FormLabel>
            <Input
              id="title"
              placeholder="Título do Livro"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel htmlFor="publishedAt">Data de Publicação</FormLabel>
            <Input
              id="publishedAt"
              placeholder="Data de Publicação"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              type={"date"}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel htmlFor="file-upload">
              Escolha um arquivo PDF (opcional)
            </FormLabel>
            <Input
              id="file-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
            />
          </FormControl>

          {loading && (
            <Center>
              <Spinner size="xl" />
            </Center>
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="teal" onClick={handleUpload} isLoading={loading}>
            Upload
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadModal;
