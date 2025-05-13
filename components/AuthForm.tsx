'use client'
import React from 'react'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from 'next/link'
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'
import FormFeild from './FormFeild'
import { useRouter } from 'next/navigation'




const authFormSchema = (type: FormType) => {
  return z.object({ 
    name: type === "sign-up" ? z.string().min(3).max(50) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  })
}



const AuthForm = ({type}:{type:FormType}) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
     // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
   
    try{
        if (type === "sign-in") {
          
          // Call your sign-in function here
          toast.success("Sign in successful")
          router.push('/')
        }
        if (type === "sign-up") {
          
          // Call your sign-up function here
          toast.success("Account created successfully, please sign-in")
          router.push('/sign-in')

        }
    }catch (error) {
      console.log(error);
      toast.error(`Something went wrong:,${error}`)
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className='catd-border lg:min-w-[566px]'>
      <div className='flex flex-col gap-6 card py-14 px-10'>
        <div className='flex flex-row gap-2 justify-center'>
          <Image src="/logo.svg" alt='logo' height={32} width={32} />
          <h2 className='text-primary-100'>
            Interviewer</h2>
        </div>
        <h3>Practice job interviews with AI</h3>

<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form ">
       
       {!isSignIn && <FormFeild 
       label='Name' 
       name="name" 
       placeholder='Your name'
       control={form.control} />}


       <FormFeild
       label='E-mail'
       name="email"
       placeholder='Your email addresss'
       control={form.control}
       type='email'/>

        <FormFeild
        label='Password'
        name="password"
        placeholder='Your password'
        type='password'
        control={form.control}/>
       <p>Password</p>


        <Button type="submit">{isSignIn ? 'Sign In' : 'Create an Account'}</Button>
      </form>
    </Form>
    <p className='text-center'>
      {isSignIn ? "Don't have an account?" : 'Already have an account?'}

      <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className='font-bold text-user-primary ml-1'>
        {isSignIn ? "Sign Up" : "Sign In"}
      </Link>
    </p>
       
    </div>
    </div>
  )
}

export default AuthForm