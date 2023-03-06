import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'

import NewsletterForm from '@/components/NewsletterForm'

import React from 'react'
import ReactDOM from 'react-dom'
import ReactFullpage from '@fullpage/react-fullpage'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

const pluginWrapper = () => {
  // require('../lib/fullpage/fullpage.scrollOverflowReset.min')
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      {/*// TODO - add react-fullpage*/}
      <div className="fixed top-0 left-0 min-h-screen">
        <ReactFullpage
          //fullpage options
          licenseKey="0MK6J-V4N58-38HAJ-2VL78-SNZNP"
          pluginWrapper={pluginWrapper}
          render={({ state, fullpageApi }) => {
            return (
              <ReactFullpage.Wrapper>
                <div className="section active h-screen w-screen bg-violet-500">
                  <p>Section 1 (welcome to fullpage.js)</p>
                  <button onClick={() => fullpageApi.moveSectionDown()}>
                    Click me to move down
                  </button>
                </div>
                <div className="section h-screen bg-orange-500">
                  <p>Section 2</p>
                </div>
                <div className="section h-screen bg-green-500">
                  <p>Section 3</p>
                </div>
              </ReactFullpage.Wrapper>
            )
          }}
        />
      </div>
    </>
  )
}
