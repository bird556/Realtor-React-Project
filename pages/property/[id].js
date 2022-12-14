import { Box, Flex, Avatar, Text, Spacer } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { millify } from 'millify';
import { baseUrl, fetchApi } from '../../utils/fetchApi';
import ImageScrollbar from '../../components/ImageScrollbar';
const PropertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) => (
  <Box maxWidth="1000px" margin="auto" p="4">
    {photos && <ImageScrollbar data={photos} />}
    <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
      <Flex alignItems="center">
        <Box alignItems="3" color="green.400" mr="5">
          {isVerified && <GoVerified />}
        </Box>
        <Text fontWeight="bold" fontSize="lg">
          CAD ${millify(price * 0.35861074)}{' '}
          {rentFrequency && `/${rentFrequency}`}
        </Text>
      </Flex>
      <Box>
        <Avatar size="sm" src={agency?.logo?.url} />
      </Box>
    </Flex>
    <Flex
      alignItems="center"
      p="1"
      justifyContent="space-between"
      w="250px"
      color="blue.400"
    >
      {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{' '}
      <BsGridFill />
    </Flex>
    <Box marginTop="2">
      <Text fontSize="lg" fontWeight="bold" marginBottom="2">
        {title}
      </Text>
      <Text fontWeight="medium" color="gray.600" lineHeight="2">
        {description}
      </Text>
      <Flex
        flexWrap="wrap"
        textTransform="uppercase"
        justifyContent="space-between"
      >
        <Flex
          justifyContent="space-between"
          w="400px"
          borderBottom="1px"
          borderStartColor="gray.100"
          padding="3"
        >
          <Text>Type</Text>
          <Text fontWeight="bold">{type}</Text>
        </Flex>
        <Flex
          justifyContent="space-between"
          w="400px"
          borderBottom="1px"
          borderStartColor="gray.100"
          padding="3"
        >
          <Text>Purpose</Text>
          <Text fontWeight="bold">{purpose}</Text>
        </Flex>
        <Flex
          justifyContent="space-between"
          w="400px"
          borderBottom="1px"
          borderStartColor="gray.100"
          padding="3"
        >
          <Text>Furnishing Status</Text>
          <Text fontWeight="bold">{furnishingStatus}</Text>
        </Flex>
      </Flex>
      <Box>
        {amenities.length && (
          <Text
            fontSize="2xl"
            fontWeight="black"
            marginTop="5"
            textTransform="capitalize"
          >
            amenities
          </Text>
        )}
        <Flex flexWrap="wrap">
          {amenities.map((item) =>
            item.amenities.map((amenity) => (
              <Text
                fontWeight="bold"
                color="blue.400"
                fontSize="1rem"
                p="2"
                bg="gray.200"
                m="1"
                borderRadius="5"
                cursor="pointer"
                key={amenity.text}
              >
                {amenity.text}
              </Text>
            ))
          )}
        </Flex>
      </Box>
    </Box>
  </Box>
);

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
}
