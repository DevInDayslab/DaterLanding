import gradientBg from '../assets/hero_gradient.png'

export default function PageHero({
  title,
  containerClassName = 'bg-white px-20 py-2 shadow-sm',
  titleClassName = 'font-google-sans-flex text-[28px] font-bold text-text-primary md:text-[36px]',
  sectionClassName = 'min-h-[68vh] py-40 md:min-h-[72vh] md:py-48',
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
