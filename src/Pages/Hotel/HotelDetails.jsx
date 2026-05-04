import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  HStack,
  Badge,
  Icon,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaInstagram, FaTwitter, FaYoutube, FaShieldAlt, FaUserFriends, FaUsers, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { useParams } from "react-router-dom";
import Carousel from "better-react-carousel";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { HotelFooter } from "./HotelFooter";
import { useSelector } from "react-redux";

function HotelDetails({ person }) {
  const [singleHotel, setSingleHotel] = useState([]);
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isAuth } = useSelector((store) => {
    console.log(store);
    return {
      isAuth: store.LoginReducer.isAuth,
    };
  });

  const SingleData = () => {
    axios
      .get(`http://localhost:3001/hotel/${id}`)
      .then((res) => {
        // console.log(res.data);
        setSingleHotel(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    SingleData();
  }, []);

  const {
    image,
    img1,
    img2,
    img3,
    img4,
    rating,
    ratingText,
    name,
    place,
    description,
    additional,
    taxes,
    price,
    womenSafetyScore,
    isWomenFriendly,
    womenFriendlyCertified,
    currentGuests,
    staffInfo,
    groupBookingAlert,
    amenities,
    womenReviews,
  } = singleHotel;

  return (
    <>
      <Container maxW={"7xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <Image
              rounded={"md"}
              alt={"product image"}
              src={image}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
          </Flex>

          <Stack spacing={{ base: 6, md: 10 }}>
            <Box bg="gray.100" p="5" borderRadius="5" textAlign="center">
              <Heading
                lineHeight={1.1}
                fontWeight={500}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {name}
              </Heading>
              <Text
                bg="blue.100"
                m="5"
                color={useColorModeValue("gray.900", "gray.400")}
                fontWeight={500}
                fontSize={"2xl"}
              >
                Place : {place}
              </Text>
              
              {/* Safety Badges */}
              <Flex gap="2" justifyContent="center" flexWrap="wrap" mt="3">
                {womenSafetyScore && (
                  <Badge 
                    colorScheme={
                      womenSafetyScore.tier === 'safe' ? 'green' : 
                      womenSafetyScore.tier === 'moderate' ? 'yellow' : 'red'
                    }
                    fontSize="md"
                    px="3"
                    py="2"
                    borderRadius="md"
                    display="flex"
                    alignItems="center"
                    gap="2"
                  >
                    <Icon as={FaShieldAlt} />
                    {womenSafetyScore.badge}
                  </Badge>
                )}
                
                {womenFriendlyCertified && (
                  <Badge 
                    colorScheme="pink"
                    fontSize="md"
                    px="3"
                    py="2"
                    borderRadius="md"
                  >
                    ✓ Women-Friendly Certified
                  </Badge>
                )}
              </Flex>
            </Box>
            <HStack>
              <Box>
                <Carousel cols={2} rows={1} gap={10} loop>
                  <Carousel.Item>
                    <img width="100%" src={img1} />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img width="100%" src={img2} />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img width="100%" src={img3} />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img width="100%" src={img4} />
                  </Carousel.Item>
                </Carousel>
              </Box>
            </HStack>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text
                  color={useColorModeValue("gray.500", "gray.400")}
                  fontSize={"2xl"}
                  fontWeight={"300"}
                >
                  {additional}
                </Text>
                <Text fontSize={"lg"}>{description}</Text>
              </VStack>
              
              {/* SafeStay Context Panel */}
              {(currentGuests || staffInfo || groupBookingAlert || (womenReviews && womenReviews.length > 0)) && (
                <Box 
                  bg="pink.50" 
                  p="6" 
                  borderRadius="lg" 
                  border="2px solid" 
                  borderColor="pink.200"
                >
                  <Heading size="md" mb="4" color="pink.700" display="flex" alignItems="center" gap="2">
                    <Icon as={FaShieldAlt} />
                    SafeStay Context Panel
                  </Heading>
                  
                  {/* Group Booking Alert */}
                  {groupBookingAlert && (
                    <Alert status="warning" mb="4" borderRadius="md">
                      <AlertIcon as={FaExclamationTriangle} />
                      <Box>
                        <AlertTitle>Group Booking Alert</AlertTitle>
                        <AlertDescription>{groupBookingAlert.message}</AlertDescription>
                      </Box>
                    </Alert>
                  )}
                  
                  {/* Current Guests */}
                  {currentGuests && (
                    <Box mb="4">
                      <Text fontWeight="bold" mb="2" display="flex" alignItems="center" gap="2">
                        <Icon as={FaUserFriends} color="pink.600" />
                        Tonight's Guests
                      </Text>
                      <Text bg="white" p="3" borderRadius="md" fontSize="sm">
                        {currentGuests}
                      </Text>
                    </Box>
                  )}
                  
                  {/* Staff Info */}
                  {staffInfo && (
                    <Box mb="4">
                      <Text fontWeight="bold" mb="2" display="flex" alignItems="center" gap="2">
                        <Icon as={FaUsers} color="pink.600" />
                        Staff Composition
                      </Text>
                      <Text bg="white" p="3" borderRadius="md" fontSize="sm">
                        {staffInfo}
                      </Text>
                    </Box>
                  )}
                  
                  {/* Women Reviews */}
                  {womenReviews && womenReviews.length > 0 && (
                    <Box>
                      <Text fontWeight="bold" mb="3" display="flex" alignItems="center" gap="2">
                        <Icon as={FaCheckCircle} color="pink.600" />
                        What Women Travelers Say
                      </Text>
                      <VStack spacing="3" align="stretch">
                        {womenReviews.slice(0, 3).map((review, index) => (
                          <Box key={index} bg="white" p="4" borderRadius="md" borderLeft="4px solid" borderColor="pink.400">
                            <Flex justifyContent="space-between" mb="2">
                              <Text fontWeight="semibold" fontSize="sm">
                                {review.name}
                                {review.verified && (
                                  <Badge ml="2" colorScheme="green" fontSize="xs">
                                    Verified
                                  </Badge>
                                )}
                              </Text>
                              <Badge colorScheme="yellow">★ {review.rating}</Badge>
                            </Flex>
                            <Text fontSize="sm" color="gray.700" fontStyle="italic">
                              "{review.text}"
                            </Text>
                            <Text fontSize="xs" color="gray.500" mt="2">
                              {review.travelType === 'solo' ? '👤 Solo Traveler' : '👥 Group Travel'} • {review.date}
                            </Text>
                          </Box>
                        ))}
                      </VStack>
                    </Box>
                  )}
                </Box>
              )}
              
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Features
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    {amenities && amenities.slice(0, Math.ceil(amenities.length / 2)).map((amenity, index) => (
                      <ListItem key={index}>{amenity}</ListItem>
                    ))}
                    {!amenities && (
                      <>
                        <ListItem>WiFi</ListItem>
                        <ListItem>Parking</ListItem>
                        <ListItem>Breakfast Included</ListItem>
                      </>
                    )}
                  </List>
                  <List spacing={2}>
                    {amenities && amenities.slice(Math.ceil(amenities.length / 2)).map((amenity, index) => (
                      <ListItem key={index}>{amenity}</ListItem>
                    ))}
                    {!amenities && (
                      <>
                        <ListItem>Laundry</ListItem>
                        <ListItem>Pick-up and drop</ListItem>
                        <ListItem>Early Check-In</ListItem>
                      </>
                    )}
                  </List>
                </SimpleGrid>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Price Details
                </Text>

                <List spacing={2}>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Base Price:
                    </Text>{" "}
                    ₹ {price}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      for 2 adults:
                    </Text>{" "}
                    ₹ {price * 2}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Room:
                    </Text>{" "}
                    Steel
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Taxes & Fees
                    </Text>{" "}
                    ₹ {taxes}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Total:
                    </Text>{" "}
                    ₹ {taxes + price * 2}
                  </ListItem>

                  <ListItem color="red">Non Refundable</ListItem>
                </List>
              </Box>
            </Stack>

            {isAuth ? (
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={onOpen}
                rounded={"none"}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
                // color={useColorModeValue("white", "gray.900")}
                borderRadius="5"
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
              >
                Proceed to Payment
              </Button>
            ) : (
              <Button
                variant="solid"
                colorScheme="blue"
                // onClick={onOpen}
                rounded={"none"}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
                // color={useColorModeValue("white", "gray.900")}
                borderRadius="5"
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
              >
                Proceed to Payment
              </Button>
            )}

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Payment Successful</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>
                    Your payment has been successfully processed, and we are
                    grateful for your business. Our team is dedicated to
                    ensuring your satisfaction, and we will work hard to exceed
                    your expectations at every step of the way.
                  </Text>
                </ModalBody>

                <ModalFooter>
                  <RouteLink to="/">
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </RouteLink>
                  <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"center"}
            >
              <MdLocalShipping />
              <Text>Thank You For Choosing us</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
      <HotelFooter />
    </>
  );
}

export default HotelDetails;
