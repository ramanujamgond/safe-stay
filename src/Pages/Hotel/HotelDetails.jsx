import {
  Box,
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
  List,
  ListItem,
  HStack,
  Badge,
  Icon,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaShieldAlt, FaUserFriends, FaUsers, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
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
import hotelData from "../../db.json";
import SafetyBriefModal from "../../components/SafetyBriefModal";
import LocationAlertNudge from "../../components/LocationAlertNudge";

function HotelDetails({ person }) {
  const [singleHotel, setSingleHotel] = useState([]);
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isSafetyBriefOpen, onOpen: onSafetyBriefOpen, onClose: onSafetyBriefClose } = useDisclosure();
  const { isOpen: isLocationAlertOpen, onOpen: onLocationAlertOpen, onClose: onLocationAlertClose } = useDisclosure();
  const [showSafetyPing, setShowSafetyPing] = useState(false);

  // Call all hooks at the top level
  const yellowColor = useColorModeValue("yellow.500", "yellow.300");
  const grayColor = useColorModeValue("gray.500", "gray.400");
  const textColor = useColorModeValue("gray.900", "gray.400");
  const dividerColor = useColorModeValue("gray.200", "gray.600");

  const { isAuth } = useSelector((store) => {
    console.log(store);
    return {
      isAuth: store.LoginReducer.isAuth,
    };
  });

  const SingleData = () => {
    const hotel = hotelData.hotel.find(h => h.id === parseInt(id));
    if (hotel) {
      setSingleHotel(hotel);
      // Show location alert immediately for offbeat destinations
      if (hotel.isOffbeat) {
        setTimeout(() => onLocationAlertOpen(), 500);
      }
      // Auto-show safety brief for offbeat destinations (after location alert)
      if (hotel.isOffbeat) {
        setTimeout(() => onSafetyBriefOpen(), 1000);
      }
    }
  };

  useEffect(() => {
    SingleData();
  }, []);

  // Get destination data for safety brief
  const destinationData = singleHotel.place ? 
    hotelData.destinations.find(d => singleHotel.place.includes(d.name.split(',')[0])) : 
    null;

  // Simulate post-booking safety ping (show after 3 seconds of "booking")
  const handleProceedToPayment = () => {
    onOpen();
    // Simulate booking completion and show safety ping
    setTimeout(() => {
      onClose();
      setShowSafetyPing(true);
    }, 3000);
  };

  const {
    image,
    img1,
    img2,
    img3,
    img4,
    name,
    place,
    description,
    additional,
    taxes,
    price,
    womenSafetyScore,
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
                color={textColor}
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
                    <img width="100%" src={img1} alt="Hotel view 1" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img width="100%" src={img2} alt="Hotel view 2" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img width="100%" src={img3} alt="Hotel view 3" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img width="100%" src={img4} alt="Hotel view 4" />
                  </Carousel.Item>
                </Carousel>
              </Box>
            </HStack>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={dividerColor}
                />
              }
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text
                  color={grayColor}
                  fontSize={"2xl"}
                  fontWeight={"300"}
                >
                  {additional}
                </Text>
                <Text fontSize={"lg"}>{description}</Text>
              </VStack>
              
              {/* Room Safety Indicators */}
              {singleHotel.roomSafetyFeatures && (
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={yellowColor}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    🔒 Room Safety Features
                  </Text>
                  <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3}>
                    <Box bg={singleHotel.roomSafetyFeatures.doorLockType?.includes("Electronic") ? "green.50" : "gray.50"} p="3" borderRadius="md" textAlign="center">
                      <Text fontSize="2xl" mb="1">🔐</Text>
                      <Text fontSize="xs" fontWeight="semibold">{singleHotel.roomSafetyFeatures.doorLockType || "Standard Lock"}</Text>
                    </Box>
                    <Box bg={singleHotel.roomSafetyFeatures.cctvInCorridors ? "green.50" : "gray.50"} p="3" borderRadius="md" textAlign="center">
                      <Text fontSize="2xl" mb="1">📹</Text>
                      <Text fontSize="xs" fontWeight="semibold">CCTV {singleHotel.roomSafetyFeatures.cctvInCorridors ? "✓" : "✗"}</Text>
                    </Box>
                    <Box bg={singleHotel.roomSafetyFeatures.doorEye ? "green.50" : "gray.50"} p="3" borderRadius="md" textAlign="center">
                      <Text fontSize="2xl" mb="1">👁️</Text>
                      <Text fontSize="xs" fontWeight="semibold">Door Eye {singleHotel.roomSafetyFeatures.doorEye ? "✓" : "✗"}</Text>
                    </Box>
                    <Box bg={singleHotel.roomSafetyFeatures.doorChain ? "green.50" : "gray.50"} p="3" borderRadius="md" textAlign="center">
                      <Text fontSize="2xl" mb="1">⛓️</Text>
                      <Text fontSize="xs" fontWeight="semibold">Door Chain {singleHotel.roomSafetyFeatures.doorChain ? "✓" : "✗"}</Text>
                    </Box>
                    <Box bg={singleHotel.roomSafetyFeatures.fullLengthMirror ? "green.50" : "gray.50"} p="3" borderRadius="md" textAlign="center">
                      <Text fontSize="2xl" mb="1">🪞</Text>
                      <Text fontSize="xs" fontWeight="semibold">Full Mirror {singleHotel.roomSafetyFeatures.fullLengthMirror ? "✓" : "✗"}</Text>
                    </Box>
                    <Box bg={singleHotel.roomSafetyFeatures.emergencyButton ? "green.50" : "gray.50"} p="3" borderRadius="md" textAlign="center">
                      <Text fontSize="2xl" mb="1">🚨</Text>
                      <Text fontSize="xs" fontWeight="semibold">Emergency Button {singleHotel.roomSafetyFeatures.emergencyButton ? "✓" : "✗"}</Text>
                    </Box>
                  </SimpleGrid>
                </Box>
              )}
              
              {/* Neighborhood Safety & Check-in Time */}
              {(singleHotel.neighborhoodSafety || singleHotel.checkInSafety) && (
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={yellowColor}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    📍 Location & Timing Safety
                  </Text>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {singleHotel.neighborhoodSafety && (
                      <Box bg="blue.50" p="4" borderRadius="md">
                        <Text fontWeight="bold" mb="2">Neighborhood Safety</Text>
                        <VStack align="stretch" spacing="2" fontSize="sm">
                          <Text>🚶 Walk Score: {singleHotel.neighborhoodSafety.walkScore}/100</Text>
                          <Text>🚌 Transit Score: {singleHotel.neighborhoodSafety.transitScore}/100</Text>
                          <Text>💡 Well-lit: {singleHotel.neighborhoodSafety.wellLit ? "Yes" : "Limited"}</Text>
                          <Text>🏪 24hr Store: {singleHotel.neighborhoodSafety.nearest24hrStore}</Text>
                          <Text>🏥 Hospital: {singleHotel.neighborhoodSafety.nearestHospital}</Text>
                        </VStack>
                      </Box>
                    )}
                    {singleHotel.checkInSafety && (
                      <Box bg={singleHotel.checkInSafety.lateArrivalWarning ? "orange.50" : "green.50"} p="4" borderRadius="md">
                        <Text fontWeight="bold" mb="2">Check-in Timing</Text>
                        <VStack align="stretch" spacing="2" fontSize="sm">
                          <Text>⏰ Recommended: {singleHotel.checkInSafety.recommendedTime}</Text>
                          {singleHotel.checkInSafety.lateArrivalWarning && (
                            <Alert status="warning" fontSize="xs" p="2">
                              <AlertIcon />
                              Late arrivals not recommended for safety
                            </Alert>
                          )}
                        </VStack>
                      </Box>
                    )}
                  </SimpleGrid>
                </Box>
              )}
              
              {/* Travel Buddy Info */}
              {singleHotel.travelBuddyInfo && (
                <Box bg="purple.50" p="4" borderRadius="md" border="1px solid" borderColor="purple.200">
                  <Text fontWeight="bold" mb="2" display="flex" alignItems="center" gap="2">
                    👥 Solo Women Travelers
                  </Text>
                  <Text fontSize="sm">
                    {singleHotel.travelBuddyInfo.soloWomenThisWeek} solo women staying this week • 
                    {singleHotel.travelBuddyInfo.soloWomenThisMonth} this month
                  </Text>
                  <Text fontSize="xs" color="gray.600" mt="2">
                    You won't be alone - connect with other women travelers!
                  </Text>
                </Box>
              )}
              
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
                  color={yellowColor}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  🆘 Emergency Contacts
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                  <Button 
                    colorScheme="red" 
                    size="lg" 
                    leftIcon={<Text fontSize="xl">🚨</Text>}
                    onClick={() => alert('Emergency: 112\nWomen Helpline: 1091\nMMT 24/7 Support: 1800-123-4567')}
                  >
                    Emergency Services
                  </Button>
                  <Button 
                    colorScheme="pink" 
                    size="lg" 
                    leftIcon={<Text fontSize="xl">📞</Text>}
                    onClick={() => alert('MMT 24/7 Safety Helpline: 1800-123-4567\nLocal Police: Check Safety Brief')}
                  >
                    MMT Safety Helpline
                  </Button>
                </SimpleGrid>
              </Box>
              
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={yellowColor}
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
                  color={yellowColor}
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
                onClick={handleProceedToPayment}
                rounded={"none"}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
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
                onClick={handleProceedToPayment}
                rounded={"none"}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
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
      
      {/* Location Alert Nudge for Offbeat Destinations */}
      <LocationAlertNudge 
        isOpen={isLocationAlertOpen} 
        onClose={onLocationAlertClose} 
        hotelName={name}
        place={place}
        isOffbeat={singleHotel.isOffbeat}
      />
      
      {/* Safety Brief Modal for Offbeat Destinations */}
      {destinationData && (
        <SafetyBriefModal 
          isOpen={isSafetyBriefOpen} 
          onClose={onSafetyBriefClose} 
          destination={destinationData} 
        />
      )}
      
      {/* Post Check-in Safety Ping */}
      {showSafetyPing && (
        <Box
          position="fixed"
          bottom="20px"
          right="20px"
          bg="white"
          boxShadow="2xl"
          borderRadius="lg"
          p="6"
          maxW="400px"
          border="2px solid"
          borderColor="pink.200"
          zIndex="1000"
        >
          <VStack spacing="3" align="stretch">
            <Flex alignItems="center" gap="2">
              <Icon as={FaShieldAlt} color="pink.600" boxSize="24px" />
              <Heading size="md">You've checked in!</Heading>
            </Flex>
            <Text fontSize="sm" color="gray.600">
              You've checked in to {name}. Feeling safe?
            </Text>
            <Flex gap="2">
              <Button 
                colorScheme="green" 
                flex="1" 
                leftIcon={<Icon as={FaCheckCircle} />}
                onClick={() => setShowSafetyPing(false)}
              >
                ✅ All Good
              </Button>
              <Button 
                colorScheme="red" 
                flex="1" 
                leftIcon={<Icon as={FaExclamationTriangle} />}
                onClick={() => {
                  alert('Your concern has been flagged. MMT Safety Team will contact you shortly.');
                  setShowSafetyPing(false);
                }}
              >
                🚩 Flag Concern
              </Button>
            </Flex>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setShowSafetyPing(false)}
            >
              Dismiss
            </Button>
          </VStack>
        </Box>
      )}
      
      <HotelFooter />
    </>
  );
}

export default HotelDetails;
