import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { supabase } from '../../helper/SupabaseClient'
import SearchableSelect from "../../components/SearchableSelect";

// Course options grouped by campus
const coursesByCampus = {
  mahikeng: [
    "BA IN COMMUNICATION (1GC H01 1)",
    "BA IN HUMANITIES WITH ENGLISH (1GS H10 1)",
    "BA IN HUMANITIES WITH FRENCH (1GS H11 1)",
    "BA IN HUMANITIES WITH GEOGRAPHY (1GS H08 1)",
    "BA IN HUMANITIES WITH HISTORY (1GS H07 1)",
    "BA IN HUMANITIES WITH PHILOSOPHY (1GS H20 1)",
    "BA IN HUMANITIES WITH PSYCHOLOGY (1GS H05 1)",
    "BA IN HUMANITIES WITH SETSWANA (1GS H15 1)",
    "BA IN HUMANITIES WITH SOCIOLOGY (1GS H19 1)",
    "BA IN LANGUAGE AND LITERARY STUDIES (1GM H16 1)",
    "BACHELOR OF SOCIAL WORK (8EW K01 1)",
    "BCOM IN CHARTERED ACCOUNTANCY (5DA H01 1)",
    "BSC IN AGRICULTURE WITH AGRICULTURAL ECONOMICS (2FD K01 1)",
    "BSC IN ENVIRONMENTAL SCIENCES WITH BOTANY & CHEMISTRY (2DJ H03 1)",
    "BSC WITH PHYSICS AND COMPUTER SCIENCE (2FF H25 1)",
    // Add more as needed
  ],
  potchefstroom: [
    "BA IN ANCIENT LANGUAGES (3BB H04 1)",
    "BA IN BEHAVIOURAL SCIENCES WITH PSYCHOLOGY & LRM (1GR H02 1)",
    "BA IN COMMUNICATION (1GC H01 1)",
    "BA IN GRAPHIC DESIGN (1DN K01 1)",
    "BA IN HUMANITIES WITH AFRIKAANS AND DUTCH (1GS H09 1)",
    "BA IN HUMANITIES WITH ENGLISH (1GS H10 1)",
    "BA IN HUMANITIES WITH GERMAN (1GS H12 1)",
    "BA IN HUMANITIES WITH HISTORY OF ART (1GS H13 1)",
    "BA IN LAW WITH INDUSTRIAL PSYCHOLOGY (6DC H03 1)",
    "BSC IN ACTUARIAL SCIENCE (2FQ H01 1)",
    "BSC IN DIETETICS (8EL K01 1)",
    "BSC WITH COMPUTER SCIENCE AND STATISTICS (2FF H26 1)",
    // Add more as needed
  ],
  vanderbijlpark: [
    "BA IN BEHAVIOURAL SCIENCES WITH PSYCHOLOGY & LRM (1GR H02 1)",
    "BA IN BEHAVIOURAL SCIENCES WITH SOCIOLOGY AND PSYCHOLOGY (1GR H01 1)",
    "BA IN COMMUNICATION (1GC H01 1)",
    "BA IN HUMANITIES WITH AFRIKAANS AND DUTCH (1GS H09 1)",
    "BA IN HUMANITIES WITH ENGLISH (1GS H10 1)",
    "BA IN HUMANITIES WITH FRENCH (1GS H11 1)",
    "BA IN HUMANITIES WITH POLITICAL SCIENCE (1GS H17 1)",
    "BSC IN BUSINESS ANALYTICS (2FR H01 1)",
    "BSC IN FINANCIAL MATHEMATICS (2FS H01 1)",
    "BSC WITH COMPUTER SCIENCE AND ECONOMICS (2FF H28 1)",
    // Add more as needed
  ],
};

// TypeScript interface for form data
interface NwuFormData {
  nwu_campus1?: string;
  nwu_course1?: string;
  nwu_campus2?: string;
  nwu_course2?: string;
}

const Nwu: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<NwuFormData>({
    nwu_campus1: "",
    nwu_course1: "",
    nwu_campus2: "",
    nwu_course2: "",
  });

  const [courses1, setCourses1] = useState<string[]>([]);
  const [courses2, setCourses2] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "NWU course";
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleCampusChange = (
    campusField: keyof Pick<NwuFormData, "nwu_campus1" | "nwu_campus2">,
    courseField: keyof Pick<NwuFormData, "nwu_course1" | "nwu_course2">
  ) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const campus = e.target.value;
      const courseList = coursesByCampus[e.target.value as keyof typeof coursesByCampus] || [];
      
      if (campusField === "nwu_campus1") {
        setCourses1(courseList);
        setFormData(prev => ({ 
          ...prev, 
          [campusField]: campus,
          [courseField]: "" // Reset course when campus changes
        }));
      } else {
        setCourses2(courseList);
        setFormData(prev => ({ 
          ...prev, 
          [campusField]: campus,
          [courseField]: "" // Reset course when campus changes
        }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const { nwu_campus1, nwu_course1 } = formData;

    // Validate required fields
    if (!nwu_campus1 || !nwu_course1) {
      setError("Please select both campus and course for your first option");
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("courses")
        .update({
          nwu_campus1,
          nwu_course1,
          nwu_campus2: formData.nwu_campus2 || null,
          nwu_course2: formData.nwu_course2 || null,
        })
        .eq("id", localStorage.getItem("userId"));

      if (error) {
        console.error("Error submitting NWU course info:", error.message);
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
            Select the courses you would like to apply for NWU
          </h1>

          {error && (
            <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off">
            {/* Campus Option 1 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-center mb-4">University of North West - Option 1</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="nwu_campus1" className="block text-sm font-medium text-gray-700 mb-1">
                    Campus option 1 *
                  </label>
                  <select
                    id="nwu_campus1"
                    name="nwu_campus1"
                    onChange={handleCampusChange("nwu_campus1", "nwu_course1")}
                    value={formData.nwu_campus1}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="mahikeng">Mahikeng</option>
                    <option value="potchefstroom">Potchefstroom</option>
                    <option value="vanderbijlpark">Vanderbijlpark</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="nwu_course1" className="block text-sm font-medium text-gray-700 mb-1">
                    Course - Option 1 *
                  </label>
                  <SearchableSelect
                    id="nwu_course1"
                    className="form-control"
                    placeholder="Enter course name"
                    value={formData.nwu_course1 || ""}
                    onChange={(val) => setFormData(prev => ({ ...prev, nwu_course1: val }))}
                    options={courses1}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Campus Option 2 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-center mb-4">University of North West - Option 2</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="nwu_campus2" className="block text-sm font-medium text-gray-700 mb-1">
                    Campus option 2
                  </label>
                  <select
                    id="nwu_campus2"
                    name="nwu_campus2"
                    onChange={handleCampusChange("nwu_campus2", "nwu_course2")}
                    value={formData.nwu_campus2}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="mahikeng">Mahikeng</option>
                    <option value="potchefstroom">Potchefstroom</option>
                    <option value="vanderbijlpark">Vanderbijlpark</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="nwu_course2" className="block text-sm font-medium text-gray-700 mb-1">
                    Course - Option 2
                  </label>
                  <SearchableSelect
                    id="nwu_course2"
                    className="form-control"
                    placeholder="Enter course name"
                    value={formData.nwu_course2 || ""}
                    onChange={(val) => setFormData(prev => ({ ...prev, nwu_course2: val }))}
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

export default Nwu;