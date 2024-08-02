import { Box, Container } from '@chakra-ui/react'
import Navigation from '../Navigation'
import Footer from '../Footer'

const Layout = ({children, wide=false, headerOffset=true, ...rest}) => {
  return (
    <Box {...rest}>
      <Navigation offset={headerOffset} wide={wide} />
      <Container maxW={wide ? 'container.lg' : 'container.md'}>
        {children}
      </Container>
      <Footer wide={wide} />
    </Box>
  )
}

export default Layout