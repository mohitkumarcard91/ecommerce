import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Image,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Header() {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(1); 
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://dummyjson.com/products?limit=5&skip=5&select=title,price,thumbnail"
        );
        setProducts(res.data.products);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const slides =
    products.length > 0
      ? [
          products[products.length - 1],
          ...products,
          products[0],
        ]
      : [];

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 1000);
  };

  const stopAutoScroll = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (products.length) startAutoScroll();
    return stopAutoScroll;
  }, [products]);

  const handleTransitionEnd = () => {
    if (index === slides.length - 1) {
      setIndex(1);
    }
    if (index === 0) {
      setIndex(slides.length - 2);
    }
  };

  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => i - 1);

  return (
    <Box className="mb-3"
      position="relative"
      w="full"
      h="350px"
      overflow="hidden"
      bg="gray.100"
      onMouseEnter={stopAutoScroll}
      onMouseLeave={startAutoScroll}
    >
      <Box
        display="flex"
        h="100%"
        transform={`translateX(-${index * 100}%)`}
        transition="transform 0.6s ease"
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((item, i) => (
          <Box key={i} minW="100%" h="100%">
            <VStack
              justify="center"
              h="100%"
              spacing={4}
            >
              <Image
                src={item.thumbnail}
                alt={item.title}
                h="250px"
                objectFit="contain"
              />
              <Text fontSize="lg" fontWeight="bold">
                {item.title}
              </Text>
              <Text fontSize="md" color="green.500">
                ₹{item.price}
              </Text>
            </VStack>
          </Box>
        ))}
      </Box>

      <IconButton
        icon={<ArrowLeft />}
        position="absolute"
        left="15px"
        top="50%"
        transform="translateY(-50%)"
        zIndex="2"
        bg="white"
        onClick={prev}
      />

      <IconButton
        icon={<ArrowRight />}
        position="absolute"
        right="15px"
        top="50%"
        transform="translateY(-50%)"
        zIndex="2"
        bg="white"
        onClick={next}
      />
    </Box>
  );
}
