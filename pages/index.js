import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'

import NewsletterForm from '@/components/NewsletterForm'

import React from 'react'
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
      <div className="fullpage-viewport">
        <ReactFullpage
          //fullpage options
          licenseKey="0MK6J-V4N58-38HAJ-2VL78-SNZNP"
          credits={{ enabled: false }}
          pluginWrapper={pluginWrapper}
          responsiveWidth={768}
          render={({ state, fullpageApi }) => {
            return (
              <>
                <ReactFullpage.Wrapper>
                  <div className="section active slide-one h-screen w-screen bg-gray-900">
                    <div className="rounded-md border border-gray-800 py-8 px-4 opacity-75 backdrop-blur">
                      <div className="Iam">
                        <p>This is</p>
                        <b>
                          <div class="innerIam">
                            leggera
                            <br />
                            a theme in progress
                            <br />
                            built on bootstrap
                            <br />
                            how I learn stuff
                            <br />
                            how we do it
                          </div>
                        </b>
                      </div>
                    </div>
                  </div>
                  <div className="section slide-two h-screen bg-gray-900">
                    <p>Section 2</p>
                  </div>
                  <div className="section slide-three h-screen bg-gray-900">
                    <p>Section 3</p>
                    {siteMetadata.newsletter.provider !== '' && (
                      <div className="flex items-center justify-center pt-4">
                        <NewsletterForm />
                      </div>
                    )}
                  </div>
                </ReactFullpage.Wrapper>
              </>
            )
          }}
        />
      </div>
    </>
  )
}
