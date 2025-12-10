import { AlertCircle } from 'lucide-react'

interface ErrorMessageProps {
  message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 shrink-0" />
        <div>
          <p className="text-sm text-red-800 font-medium">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default ErrorMessage
