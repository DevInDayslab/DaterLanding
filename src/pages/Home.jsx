import { useEffect, useState } from 'react'
import { API } from '../constants/api'
import DownloadButton from '../components/DownloadButton'
import heroMobile from '../assets/hero/mobile-hero.webp'
import heroMobileFallback from '../assets/hero/mobile-hero.jpg'
import heroDesktop from '../assets/hero/desktop-hero.webp'
import imgPrivacyMode from '../assets/features/privacy-mode.webp'
import imgVerifiedProfiles from '../assets/features/verified-profiles.webp'
import imgAdvancedFilters from '../assets/features/advanced-filters.webp'
import imgSendComments from '../assets/features/send-comments.webp'
import imgPresetMessage from '../assets/features/preset-message.webp'
import imgStories from '../assets/features/stories.webp'
import imgSwitchCity from '../assets/features/switch-city.webp'

const FEATURES = [
  {
    title: 'Privacy mode',
    desc: 'Stay private while you explore. Your profile is only visible to people you send a friend request to, so you can browse with confidence and privacy.',
    color: 'bg-accent-lime',
    image: imgPrivacyMode,
  },
  {
    title: 'Verified profiles',
    desc: 'Connect only with verified people. Turn on the "Verified Profiles Only" filter to see only verified profiles, making your dating experience safer and more authentic.',
    color: 'bg-accent-blue',
    image: imgVerifiedProfiles,
  },
  {
    title: 'Advanced filters',
    desc: 'Want to find something specific? Use advanced filters to narrow your search and discover people who match your preferences with ease.',
    color: 'bg-accent-orange',
    image: imgAdvancedFilters,
  },
  {
    title: 'Send comments',
    desc: 'Say more than just hello. Add a personal comment to your friend request and make your introduction stand out.',
    color: 'bg-accent-periwinkle',
    image: imgSendComments,
  },
  {
    title: 'Preset message',
    desc: 'Your perfect introduction, every time. Set a preset message once, and it will be automatically sent whenever you become friends with someone.',
    color: 'bg-accent-yellow',
    image: imgPresetMessage,
  },
  {
    title: 'Stories',
    desc: 'A new way to express yourself. Share moments from your daily life and let people discover the real you beyond your profile.',
    color: 'bg-accent-lime',
    image: imgStories,
  },
  {
    title: 'Switch city',
    desc: 'Planning to travel or move? Switch your city anytime to discover and connect with people in your destination before you get there.',
    color: 'bg-accent-pink',
    image: imgSwitchCity,
  },
]

const BLOG_IMAGE_CLASS = 'aspect-[1280/853] w-full object-contain bg-white'

function formatPostDate(isoDate) {
  try {
    return new Date(isoDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

function mapWpPost(post, image) {
  return {
    id: post.id,
    title: post.title?.rendered ?? '',
    link: post.link ?? '#',
    date: formatPostDate(post.date),
    image,
  }
}

async function fetchFeaturedImage(mediaId) {
  if (!mediaId) return null
  try {
    const res = await fetch(API.mediaUrl(mediaId))
    if (!res.ok) return null
    const media = await res.json()
    return media.source_url ?? null
  } catch {
    return null
  }
}

function HeroSection() {
  return (
    <section
      data-header-surface="overlay"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden md:min-h-[93.1vh] md:max-h-[1011px]"
    >
      <picture className="absolute inset-0">
        <source media="(min-width: 768px)" srcSet={heroDesktop} type="image/webp" />
        <source media="(max-width: 767px)" srcSet={heroMobile} type="image/webp" />
        <img
          src={heroMobileFallback}
          alt=""
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
        />
      </picture>

      <div className="relative z-10 flex flex-col items-center px-8 text-center">
        <h1 className="font-google-sans-flex text-[22px] font-semibold italic text-white md:text-[34px]">
          Built for Better Dating
        </h1>
        <p className="mt-0.5 font-google-sans-flex text-[15px] font-light text-white md:text-[16px]">
          Modern dating made simple.
        </p>

        <div className="mt-8 flex w-full max-w-sm flex-col items-center md:max-w-none">
          <DownloadButton variant="hero" />
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section
      id="the-app"
      data-header-surface="solid"
      data-header-bg="#ffffff"
      className="features-section scroll-mt-[72px] bg-white px-4 pb-12 pt-8 md:px-16 md:pb-24 md:pt-12"
    >
      <div className="mx-auto flex w-full flex-col items-center px-4 md:px-0">
        <h2 className="features-section__title mx-auto max-w-[23.75rem] text-center font-google-sans-flex text-[23px] font-bold uppercase leading-tight text-text-primary md:max-w-none md:text-[34px] md:font-semibold">
          <span className="xl:hidden">
            ENHANCE YOUR
            <br />
            DATING EXPERIENCE
          </span>
          <span className="hidden xl:inline">ENHANCE YOUR DATING EXPERIENCE</span>
        </h2>
        <p className="features-section__lead mx-auto mt-2 max-w-[35rem] text-center font-google-sans-flex text-[14px] font-normal leading-normal text-text-muted md:mt-4 md:text-[17px] md:font-light">
          From verified profiles to smart visibility tools, everything is crafted to help you connect
          with confidence and spark something real.
        </p>
      </div>

      {/*
        Portrait phones: 1 col, fluid height.
        Wider phones / small tablets: 2 cols, fluid height.
        xl+: desktop 3-col cards with fixed height.
        Phone / tablet landscape spacing is tightened via .features-section in index.css.
      */}
      <div className="features-section__grid mx-auto mt-8 grid max-w-[1114px] grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6 md:mt-16 xl:grid-cols-3 xl:gap-x-8 xl:gap-y-6">
        {FEATURES.map((feature) => (
          <article
            key={feature.title}
            className={`features-section__card ${feature.color} flex h-auto flex-col overflow-hidden rounded-[24px] p-5 sm:p-6 xl:h-[380px] xl:rounded-[32px] xl:p-6`}
          >
            <div className="features-section__media mb-[clamp(0.625rem,2.5vw,0.875rem)] w-full shrink-0 xl:mb-3 xl:flex xl:h-48 xl:items-start xl:justify-center xl:overflow-hidden">
              <img
                src={feature.image}
                alt=""
                width={444}
                height={266}
                loading="lazy"
                decoding="async"
                className="features-section__img w-full object-contain object-top xl:h-full xl:w-auto xl:max-w-full"
              />
            </div>
            <h3 className="features-section__card-title mb-1 shrink-0 font-google-sans-flex text-[clamp(17px,4.85vw,21px)] font-medium text-text-primary xl:text-[19px]">
              {feature.title}
            </h3>
            <p className="features-section__card-body shrink-0 font-google-sans-flex text-[clamp(13px,3.6vw,15px)] font-normal leading-snug text-text-primary xl:text-[14px]">
              {feature.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

function BlogSkeleton() {
  return (
    <div className="mx-auto grid max-w-[1114px] grid-cols-3 gap-2 sm:gap-4 md:gap-6">
      {[0, 1, 2].map((i) => (
        <div key={i} className="min-w-0 overflow-hidden rounded-[14px] bg-white shadow-sm md:rounded-[24px]">
          <div className={`${BLOG_IMAGE_CLASS} animate-pulse bg-black/10`} />
          <div className="space-y-2 p-2 md:space-y-3 md:p-6">
            <div className="h-3 w-full animate-pulse rounded bg-black/10 md:h-6" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-black/10 md:h-6" />
            <div className="mt-2 h-2 w-1/3 animate-pulse rounded bg-black/10 md:mt-4 md:h-4" />
          </div>
        </div>
      ))}
    </div>
  )
}

function BuzzSection() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadPosts() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(API.postsUrl(3), {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        })
        if (!res.ok) throw new Error('Loading failed')
        const data = await res.json()
        if (!Array.isArray(data)) throw new Error('Loading failed')

        const mapped = await Promise.all(
          data.map(async (post) => {
            const image = await fetchFeaturedImage(post.featured_media)
            return mapWpPost(post, image)
          }),
        )
        setBlogs(mapped)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError('Loading failed')
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
    return () => controller.abort()
  }, [])

  return (
    <section id="the-buzz" data-header-surface="solid" data-header-bg="#EDE8FF" className="bg-accent-lavender px-4 pb-8 pt-8 md:px-16 md:pb-14 md:pt-12">
      <div className="mx-auto mb-8 flex w-full flex-col items-center px-4 md:mb-16 md:px-0">
        <h2 className="mx-auto max-w-[23.75rem] text-center font-google-sans-flex text-[23px] font-bold uppercase leading-tight text-text-primary md:max-w-lg md:text-[34px] md:font-semibold">
          <span className="md:hidden">
            READ TRENDING BLOGS
            <br />
            ABOUT DATING
          </span>
          <span className="hidden md:inline">READ TRENDING BLOGS ABOUT DATING</span>
        </h2>
      </div>

      {loading && <BlogSkeleton />}

      {!loading && error && (
        <p className="text-center font-google-sans-flex text-[16px] text-text-muted">{error}</p>
      )}

      {!loading && !error && (
        <div className="mx-auto grid max-w-[1114px] grid-cols-3 gap-2 sm:gap-4 md:gap-6">
          {blogs.map((blog) => (
            <a
              key={blog.id}
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-0 overflow-hidden rounded-[14px] bg-white shadow-sm transition-opacity hover:opacity-95 md:rounded-[24px]"
            >
              <img
                src={blog.image || '/qr-placeholder.png'}
                alt=""
                loading="lazy"
                decoding="async"
                className={BLOG_IMAGE_CLASS}
              />
              <div className="px-2 pb-2 pt-2 md:px-3 md:pb-4 md:pt-3">
                <h3
                  className="line-clamp-2 font-google-sans-flex text-[11px] font-normal leading-tight text-text-primary md:text-[17px] md:leading-normal"
                  dangerouslySetInnerHTML={{ __html: blog.title }}
                />
                <time className="mt-1 block font-google-sans-flex text-[10px] font-normal text-text-muted md:mt-6 md:text-[12px]">
                  {blog.date}
                </time>
              </div>
            </a>
          ))}
        </div>
      )}

      <div className="mx-auto mt-4 flex max-w-[1114px] justify-end">
        <a
          href="https://dater-buzz.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-google-sans-flex text-[14px] font-normal text-text-primary underline hover:opacity-80 md:text-[16px]"
        >
          Read more...
        </a>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <FeaturesSection />
      <BuzzSection />
      {/* Pink Get the app banner lives in Footer, directly above footer links */}
    </main>
  )
}
