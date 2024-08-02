import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled from "@emotion/styled";
import Layout from "../../components/Layout";
import ProjectCard from "../../components/ProjectCard";
import { GetStaticProps } from "next";
import { createClient } from "@prismicio/client";

const WorkTitle = styled("h1")`
    margin-bottom: 1em;
`

const Work = ({ projects, meta }) => (
    <>
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
            <WorkTitle>
                Work
            </WorkTitle>
            <>
                {projects.map((project, i) => (
                    <ProjectCard
                        key={i}
                        category={project.node.project_category}
                        title={project.node.project_title}
                        description={project.node.project_preview_description}
                        thumbnail={project.node.project_preview_thumbnail}
                        uid={project.node._meta.uid}
                    />
                ))}
            </>
        </Layout>
    </>
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
            projects: projects.map(project => ({
                node: {
                    project_title: project.data.project_title,
                    project_preview_description: project.data.project_preview_description,
                    project_preview_thumbnail: project.data.project_preview_thumbnail,
                    project_category: project.data.project_category,
                    project_post_date: project.data.project_post_date,
                    _meta: {
                        uid: project.uid
                    }
                }
            })),
            meta,
        },
    }
}
