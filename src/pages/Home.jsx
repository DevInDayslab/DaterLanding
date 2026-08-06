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
    desc: 'You have complete control over your visibility. No one can see you unless you want them to.',
    color: 'bg-accent-lime',
    image: imgPrivacyMode,
  },
  {
    title: 'Verified profiles',
    desc: "Say goodbye to fake profiles. Apply the 'Verified Profiles Only' filter to view only authentic and verified profiles.",
    color: 'bg-accent-blue',
    image: imgVerifiedProfiles,
  },
  {
    title: 'Advanced filters',
    desc: 'Want to find something specific? You can narrow your results by applying advanced filters.',
    color: 'bg-accent-orange',
    image: imgAdvancedFilters,
  },
  {
    title: 'Send comments',
    desc: 'Grab their attention by sending a comment. Comments are always noticed first and can double your chances.',
    color: 'bg-accent-periwinkle',
    image: imgSendComments,
  },
  {
    title: 'Preset message',
    desc: 'Choose or write a preset message to auto-send to your matches.',
    color: 'bg-accent-yellow',
    image: imgPresetMessage,
  },
  {
    title: 'Stories',
    desc: 'Share your daily moments and connect with people through authentic daily updates.',
    color: 'bg-accent-lime',
    image: imgStories,
  },
  {
    title: 'Switch city',
    desc: 'Planning a trip? Change your location to meet people in other cities before you even arrive.',
    color: 'bg-accent-pink',
    image: imgSwitchCity,
  },
]

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
          Built for better dating
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
    <section id="the-app" data-header-surface="solid" data-header-bg="#ffffff" className="scroll-mt-[72px] bg-white px-8 pb-24 pt-12 md:px-16">
      <div className="mx-auto flex w-full flex-col items-center">
        <h2 className="mx-auto max-w-[23.75rem] text-center font-google-sans-flex text-[23px] font-bold uppercase leading-tight text-text-primary md:text-[34px] md:font-semibold">
          ENHANCE YOUR DATING EXPERIENCE
        </h2>
        <p className="mx-auto mt-4 max-w-[35rem] text-center font-google-sans-flex text-[14px] font-normal leading-normal text-text-muted md:text-[17px] md:font-light">
          From verified profiles to smart visibility tools, everything is crafted to help you connect
          with confidence and spark something real.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-[1114px] grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3">
        {FEATURES.map((feature) => (
          <article
            key={feature.title}
            className={`${feature.color} flex h-[350px] flex-col overflow-hidden rounded-[32px] p-6`}
          >
            <div className="mb-2 flex h-48 w-full shrink-0 items-start justify-center overflow-hidden">
              <img
                src={feature.image}
                alt=""
                width={444}
                height={266}
                loading="lazy"
                decoding="async"
                className="h-full max-w-full object-contain object-top"
              />
            </div>
            <h3 className="mb-1 shrink-0 font-google-sans-flex text-[19px] font-medium text-text-primary">
              {feature.title}
            </h3>
            <p className="shrink-0 font-google-sans-flex text-[14px] font-normal text-text-primary">
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
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="overflow-hidden rounded-[24px] bg-white shadow-sm">
          <div className="aspect-video w-full animate-pulse bg-black/10" />
          <div className="space-y-3 p-6">
            <div className="h-6 w-full animate-pulse rounded bg-black/10" />
            <div className="h-6 w-2/3 animate-pulse rounded bg-black/10" />
            <div className="mt-4 h-4 w-1/3 animate-pulse rounded bg-black/10" />
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
    <section id="the-buzz" data-header-surface="solid" data-header-bg="#EDE8FF" className="bg-accent-lavender py-14 px-8 md:px-16">
      <div className="mx-auto mb-16 flex w-full flex-col items-center">
        <h2 className="mx-auto max-w-lg text-center font-google-sans-flex text-[34px] font-semibold uppercase leading-tight text-text-primary">
          READ TRENDING BLOGS ABOUT DATING
        </h2>
      </div>

      {loading && <BlogSkeleton />}

      {!loading && error && (
        <p className="text-center font-google-sans-flex text-[16px] text-text-muted">{error}</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {blogs.map((blog) => (
            <a
              key={blog.id}
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="overflow-hidden rounded-[24px] bg-white shadow-sm transition-opacity hover:opacity-95"
            >
              <img
                src={blog.image || '/qr-placeholder.png'}
                alt=""
                loading="lazy"
                decoding="async"
                className="aspect-video w-full object-cover"
              />
              <div className="p-5">
                <h3
                  className="line-clamp-2 font-google-sans-flex text-[19px] font-normal text-text-primary"
                  dangerouslySetInnerHTML={{ __html: blog.title }}
                />
                <time className="mt-6 block font-google-sans-flex text-[14px] font-normal text-text-muted">
                  {blog.date}
                </time>
              </div>
            </a>
          ))}
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <a
          href="https://dater-buzz.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-google-sans-flex text-[16px] font-normal text-text-primary underline hover:opacity-80"
        >
          Read More...
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
