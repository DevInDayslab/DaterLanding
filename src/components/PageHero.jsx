import gradientBg from '../assets/hero_gradient.webp'

export default function PageHero({
  title,
  containerClassName = 'bg-white px-20 py-2 shadow-sm',
  titleClassName = 'font-google-sans-flex text-[24px] font-bold text-text-primary md:text-[32px]',
  sectionClassName = 'min-h-[34vh] py-20 md:min-h-[36vh] md:py-24',
}) {
  return (
    <section
      data-header-surface="overlay-dark"
      className={`flex w-full items-center justify-center bg-cover bg-center ${sectionClassName}`}
      style={{ backgroundImage: `url(${gradientBg})` }}
    >
      <div className={containerClassName}>
        <h1 className={titleClassName}>
          {title}
        </h1>
      </div>
    </section>
  )
}
