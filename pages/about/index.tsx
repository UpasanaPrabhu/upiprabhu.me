import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { createClient } from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import styled from '@emotion/styled'
import About from '../../components/About'
import Layout from '../../components/Layout'
import colors from '../../styles/colors'
import dimensions from '../../styles/dimensions'
import { Heading } from '@chakra-ui/react'

const Hero = styled('div')`
  padding-top: 1em;
  padding-bottom: 1em;
  max-width: 830px;

  @media(max-width:${dimensions.maxwidthMobile}px) {
    margin-bottom: 3em;
  }

  h1 {
    a {
      text-decoration: none;
      transition: all 100ms ease-in-out;

      &:nth-of-type(1) { color: ${colors.blue500}; }
      &:nth-of-type(2) { color: ${colors.orange500}; }
      &:nth-of-type(3) { color: ${colors.purple500}; }
      &:nth-of-type(4) { color: ${colors.green500}; }
      &:nth-of-type(5) { color: ${colors.teal500}; }

      &:hover {
        cursor: pointer;
        transition: all 100ms ease-in-out;

        &:nth-of-type(1) { color: ${colors.blue600}; background-color: ${colors.blue200};}
        &:nth-of-type(2) { color: ${colors.orange600}; background-color: ${colors.orange200};}
        &:nth-of-type(3) { color: ${colors.purple600}; background-color: ${colors.purple200};}
        &:nth-of-type(4) { color: ${colors.green600}; background-color: ${colors.green200};}
        &:nth-of-type(5) { color: ${colors.teal600}; background-color: ${colors.teal200};}
      }
    }
  }
`

const Section = styled('div')`
  margin-bottom: 10em;
  display: flex;
  flex-direction: column;

  @media(max-width:${dimensions.maxwidthTablet}px) {
    margin-bottom: 4em;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`

const WorkAction = styled(Link)`
  font-weight: 600;
  text-decoration: none;
  color: currentColor;
  transition: all 150ms ease-in-out;
  margin-left: auto;

  @media(max-width:${dimensions.maxwidthTablet}px) {
    margin: 0 auto;
  }

  span {
    margin-left: 1em;
    transform: translateX(-8px);
    display: inline-block;
    transition: transform 400ms ease-in-out;
  }

  &:hover {
    color: ${colors.blue500};
    transition: all 150ms ease-in-out;

    span {
      transform: translateX(0px);
      opacity: 1;
      transition: transform 150ms ease-in-out;
    }
  }
`

export default function Home({ home, projects, meta }) {
  return (
    <Layout>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>

      <Section>
        <Heading>
          {home.about_title[0].text}
        </Heading>
        <About
          bio={home.about_bio}
        />
      </Section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient("upiprabhu")

  const home = await client.getSingle('homepage')
  const projects = await client.getAllByType('project', {
    orderings: {
      field: 'my.project.date',
      direction: 'desc',
    },
  })
  const meta = {
    title: 'Upasana Prabhu',
    description: "Upasana's personal website to showcase projects and experiences",
    author: 'Upasana Prabhu',
  }

  return {
    props: {
      home: home.data,
      projects: projects.map(p => p.data),
      meta,
    },
  }
}