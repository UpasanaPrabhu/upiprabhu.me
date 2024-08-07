import React from 'react'
import { Stack, StackProps, Link, Box } from '@chakra-ui/react'
import { FiTwitter, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { IconType } from 'react-icons'

interface SocialIconLinkProps {
  Icon: IconType,
  link: string
}

const SocialIconLink = ({Icon, link, ...rest}:SocialIconLinkProps&StackProps) => (
  <Box
    transition="all .15s ease-in-out"
    _hover={{transform: "scale(1.05)"}}
    {...rest}>

    <Link href={link} isExternal>
      <Icon />
    </Link>
  </Box>
)

const SocialIcons = (props: StackProps) => (
  <Stack isInline fontSize="2em" {...props}>
    <SocialIconLink Icon={FiTwitter} link="https://x.com/upiprabhu" />
    <SocialIconLink Icon={FiLinkedin} link="https://www.linkedin.com/in/upasana-prabhu-51960831/" mx={2}/>
    <SocialIconLink Icon={FiMail} link="mailto:upiprabhu@gmail.com" mx={2}/>
  </Stack>
)

export default SocialIcons
