import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import {
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  })

  const handleSignUp: SubmitHandler<SignUpForm> = (data: SignUpForm) => {
    try {
      console.log({ data })

      new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        toast.success('Restaurante cadastrado com sucesso!', {
          action: {
            label: 'Login',
            onClick: () => navigate('/sign-in'),
          },
        })
      })
    } catch (error) {
      console.log({ error })
      toast.error('Ocorreu um erro ao cadastrar o restaurante.')
    }
  }

  const handleSignUpError: SubmitErrorHandler<SignUpForm> = (error) => {
    console.log({ error })
    toast.error('Ocorreu um erro ao realizar o login.')
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button asChild className="absolute top-8 right-8" variant="ghost">
          <Link to="/sign-in">Acessar painel</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-muted-foreground text-sm">
              Seja um parceiro e comece sua jornada conosco.
            </p>
          </div>

          <form
            className="space-y-4"
            onSubmit={handleSubmit(handleSignUp, handleSignUpError)}
          >
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register('restaurantName')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input id="phone" type="tel" {...register('phone')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Finalizar cadastro
            </Button>
            <p className="text-muted-foreground text-center text-sm leading-relaxed font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Ao contiuar, você concorda com nossos <br />
              <a href="" className="underline underline-offset-4">
                Termos de Serviço
              </a>{' '}
              e{' '}
              <a href="" className="underline underline-offset-4">
                {' '}
                Política de Privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
