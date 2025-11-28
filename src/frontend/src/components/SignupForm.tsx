import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useNavigate, Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FormEvent, useState } from "react"
import axios from "axios"
import { z } from "zod"

// Define validation schema
const signupSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters"),
  password: z.string()
    .min(3, "Password must be at least 3 characters"),
    //.regex(/[A-Z]/, "Password must contain an uppercase letter")
    //.regex(/[a-z]/, "Password must contain a lowercase letter")
    //.regex(/[0-9]/, "Password must contain a number"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const navigate = useNavigate();

  const handleSubmit = async (data: { username: string; password: string; confirmPassword: string; }) => {
    setIsSubmitting(true);
    setErrors({});

    // Validate with Zod
    const result = signupSchema.safeParse(data);
    
    if (!result.success) {
      // Map Zod errors to field errors
      const fieldErrors: Partial<Record<keyof SignupFormData, string>> = {};
      result.error.issues.forEach(err => {
        const field = err.path[0] as keyof SignupFormData;
        if (field) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post('/users/register/', {
        username: result.data.username,
        password: result.data.password
      });
      navigate('/login');
    } catch (error) {
      console.error("Registration error:", error);
      if (axios.isAxiosError(error) && error.response?.data) {
        setErrors({ username: error.response.data.detail || "Registration failed" });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="-translate-y-27">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your username below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleSubmit(formData);
          }}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.username ? "border-red-500" : ""}
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required className={errors.password ? "border-red-500" : ""} />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required className={errors.confirmPassword ? "border-red-500" : ""} />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </Field>
                </Field>
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting}>{ isSubmitting ? "Submitting" : "Create Account"}</Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
