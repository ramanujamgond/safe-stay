import React, { useState } from "react";
import "./HotelLayout.css";
import {
  Radio,
  RadioGroup,
  Box,
  Heading,
  Stack,
  VStack,
  StackDivider,
  Button,
  ButtonGroup,
  Text,
  Image,
  Checkbox,
  Badge,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { FaShieldAlt, FaExclamationTriangle } from "react-icons/fa";

const HotelLayout = (prop) => {
  console.log(prop);

  const [priceValue, setPriceValue] = useState("");
  const [starValue, setStarValue] = useState("");
  const [propertyValue, setPropertyValue] = useState("");
  const [houseRulesValue, setHouseRulesValue] = useState("");
  const [womenFriendlyOnly, setWomenFriendlyOnly] = useState(false);
  
  // Filter hotels based on women-friendly toggle
  const filteredHotels = womenFriendlyOnly 
    ? prop.DefaultData.filter(hotel => hotel.isWomenFriendly) 
    : prop.DefaultData;
  
  return (
    <div className="HotelLayoutParent">
      <div className="HotelLayoutLeft">
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <Box>
            <Heading as="h4" size="md">
              Sorting & Filtering
            </Heading>
          </Box>
          <Box>
            <Heading as="h5" size="sm" m="3">
              Price Per Night
            </Heading>
            <RadioGroup onChange={setPriceValue} value={priceValue}>
              <Stack direction="column">
                <Radio value="1">₹ 0 - ₹ 2000</Radio>
                <Radio value="2">₹ 2000 - ₹ 3000</Radio>
                <Radio value="3">₹ 3000 - ₹ 4000</Radio>
                <Radio value="4">₹ 4000 - ₹ 5000</Radio>
                <Radio value="5">₹ 5000 - ₹ 6000</Radio>
                <Radio value="6">₹ 6000 - ₹ 7000</Radio>
              </Stack>
            </RadioGroup>
          </Box>

          <Box>
            <Heading as="h5" size="sm" m="3">
              Star Category
            </Heading>
            <RadioGroup onChange={setStarValue} value={starValue}>
              <Stack direction="column">
                <Radio value="1">5 Star</Radio>
                <Radio value="2">4 Star</Radio>
                <Radio value="3">3 Star</Radio>
              </Stack>
            </RadioGroup>
          </Box>

          <Box>
            <Heading as="h5" size="sm" m="3">
              Property Type
            </Heading>

            <RadioGroup onChange={setPropertyValue} value={propertyValue}>
              <Stack direction="column">
                <Radio value="1">Hotel</Radio>
                <Radio value="2">Apartment</Radio>
                <Radio value="3">Villa</Radio>
                <Radio value="4">HomeStay</Radio>
                <Radio value="5">Resort</Radio>
              </Stack>
            </RadioGroup>
          </Box>

          <Box>
            <Heading as="h5" size="sm" m="3">
              House Rules
            </Heading>
            <RadioGroup onChange={setHouseRulesValue} value={houseRulesValue}>
              <Stack direction="column">
                <Radio value="1">Pets Allowed</Radio>
                <Radio value="2">Unmarried Couples Allowed</Radio>
                <Radio value="3">Bachelors Allowed</Radio>
                <Radio value="4">Alcohol Allowed</Radio>
                <Radio value="5">Smoking Allowed</Radio>
              </Stack>
            </RadioGroup>
          </Box>
          
          <Box bg="pink.50" p="4" borderRadius="md" border="2px solid" borderColor="pink.200">
            <Heading as="h5" size="sm" mb="3" color="pink.700">
              🛡️ SafeStay for Her
            </Heading>
            <Checkbox 
              isChecked={womenFriendlyOnly} 
              onChange={(e) => setWomenFriendlyOnly(e.target.checked)}
              colorScheme="pink"
              size="md"
            >
              <Text fontWeight="semibold">Show Women-Friendly Hotels Only</Text>
            </Checkbox>
            <Text fontSize="xs" color="gray.600" mt="2">
              Hotels with female staff, safety measures, and verified by women travelers
            </Text>
          </Box>
          
          <Box>
            <ButtonGroup variant="outline" spacing="6">
              <RouteLink to="/hotel">
                <Button colorScheme="blue">Back To Top</Button>
              </RouteLink>
            </ButtonGroup>
          </Box>
        </VStack>
      </div>
      <div className="HotelLayoutRight">
        {filteredHotels.map((el) => {
          return (
            <div className="HotelCard" key={el.id}>
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                p="2"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src={el.image}
                  alt="Image Not Loading"
                />

                <Stack w="70%">
                  <CardBody>
                    <Flex gap="2" mb="2" flexWrap="wrap">
                      <Box bg="blue.100" borderRadius="2" p="1px" px="2">
                        Rating : {el.rating}
                      </Box>
                      
                      {/* Women Safety Score Badge */}
                      {el.womenSafetyScore && (
                        <Badge 
                          colorScheme={
                            el.womenSafetyScore.tier === 'safe' ? 'green' : 
                            el.womenSafetyScore.tier === 'moderate' ? 'yellow' : 'red'
                          }
                          fontSize="sm"
                          px="2"
                          py="1"
                          borderRadius="md"
                          display="flex"
                          alignItems="center"
                          gap="1"
                        >
                          <Icon as={FaShieldAlt} />
                          {el.womenSafetyScore.badge}
                        </Badge>
                      )}
                      
                      {/* Women-Friendly Certified Badge */}
                      {el.womenFriendlyCertified && (
                        <Badge 
                          colorScheme="pink"
                          fontSize="sm"
                          px="2"
                          py="1"
                          borderRadius="md"
                        >
                          ✓ Women-Friendly Certified
                        </Badge>
                      )}
                    </Flex>
                    
                    <Heading size="md">{el.name}</Heading>
                    <Text py="2">{el.place}</Text>
                    <Heading size="sm" bg="gray.100" p="1" borderRadius="5px">
                      {el.description}
                    </Heading>
                    
                    {/* Group Booking Alert */}
                    {el.groupBookingAlert && (
                      <Box 
                        mt="2" 
                        p="2" 
                        bg="orange.50" 
                        borderRadius="md" 
                        border="1px solid" 
                        borderColor="orange.200"
                        display="flex"
                        alignItems="center"
                        gap="2"
                      >
                        <Icon as={FaExclamationTriangle} color="orange.500" />
                        <Text fontSize="sm" color="orange.700">
                          {el.groupBookingAlert.message}
                        </Text>
                      </Box>
                    )}
                    
                    <Box>
                      <Text mt="2" color="green">
                        {el.additional}
                      </Text>
                    </Box>
                  </CardBody>
                </Stack>
                <Stack bg="blue.100" borderRadius="5" w="25%">
                  <CardBody m="auto">
                    <Heading size="lg">₹ {el.price}</Heading>
                    <Text size="sm">+ ₹ {el.taxes} Taxes & Fees</Text>
                  </CardBody>
                  <CardFooter>
                    <RouteLink to={`/hotel/${el.id}`} style={{ width: '100%' }}>
                      <Button variant="solid" colorScheme="blue" width="100%">
                        View Details
                      </Button>
                    </RouteLink>
                  </CardFooter>
                </Stack>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HotelLayout;
