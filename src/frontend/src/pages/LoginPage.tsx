import { Bot } from "lucide-react";
import { ChangeEvent, FormEvent, ComponentProps, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

function LoginPage({
  className,
  ...props
}: ComponentProps<"div">) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const { login } = useAuth();

    const handleSubmit = async (data: { username: string; password: string; }) => {
        setIsSubmitting(true);
        try {
          await login(data.username, data.password);
          navigate('/')
        } catch (error) {
          console.error("Login error:", error);
        } finally {
          setIsSubmitting(false);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    return (
      <div className={cn("flex items-center justify-center min-h-screen", className)} {...props}>
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleSubmit(formData);
          }}
          className="w-full max-w-md p-8 flex flex-col gap-6 -translate-y-27"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-8 items-center justify-center rounded-md">
              <Bot className="size-8" />
            </div>
            <h1 className="text-xl font-bold"> Welcome </h1>
            <FieldDescription>
              PLACEHOLDER
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input required type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input required type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
          </Field>
          <Button type="submit">Login</Button>
        </form>
      </div>
    )
}

export default LoginPage;
