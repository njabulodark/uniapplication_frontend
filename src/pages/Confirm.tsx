import Navbar from "../components/Navbar";

export default function App() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Check your email
          </h1>
          <p className="text-sm text-center text-gray-600 mt-2">
            We've sent a confirmation link to your email address.
            Please click the link in the email to verify your account.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <a
            href="mailto:"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
          >
            Open email app
          </a>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            Didn't receive the email?<br />
            Check your spam folder or{' '}
            <a href="/login" className="text-indigo-600 hover:text-indigo-500">
              resend confirmation
            </a>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}