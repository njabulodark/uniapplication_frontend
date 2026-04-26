import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../helper/SupabaseClient';
import SearchableSelect from '../../components/SearchableSelect';
import courses from './courses.json';

// Get unique course names for searching
const courseNames = [...new Set(courses.map(course => course.name))];

// TypeScript interface for form data
interface CaoFormData {
  cao_course?: string[];
  cao_institution?: string[];
  cao_campus?: string[];
}

const Cao: React.FC = () => {
  const navigate = useNavigate();
  const numOptions = 6; // Number of options to display

  // Initialize form data with arrays for each option
  const initialFormData: CaoFormData = {
    cao_course: Array(numOptions).fill(''),
    cao_institution: Array(numOptions).fill(''),
    cao_campus: Array(numOptions).fill('')
  };

  const [formData, setFormData] = useState<CaoFormData>(initialFormData);
  const [originalData, setOriginalData] = useState<CaoFormData | null>(null);
  const [availableInstitutions, setAvailableInstitutions] = useState<string[][]>(Array(numOptions).fill([]));
  const [availableCampuses, setAvailableCampuses] = useState<string[][]>(Array(numOptions).fill([]));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeOption, setActiveOption] = useState(0); // Track which option is being edited
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "CAO course selection";
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const { data, error: fetchErr } = await supabase
          .from("courses")
          .select("*")
          .eq("id", userId)
          .single();

        if (fetchErr && fetchErr.code !== 'PGRST116') {
          console.error("Error fetching CAO info:", fetchErr.message);
        }

        if (data) {
          const fetchedData: CaoFormData = {
            cao_course: Array(numOptions).fill(''),
            cao_institution: Array(numOptions).fill(''),
            cao_campus: Array(numOptions).fill('')
          };

          for (let i = 0; i < numOptions; i++) {
            fetchedData.cao_course![i] = data[`cao_course${i + 1}`] || '';
            fetchedData.cao_institution![i] = data[`cao_institution${i + 1}`] || '';
            fetchedData.cao_campus![i] = data[`cao_campus${i + 1}`] || '';
          }

          setFormData(fetchedData);
          setOriginalData(fetchedData);

          const newAvailInst = Array(numOptions).fill([]);
          const newAvailCamp = Array(numOptions).fill([]);

          for (let i = 0; i < numOptions; i++) {
            if (fetchedData.cao_course![i]) {
              const insts = courses
                .filter(c => c.name === fetchedData.cao_course![i])
                .map(c => c.institution);
              newAvailInst[i] = [...new Set(insts)];
              
              if (fetchedData.cao_institution![i]) {
                const camps = courses
                  .filter(c => 
                    c.name === fetchedData.cao_course![i] && 
                    c.institution === fetchedData.cao_institution![i]
                  )
                  .map(c => c.campus);
                newAvailCamp[i] = [...new Set(camps)];
              }
            }
          }
          
          setAvailableInstitutions(newAvailInst);
          setAvailableCampuses(newAvailCamp);
        }
      } catch (err) {
        console.error("Unexpected error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // When a course is selected, update available institutions
  const handleCourseSelect = (courseName: string, index: number) => {
    // Find all institutions offering this course
    const institutions = courses
      .filter(course => course.name === courseName)
      .map(course => course.institution);

    // Remove duplicates
    const uniqueInstitutions = [...new Set(institutions)];

    // Update form data
    const newCourseData = [...(formData.cao_course || [])];
    newCourseData[index] = courseName;

    const newInstitutionData = [...(formData.cao_institution || [])];
    newInstitutionData[index] = "";

    const newCampusData = [...(formData.cao_campus || [])];
    newCampusData[index] = "";

    setFormData({
      cao_course: newCourseData,
      cao_institution: newInstitutionData,
      cao_campus: newCampusData
    });

    // Update available institutions
    const newAvailableInstitutions = [...availableInstitutions];
    newAvailableInstitutions[index] = uniqueInstitutions;
    setAvailableInstitutions(newAvailableInstitutions);

    // Update available campuses
    const newAvailableCampuses = [...availableCampuses];
    newAvailableCampuses[index] = [];
    setAvailableCampuses(newAvailableCampuses);

    // Set this option as active
    setActiveOption(index);
  };

  // When an institution is selected, update available campuses
  const handleInstitutionSelect = (institution: string, index: number) => {
    const courseName = formData.cao_course?.[index] || '';

    if (!courseName) return;

    // Find campuses for this course and institution
    const campuses = courses
      .filter(course =>
        course.name === courseName &&
        course.institution === institution
      )
      .map(course => course.campus);

    // Remove duplicates
    const uniqueCampuses = [...new Set(campuses)];

    // Update form data
    const newInstitutionData = [...(formData.cao_institution || [])];
    newInstitutionData[index] = institution;

    const newCampusData = [...(formData.cao_campus || [])];
    newCampusData[index] = "";

    setFormData({
      ...formData,
      cao_institution: newInstitutionData,
      cao_campus: newCampusData
    });

    // Update available campuses
    const newAvailableCampuses = [...availableCampuses];
    newAvailableCampuses[index] = uniqueCampuses;
    setAvailableCampuses(newAvailableCampuses);

    // Set this option as active
    setActiveOption(index);
  };

  const handleCampusSelect = (campus: string, index: number) => {
    const newCampusData = [...(formData.cao_campus || [])];
    newCampusData[index] = campus;

    setFormData({
      ...formData,
      cao_campus: newCampusData
    });

    // Set this option as active
    setActiveOption(index);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate required fields for option 1 MUST be filled out
    if (!formData.cao_course?.[0] || !formData.cao_institution?.[0] || !formData.cao_campus?.[0]) {
      setError("Please complete all selections for your first option");
      setIsSubmitting(false);
      return;
    }

    const submissionData: Record<string, string> = {};

    for (let i = 0; i < numOptions; i++) {
        const cCourse = formData.cao_course?.[i] ?? '';
        const oCourse = originalData?.cao_course?.[i] ?? '';
        if (cCourse !== "" && cCourse !== oCourse) {
           submissionData[`cao_course${i+1}`] = cCourse;
        }

        const cInst = formData.cao_institution?.[i] ?? '';
        const oInst = originalData?.cao_institution?.[i] ?? '';
        if (cInst !== "" && cInst !== oInst) {
           submissionData[`cao_institution${i+1}`] = cInst;
        }

        const cCampus = formData.cao_campus?.[i] ?? '';
        const oCampus = originalData?.cao_campus?.[i] ?? '';
        if (cCampus !== "" && cCampus !== oCampus) {
           submissionData[`cao_campus${i+1}`] = cCampus;
        }
    }

    if (Object.keys(submissionData).length === 0) {
      alert("No changes detected.");
      setIsSubmitting(false);
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      
      const { data: existingData } = await supabase
        .from("courses")
        .select("id")
        .eq("id", userId)
        .single();
        
      let error;
      if (existingData) {
        const { error: updateError } = await supabase
          .from("courses")
          .update(submissionData)
          .eq("id", userId);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from("courses")
          .insert({ id: userId, ...submissionData });
        error = insertError;
      }

      if (error) {
        console.error("Error submitting CAO course info:", error.message);
        setError("Failed to submit course information. Please try again.");
        return;
      }

      alert("Course information submitted successfully!");
      navigate("/application#courses");
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please try again.");
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

  // Render option sections
  const renderOptions = () => {
    return Array.from({ length: numOptions }, (_, index) => (
      <div
        key={index}
        className={`mb-8 p-4 rounded-lg border-2 ${activeOption === index
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200"
          } transition-all`}
        onClick={() => setActiveOption(index)}
      >
        <h3 className="text-xl font-semibold mb-4 pb-2 border-b">
          CAO Application - Option {index + 1}
          {index === 0 && <span className="text-red-500 ml-2">*</span>}
        </h3>

        <div className="space-y-4">
          {/* Course Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search and Select Course {index === 0 && <span className="text-red-500">*</span>}
            </label>
            <SearchableSelect
              id={`cao_course_${index}`}
              className="form-control"
              placeholder="Search courses..."
              value={formData.cao_course?.[index] || ""}
              onChange={(val) => handleCourseSelect(val, index)}
              options={courseNames}
              required={index === 0}
            />
          </div>

          {/* Institution Selection */}
          {formData.cao_course?.[index] && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Institution {index === 0 && <span className="text-red-500">*</span>}
              </label>
              <select
                value={formData.cao_institution?.[index] || ""}
                onChange={(e) => handleInstitutionSelect(e.target.value, index)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required={index === 0}
              >
                <option value="" disabled>Select an institution</option>
                {availableInstitutions[index]?.map((institution, i) => (
                  <option key={i} value={institution}>
                    {institution}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Campus Selection */}
          {formData.cao_institution?.[index] && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Campus {index === 0 && <span className="text-red-500">*</span>}
              </label>
              <select
                value={formData.cao_campus?.[index] || ""}
                onChange={(e) => handleCampusSelect(e.target.value, index)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required={index === 0}
              >
                <option value="" disabled>Select a campus</option>
                {availableCampuses[index]?.map((campus, i) => (
                  <option key={i} value={campus}>
                    {campus}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-10 bg-gray-100">
        <section className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-2xl font-bold text-center mb-6">
              Select the courses you would like to apply through CAO
            </h1>

            {error && (
              <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete='off'>
              <div className="mb-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h2 className="text-lg font-semibold text-blue-800 mb-2">Instructions</h2>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Search and select courses for up to 6 options</li>
                    <li>Option 1 is required - you must select course, institution, and campus</li>
                    <li>Options 2-6 are optional but recommended</li>
                    <li>Click on any option section to make it active</li>
                  </ul>
                </div>

                {renderOptions()}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cao;