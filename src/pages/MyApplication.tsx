import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../helper/SupabaseClient';

function MyApplication() {
  const [data, setData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const developer = false; // Toggle for testing without auth

  // Fetch or mock data
  useEffect(() => {
    document.title = 'My Application';

    if (developer) {
      localStorage.setItem('token', 'test_token');
      setData({
        title: 'Mr.',
        first_name: 'John',
        middle_name: 'Doe',
        initials: 'JD',
        surname: 'Smith',
        'identification_number': '987654321',
        date_of_birth: '1990-01-01',
        gender: 'Male',
        marriage_status: 'Single',
        race: 'White',
        population: 'Urban',
        disability: 'No',
        school: 'Test School',
        email: 'john.doe@example.com',
        cell_num: '1234567890',
        boxnumber: '1234',
        streat_address: '123 Main St',
        suburb: 'Downtown',
        postal_code: '12345',
        city: 'Sample City',
        province: 'Sample Province',
        examination_number: 'EX123456',
        'education_department': 'Sample Dept.',
        'specify_device': 'Laptop',
        'presentation_method': 'Online',
        matric_upgrading: 'No',
        matric_completed: 'Yes',
        highest_grade: '12',
        'matric_year': '2008',
        guadian: 'Father',
        guadian_name: 'John Sr.',
        guadian_surname: 'Doe',
        guadian_initials: 'JD',
        guadian_title: 'Mr.',
        guadian_id: '123456789',
        guadian_income: '50000',
        subject1: 'Mathematics',
        level1: 'Higher Grade',
        percentage1: '85',
        subject2: 'English',
        level2: 'Higher Grade',
        percentage2: '78',
        subject3: 'Science',
        level3: 'Higher Grade',
        percentage3: '82',
        subject4: 'History',
        level4: 'Higher Grade',
        percentage4: '75',
        subject5: 'Geography',
        level5: 'Higher Grade',
        percentage5: '80',
        subject6: 'Art',
        level6: 'Higher Grade',
        percentage6: '88',
        subject7: 'Physical Education',
        level7: 'Higher Grade',
        percentage7: '90',
        subject8: 'Biology',
        level8: 'Higher Grade',
        percentage8: '84',
        subject9: 'Economics',
        level9: 'Higher Grade',
        percentage9: '79',
        ready: '1',
        paid: '1',
        nwu_campus1: 'Potchefstroom',
        nwu_course1: 'Computer Science',
        nwu_campus2: 'Vanderbijlpark',
        nwu_course2: 'Engineering',
        uwc_faculty1: 'Faculty of Arts',
        uwc_course1: 'Philosophy',
        uwc_faculty2: 'Faculty of Science',
        uwc_course2: 'Biology',
        uj_faculty1: 'Faculty of Education',
        uj_course1: 'Teaching',
        uj_faculty2: 'Faculty of Health Sciences',
        uj_course2: 'Nursing',
        file_id: 'base64string1',
        file_matric: 'base64string2',
      });
      setLoading(false);
    } else {
      if (!localStorage.getItem('token')) {
        navigate('/login');
      } else {
        // Fetch real data from supabase
        const fetchData = async () => {
          try {
            const { data: userData, error } = await supabase
            .from('applications')
            .select('*')
            .eq('id', localStorage.getItem('userId'))
            .single();
            
            if (error) {
              console.error('Error fetching application data:', error);
              setLoading(false);
              return;
            }

            const { data: userData2 } = await supabase
              .from('courses')
              .select('*')
              .eq('id', localStorage.getItem('userId'))
              .single();

            if (userData && userData2) {
              // Merge the two data objects
              setData({ ...userData, ...userData2 });
            } else {
              console.warn('No application data found for this user.');
            }
          } catch (err) {
            console.error('Error fetching application data:', err);
          }
          setLoading(false);
        };
        fetchData();
      }
    }

    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        // Only handle simple ID hashes (e.g., '#section1'), not route paths (e.g., '#/application/')
        if (hash.startsWith('#/') || hash.includes('/')) {
          return;
        }
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Wait for content to load before scrolling
    if (!loading) {
      handleHashNavigation();
    }

    // Also handle hash changes after initial load
    window.addEventListener('hashchange', handleHashNavigation);
    return () => window.removeEventListener('hashchange', handleHashNavigation);
  }, [navigate, developer, loading]);

  const applicationSubmit = async (e: React.FormEvent, value: string) => {
    e.preventDefault();

    const { error } = await supabase.from("applications").update({
      ready: value,
    }).eq("id", localStorage.getItem("userId"));

    if (error) {
        console.error("Error submitting subject info:", error.message);
        alert("Failed to submit subject information. Please try again.");
        return;
      }

    // force reload the page to reflect changes
    window.location.reload();
  };

  // const downloadFile = (base64String: string) => {
  //   const binaryString = atob(base64String);
  //   const len = binaryString.length;
  //   const bytes = new Uint8Array(len);
  //   for (let i = 0; i < len; i++) {
  //     bytes[i] = binaryString.charCodeAt(i);
  //   }
  //   const blob = new Blob([bytes], { type: 'application/pdf' });
  //   return URL.createObjectURL(blob);
  // };

  if (loading ) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center h-96">
          <p className="text-gray-600">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Application Status */}
          <section className="space-y-6">
            <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold text-center text-gray-800">
                Application Status
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      data.ready === '1' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></span>
                  <span className="text-sm text-gray-700">
                    {data.ready === '1'
                      ? 'Application Ready'
                      : 'Application Not Ready'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      data.paid === '1' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></span>
                  <span className="text-sm text-gray-700">
                    {data.paid === '1'
                      ? 'Application Paid'
                      : 'Application Not Paid'}
                  </span>
                </div>
              </div>

              {data.paid !== '1' && (
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 mt-4">
                  <h3 className="font-semibold text-gray-800">
                    Payment Information
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Please pay the application fee of R50 to the following account:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-gray-700">
                    <li>Account Bank: Capitec</li>
                    <li>Account Number: 1624390313</li>
                    <li>Account Type: Savings</li>
                    <li className="text-green-600">
                      Reference: {data['identification_number'] || 'Your ID'}
                    </li>
                  </ul>
                  <p className="text-xs mt-2 text-gray-500">
                    Once you have paid, we will use your ID number to verify you.
                    So please use your ID number as reference.
                  </p>
                </div>
              )}
            </div>

            {/* Personal Details */}
            <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
              <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
                Application Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold text-gray-800">Personal Details</h3>
                  <table className="w-full table-auto text-sm text-gray-700">
                    <tbody>
                      {Object.entries({
                        Title: data.title,
                        'First Name': data.first_name,
                        'Middle Name': data.middle_name,
                        Initials: data.initials,
                        Surname: data.surname,
                        ID: data['identification_number'],
                        'Date of Birth': data.date_of_birth?.split('T')[0],
                        Gender: data.gender,
                        'Marriage Status': data.marriage_status,
                        Race: data.race,
                        Population: data.population,
                        Disability: data.disability,
                        School: data.school,
                      }).map(([key, value]) => (
                        <tr key={key} className="border-b border-gray-200">
                          <th className="text-left py-2 px-4 font-medium">
                            {key}
                          </th>
                          <td className="py-2 px-4">{value || 'Not available'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    onClick={() => navigate('/application/course/personal')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
                  >
                    Edit Personal Info
                  </button>
                </div>

                {/* Contact Info */}
                <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold text-gray-800">
                    Contact Information
                  </h3>
                  <table className="w-full table-auto text-sm text-gray-700">
                    <tbody>
                      {Object.entries({
                        email: data.email,
                        'Phone Number': data.cell_num,
                        'Box Number': data.boxnumber,
                        'Street Address': data.streat_address,
                        Suburb: data.suburb,
                        'Postal Code': data.postal_code,
                        City: data.city,
                        Province: data.province,
                      }).map(([key, value]) => (
                        <tr key={key} className="border-b border-gray-200">
                          <th className="text-left py-2 px-4 font-medium">
                            {key}
                          </th>
                          <td className="py-2 px-4">{value || 'Not available'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    onClick={() => navigate('/application/course/contact')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
                  >
                    Edit Contact Info
                  </button>
                </div>
              </div>

              {/* Additional Info Sections */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold text-gray-800">
                    Additional Information
                  </h3>
                  <table className="w-full table-auto text-sm text-gray-700">
                    <tbody>
                      {Object.entries({
                        'Examination Number': data.examination_number,
                        'Education Department': data['education_department'],
                        'Specify Device': data['specify_device'],
                        'Presentation Method': data['presentation_method'],
                        'Matric Upgrading': data.matric_upgrading,
                        'Matric Completed': data.matric_completed,
                        'Highest Grade Passed': data.highest_grade,
                        'Matric Year': data['matric_year'],
                      }).map(([key, value]) => (
                        <tr key={key} className="border-b border-gray-200">
                          <th className="text-left py-2 px-4 font-medium">
                            {key}
                          </th>
                          <td className="py-2 px-4">{value || 'Not available'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    onClick={() => navigate('/application/course/Additional')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
                  >
                    Edit Additional Info
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold text-gray-800">
                    Guardian Information
                  </h3>
                  <table className="w-full table-auto text-sm text-gray-700">
                    <tbody>
                      {Object.entries({
                        'Relation to Applicant': data.guadian,
                        'Guardian Name': data.guadian_name,
                        'Guardian Surname': data.guadian_surname,
                        'Guardian Initials': data.guadian_initials,
                        'Guardian Title': data.guadian_title,
                        'Guardian ID': data.guadian_id,
                        'Guardian Income': data.guadian_income,
                      }).map(([key, value]) => (
                        <tr key={key} className="border-b border-gray-200">
                          <th className="text-left py-2 px-4 font-medium">
                            {key}
                          </th>
                          <td className="py-2 px-4">{value || 'Not available'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    onClick={() => navigate('/application/course/guadian')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
                  >
                    Edit Guardian Info
                  </button>
                </div>

                {/* Subjects Table */}
                <div className="md:col-span-2 border border-gray-200 rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold text-gray-800 text-center underline">
                    Subject and Level Information
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto text-sm text-gray-700">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="py-2 px-4">Subject</th>
                          <th className="py-2 px-4">Level</th>
                          <th className="py-2 px-4">Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: 9 }, (_, i) => i + 1).map((i) => (
                          <tr key={i} className="border-b border-gray-200">
                            <td className="py-2 px-4">{data[`subject${i}`] || "Not available"}</td>
                            <td className="py-2 px-4">{data[`level${i}` || "Not available"]}</td>
                            <td className="py-2 px-4">
                              {data[`percentage${i}` || "Not available"]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    onClick={() => navigate('/application/course/subjects')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
                  >
                    Edit Subjects
                  </button>
                </div>
              </div>
            </div>

            {/* University Info */}
            <div id='courses' className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                University Courses
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div id='nwu' style={{ display: 'none' }} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex items-center gap-4 mb-4 w-full justify-center">
                    <img 
                      src="https://services.nwu.ac.za/sites/services.nwu.ac.za/files/files/designs-branding/NWU-holding-shape-digital-white.png"
                      alt="North-West University Logo"
                      className="h-24 w-auto mx-auto"
                    />
                  </div>
                <div className="flex items-center justify-center mb-4">
                  <h3 className="font-semibold text-gray-800 align-middle justify-center">NWU Details</h3>
                </div>
                  <table className="w-full table-auto text-sm text-gray-700">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-4 font-medium">
                          {data.nwu_campus1}
                        </th>
                        <td className="py-2 px-4">{data.nwu_course1 || "Not available"}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-4 font-medium">
                          {data.nwu_campus2}
                        </th>
                        <td className="py-2 px-4">{data.nwu_course2 || "Not available"}</td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    onClick={() => navigate('/application/course/nwu')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
                  >
                    Edit NWU Info
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 space-y-4" style={{ display: 'none' }}>
                    <div className="flex justify-center items-center gap-4 mb-4 w-full">
                    <img 
                      src="https://uwc-za.b-cdn.net/files/images/UWC-logo_transparent-writing-1.svg"
                      alt="University of Western Cape Logo"
                      className="h-25 w-auto align-middle" 
                    />
                    </div>
                  <div className="flex items-center justify-center mb-4">
                    <h3 className="font-semibold text-gray-800 align-middle justify-center">UWC Details</h3>
                  </div>
                  <table className="w-full table-auto text-sm text-gray-700">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-4 font-medium">
                          {data.uwc_faculty1}
                        </th>
                        <td className="py-2 px-4">{data.uwc_course1 || "Not available"}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-4 font-medium">
                          {data.uwc_faculty2}
                        </th>
                        <td className="py-2 px-4">{data.uwc_course2 || "Not available"}</td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    onClick={() => navigate('/application/course/uwc')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
                  >
                    Edit UWC Info
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                    <div className="flex justify-center items-center gap-4 mb-4 w-full">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTFcP-BCdvm1jpyx6fLd-naad3YjGBJ3RCWkZEUvGp2suQLjpburtkO76-&s=10"
                      alt="CAO Logo"
                      className="h-25 w-auto align-middle" 
                    />
                    </div>
                  <div className="flex items-center justify-center mb-4">
                    <h3 className="font-semibold text-gray-800 align-middle justify-center">CAO Details</h3>
                  </div>
                  <table className="w-full table-auto text-sm text-gray-700">
                    <tbody>
                      {Array.from({ length: 6 }, (_, i) => {
                        const institution = data[`cao_institution${i + 1}`];
                        const course = data[`cao_course${i + 1}`];
                        return (
                          <tr className="border-b border-gray-200" key={i}>
                            <th className="text-left py-2 px-4 font-medium">
                              {institution && institution !== "" ? institution : "Not available"}
                            </th>
                            <td className="py-2 px-4">
                              {course && course !== "" ? course : "Not available"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <button
                    onClick={() => navigate('/application/course/cao')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
                  >
                    Edit CAO Info
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex items-center gap-4 mb-4 w-full justify-center">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2FYYbKAlNjpB1lpbMSBBheXBpOApV9V7jjw&s"
                      alt="University of Johannesburg Logo"
                      className="h-25 w-auto align-middle" // Adjust size as needed
                    />
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <h3 className="font-semibold text-gray-800 align-middle justify-center">UJ Details</h3>
                  </div>
                  <table className="w-full table-auto text-sm text-gray-700">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-4 font-medium">
                          {data.uj_faculty1 && data.uj_faculty1 !== "" ? data.uj_faculty1 : "Not available"}
                        </th>
                        <td className="py-2 px-4">
                          {data.uj_course1 && data.uj_course1 !== "" ? data.uj_course1 : "Not available"}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-4 font-medium">
                          {data.uj_faculty2 && data.uj_faculty2 !== "" ? data.uj_faculty2 : "Not available"}
                        </th>
                        <td className="py-2 px-4">
                          {data.uj_course2 && data.uj_course2 !== "" ? data.uj_course2 : "Not available"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    onClick={() => navigate('/application/course/uj')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
                  >
                    Edit UJ Info
                  </button>
                </div>
              </div>
            </div>

            {/* Application Actions */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <p className="text-lg text-gray-800 mb-4">
                If all your information is correct and you're ready to send your
                application, press Apply below.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  type="button"
                  onClick={(e) => applicationSubmit(e, '1')}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded transition duration-200"
                >
                  Send Application
                </button>
                <button
                  type="button"
                  onClick={(e) => applicationSubmit(e, '0')}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded transition duration-200"
                >
                  Cancel Application
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MyApplication;