import Image from 'next/image'
// import { Button } from "@/ui/button";
import { AppLayout } from '@/components/layout/AppLayout'

import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card'

export default function Page() {
  const DoctorIllustration = '/doctor-illustration.svg'

  return (
    <AppLayout>
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-sm rounded-lg border-0 bg-transparent shadow-none sm:max-w-md lg:max-w-4xl lg:bg-transparent lg:shadow-none">
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
            <div className="p-2 sm:p-6 lg:p-0">
              <CardHeader className="text-center lg:text-left">
                <CardTitle className="text-2xl font-bold text-slate-800 md:text-3xl dark:text-slate-100">
                  Bem-vindo(a) à nossa plataforma de vacinação!
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col items-center justify-center space-y-6 lg:items-start">
                <Image
                  src={DoctorIllustration}
                  alt="Ilustração de um profissional da saúde segurando uma seringa"
                  width={200}
                  height={200}
                  className="mb-4 lg:hidden"
                  priority
                />
                <CardDescription className="text-md text-center text-slate-600 lg:text-left dark:text-slate-400">
                  Aqui você pode localizar a unidade de saúde mais próxima, consultar vacinas
                  disponíveis e acompanhar sua caderneta.
                </CardDescription>
              </CardContent>
              {/* <CardFooter className="flex flex-col items-center justify-center space-y-4 pt-6 lg:items-start">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Como deseja acessar?
              </p>
              <div className="w-full flex flex-col space-y-2 sm:flex-col sm:space-y-0 sm:space-x-4 lg:flex-col lg:space-y-2 lg:space-x-0">
                <Button className="w-full">

                  Entrar com o Google
                </Button>
                <Button variant="outline" className="w-full">
                  Outras formas
                </Button>
              </div>
            </CardFooter> */}
            </div>

            <div className="hidden h-full items-center justify-center lg:flex">
              <Image
                src={DoctorIllustration}
                alt="Ilustração de um profissional da saúde segurando uma seringa"
                width={200}
                height={200}
                priority
              />
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  )
}
