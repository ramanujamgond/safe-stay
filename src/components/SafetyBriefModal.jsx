import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Text,
  Box,
  Heading,
  List,
  ListItem,
  ListIcon,
  Icon,
  Divider,
} from '@chakra-ui/react';
import { FaShieldAlt, FaPhoneAlt, FaMapMarkerAlt, FaLightbulb } from 'react-icons/fa';

const SafetyBriefModal = ({ isOpen, onClose, destination }) => {
  if (!destination) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg="pink.50" display="flex" alignItems="center" gap="2">
          <Icon as={FaShieldAlt} color="pink.600" />
          <Box>
            <Heading size="md">Traveling to {destination.name}?</Heading>
            <Text fontSize="sm" fontWeight="normal" color="gray.600">
              Here's what women travelers should know
            </Text>
          </Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py="6">
          <VStack spacing="4" align="stretch">
            {/* Emergency Contact */}
            <Box>
              <Heading size="sm" mb="2" display="flex" alignItems="center" gap="2">
                <Icon as={FaPhoneAlt} color="pink.600" />
                Emergency Contact
              </Heading>
              <Box bg="pink.50" p="3" borderRadius="md">
                <Text fontWeight="bold">{destination.safetyBrief.emergencyContact}</Text>
              </Box>
            </Box>

            <Divider />

            {/* Nearest Police Station */}
            <Box>
              <Heading size="sm" mb="2" display="flex" alignItems="center" gap="2">
                <Icon as={FaMapMarkerAlt} color="pink.600" />
                Nearest Police Station
              </Heading>
              <Text>{destination.safetyBrief.nearestPoliceStation}</Text>
            </Box>

            <Divider />

            {/* Community Tips */}
            <Box>
              <Heading size="sm" mb="3" display="flex" alignItems="center" gap="2">
                <Icon as={FaLightbulb} color="pink.600" />
                Community Tips from Women Travelers
              </Heading>
              <List spacing="2">
                {destination.safetyBrief.communityTips.map((tip, index) => (
                  <ListItem key={index} display="flex" alignItems="start">
                    <ListIcon as={FaLightbulb} color="pink.500" mt="1" />
                    <Text fontSize="sm">{tip}</Text>
                  </ListItem>
                ))}
              </List>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter bg="gray.50">
          <Button colorScheme="pink" mr={3} onClick={onClose}>
            Got it, thanks!
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SafetyBriefModal;
