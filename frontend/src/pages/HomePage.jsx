import {
    Box,
    Container,
    Heading,
    VStack,
    Input,
    Button,
    Text,
    SimpleGrid
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
    const { fetchProducts, products } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    console.log(products);
    return (
        <Container maxW="Container.x1" py={12}>
            <VStack spacing={8}>
                <Text
                    bgGradient="linear(to-r, cyan.400, blue.500)"
                    bgClip="text"
                    fontSize={'30'}
                    fontWeight={'bold'}
                    // textTransform={'uppercase'}
                    textAlign={'center'}
                >
                    Current Products 🚀
                </Text>
                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3
                    }}
                    spacing={10}
                    w={'full'}
                >
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </SimpleGrid>
                {products.length === 0 && (
                    <Text
                        color="gray.500"
                        fontSize="x1"
                        fontWeight={'bold'}
                        textAlign={'center'}
                    >
                        No products yet 😵 {''}
                        <Link to={'/create'}>
                            <Text
                                as="span"
                                color="blue.500"
                                _hover={{ textDecoration: 'underline' }}
                            >
                                Create a Product
                            </Text>
                        </Link>
                    </Text>
                )}
            </VStack>
        </Container>
    );
};

export default HomePage;
