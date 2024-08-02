import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled from "@emotion/styled";
import Layout from "../../components/Layout";
import ProjectCard from "../../components/ProjectCard";
import { GetStaticProps } from "next";
import { createClient } from "@prismicio/client";
import { Heading } from "@chakra-ui/react";
import Feature from "../../components/Feature";

const WorkTitle = styled("h1")`
    margin-bottom: 1em;
`

const Work = ({ projects, meta }) => (
    <div className="chakra-scope">
        <Helmet
            title={`Work`}
            titleTemplate={`%s | upiprabhu.me`}
            meta={[
                {
                    name: `description`,
                    content: meta.description,
                },
                {
                    property: `og:title`,
                    content: `Work | upiprabhu.me`,
                },
                {
                    property: `og:description`,
                    content: meta.description,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: meta.author,
                },
                {
                    name: `twitter:title`,
                    content: meta.title,
                },
                {
                    name: `twitter:description`,
                    content: meta.description,
                },
            ].concat(meta)}
        />
        <Layout>
            <Heading my={4} size="lg">Projects</Heading>
            {projects.map((project, i) => (
                <Feature
                    key={i}
                    title={project.data.project_title}
                    desc={project.data.project_preview_description}
                    link={`/work/${project.uid}`}
                    imageLink={project.data.project_preview_thumbnail.url}
                    date={project.data.project_post_date}
                    isExternal={false}
                />
            ))}
        </Layout>
    </div>
);

export default Work

Work.propTypes = {
    projects: PropTypes.array.isRequired,
};

export const getStaticProps: GetStaticProps = async () => {
    const client = createClient("upiprabhu")

    const projects = await client.getAllByType('project', {
        orderings: {
            field: 'my.project.project_date',
            direction: 'desc',
        },
    })

    const meta = {
        title: 'Work | Upasana Prabhu',
        description: "Upasana's projects and work",
        author: 'Upasana Prabhu',
    }

    return {
        props: {
            projects,
            meta,
        },
    }
}
