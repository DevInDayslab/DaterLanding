import gradientBg from '../assets/hero_gradient.png'

export default function PageHero({ title }) {
  return (
    <section
      className="flex w-full items-center justify-center bg-cover bg-center py-24 md:py-32"
      style={{ backgroundImage: `url(${gradientBg})` }}
    >
      <div className="bg-white px-12 py-4 shadow-sm">
        <h1 className="font-google-sans-flex text-[32px] font-bold text-text-primary md:text-[40px]">
          {title}
        </h1>
      </div>
    </section>
  )
}
