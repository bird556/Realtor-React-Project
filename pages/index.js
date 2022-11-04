import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import Property from '../components/Property';
//

const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  linkName,
  buttonText,
  imageUrl,
}) => (
  <Flex
    flexWrap="wrap"
    justifyContent="center"
    alignItems="center"
    m="10"
    mb="5rem"
  >
    {/* Image from API */}
    <Image src={imageUrl} width={500} height={300} alt="banner" />
    {/* Box with "Rent or Buy a Home, Title and Explore more etc" */}
    <Box p="5">
      {/* Rent or Buy Home */}
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      {/* Bigger Title Buy or Rent Home */}
      <Text color="gray.500" fontSize="3xl" fontWeight="bold">
        {title1}
        <br />
        {title2}
      </Text>
      {/* Description..explore villas, homes etc */}
      <Text fontSize="lg" color="gray.700" paddingTop="3" paddingBottom="3">
        {desc1}
        <br />
        {desc2}
      </Text>
      {/* Button */}
      <Button fontSize="xl" padding="5" bg="blue.300" color="white">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

//
export default function Home({ propertiesForSale, propertiesForRent }) {
  console.log(propertiesForRent);
  // console.log(
  //   propertiesForRent.map((item) => {
  //     return console.log(item.price * 0.35861074);
  //   })
  // );
  return (
    <Box>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/170789642/1ce161680fb5454fa83d4c1d450c6031"
      />
      <Flex flexWrap="wrap" justifyContent="center">
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy & Own Your"
        title2="Dream Home"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap" justifyContent="center">
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}
