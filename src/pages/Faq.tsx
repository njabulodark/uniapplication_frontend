import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Faq() {
  return (
    <>
      <Navbar />
      <main className="py-12 bg-white">
        <section className="max-w-7xl mx-auto px-6">
          <h3 className="text-center text-3xl font-bold mb-4 text-blue-600">FAQ</h3>
          <p className="text-center mb-8 text-gray-600">
            Find the answers for the most frequently asked questions below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* FAQ Item 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h6 className="flex items-center text-blue-600 font-semibold mb-2">
                <span className="mr-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </span>
                WHO ARE WE?
              </h6>
              <p className="text-gray-700">
                We're an independent online powerhouse, dedicated to streamlining the university application process for students.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h6 className="flex items-center text-blue-600 font-semibold mb-2">
                <span className="mr-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </span>
                WHAT DO WE DO?
              </h6>
              <p className="text-gray-700">
                We handle the heavy lifting by submitting applications to multiple South African public institutions (Universities) on behalf of students, freeing them to fully immerse themselves in their studies.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h6 className="flex items-center text-blue-600 font-semibold mb-2">
                <span className="mr-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </span>
                WHEN DO WE OPEN?
              </h6>
              <p className="text-gray-700">
                Our normal applications depend on the university's opening dates.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h6 className="flex items-center text-blue-600 font-semibold mb-2">
                <span className="mr-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </span>
                HOW MUCH IS THE APPLICATION FEE?
              </h6>
              <p className="text-gray-700">
                To kickstart your application journey, a nominal fee of R50 ensures seamless processing. Let's pave the way to your academic future together!
              </p>
            </div>

            {/* FAQ Item 5 - Duplicate Fix */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h6 className="flex items-center text-blue-600 font-semibold mb-2">
                <span className="mr-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </span>
                HOW LONG DO WE TAKE TO PROCESS YOUR APPLICATION?
              </h6>
              <p className="text-gray-700">
                Normally within 2-3 days after receiving your proof of payment.
              </p>
            </div>

            {/* FAQ Item 6 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h6 className="flex items-center text-blue-600 font-semibold mb-2">
                <span className="mr-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </span>
                WHERE WILL WE APPLY FOR YOU AT?
              </h6>
              <p className="text-gray-700">
                On the <a href="http://apply4u.co.za/my_application" className="text-blue-600 underline hover:text-blue-800">my_application</a> portal, you will select the universities you want to apply to.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}