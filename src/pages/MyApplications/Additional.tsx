import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { supabase } from '../../helper/SupabaseClient'


// Define TypeScript interface for form data
interface AdditionalFormData {
  education_department: string;
  examination_number: string;
  matric_year: string;
  matric_upgrading: string;
  matric_completed: string;
  application_year: string;
  presentation_method: string;
}

const Additional: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AdditionalFormData>({
    education_department: "",
    examination_number: "",
    matric_year: "",
    matric_upgrading: "",
    matric_completed: "",
    application_year: "",
    presentation_method: "",
  });

  const [originalData, setOriginalData] = useState<AdditionalFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    document.title = "Modify Additional Information";
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const { data, error } = await supabase
          .from("applications")
          .select("*")
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Error fetching additional info:", error.message);
          return;
        }

        if (data) {
          const fetched: AdditionalFormData = {
            education_department: data.education_department || "",
            examination_number: data.examination_number || "",
            matric_year: data.matric_year || "",
            matric_upgrading: data.matric_upgrading || "",
            matric_completed: data.matric_completed || "",
            application_year: data.application_year || "",
            presentation_method: data.presentation_method || "",
          };

          setFormData(fetched);
          setOriginalData(fetched);
        }
      } catch (err) {
        console.error("Unexpected error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange =
    (field: keyof AdditionalFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allFields: (keyof AdditionalFormData)[] = [
      "education_department", "examination_number", "matric_year",
      "matric_upgrading", "matric_completed", "application_year",
      "presentation_method",
    ];

    const updatePayload: Record<string, string> = {};

    for (const field of allFields) {
      const currentValue = formData[field] ?? "";
      const originalValue = originalData?.[field] ?? "";

      if (currentValue === "") continue;
      if (currentValue === originalValue) continue;

      updatePayload[field] = currentValue;
    }

    if (Object.keys(updatePayload).length === 0) {
      alert("No changes detected.");
      return;
    }

    try {
      const { error } = await supabase
        .from("applications")
        .update(updatePayload)
        .eq("id", localStorage.getItem("userId"));

      if (error) {
        console.error("Error submitting additional info:", error.message);
        alert("Failed to submit additional information. Please try again.");
        return;
      }

      alert("Additional information submitted successfully!");
      navigate("/my_application#additional");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex justify-center items-center">
          <p className="text-gray-500 text-lg">Loading your information...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex justify-center items-center py-10 bg-gray-50">
        <section className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Modify Additional Information</h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            All fields with a star (*) are required
          </p>

          <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="on">
            {/* Examination Number */}
            <div className="mb-4">
              <label htmlFor="examinationN" className="block text-sm font-medium text-gray-700 mb-1">
                Examination number
              </label>
              <input
                type="text"
                id="examinationN"
                name="examinationN"
                value={formData.examination_number}
                onChange={handleChange("examination_number")}
                placeholder="Examination number"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Education Department */}
            <div className="mb-4">
              <label htmlFor="educationDep" className="block text-sm font-medium text-gray-700 mb-1">
                Education Department*
              </label>
              <select
                id="educationDep"
                name="educationDep"
                value={formData.education_department}
                onChange={handleChange("education_department")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="" disabled hidden>
                  Select*
                </option>
                <option value="EC">Eastern Cape Education Department</option>
                <option value="FS">Free State Education Department</option>
                <option value="GT">Gauteng Education Department</option>
                <option value="GA">Gauteng Education Department</option>
                <option value="KZ">Kwazulu Natal Education Department</option>
                <option value="NP">Northern Province Education Department</option>
                <option value="MP">Mpumalanga Education Department</option>
                <option value="NW">North West Education Department</option>
                <option value="NC">Northern Cape Education Department</option>
                <option value="WC">Western Cape Education Department</option>
                <option value="AE">Associated Examining Board</option>
                <option value="LP">Limpopo Province</option>
                <option value="CL">Cambridge Local Examinations</option>
                <option value="OT">Other</option>
                <option value="NE">Department of National Education</option>
                <option value="FO">International (Outside South Africa)</option>
              </select>
            </div>

            {/* Presentation Method */}
            <div className="mb-4">
              <label htmlFor="presentM" className="block text-sm font-medium text-gray-700 mb-1">
                Presentation Method*
              </label>
              <select
                id="presentM"
                name="presentM"
                value={formData.presentation_method}
                onChange={handleChange("presentation_method")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="" disabled hidden>
                  Select*
                </option>
                <option value="contact">Contact</option>
                <option value="distant">Distant</option>
              </select>
            </div>

            {/* Matric Year */}
            <div className="mb-4">
              <label htmlFor="matricYear" className="block text-sm font-medium text-gray-700 mb-1">
                Matric year*
              </label>
              <select
                id="matricYear"
                name="matricYear"
                value={formData.matric_year}
                onChange={handleChange("matric_year")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="" disabled hidden>
                  select*
                </option>
                {Array.from({ length: 20 }, (_, i) => currentYear - 19 + i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Upgrading Matric Results */}
            <div className="mb-4">
              <label htmlFor="upgrade" className="block text-sm font-medium text-gray-700 mb-1">
                Are you upgrading your matric results*
              </label>
              <select
                id="upgrade"
                name="upgrade"
                value={formData.matric_upgrading}
                onChange={handleChange("matric_upgrading")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="" disabled hidden>
                  select*
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Matric Completed */}
            <div className="mb-4">
              <label htmlFor="matricComplete" className="block text-sm font-medium text-gray-700 mb-1">
                Have you completed your matric*
              </label>
              <select
                id="matricComplete"
                name="matricComplete"
                value={formData.matric_completed}
                onChange={handleChange("matric_completed")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="" disabled hidden>
                  select*
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Application Year */}
            <div className="mb-4">
              <label htmlFor="applicationYear" className="block text-sm font-medium text-gray-700 mb-1">
                Application year*
              </label>
              <select
                id="applicationYear"
                name="applicationYear"
                value={formData.application_year}
                onChange={handleChange("application_year")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="" disabled hidden>
                  select*
                </option>
                <option value={currentYear}>{currentYear}</option>
                <option value={currentYear + 1}>{currentYear + 1}</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Additional;