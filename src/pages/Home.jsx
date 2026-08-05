import { useEffect, useState } from 'react'
import { API } from '../constants/api'
import heroImage from '../assets/hero/hero.jpg'
import imgPrivacyMode from '../assets/features/privacy-mode.png'
import imgVerifiedProfiles from '../assets/features/verified-profiles.png'
import imgAdvancedFilters from '../assets/features/advanced-filters.png'
import imgSendComments from '../assets/features/send-comments.png'
import imgPresetMessage from '../assets/features/preset-message.png'
import imgStories from '../assets/features/stories.png'
import imgSwitchCity from '../assets/features/switch-city.png'

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
      className="relative flex min-h-[80vh] w-full items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="relative z-10 flex flex-col items-center px-8 text-center">
        <h1 className="font-poppins text-[44px] font-semibold uppercase text-white">
          FASTEST WAY TO DATE
        </h1>
        <p className="mt-0.5 font-poppins text-[26px] font-light text-white">
          Modern dating made simple.
        </p>

        <div className="mt-8 flex flex-col items-center rounded-xl bg-white p-4">
          <img
            src="/qr-placeholder.png"
            alt="Scan to download DATER"
            className="h-28 w-28 object-contain"
          />
          <p className="mt-2 text-sm text-gray-600">Scan to download</p>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section id="the-app" className="bg-white py-24 px-8 md:px-16">
      <h2 className="text-center font-poppins text-[40px] font-semibold uppercase text-text-primary">
        ENHANCE YOUR DATING EXPERIENCE
      </h2>
      <p className="mx-auto mt-4 max-w-4xl text-center font-poppins text-[22px] font-light text-text-muted">
        From verified profiles to smart visibility tools, everything is crafted to help you connect
        with confidence and spark something real.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {FEATURES.map((feature) => (
          <article
            key={feature.title}
            className={`${feature.color} flex h-[400px] flex-col overflow-hidden rounded-[32px] p-8`}
          >
            <div className="mb-6 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl">
              <img
                src={feature.image}
                alt=""
                className="h-full w-full object-contain object-center"
              />
            </div>
            <h3 className="mb-2 font-poppins text-[22px] font-medium text-text-primary">
              {feature.title}
            </h3>
            <p className="font-poppins text-[16px] font-normal text-text-primary">{feature.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="overflow-hidden rounded-[24px] bg-white shadow-sm">
          <div className="h-[200px] w-full animate-pulse bg-black/10" />
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
        if (!res.ok) throw new Error(`Failed to load posts (${res.status})`)
        const data = await res.json()
        if (!Array.isArray(data)) throw new Error('Invalid posts response')

        const mapped = await Promise.all(
          data.map(async (post) => {
            const image = await fetchFeaturedImage(post.featured_media)
            return mapWpPost(post, image)
          }),
        )
        setBlogs(mapped)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message || 'Unable to load blogs')
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
    return () => controller.abort()
  }, [])

  return (
    <section id="the-buzz" className="bg-accent-lavender py-24 px-8 md:px-16">
      <h2 className="mb-16 text-center font-poppins text-[40px] font-semibold uppercase text-text-primary">
        READ TRENDING BLOGS ABOUT DATING
      </h2>

      {loading && <BlogSkeleton />}

      {!loading && error && (
        <p className="text-center font-poppins text-[16px] text-text-muted">{error}</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
                className="h-[200px] w-full object-cover"
              />
              <div className="p-6">
                <h3
                  className="line-clamp-2 font-poppins text-[24px] font-normal text-text-primary"
                  dangerouslySetInnerHTML={{ __html: blog.title }}
                />
                <time className="mt-4 block font-poppins text-[16px] font-normal text-text-muted">
                  {blog.date}
                </time>
              </div>
            </a>
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-end">
        <a
          href="https://dater-buzz.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-poppins text-[16px] font-medium text-text-primary hover:underline"
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
