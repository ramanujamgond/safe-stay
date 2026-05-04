import React from 'react';
import {
  Box,
  VStack,
  Text,
  Heading,
  Icon,
  Button,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaExclamationTriangle, FaShieldAlt } from 'react-icons/fa';

const LocationAlertNudge = ({ isOpen, onClose, hotelName, place, isOffbeat }) => {
  if (!isOpen || !isOffbeat) return null;

  return (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      bg="white"
      boxShadow="2xl"
      borderRadius="lg"
      p="6"
      maxW="500px"
      w="90%"
      border="3px solid"
      borderColor="orange.400"
      zIndex="2000"
    >
      <VStack spacing="4" align="stretch">
        <Flex alignItems="center" gap="3">
          <Icon as={FaMapMarkerAlt} color="orange.500" boxSize="32px" />
          <Heading size="md" color="orange.700">
            Offbeat Location Alert
          </Heading>
        </Flex>
        
        <Alert status="warning" borderRadius="md">
          <AlertIcon as={FaExclamationTriangle} />
          <Box>
            <AlertTitle fontSize="sm">Remote Destination</AlertTitle>
            <AlertDescription fontSize="xs">
              {place} is an offbeat location with limited connectivity
            </AlertDescription>
          </Box>
        </Alert>
        
        <Box bg="blue.50" p="4" borderRadius="md">
          <Text fontSize="sm" fontWeight="semibold" mb="2" display="flex" alignItems="center" gap="2">
            <Icon as={FaShieldAlt} color="blue.600" />
            Safety Tips for {place.split(',')[0]}
          </Text>
          <VStack align="stretch" spacing="2" fontSize="xs">
            <Text>✓ Download offline maps before arrival</Text>
            <Text>✓ Share your location with family/friends</Text>
            <Text>✓ Check hotel's women safety score</Text>
            <Text>✓ Arrive before sunset when possible</Text>
            <Text>✓ Keep emergency contacts handy</Text>
          </VStack>
        </Box>
        
        <Text fontSize="xs" color="gray.600" textAlign="center">
          MMT 24/7 Safety Helpline: 1800-123-4567
        </Text>
        
        <Flex gap="2">
          <Button 
            colorScheme="orange" 
            flex="1"
            onClick={onClose}
          >
            I Understand
          </Button>
          <Button 
            variant="outline" 
            colorScheme="gray" 
            flex="1"
            onClick={() => {
              onClose();
              window.history.back();
            }}
          >
            Go Back
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default LocationAlertNudge;
