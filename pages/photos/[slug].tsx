import React, { useState } from 'react'
import { Image, Heading, Box, Button, Container } from "@chakra-ui/react"
import NextLink from 'next/link'
import Lightbox from 'react-image-lightbox'
import Gallery, { PhotoProps, RenderImageProps } from 'react-photo-gallery'
import 'react-image-lightbox/style.css'
import Layout from '../../components/Layout'
import { ChevronLeftIcon } from '@chakra-ui/icons'

// Only initialize Flickr if API key exists
const Flickr = require('flickr-sdk');
const flickr = process.env.FLICKR_API_KEY ? new Flickr(process.env.FLICKR_API_KEY) : null;

function Home({ title, photos, sizes }){
  const PAGE_SIZE = 20
  
  // Handle empty photos gracefully
  if (!photos || photos.length === 0) {
    return (
      <Layout title="Photos" wide className="chakra-scope">
        <Container maxW="container.lg">
          <NextLink href="/photos">
            <Button mt={6} mb={2} leftIcon={<ChevronLeftIcon/>} size="sm">Back to Photos</Button>
          </NextLink>
          <Heading mb={6}>No photos available</Heading>
        </Container>
      </Layout>
    )
  }

  const thumbnailURLs = photos.map(photo => sizes[photo.id]?.[6]?.source).filter(Boolean)
  const lightboxURLs = photos.map(photo => sizes[photo.id]?.[10]?.source).filter(Boolean)

  const [loadMoreEnabled, setLoadMoreEnabled] = useState(thumbnailURLs.length > PAGE_SIZE)
  const [numShownPhotos, setNumShownPhotos] = useState(PAGE_SIZE)
  const [isOpen, setIsOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(-1);

  const openModal = (index) => {
    setCurrentPhoto(index);
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const galleryLinks = ():PhotoProps[] => {
    const links = photos.slice(0, numShownPhotos).map(photo => ({
      src: sizes[photo.id]?.[6]?.source || '',
      width: sizes[photo.id]?.[6]?.width || 100,
      height: sizes[photo.id]?.[6]?.height || 100
    })).filter(link => link.src)

    return links
  }

  const loadNextPhotos = () => {
    if (numShownPhotos + PAGE_SIZE >= thumbnailURLs.length) {
      setLoadMoreEnabled(false);
    }

    setNumShownPhotos(Math.min(numShownPhotos+PAGE_SIZE, thumbnailURLs.length));
  }

  const imageRenderer:React.FC<RenderImageProps> = ({ photo, margin, direction, index, top, left }) => {
    const cont:any = {
      cursor: "pointer",
      overflow: "hidden",
      position: "relative"
    };

    if (direction === "column") {
      cont.position = "absolute";
      cont.left = left;
      cont.top = top;
    }

    return(
      <Box
        rounded="lg"
        style={{ margin, height: photo.height, width: photo.width, ...cont }}
        transition="all .25s ease-in-out"
        _hover={{transform: "scale(1.006)"}}
        onClick={() => openModal(index)}>
          <Image
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            key={photo.key}
            srcSet={photo.srcSet as string}
            sizes={photo.sizes as string}
          />
      </Box>
    )
  }

  return (
    <Layout title={`${title}`} wide className="chakra-scope">
      <Container maxW="container.lg">
        <NextLink href="/photos">
          <Button mt={6} mb={2} leftIcon={<ChevronLeftIcon/>} size="sm">Back to Photos</Button>
        </NextLink>

        <Heading mb={6}>{title}</Heading>

        <Gallery photos={galleryLinks()} direction="row" margin={4} renderImage={imageRenderer}/>

        {isOpen && (
          <Lightbox
            mainSrc={lightboxURLs[currentPhoto]}
            nextSrc={lightboxURLs[(currentPhoto + 1) % lightboxURLs.length]}
            prevSrc={lightboxURLs[(currentPhoto + lightboxURLs.length - 1) % lightboxURLs.length]}
            onCloseRequest={closeModal}
            onMovePrevRequest={() => setCurrentPhoto((currentPhoto-1)%lightboxURLs.length)}
            onMoveNextRequest={() => setCurrentPhoto((currentPhoto+1)%lightboxURLs.length)}
          />
        )}

        <Button onClick={loadNextPhotos} display={loadMoreEnabled ? "block":"none"} mt={8} mb={2} mx="auto">Load More</Button>
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  let title = ""
  let photos = []
  let sizes = {}

  // Skip Flickr API calls if no API key
  if (!flickr) {
    return {
      props: {
        title: "Photos",
        photos: [],
        sizes: {}
      }
    }
  }

  try {
    const infoRes = await flickr.photosets.getInfo({
      user_id: '186196512@N04',
      photoset_id: params.slug
    })

    const photosRes = await flickr.photosets.getPhotos({
      user_id: '186196512@N04',
      photoset_id: params.slug
    })
    title = infoRes.body.photoset.title._content
    photos = photosRes.body.photoset.photo

    const reqs = photos.map(async photo => {
      const sizeRes = await flickr.photos.getSizes({
        photo_id: photo.id
      })
      sizes[photo.id] = sizeRes.body.sizes.size
    })
    await Promise.all(reqs)
  } catch(err) {
    console.error('bonk', err);
  }

  return {
    props: {
      title: title,
      photos,
      sizes
    }
  }
}

export async function getStaticPaths() {
  // Skip if no Flickr API key
  if (!flickr) {
    return { paths: [], fallback: false }
  }

  let photosets = []
  try {
    const res = await flickr.photosets.getList({
      user_id: '186196512@N04'
    })
    photosets = res.body.photosets.photoset
  } catch(err) {
    console.error('bonk', err);
  }

  const paths = photosets.map(photoset => `/photos/${photoset.id}`)

  return { paths, fallback: false }
}

export default Home
