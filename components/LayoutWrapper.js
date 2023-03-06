import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

import { useState, useEffect } from 'react'

const LayoutWrapper = ({ children }) => {
  // Detect page scroll to shrink header, see https://stackoverflow.com/questions/68087971/get-scrollbar-position-with-nextjs,
  // useEffect now only runs on the client so no need to detect if window != null
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    // just trigger this so that the initial state
    // is updated as soon as the component is mounted
    // related: https://stackoverflow.com/a/63408216
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollY])

  useEffect(() => {
    let navbar = document.getElementById('navbar')
    if (scrollY > 100) {
      Array.from(document.getElementsByClassName('shrink')).forEach(function (
        element,
        index,
        array
      ) {
        navbar.classList.remove('py-10')
        navbar.classList.add('py-1')
        element.classList.remove('md:scale-100')
        element.classList.add('md:scale-75')
      })
    } else {
      Array.from(document.getElementsByClassName('shrink')).forEach(function (
        element,
        index,
        array
      ) {
        navbar.classList.add('py-10')
        navbar.classList.remove('py-1')
        element.classList.remove('md:scale-75')
        element.classList.add('md:scale-100')
      })
    }
  }, [scrollY])

  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header
          className="fixed left-0 top-0 z-50 flex w-screen items-center justify-between border-b border-zinc-800 px-12 py-10 backdrop-blur transition-all"
          id="navbar"
        >
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex shrink items-center justify-between">
                <div className="logo mr-3 transition-all">
                  <Logo />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="ml-5 hidden h-6 shrink text-2xl font-semibold md:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden shrink sm:flex">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
