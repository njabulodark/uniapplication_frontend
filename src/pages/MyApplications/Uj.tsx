// Uj.tsx
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../helper/SupabaseClient';
import SearchableSelect from '../../components/SearchableSelect';

interface FormData {
  uj_faculty1: string;
  uj_course1: string;
  uj_faculty2: string;
  uj_course2: string;
}

// Course options grouped by faculty
const facultyCourses: Record<string, string[]> = {
  'ART, DESIGN AND ARCHITECTURE': [
    'BA IN FASHION DESIGN',
    'BA IN INTERIOR DESIGN',
    'BA IN VISUAL ART',
    'BA in Design in Communication Design',
    'BA in Digital Media Design',
    'BA in Industrial Design',
    'Bachelor of Architecture',
    'DIPLOMA IN JEWELLERY DESIGN & MANUFACTURE',
    'Diploma in Architecture',
    'Diploma in Fashion Production',
  ],
  'COLLEGE OF BUSINESS & ECONOMICS': [
    'BA (PUBLIC MANAGEMENT AND GOVERNANCE) - APK',
    'BA (PUBLIC MANAGEMENT AND GOVERNANCE) - SWC',
    'BACHELOR OF COMMERCE IN ACCOUNTING EXTENDED',
    'BACHELOR OF COMMERCE IN FINANCE',
    'BACHELOR OF COMMERCE IN FINANCE EXTENDED',
    'BACHELOR OF HOSPITALITY MANAGEMENT',
    'BACHELOR OF HUMAN RESOURCE MANAGEMENT',
    'BACHELOR OF TOURISM DEVELOPMENT & MANAGEMENT',
    'BCOM IN BUSINESS MANAGEMENT EXTENDED',
    'BCOM IN INFORMATION SYSTEMS',
    'BCOM IN MARKETING MANAGEMENT',
    'BCOM IN TRANSPORT & LOGISTICS MANAGEMENT',
    'BCom IN INFORMATION MANAGEMENT',
    'BCom in Business Management',
    'BCom in Economics and Econometrics',
    'BCom in Economics and Econometrics Ext',
    'BCom in Entrepreneurial Management',
    'BCom in Industrial Psychology',
    'Bachelor of Accounting',
    'Bachelor of Commerce in Accounting',
    'DIP IN PEOPLE MANAGEMENT',
    'DIP IN PEOPLE MANAGEMENT (EXTENDED)',
    'DIP TRANSPORTATION MANAGEMENT',
    'DIP: MARKETING',
    'DIP: RETAIL BUSINESS MANAGEMENT',
    'DIP: SMALL BUSINESS MANAGEMENT',
    'DIP: SMALL BUSINESS MANAGEMENT (EXTENDED)',
    'DIP: TRANSPORTATION MANAGEMENT',
    'DIPLOMA IN BUSINESS INFORMATION TECHNOLOGY',
    'DIPLOMA IN LOGISTICS',
    'DIPLOMA IN LOGISTICS EXTENDED',
    'DIPLOMA IN TOURISM MANAGEMENT',
    'Diploma in Accountancy',
    'Diploma in Financial Services Operations',
    'Diploma in Food and Beverage Operations',
  ],
  EDUCATION: [
    'BED FOUNDATION PHASE TEACHING (GRADES R-3)',
    'BED INTERMEDIATE PHASE TEACHING (GRADES 4-7)',
    'BED SENIOR PHASE &  FET TEACHING (PSYCHOLOGY)',
    'BED SENIOR PHASE & FET TEACHING (ACCOUNTING)',
    'BED SENIOR PHASE & FET TEACHING (AFRIKAANS)',
    'BED SENIOR PHASE & FET TEACHING (ECONOMICS)',
    'BED SENIOR PHASE & FET TEACHING (ENGLISH)',
    'BED SENIOR PHASE & FET TEACHING (GEOGRAPHY)',
    'BED SENIOR PHASE & FET TEACHING (ISIZULU)',
    'BED SENIOR PHASE & FET TEACHING (MATHEMATICS)',
    'BED SENIOR PHASE & FET TEACHING (SEPEDI)',
    'BED SENIOR PHASE & FET TEACHING: BUSINESS MGT',
    'BED SENIOR PHASE & FET TEACHING: LIFE SCIENCE',
    'BED SENIOR PHASE & FET TEACHING: PHYS SCIENCE',
  ],
  'ENGINEERING & BUILT ENVIRONMENT': [
    'B ENG IN CIVIL ENGINEERING',
    'B ENG TECH IN CHEMICAL ENGINEERING',
    'B ENG TECH IN CIVIL ENGINEERING',
    'B ENG TECH IN CIVIL ENGINEERING EXTENDED',
    'B ENG TECH IN ELECTRICAL ENGINEERING',
    'B ENG TECH IN ELECTRICAL ENGINEERING EXTENDED',
    'B ENG TECH IN EXTRACTION METALLURGY',
    'B ENG TECH IN EXTRACTION METALLURGY EXTENDED',
    'B ENG TECH IN MINING ENGINEERING',
    'BACHELOR OF CONSTRUCTION',
    'BACHELOR OF CONSTRUCTION (EXTENDED)',
    'BACHELOR OF MINE SURVEYING',
    'BENG TECH IN INDUSTRIAL ENGINEERING',
    'BENG TECH IN INDUSTRIAL ENGINEERING EXTENDED',
    'BENG TECH IN MECHANICAL ENGINEERING',
    'BENG TECH IN MECHANICAL ENGINEERING EXTENDED',
    'BENG TECH IN PHYSICAL METALLURGY',
    'BENG TECH IN PHYSICAL METALLURGY EXTENDED',
    'BING IN ELECTRICAL & ELECTRONIC ENGINEERING',
    'BING IN MECHANICAL ENGINEERING',
    'Bachelors of Urban and Regional Planning',
    'DIPLOMA MANAGEMENT SERVICES',
    'DIPLOMA MANAGEMENT SERVICES (EXT)',
    'DIPLOMA OPERATIONS MANAGEMENT',
    'DIPLOMA OPERATIONS MANAGEMENT EXTENDED',
  ],
  'FACULTY OF SCIENCE': [
    'BSC COMPUTER SCIENCE & INFORMATICS',
    'BSC COMPUTER SCIENCE & INFORMATICS AI',
    'BSC COMPUTER SCIENCE & INFORMATICS EXT',
    'BSC LIFE & ENV (BIOCHEM AND BOTANY)',
    'BSC LIFE & ENV (BIOCHEM AND BOTANY) EXT',
    'BSC LIFE & ENV (BOTANY AND CHEM)',
    'BSC LIFE & ENV (BOTANY AND CHEM) EXT',
    'BSC LIFE & ENV (BOTANY AND ZOOLOGY)',
    'BSC LIFE & ENV (BOTANY AND ZOOLOGY) EXT',
    'BSC LIFE & ENV (GEOG AND ENVIRO MGT)',
    'BSC LIFE & ENV (GEOG AND ENVIRO MGT) EXT',
    'BSC LIFE & ENV (GEOLOGY & GEOG)',
    'BSC LIFE & ENV (GEOLOGY AND ENVIRO MGT)',
    'BSC LIFE & ENV (PHYSIOLOGY & BIOCHEM)',
    'BSC LIFE & ENV (PHYSIOLOGY & BIOCHEM) EXT',
    'BSC LIFE & ENV (PHYSIOLOGY & PSYCHOLOGY)',
    'BSC LIFE & ENV (PHYSIOLOGY & PSYCHOLOGY) EXT',
    'BSC LIFE & ENV (ZOOLOGY AND BIOCHEM)',
    'BSC LIFE & ENV (ZOOLOGY AND BIOCHEM) EXT',
    'BSC LIFE & ENV (ZOOLOGY AND CHEM)',
    'BSC LIFE & ENV (ZOOLOGY AND CHEM) EXT',
    'BSC LIFE & ENV (ZOOLOGY AND ENVIRO MGT)',
    'BSC LIFE & ENV (ZOOLOGY AND ENVIRO MGT) EXT',
    'BSC LIFE & ENV (ZOOLOGY AND GEOG)',
    'BSC LIFE & ENV (ZOOLOGY AND GEOG) EXT',
    'BSC MATH (ACTUARIAL SCIENCE)',
    'BSC MATH (APPLIED MATHS AND COMP SCIENCE)',
    'BSC MATH (APPLIED MATHS AND MATHS)',
    'BSC MATH (APPLIED MATHS AND STATS)',
    'BSC MATH (COMPUTATIONAL SCIENCE)',
    'BSC MATH (MATHS AND COMP SCIENCE)',
    'BSC MATH (MATHS AND ECON - FIN ORIENT)',
    'BSC MATH (MATHS AND INFORMATICS)',
    'BSC MATH (MATHS AND PSYCHOLOGY)',
    'BSC MATH (MATHS AND STATS - FIN ORIENT)',
    'BSC MATH (MATHS AND STATS)',
    'BSC MATH (STATS AND COMP SCIENCE)',
    'BSC MATH (STATS AND ECONOMICS - FIN ORIENT)',
    'BSC MATHS (APPLIED MATHS AND COMP SC) EXT',
    'BSC MATHS (APPLIED MATHS AND MATHS) EXT',
    'BSC MATHS (APPLIED MATHS AND STATS) EXT',
    'BSC MATHS (MATHS AND COMP SC) EXT',
    'BSC MATHS (MATHS AND INFORMATICS) EXT',
    'BSC MATHS (MATHS AND PSYCHOLOGY) EXT',
    'BSC MATHS (MATHS AND STATS) EXT',
    'BSC MATHS (STATS AND COMP SCIENCE) EXT',
    'BSC PHYSICS (BIOCHEM AND CHEM)',
    'BSC PHYSICS (BIOCHEM AND CHEM) EXT',
    'BSC PHYSICS (CHEM AND MATHS)',
    'BSC PHYSICS (CHEM AND MATHS) EXT',
    'BSC PHYSICS (CHEM AND PHYSICS)',
    'BSC PHYSICS (CHEM AND PHYSICS) EXT',
    'BSC PHYSICS (GEOLOGY AND CHEM)',
    'BSC PHYSICS (GEOLOGY AND MATHS)',
    'BSC PHYSICS (GEOLOGY AND PHYSICS)',
    'BSC PHYSICS (PHYSICS AND APPLIED MATHS)',
    'BSC PHYSICS (PHYSICS AND APPLIED MATHS) EXT',
    'BSC PHYSICS (PHYSICS AND MATHS)',
    'BSC PHYSICS (PHYSICS AND MATHS) EXT',
    'Bachelor of Science in Information Tech',
    'Diploma in Analytical Chemistry (ext)',
    'Diploma in Biotechnology (EXT)',
    'Diploma in Food Technology (EXT)',
  ],
  HUMANITIES: [
    'BA EXTENDED IN DEVELOPMENT STUDIES',
    'BA EXTENDED IN LINGUISTICS',
    'BA EXTENDED IN LINGUISTICS & LANGUAGE',
    'BA EXTENDED IN STRATEGIC COMMUNICATIONS',
    'BA IN COMMUNITY DEVELOPMENT & LEADERSHIP',
    'BA WITH SPECIALISATION IN LANGUAGE PRACTICE',
    'BACHELOR OF SOCIAL WORK',
    'DIPLOMA IN PUBLIC RELATIONS & COMMUNICATION',
    'DIPLOMA IN PUBLIC RELATIONS & COMMUNICATION',
  ],
  LAW: [
    'BA in Law',
    'BCom in Law',
    'LLB IN LAW',
  ],
  'HEALTH SCIENCES': [
    'B OF RADIATION THERAPY',
    'B in Optometry',
    'B of Diagnostic Radiography',
    'B of Diagnostic Ultrasound',
    'B of Nuclear Medicine Technology',
    'BACHELOR OF HEALTH SCIENCES (CHIROPRACTIC)',
    'BACHELOR OF HEALTH SCIENCES (COMP MEDICINE)',
    'BACHELOR OF HEALTH SCIENCES (PODIATRY)',
    'BCom in Sport Management',
    'BHS (Sport and Exercise Science)',
    'BHS in Emergency Medical Care',
    'BHS in Medical Laboratory Sciences',
    'Bachelor of Biokinetics',
    'Bachelor of Environmental Health',
    'Bachelor of Nursing',
    'Diploma in Sport Management',
  ],
};

const Uj: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    uj_faculty1: '',
    uj_course1: '',
    uj_faculty2: '',
    uj_course2: '',
  });

  const [originalData, setOriginalData] = useState<FormData | null>(null);
  const [courses1, setCourses1] = useState<string[]>([]);
  const [courses2, setCourses2] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'UJ Course Application';
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchExistingData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const { data, error: fetchErr } = await supabase
          .from("courses")
          .select("uj_faculty1, uj_course1, uj_faculty2, uj_course2")
          .eq("id", userId)
          .single();

        if (fetchErr && fetchErr.code !== 'PGRST116') {
          console.error("Error fetching UJ info:", fetchErr.message);
        }

        if (data) {
          const fetchedData = {
            uj_faculty1: data.uj_faculty1 || '',
            uj_course1: data.uj_course1 || '',
            uj_faculty2: data.uj_faculty2 || '',
            uj_course2: data.uj_course2 || '',
          };
          setFormData(fetchedData);
          setOriginalData(fetchedData);

          if (fetchedData.uj_faculty1) {
            setCourses1(facultyCourses[fetchedData.uj_faculty1] || []);
          }
          if (fetchedData.uj_faculty2) {
            setCourses2(facultyCourses[fetchedData.uj_faculty2] || []);
          }
        }
      } catch (err) {
        console.error("Unexpected error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExistingData();
  }, [navigate]);

  const handleFacultyChange = (
    faculty: string, 
    courseField: 'uj_course1' | 'uj_course2',
    facultyField: 'uj_faculty1' | 'uj_faculty2'
  ) => {
    // Get courses for selected faculty
    const selectedCourses = facultyCourses[faculty] || [];
    
    if (facultyField === 'uj_faculty1') {
      setCourses1(selectedCourses);
      setFormData(prev => ({
        ...prev,
        [facultyField]: faculty,
        [courseField]: '' // Reset course when faculty changes
      }));
    } else {
      setCourses2(selectedCourses);
      setFormData(prev => ({
        ...prev,
        [facultyField]: faculty,
        [courseField]: '' // Reset course when faculty changes
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const { uj_faculty1, uj_course1, uj_faculty2, uj_course2 } = formData;

    // Validate required fields
    if (!uj_faculty1 || !uj_course1) {
      setError("Please select both faculty and course for your first option");
      setIsSubmitting(false);
      return;
    }

    const updatePayload: Record<string, string> = {};

    if (uj_faculty1 !== "" && uj_faculty1 !== originalData?.uj_faculty1) updatePayload.uj_faculty1 = uj_faculty1;
    if (uj_course1 !== "" && uj_course1 !== originalData?.uj_course1) updatePayload.uj_course1 = uj_course1;
    if (uj_faculty2 !== "" && uj_faculty2 !== originalData?.uj_faculty2) updatePayload.uj_faculty2 = uj_faculty2;
    if (uj_course2 !== "" && uj_course2 !== originalData?.uj_course2) updatePayload.uj_course2 = uj_course2;

    if (Object.keys(updatePayload).length === 0) {
      alert("No changes detected.");
      setIsSubmitting(false);
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      
      const { data: existingData } = await supabase
        .from('courses')
        .select('id')
        .eq('id', userId)
        .single();
        
      let dbError;
      if (existingData) {
        const { error } = await supabase
          .from('courses')
          .update(updatePayload)
          .eq('id', userId);
        dbError = error;
      } else {
        const { error } = await supabase
          .from('courses')
          .insert({ id: userId, ...updatePayload });
        dbError = error;
      }

      if (dbError) {
        throw new Error(dbError.message);
      }

      alert('Application submitted successfully!');
      navigate('/application#courses');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex justify-center items-center">
          <p className="text-gray-500 text-lg">Loading your selections...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <section className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Select the courses you would like to apply for University of Johannesburg
          </h1>

          {error && (
            <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} autoComplete='off'>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-center mb-6">
                  University of Johannesburg
                </h3>

                {/* Faculty Option 1 */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-center mb-4">
                    Option 1
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="uj_faculty1" className="block text-sm font-medium text-gray-700 mb-1">
                        Faculty Option 1 *
                      </label>
                      <select
                        id="uj_faculty1"
                        name="uj_faculty1"
                        value={formData.uj_faculty1}
                        onChange={(e) => handleFacultyChange(e.target.value, 'uj_course1', 'uj_faculty1')}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      >
                        <option value="" disabled>Select a faculty</option>
                        <option value="ART, DESIGN AND ARCHITECTURE">ART, DESIGN AND ARCHITECTURE</option>
                        <option value="COLLEGE OF BUSINESS & ECONOMICS">COLLEGE OF BUSINESS & ECONOMICS</option>
                        <option value="EDUCATION">EDUCATION</option>
                        <option value="ENGINEERING & BUILT ENVIRONMENT">ENGINEERING & BUILT ENVIRONMENT</option>
                        <option value="FACULTY OF SCIENCE">FACULTY OF SCIENCE</option>
                        <option value="HUMANITIES">HUMANITIES</option>
                        <option value="LAW">LAW</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="uj_course1" className="block text-sm font-medium text-gray-700 mb-1">
                        Course - Option 1 *
                      </label>
                      <SearchableSelect
                        id="uj_course1"
                        className="form-control"
                        placeholder="Enter course name"
                        value={formData.uj_course1}
                        onChange={(val) => setFormData(prev => ({ ...prev, uj_course1: val }))}
                        options={courses1}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Faculty Option 2 */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-center mb-4">
                    Option 2
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="uj_faculty2" className="block text-sm font-medium text-gray-700 mb-1">
                        Faculty Option 2
                      </label>
                      <select
                        id="uj_faculty2"
                        name="uj_faculty2"
                        value={formData.uj_faculty2}
                        onChange={(e) => handleFacultyChange(e.target.value, 'uj_course2', 'uj_faculty2')}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                      >
                        <option value="" disabled>Select a faculty</option>
                        <option value="ART, DESIGN AND ARCHITECTURE">ART, DESIGN AND ARCHITECTURE</option>
                        <option value="COLLEGE OF BUSINESS & ECONOMICS">COLLEGE OF BUSINESS & ECONOMICS</option>
                        <option value="EDUCATION">EDUCATION</option>
                        <option value="ENGINEERING & BUILT ENVIRONMENT">ENGINEERING & BUILT ENVIRONMENT</option>
                        <option value="FACULTY OF SCIENCE">FACULTY OF SCIENCE</option>
                        <option value="HEALTH SCIENCES">HEALTH SCIENCES</option>
                        <option value="HUMANITIES">HUMANITIES</option>
                        <option value="LAW">LAW</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="uj_course2" className="block text-sm font-medium text-gray-700 mb-1">
                        Course - Option 2
                      </label>
                      <SearchableSelect
                        id="uj_course2"
                        className="form-control"
                        placeholder="Enter course name"
                        value={formData.uj_course2}
                        onChange={(val) => setFormData(prev => ({ ...prev, uj_course2: val }))}
                        options={courses2}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Uj;