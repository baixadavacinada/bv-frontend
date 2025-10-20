import Image from 'next/image'

export const TitleSection = ({
  icon,
  title,
  children,
}: {
  icon: string
  title: string
  children: React.ReactNode
}) => (
  <section className="space-y-4">
    <div className="flex items-center gap-3">
      <Image src={icon} alt="" width={24} height={24} className="h-6 w-6" />
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    </div>
    {children}
  </section>
)
