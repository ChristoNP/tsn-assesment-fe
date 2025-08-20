import { FormData, likertScale } from "@/types/form";
import { Question } from "@/types/form";

interface QuestionTableProps {
    questions: Question[]
    form: FormData
    onChange: (id: keyof FormData, value: number) => void
}

const QuestionTable: React.FC<QuestionTableProps> = ({ questions, form, onChange }) => {
    return (
        <div className="overflow-x-auto border rounded-md border-gray-100">
            <table className="min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="p-2 text-left text-sm font-semibold"></th>
                        {likertScale.map((scale) => (
                            <th key={scale.value} className="p-2 text-center text-sm font-semibold">
                                {scale.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {questions.map((q) => (
                        <tr key={q.id} className="border-t border-gray-100">
                            <td className="p-2 text-sm border-r border-gray-100">{q.label}</td>
                            {likertScale.map((scale) => (
                                <td key={scale.value} className="p-2 text-center">
                                    <input
                                        type="radio"
                                        name={q.id}
                                        value={scale.value}
                                        checked={form[q.id] === scale.value}
                                        onChange={() => onChange(q.id, scale.value)}
                                        className="h-4 w-4"
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default QuestionTable
