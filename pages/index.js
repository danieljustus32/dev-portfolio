import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'

import NewsletterForm from '@/components/NewsletterForm'

import React from 'react'
import ReactFullpage from '@fullpage/react-fullpage'
import Footer from '@/components/Footer'

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
                    <div className="mt-96 flex flex-row rounded-md border border-gray-600 backdrop-blur md:flex-col md:px-4 lg:mt-32">
                      <div className="Iam">
                        <p className="flex w-full">I'm Daniel. I'm a</p>
                        <b>
                          <div className="innerIam">
                            coder.
                            <br />
                            maker.
                            <br />
                            designer.
                            <br />
                            learner.
                            <br />
                            writer.
                          </div>
                        </b>
                      </div>
                    </div>
                  </div>
                  <div className="section slide-two h-screen bg-gray-900">
                    <div>
                      <h1>{posts[0].title}</h1>
                    </div>
                  </div>
                  <div className="section slide-three h-screen bg-gray-900">
                    {siteMetadata.newsletter.provider !== '' && (
                      <div className="mt-96 flex flex-row rounded-md border border-gray-600 py-4 backdrop-blur md:flex-col md:px-6">
                        <div className="flex items-center justify-center pt-4">
                          <NewsletterForm />
                        </div>
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
