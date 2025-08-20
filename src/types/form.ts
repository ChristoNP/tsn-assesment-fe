export interface FormData {
    firstName: string
    lastName: string
    department: string
    years: string
    q1: number | ""
    q2: number | ""
    q3: number | ""
    q4: number | ""
    q5: number | ""
    q6: number | ""
    q7: number | ""
    q8: number | ""
    q9: number | ""
    q10: number | ""
}

export interface Question {
    id: keyof FormData
    label: string
}

export const likertScale = [
    {value: 5, label: "Strongly Agree"},
    {value: 4, label: "Agree"},
    {value: 3, label: "Neutral"},
    {value: 2, label: "Disagree"},
    {value: 1, label: "Strongly Disagree"},
]

