import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";



export default function Page() {

  const DoctorIllustration = './doctor-illustration.svg'
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
      <Card className="w-full max-w-sm border-0 bg-transparent sm:bg-white sm:dark:bg-slate-950 sm:border shadow-none sm:shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">
            Bem-vindo(a) à nossa plataforma de vacinação!
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-6">
          <Image
            src={DoctorIllustration}
            alt="Ilustração de um profissional da saúde segurando uma seringa"
            width={200}
            height={200}
            className="mb-4"
            priority
          />
          <CardDescription className="text-center text-md text-slate-600 dark:text-slate-400">
            Aqui você pode localizar a unidade de saúde mais próxima, consultar
            vacinas disponíveis e acompanhar sua caderneta.
          </CardDescription>
        </CardContent>
        {/* <CardFooter className="flex flex-col items-center justify-center space-y-4 pt-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Como deseja acessar?
          </p>
          <div className="w-full flex flex-col space-y-2">
            <Button className="w-full">Criar uma conta</Button>
            <Button variant="outline" className="w-full">
              Já tenho uma conta
            </Button>
          </div>
        </CardFooter> */}
      </Card>
    </div>
  );
};
