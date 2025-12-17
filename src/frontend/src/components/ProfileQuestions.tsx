import { useAuth } from "../auth/AuthContext"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from '../components/ui/alert-dialog';
import { useState } from 'react';
import { Button } from './ui/button';
import { DateSelector } from './ui/date-selector';
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import axios from "axios"
import { z } from "zod"

export function ProfileQuestions ({ className, ...props}) {
    const { user } = useAuth()
    const [currentStep, setCurrentStep] = useState(0)
    const [errors, setErrors] = useState({})
    const [profileData, setProfileData] = useState({
        dateOfBirth: null,
        sex: null,
        height: "",
        weight: "",
        fitnessLevel: null,
        runningExperience: null,
        injuryHistory: "",
        medicalConditions: ""
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value
        });
    }

    const handleSubmit = async () => {
        try {
            const {   
                sex,
                dateOfBirth,
                height: height_cm,
                weight: weight_kg,
                fitnessLevel: fitness_level,
                runningExperience: running_experience,
                injuryHistory: injury_history,
                medicalConditions: medical_conditions
            } = profileData
            const date_of_birth = dateOfBirth.toISOString().substring(0,10)
            await axios.post("/users/create_user_profile/", {
                sex,
                height_cm,
                weight_kg,
                date_of_birth,
                fitness_level,
                running_experience,
                injury_history,
                medical_conditions,
            });
            location.reload();
        } catch (error) {
            console.error("Failed submission:", error);
            throw error;
        }
    }
    
    //TODO add character limit check for injury history and medical condition questions
    const dobSchema = z.object({
        dateOfBirth: z.coerce.date()
    }).refine((data) => data.dateOfBirth < new Date(), {
        message: "Birth date must be in past",
        path: ["dateOfBirth"]
    })

    const questions = [
        { 
            question: "dateOfBirth",
            required: true,
            html: (
                <div>
                <AlertDialogHeader>
                    <AlertDialogTitle>What's your date of birth?</AlertDialogTitle>
                </AlertDialogHeader>
                    {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                <DateSelector label="Date of birth" date={profileData.dateOfBirth} onSelect={(date) => {
                    setErrors({})
                    if ( !date ) return
                    const result = dobSchema.safeParse({ dateOfBirth: date})

                    if (!result.success) {
                        const fieldErrors = {};
                        result.error.issues.forEach(err => {
                            const field = err.path[0]
                            if (field) fieldErrors[field] = err.message;
                        });
                        setErrors(fieldErrors);
                        return;
                    }
                        const e = { target: { name: "dateOfBirth", value: date } } as React.ChangeEvent<HTMLInputElement>
                    handleChange(e)
                    }}/>
                </div>
            )
        },
        { 
            question: "sex",
            required: true,
            html: (
            <div>
                <AlertDialogHeader className="pb-4">
                    <AlertDialogTitle>What's your sex?</AlertDialogTitle>
                </AlertDialogHeader>
                <Select onValueChange={(value) => handleChange({
                    target: {
                        name: "sex",
                        value
                    }
                    } as React.ChangeEvent<HTMLInputElement>
                )}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Please select your sex"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="M">Male</SelectItem>
                        <SelectItem value="F">Female</SelectItem>
                        <SelectItem value="P">Prefer Not Say</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        )
        },
        {
            question: "height",
            required: true,
            html: (
                <div>
                    <AlertDialogHeader className="pb-4">
                        <AlertDialogTitle>How tall are you?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <label> What is your height in cm?</label>
                    <Input type="number" name="height" value={profileData.height} onChange={handleChange}></Input>                    
                </div>
            )
        },
        {
            question: "weight",
            required: true,
            html: (
                <div>
                    <AlertDialogHeader className="pb-4">
                        <AlertDialogTitle>How much do you weigh?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <label> What is your weight in kg?</label>
                    <Input type="number" name="weight" value={profileData.weight} onChange={handleChange}></Input>
                </div>
            )
        },
        {
            question: "fitnessLevel",
            required: true,
            html: (
                <div>
                    <AlertDialogHeader className="pb-4">
                        <AlertDialogTitle>How would you rate your general fitness level?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <RadioGroup className="flex items-center gap-4" onValueChange={(value) => handleChange({
                        target: {
                            name: "fitnessLevel",
                            value
                        }
                    } as React.ChangeEvent<HTMLInputElement>
                    )}>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem id='beginner' value="B"/>
                            <Label htmlFor="beginner">Beginner</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem id='intermediate' value="I"/>
                            <Label htmlFor="intermediate">Intermediate</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem id='advanced' value="A"/>
                            <Label htmlFor="advanced">Advanced</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem id='elite' value="E"/>
                            <Label htmlFor="elite">Elite</Label>
                        </div>
                    </RadioGroup>                    
                </div>
            )
        },
        {
            question: "runningExperience",
            required: true,
            html: (
                <div>
                    <AlertDialogHeader className="pb-4">
                        <AlertDialogTitle>How would you rate your running experience?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <RadioGroup className="flex items-center gap-4" onValueChange={(value) => handleChange({
                        target: {
                            name: "runningExperience",
                            value
                        }
                    } as React.ChangeEvent<HTMLInputElement>
                    )}>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem id='beginner' value="B" />
                            <Label htmlFor="beginner">Beginner</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem id='intermediate' value="I" />
                            <Label htmlFor="intermediate">Intermediate</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem id='advanced' value="A" />
                            <Label htmlFor="advanced">Advanced</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem id='elite' value="E" />
                            <Label htmlFor="elite">Elite</Label>
                        </div>
                    </RadioGroup>
                </div>
            )
        },
        {
            question: "injuryHistory",
            required: false,
            html: (
                <div>
                    <AlertDialogHeader className="pb-4">
                        <AlertDialogTitle>Do you have any history with injuries that might reoccur or affect your ability to run?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <Textarea placeholder="When I was 12 I tore both ACLs and my hip snaps while I run" name="injuryHistory" value={profileData.injuryHistory} onChange={handleChange}/>
                </div>
            )
        },
        {
            question: "medicalConditions",
            required: false,
            html: (
                <div>
                    <AlertDialogHeader className="pb-4">
                        <AlertDialogTitle>Do you have any other medical conditions or health history which might be relevant?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <Textarea placeholder="I am 2 months pregnant and have reduced lung capacity from prior asbestos exposure" name="medicalConditions" value={profileData.medicalConditions} onChange={handleChange} />
                </div>
            )
        }       
    ]
    return (
        <AlertDialog open={!("profile" in user) || !user.profile }>
            <AlertDialogContent className="-translate-y-60">
                <>
                { currentStep == 0 && (
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hold on</AlertDialogTitle>
                        <AlertDialogDescription> It seems we don't know anything about you. We need to know some details about you before we can tailor any training plans for you.</AlertDialogDescription>
                    </AlertDialogHeader>
                )}
                { currentStep >= 1 && questions[currentStep-1].html}
                <AlertDialogFooter>
                    { currentStep == 0 && (
                        <Button onClick={() => setCurrentStep(1)}>Tell us about yourself</Button>
                    )}
            
                    { currentStep >= 1 && (
                        <>
                        <Button onClick={() => setCurrentStep(currentStep - 1)}> Back </Button>
                            { currentStep < questions.length ? (
                                    <Button disabled={Object.keys(errors).length > 0 || (questions[currentStep - 1].required && !profileData[questions[currentStep - 1].question])} onClick={() => setCurrentStep(currentStep + 1)}> Next</Button>
                            ) : (
                                <Button onClick={() => handleSubmit()}> Submit </Button>
                            )}
                        </>
                    )}
                </AlertDialogFooter>
                </>

            </AlertDialogContent>
        </AlertDialog>        
    )
}