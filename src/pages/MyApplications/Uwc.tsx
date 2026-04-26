import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { supabase } from '../../helper/SupabaseClient';
import SearchableSelect from "../../components/SearchableSelect";

// Course options grouped by faculty
const coursesByFaculty = {
  ART: [
    "Occasional - Non Degree",
    "BTh",
    "BA",
    "BLIS Library and Information Studies",
  ],
  CHS: [
    "Bachelor of Nursing",
    "BHSc Physiotherapy",
    "BHSc Occupational Therapy",
    "BHSc Dietetics",
  ],
  DEN: ["BDS Dentistry"],
  EDU: [
    "BEd Acc(FET) & EMS & Maths(SP)",
    "BEd Languages(FET) & Life Orientation(SP)",
    "BEd Languages(FET) & Maths(SP)",
    "BEd Languages(FET) & Social Sciences(SP)",
    "BEd MLIT(FET) & Maths & Nat Sciences(SP)",
    "BEd (Foundation Phase Teaching)",
  ],
  EMS: [
    "BCom Economics",
    "BCom Accounting",
    "BCom Management",
    "BCom Human Resource Management",
  ],
  LAW: [
    "LLB",
    "BA Law",
    "BA Criminology and Security Science",
    "BA International Relations",
  ],
  SCI: [
    "BSc Biotechnology",
    "BSc Applied Geology",
    "BSc Biodiversity & Conservation Biology",
    "BSc Chemical Sciences",
    "BSc Computer Science",
    "BSc Mathematics & Statistical Science",
    "BSc Medical Bioscience",
    "BSc Physical Science",
    "BPharm (N)",
    "BSc Environmental & Water Science",
  ],
};

// TypeScript interface for form data
interface UwcFormData {
  uwc_faculty1?: string;
  uwc_course1?: string;
  uwc_faculty2?: string;
  uwc_course2?: string;
}

const Uwc: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UwcFormData>({
    uwc_faculty1: "",
    uwc_course1: "",
    uwc_faculty2: "",
    uwc_course2: "",
  });

  const [courses1, setCourses1] = useState<string[]>([]);
  const [courses2, setCourses2] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "UWC course";
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleFacultyChange = (
    facultyField: keyof Pick<UwcFormData, "uwc_faculty1" | "uwc_faculty2">,
    courseField: keyof Pick<UwcFormData, "uwc_course1" | "uwc_course2">
  ) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const faculty = e.target.value;
      const courseList = coursesByFaculty[faculty as keyof typeof coursesByFaculty] || [];
      
      if (facultyField === "uwc_faculty1") {
        setCourses1(courseList);
        setFormData(prev => ({ 
          ...prev, 
          [facultyField]: faculty,
          [courseField]: "" // Reset course when faculty changes
        }));
      } else {
        setCourses2(courseList);
        setFormData(prev => ({ 
          ...prev, 
          [facultyField]: faculty,
          [courseField]: "" // Reset course when faculty changes
        }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const { uwc_faculty1, uwc_course1 } = formData;

    // Validate required fields
    if (!uwc_faculty1 || !uwc_course1) {
      setError("Please select both faculty and course for your first option");
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("courses")
        .update({
          uwc_faculty1,
          uwc_course1,
          uwc_faculty2: formData.uwc_faculty2 || null,
          uwc_course2: formData.uwc_course2 || null,
        })
        .eq("id", localStorage.getItem("userId"));

      if (error) {
        console.error("Error submitting UWC course info:", error.message);
        setError("Failed to submit course information. Please try again.");
        return;
      }

      alert("Course information submitted successfully!");
      navigate("/my_application#courses");
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex justify-center items-center py-10 bg-gray-100">
        <section className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6">
            Select the courses you would like to apply for University of Western Cape
          </h1>

          {error && (
            <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off">
            {/* Faculty Option 1 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-center mb-4">University of Western Cape - Option 1</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="uwc_faculty1" className="block text-sm font-medium text-gray-700 mb-1">
                    Faculty option 1 *
                  </label>
                  <select
                    id="uwc_faculty1"
                    name="uwc_faculty1"
                    onChange={handleFacultyChange("uwc_faculty1", "uwc_course1")}
                    value={formData.uwc_faculty1}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="ART">FACULTY OF ARTS AND HUMANITIES</option>
                    <option value="CHS">FACULTY OF COMMUNITY AND HEALTH SCIENCES</option>
                    <option value="DEN">FACULTY OF DENTISTRY</option>
                    <option value="EDU">FACULTY OF EDUCATION</option>
                    <option value="EMS">FACULTY OF ECONOMIC AND MANAGEMENT SCIENCES</option>
                    <option value="LAW">FACULTY OF LAW</option>
                    <option value="SCI">FACULTY OF NATURAL SCIENCES</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="uwc_course1" className="block text-sm font-medium text-gray-700 mb-1">
                    Course - Option 1 *
                  </label>
                  <SearchableSelect
                    id="uwc_course1"
                    className="form-control"
                    placeholder="Enter course name"
                    value={formData.uwc_course1 || ""}
                    onChange={(val) => setFormData(prev => ({ ...prev, uwc_course1: val }))}
                    options={courses1}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Faculty Option 2 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-center mb-4">University of Western Cape - Option 2</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="uwc_faculty2" className="block text-sm font-medium text-gray-700 mb-1">
                    Faculty option 2
                  </label>
                  <select
                    id="uwc_faculty2"
                    name="uwc_faculty2"
                    onChange={handleFacultyChange("uwc_faculty2", "uwc_course2")}
                    value={formData.uwc_faculty2}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="ART">FACULTY OF ARTS AND HUMANITIES</option>
                    <option value="CHS">FACULTY OF COMMUNITY AND HEALTH SCIENCES</option>
                    <option value="DEN">FACULTY OF DENTISTRY</option>
                    <option value="EDU">FACULTY OF EDUCATION</option>
                    <option value="EMS">FACULTY OF ECONOMIC AND MANAGEMENT SCIENCES</option>
                    <option value="LAW">FACULTY OF LAW</option>
                    <option value="SCI">FACULTY OF NATURAL SCIENCES</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="uwc_course2" className="block text-sm font-medium text-gray-700 mb-1">
                    Course - Option 2
                  </label>
                  <SearchableSelect
                    id="uwc_course2"
                    className="form-control"
                    placeholder="Enter course name"
                    value={formData.uwc_course2 || ""}
                    onChange={(val) => setFormData(prev => ({ ...prev, uwc_course2: val }))}
                    options={courses2}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition duration-200 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Uwc;