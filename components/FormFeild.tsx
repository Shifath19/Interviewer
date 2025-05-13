import React from 'react'
import { FormControl,FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Controller, FieldValues, Control, Path } from 'react-hook-form'

interface FormFeildProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' |'file';

}



const FormFeild = <T extends FieldValues>
    (
        {control,
        name,
        label,
        placeholder,
        type="text"}
    :FormFeildProps<T>) => (

    <Controller name={name} control={control} render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input className='input' placeholder= {placeholder} {...field}  type={type}/>
        </FormControl>
       
        <FormMessage />
      </FormItem>
    )}
  />
)
export default FormFeild