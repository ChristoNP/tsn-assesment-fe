"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Submission {
  id: number
  firstName: string
  lastName: string
  department: string
  years: number
  average: number
  createdAt: string
}

export default function ResultPage() {
  const router = useRouter()
  const [submission, setSubmission] = useState<Submission | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const submissionId = localStorage.getItem("submissionId")

    if (!submissionId) {
      router.push("/")
      return
    }

    const fetchSubmission = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/submissions/${submissionId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        )

        const data = await res.json()
        if (res.ok) {
          setSubmission(data.data)
        } else {
          console.error("Error:", data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmission()
  }, [router])

  if (loading) {
    return <p className="p-6">Loading...</p>
  }

  if (!submission) {
    return <p className="p-6 text-red-500">Submission not found.</p>
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Submission Result</h1>
      <div className="bg-white shadow-md rounded-md p-4 space-y-3">
        <p>
          <span className="font-semibold">Name:</span>{" "}
          {submission.firstName} {submission.lastName}
        </p>
        <p>
          <span className="font-semibold">Department:</span>{" "}
          {submission.department}
        </p>
        <p>
          <span className="font-semibold">Years:</span> {submission.years}
        </p>
        <p>
          <span className="font-semibold">Average Score:</span>{" "}
          {submission.average.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500">
          Submitted at: {new Date(submission.createdAt).toLocaleString()}
        </p>
      </div>

      <button
        onClick={() => router.push("/")}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Back to Form
      </button>
    </div>
  )
}
