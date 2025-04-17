import { useState } from 'react';
import {
    Box,
    Container,
    Heading,
    useColorModeValue,
    VStack,
    Input,
    Button
} from '@chakra-ui/react';
import { useProductStore } from '../store/product';
import { useToast } from '@chakra-ui/react';

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        image: ''
    });
    const { createProduct } = useProductStore();
    const toast = useToast();
    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct);
        if (!success) {
            toast({
                title: 'ERRRRROR',
                description: message,
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        } else {
            toast({
                title: 'SUCCCCESS',
                description: message,
                status: 'success',
                duration: 5000,
                isClosable: true
            });
        }
        setNewProduct({ name: '', price: '', image: '' });
    };
    return (
        <Container maxH={Container.sm}>
            <VStack spacing={8}>
                <Heading as={'h1'} size={'2x1'} textAlign={'center'} mb={8}>
                    Create New Product
                </Heading>
                <Box
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    p={6}
                    rounded={'lg'}
                    shadow={'md'}
                >
                    <VStack spacing={4}>
                        <Input
                            placeholder="Product name"
                            name="name"
                            value={newProduct.name}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    name: e.target.value
                                })
                            }
                        />
                        <Input
                            placeholder="Price"
                            name="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    price: e.target.value
                                })
                            }
                        />
                        <Input
                            placeholder="Image URL"
                            name="image"
                            value={newProduct.image}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    image: e.target.value
                                })
                            }
                        />
                        <Button
                            colorScheme="blue"
                            onClick={handleAddProduct}
                            w="full"
                        >
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreatePage;
