import React from "react"
import "./Library/styles.scss"
import SEO from "./Library/Page-settings/seo"
import styled from "styled-components"

import Row from "./Library/Layout/Row"
import Layout from "./Library/Layout/layout"
import Col from "./Library/Layout/Column"
import Grid from "./Library/Layout/Grid"
import Container from "./Library/Layout/Container"

import Link from "./Library/components/Link"
import Divider from "./Library/components/Divider"
import Button from "./Library/components/Button"
import Image from "./Library/components/Image"
import Heading from "./Library/components/Heading"
import Text from "./Library/components/Text"
// import Video from "./Library/components/Video"

import Input from "./Library/components/Form/Inputs/Input"
import Checkbox from "./Library/components/Form/Inputs/Checkbox"
import Radio from "./Library/components/Form/Inputs/Radio"

import ColorPicker from "./Library/components/Form/Inputs/ColorPicker"
import DateSelect from "./Library/components/Form/Inputs/DatePicker"
import Tel from "./Library/components/Form/Inputs/Tel"
import Select from "./Library/components/Form/Inputs/Select"
import Accordion from "./Library/components/Accordion"
import Tabs from "./Library/components/Tabs"
import Progress from "./Library/components/Progress"
import Modal from "./Library/components/Modal"
import Sticky from "./Library/components/Sticky"
import PageProgress from "./Library/components/PageProgress"
import MasonryGrid from "./Library/Layout/MasonryGrid"
import Slider from "./LIbrary/components/Slider"
import Cart from "./Library/Layout/Store/Cart/Cart"
import Products from "./Library/Layout/Store/Products"
import StoreProvider from "./Library/Layout/Store/Context/StoreProvider"
import Checkout from "./Library/Layout/Store/Cart/Checkout"

let StyledBackground = styled.div`
  background: linear-gradient(to bottom, #f9fbfd 0, #fff 100%);
`

export default ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <Container>
      <Grid
        divided
        celled
        padded
        columns={3}
        relaxed
        centered
        verticalAlign="center"
      >
        <Row textAlign="center">
          <Col verticalAlign="top" width={8}>
            <Link to="/">
              <h4 className="mt-3">Store</h4>
            </Link>
          </Col>

        </Row>
        {/* content */}
        <Image src={data.file.childImageSharp.fluid} />
        {/* <Video video="https://www.youtube.com/watch?v=HRcrDJjzJnI" />
              <Video video="https://www.youtube.com/watch?v=6MyO-y7CLL4" />
              <Video video="https://www.dailymotion.com/video/x7snkqj" />
              <Video video="https://vimeo.com/377444411" /> */}
        <Divider direction="vertical">Text</Divider>
        <Button to={"/"}>Internal</Button>
        <Button to={"https://google.com"}>External</Button>
        <Heading heading="h1">Heading 1</Heading>
        <Heading heading="h2">Heading 2</Heading>
        <Heading heading="h3">Heading 3</Heading>
        <Heading heading="h4">Heading 4</Heading>
        <Heading heading="h5">Heading 5</Heading>
        <Heading heading="h6">Heading 6</Heading>
        <Heading heading="p">Heading P</Heading>
        <Text>
          <ul>
            <li>Heading P</li>
            <li>Heading P</li>
            <li>Heading P</li>
            <li>Heading P</li>
          </ul>
        </Text>

        {/* Forms */}
        <Input type="email" label="Email" placeholder="Email placeholder" />
        <Input
          type="password"
          label="Password"
          placeholder="Password placeholder"
        />
        <Input type="text" label="Text" placeholder="Text placeholder" />
        <Checkbox label="Checkbox" />
        <Radio name="contact" label="Radio Field" />
        <Radio name="contact" disabled label="Radio Field" />
        <ColorPicker />
        <DateSelect />
        <Tel />
        <Select searchable multiselect title="Title" />

        {/* Specials */}
        <Accordion label="label">
          <Heading heading="h3">Heading 3</Heading>
          <Heading heading="h4">Heading 4</Heading>
          <Heading heading="h5">Heading 5</Heading>
        </Accordion>

        <Tabs selected={1}>
          <div title="first">This is the first panel</div>
          <div title="second">This is the second panel</div>
          <div title="third">This is the third panel</div>
        </Tabs>
        <Progress percent={60} color="blue" />
        <Modal>
          <Heading heading="h4">Heading 4</Heading>
        </Modal>
        <Sticky fixed top right from={300}>
          <Heading heading="h3">this is sticky</Heading>
        </Sticky>
        <PageProgress />

        <Slider slideCount={1} showCount={3} >
          <div><img src="https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80" /></div>
          <div><img src="https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80" /></div>
          <div><img src="https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80" /></div>
          <div><img src="https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80" /></div>
          <div><img src="https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80" /></div>
          <div><img src="https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80" /></div>
          <div><img src="https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80" /></div>
          <div><img src="https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80" /></div>
          <div><img src="https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80" /></div>
        </Slider>
      </Grid>

      <MasonryGrid columnsLg={4}>
        <div>Masonry item 1</div>
        <div>Masonry item 2</div>
        <div>Masonry item 3</div>
        <div>Masonry item 4</div>
        <div>Masonry item 5</div>
        <div>Masonry item 6</div>
        <div>Masonry item 7</div>
        <div>Masonry item 8</div>
        <div>Masonry item 9</div>
        <div>Masonry item 10</div>
        <div>Masonry item 11</div>
      </MasonryGrid>
      <Grid>
        <StoreProvider>
          <Products/>
          <Cart />
          <Checkout/>
        </StoreProvider>
       
      </Grid>
    </Container>
  </Layout>
)

export const query = graphql`
  query {
    file(relativePath: { eq: "image.jpg" }) {
      childImageSharp {
        fluid {
          aspectRatio
          base64
          originalImg
          sizes
          src
          srcSet
        }
      }
    }
  }
`
