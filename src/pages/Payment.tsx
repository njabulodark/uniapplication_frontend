import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../helper/SupabaseClient';

export default function Payment() {
const [data, setData] = useState(null);

  const fetchData = async () => {
    console.log("access Token", localStorage.getItem("token"))
            try {
              const { data: userData } = await supabase
                .from('applications')
                .select('*')
                .eq('id', localStorage.getItem('userId'))
                .single();

  
              if (userData) {
                setData(userData);
              } else {
                console.warn('No application data found for this user.');
              }
            } catch (err) {
              console.error('Error fetching application data:', err);
            }
          }

          
  useEffect(() => {
    fetchData();
    document.title = 'Payment';
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <main className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-xl p-6 transition-transform transform hover:shadow-xl">
            <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">Payment</h1>
            <p className="text-center text-gray-600 mb-6">Complete your application by making the payment below.</p>

            <div className="text-center mb-6">
              <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                Application Fee: R50
              </span>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                Payment is required to complete your application process.
              </p>

              <h2 className="text-xl font-semibold mb-3 text-gray-800">Payment Details</h2>

              <ul className="space-y-2 mb-4">
                <li className="flex items-center text-gray-700">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  <strong>Bank:</strong> Capitec
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  <strong>Account Number:</strong> 1624390313
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                  <strong>Account Type:</strong> Savings
                </li>
              </ul>

              <p className="text-green-600 font-medium mb-4">
                Reference: <span className="font-semibold">{data?.['identification_number'] || 'Loading...'}</span>
              </p>

              <p className="text-sm text-gray-500 text-center mt-2">
                Please use your ID number as the reference for verification.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
