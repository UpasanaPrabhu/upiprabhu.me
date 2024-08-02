import React, { FunctionComponent } from 'react'

import { Button, Flex, Heading, HeadingProps } from '@chakra-ui/react'
import Link from 'next/link'
import { ArrowForwardIcon } from '@chakra-ui/icons'

type SectionHeaderProps = {
  title: String
  seeMoreLink?: string
}

const SectionHeader: FunctionComponent<SectionHeaderProps & HeadingProps> = ({ title, seeMoreLink, ...rest }) => (
  <Flex my={4} justify="space-between" align="center" alignItems="center">
    <Heading size="md" my={4} {...rest}>
      {title}
    </Heading>
    {seeMoreLink &&
      <Link href={seeMoreLink}>
        <Button variant="ghost" rightIcon={<ArrowForwardIcon />}>
          See More
        </Button>
      </Link>
    }
  </Flex>
)

export default SectionHeader