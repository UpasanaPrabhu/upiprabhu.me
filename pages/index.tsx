import styled from '@emotion/styled'
import { createClient } from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Feature from '../components/Feature'
import Layout from '../components/Layout'
import SectionHeader from '../components/SectionHeader'
import colors from '../styles/colors'
import dimensions from '../styles/dimensions'

const Hero = styled('div')`
  padding-top: 2em;
  padding-bottom: 2em;

  h1 {
    font-size: 2em;
    line-height: 1.45;
    font-weight: 800;

    @media(max-width:${dimensions.maxwidthTablet}px) {
        font-size: 2.25em;
    }

    @media(max-width:${dimensions.maxwidthMobile}px) {
        font-size: 2em;
    }
        
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

export default function Home({ home, projects, meta, posts }) {
  return (
    <Layout className='chakra-scope' home={home}>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>

      <Hero>
        <PrismicRichText field={home.hero_title} />
      </Hero>

      <SectionHeader title="Projects" seeMoreLink='/work' />
      {
        projects.map((project, i) => {
          return (
            <Feature 
              key={i}
              title={project.data.project_title}
              desc={project.data.project_preview_description}
              link={`/work/${project.uid}`}
              imageLink={project.data.project_preview_thumbnail.url}
              date={project.data.project_post_date}
              isExternal={false}
            />
          )
        })
      }

      <SectionHeader title="Blog Posts" seeMoreLink='/blog' />
      {
        posts.map((post, i) => {
          return (
            <Feature 
              key={i}
              title={post.data.post_title}
              desc={post.data.post_preview_description}
              link={`/blog/${post.uid}`}
              imageLink={post.data.post_hero_image.url}
              date={post.data.post_date}
              isExternal={false}
            />
          )
        })
      }
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient("upiprabhu")

  const home = await client.getSingle('homepage')
  const projects = await client.getAllByType('project', {
    orderings: {
      field: 'my.project.project_post_date',
      direction: 'desc',
    },
    limit: 3,
  })

  const posts = await client.getAllByType('post', {
    orderings: {
      field: 'my.post.post_date',
      direction: 'desc',
    },
    limit: 3,
  })

  const meta = {
    title: 'Upasana Prabhu',
    description: "Upasana's personal website to showcase projects and experiences",
    author: 'Upasana Prabhu',
  }

  return {
    props: {
      home: home.data,
      projects: projects,
      posts: posts,
      meta,
    },
  }
}