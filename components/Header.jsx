import React from "react";
import styled from "@emotion/styled";
import colors from "../styles/colors";
import dimensions from "../styles/dimensions";
import Link from "next/link"

const HeaderContainer = styled("div")`
    padding-top: 1em;
    padding-bottom: 1em;
`

const HeaderContent = styled("div")`
    display: flex;
    justify-content: space-between;
`

const LogoLink = styled("div")`
    a {
        color: currentColor;
        text-decoration: none;

        &:hover {
            color: ${colors.blue500};
            transition: 100ms ease-in-out background;
        }
    }
`

const HeaderLinks = styled("div")`
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-gap: 7em;
    justify-content: flex-end;
    width: 100%;
    max-width: 200px;

    @media(max-width: ${dimensions.maxwidthTablet}px) {
        grid-gap: 5.5em;
    }

    @media(max-width: ${dimensions.maxwidthMobile}px) {
        grid-gap: 2.5em;
    }

    a {
        color: currentColor;
        text-decoration: none;
        border-bottom: 3px solid transparent;
        font-weight: 600;
        font-size: 0.95em;
        height: 100%;
        padding-bottom: 1.25em;
        padding-top: 0.25em;
        display: block;
        position: relative;

        &:after {
            position: absolute;
            content: "";
            bottom: 0;
            width: 18px;
            height: 3px;
            background: transparent;
            bottom: -3px;
            right: 50%;
            margin-right: -9px;
            transition: 100ms ease-in-out background;
        }

        &:hover {
            &:after {
                background: ${colors.blue500};
                transition: 100ms ease-in-out background;
            }
        }

        &.Link--is-active {
            &:after {
                background: ${colors.blue500};
                transition: 100ms ease-in-out background;
            }
        }
    }
`

const Header = () => (
    <HeaderContainer>
        <HeaderContent>
            <LogoLink>
                <Link href="/">
                    <h3>upasana</h3>
                </Link>
            </LogoLink>

            <HeaderLinks>
                <Link
                    activeClassName="Link--is-active"
                    href="/work">
                    Work
                </Link>
                <Link
                    activeClassName="Link--is-active"
                    href="/blog">
                    Blog
                </Link>
            </HeaderLinks>
        </HeaderContent>
    </HeaderContainer>
)

export default Header;