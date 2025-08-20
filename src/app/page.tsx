"use client"
import InputField from "@/components/InputField";
import QuestionTable from "@/components/QuestionField";
import SelectField from "@/components/SelectField";
import { question } from "@/data/question";
import { FormData } from "@/types/form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter()

  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    department: "",
    years: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: ""
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (key: keyof FormData, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: "" }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required"
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!form.department.trim()) newErrors.department = "Department is required"
    if (!form.years) newErrors.years = "Years is required"

    for (let i = 1; i <= 10; i++) {
      const key = `q${i}` as keyof FormData
      if (form[key] === "") {
        newErrors[key] = "This question is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    const answers = Object.values(form).filter((v) => typeof v === "number") as number[]
    const average = answers.reduce((a, b) => a + b, 0) / answers.length

    localStorage.setItem("formData", JSON.stringify(form))
    localStorage.setItem("result", average.toString())

    router.push("/result")
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Supervisor Review</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <InputField
              label="First Name"
              value={form.firstName}
              onChange={(val) => handleChange("firstName", val)}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>
          <div className="flex-1">
            <InputField
              label="Last Name"
              value={form.lastName}
              onChange={(val) => handleChange("lastName", val)}
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>
        </div>

        <div className="w-[19rem]">
          <InputField
            label="Department"
            value={form.department}
            onChange={(val) => handleChange("department", val)}
          />
          {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
        </div>

        <SelectField
          label="How many years have you been with this company?"
          value={form.years}
          onChange={(val) => handleChange("years", val)}
          options={["<1", "1", "2", "3", "4", "5+", "10+"]}
        />
        {errors.years && <p className="text-red-500 text-sm">{errors.years}</p>}

        <div className="space-y-4">
          <h2 className="text-sm font-bold">
            How do you feel about management? <span className="text-red-600">*</span>
          </h2>
          <QuestionTable questions={question} form={form} onChange={handleChange} />
          {Object.keys(errors)
            .filter((k) => k.startsWith("q"))
            .length > 0 && (
              <p className="text-red-500 text-sm">Please answer all questions</p>
            )}
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
