import * as React from "react"
const { useState } = React;
import { Bot } from "lucide-react";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
    Field,
    FieldDescription,
    FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";


export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState({});

    const navigate = useNavigate();

    const { login } = useAuth();

    const handleSubmit = async (data: { username: string; password: string; }) => {
        setIsSubmitting(true);
        setError({});
        try {
            await login(data.username, data.password);
            navigate('/')
        } catch (error) {
            setError({ submit: "Login failed. Please check your credentials." });
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    return (
        <div className={cn("flex items-center justify-center min-h-screen", className)} {...props}>
            <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    handleSubmit(formData);
                }}
                className="w-full max-w-md p-8 flex flex-col gap-6 -translate-y-27"
            >
                <div className="flex flex-col items-center gap-2 text-center">
                    <div className="flex size-8 items-center justify-center rounded-md">
                        <Bot className="size-8" />
                    </div>
                    <h1 className="text-xl font-bold"> Welcome to Run Trainer</h1>
                </div>
                { error.submit && (
                    <div className="text-red-600 text-center">
                        {error.submit}
                    </div>
                ) }
                <Field>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input required type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input required type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                </Field>
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Login'}</Button>
                <FieldDescription className="text-center">
                    Want to create an account? <Link to="/register" className="text-primary hover:underline">Sign up</Link>
                </FieldDescription>
            </form>
        </div>
    )
}