import { BvTitleHeader } from '@/components'
import { CollapsibleFilter } from '@/components/design/BvCollapsibleFilter'
import { UbsCardProps, BvUbsList } from '@/components/index'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@radix-ui/react-checkbox'
import { mockUbsData } from '@/mock/ubs'

const ubsListData: Omit<UbsCardProps, 'onMoreInfo' | 'onShare' | 'onFavoriteToggle'>[] =
  mockUbsData.map((ubs) => ({
    id: ubs.id,
    name: ubs.name,
    slug: ubs.id,
    neighborhood: ubs.neighborhood,
    distanceInKm: ubs.distanceInKm,
    isFavorite: ubs.isFavorite,
  }))

export default async function UbsScreen() {
  return (
    <div>
      <BvTitleHeader title="Unidades Básicas de Saúde" className="mb-8" />
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
      <BvUbsList initialData={ubsListData} />
    </div>
  )
}
