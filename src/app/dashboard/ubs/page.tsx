import { BvTitleHeader } from '@/components'
import { CollapsibleFilter } from '@/components/design/BvCollapsibleFilter'
import { UbsCardProps, BvUbsList } from '@/components/index'
import { Checkbox } from '@/ui/checkbox'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'

const mockUbsData: Omit<UbsCardProps, 'onMoreInfo' | 'onShare' | 'onFavoriteToggle'>[] = [
  {
    id: 1,
    name: 'UBS - JD. UNIVERSO',
    neighborhood: 'Jardim Universo',
    distanceInKm: 1.2,
    isFavorite: false,
  },
  {
    id: 2,
    name: 'UBS - VILA SUISSA',
    neighborhood: 'Vila Suissa',
    distanceInKm: 2.5,
    isFavorite: true,
  },
  {
    id: 3,
    name: 'UBS - ALTO DO IPIRANGA',
    neighborhood: 'Alto do Ipiranga',
    distanceInKm: 3.1,
    isFavorite: false,
  },
  {
    id: 4,
    name: 'UBS - PONTE GRANDE',
    neighborhood: 'Ponte Grande',
    distanceInKm: 4.8,
    isFavorite: false,
  },
]

export default async function HomeScreen() {
  return (
    <main className="container m-8 min-h-screen py-8">
      <BvTitleHeader title="Unidades Básicas de Saúde" className="mb-8" />
      <div className="mb-8">
        <CollapsibleFilter>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="ubs-name">Raio</Label>
              <Input id="ubs-name" placeholder="Ex: 5km" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input id="neighborhood" placeholder="Ex: Centro" />
            </div>
            <div className="flex items-end">
              <div className="flex items-center space-x-2">
                <Checkbox id="open-24h" />
                <Label htmlFor="open-24h">Aberto 24h</Label>
              </div>
            </div>
          </div>
        </CollapsibleFilter>
      </div>
      {/* 
        Mapa Mookado.
      */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58545.81134268069!2d-46.22384755136718!3d-23.526278800000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce7b509f3b399b%3A0x33f43398c8c5c7e1!2sMogi%20das%20Cruzes%20-%20State%20of%20S%C3%A3o%20Paulo!5e0!3m2!1sen!2sbr!4v1723922002512!5m2!1sen!2sbr"
        width="100%"
        height="450"
        style={{ border: 0, borderRadius: '8px', marginBottom: '2rem' }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa de Unidades de Saúde em Mogi das Cruzes"
      ></iframe>
      <div className="mb-8">
        <CollapsibleFilter>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="ubs-name">Nome da UBS</Label>
              <Input id="ubs-name" placeholder="Ex: UBS Vila Suissa" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input id="neighborhood" placeholder="Ex: Centro" />
            </div>
            <div className="flex items-end">
              <div className="flex items-center space-x-2">
                <Checkbox id="open-24h" />
                <Label htmlFor="open-24h">Aberto 24h</Label>
              </div>
            </div>
          </div>
        </CollapsibleFilter>
      </div>
      <BvUbsList initialData={mockUbsData} />
    </main>
  )
}
