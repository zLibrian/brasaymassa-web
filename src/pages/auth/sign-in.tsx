import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import {
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })

  const handleSignIn: SubmitHandler<SignInForm> = (data: SignInForm) => {
    try {
      console.log({ data })

      new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        toast.success('Login realizado com sucesso!', {
          action: {
            label: 'Reenviar',
            onClick: () => handleSignIn(data),
          },
        })
      })
    } catch (error) {
      console.log({ error })
      toast.error('Ocorreu um erro ao cadastrar o restaurante.')
    }
  }

  const handleSignInError: SubmitErrorHandler<SignInForm> = (error) => {
    console.log({ error })
    toast.error('Ocorreu um erro ao realizar o login.')
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button asChild className="absolute top-8 right-8" variant="ghost">
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-muted-foreground text-sm">
              Acompanhe seus pedidos, visualize relatórios e muito mais.
            </p>
          </div>

          <form
            className="space-y-4"
            onSubmit={handleSubmit(handleSignIn, handleSignInError)}
          >
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
