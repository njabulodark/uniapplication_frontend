import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { supabase } from '../../helper/SupabaseClient'


// TypeScript interface for form data
interface GuardianFormData {
  guadian: string;
  guadian_title: string;
  guadian_initials: string;
  guadian_name: string;
  guadian_surname: string;
  guadian_id: string;
  guadian_number: string;
  guadian_email?: string;
  guadian_income: string;
}

const Guardian: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<GuardianFormData>({
    guadian: "",
    guadian_title: "",
    guadian_initials: "",
    guadian_name: "",
    guadian_surname: "",
    guadian_id: "",
    guadian_number: "",
    guadian_email: "",
    guadian_income: "0",
  });

  const [originalData, setOriginalData] = useState<GuardianFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Modify Guardian Information";
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
          console.error("Error fetching guardian info:", error.message);
          return;
        }

        if (data) {
          const fetched: GuardianFormData = {
            guadian: data.guadian || "",
            guadian_title: data.guadian_title || "",
            guadian_initials: data.guadian_initials || "",
            guadian_name: data.guadian_name || "",
            guadian_surname: data.guadian_surname || "",
            guadian_id: data.guadian_id || "",
            guadian_number: data.guadian_number || "",
            guadian_email: data.guadian_email || "",
            guadian_income: data.guadian_income || "0",
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
    (field: keyof GuardianFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allFields: (keyof GuardianFormData)[] = [
      "guadian", "guadian_title", "guadian_initials", "guadian_name",
      "guadian_surname", "guadian_id", "guadian_number", "guadian_email",
      "guadian_income",
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
        console.error("Error submitting guardian info:", error.message);
        alert("Failed to submit guardian information. Please try again.");
        return;
      }

      alert("Guardian information submitted successfully!");
      navigate("/my_application#guadian");
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
          <h2 className="text-2xl font-bold mb-4 text-center">Modify Guardian Information</h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            All fields with a star (*) are required
          </p>

          <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="on">
            {/* Relationship */}
            <div className="mb-4">
              <label htmlFor="relation" className="block text-sm font-medium text-gray-700 mb-1">
                Select Relation With Guardian*
              </label>
              <select
                id="relation"
                name="relation"
                value={formData.guadian}
                onChange={handleChange("guadian")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="" disabled hidden>
                  Relationship*
                </option>
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Guardian">Guardian</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Title */}
            <div className="mb-4">
              <label htmlFor="kin_title" className="block text-sm font-medium text-gray-700 mb-1">
                Guardian Title*
              </label>
              <select
                id="kin_title"
                name="kin_title"
                value={formData.guadian_title}
                onChange={handleChange("guadian_title")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="" disabled hidden>
                  Title*
                </option>
                <option value="Mr">Mr</option>
                <option value="Ms">Ms</option>
                <option value="Mrs">Mrs</option>
              </select>
            </div>

            {/* Initials */}
            <div className="mb-4">
              <label htmlFor="kin_initials" className="block text-sm font-medium text-gray-700 mb-1">
                Guardian Initials*
              </label>
              <input
                type="text"
                id="kin_initials"
                name="kin_initials"
                maxLength={4}
                value={formData.guadian_initials}
                onChange={handleChange("guadian_initials")}
                placeholder="Initials*"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* Name */}
            <div className="mb-4">
              <label htmlFor="kin_name" className="block text-sm font-medium text-gray-700 mb-1">
                Guardian Name*
              </label>
              <input
                type="text"
                id="kin_name"
                name="kin_name"
                value={formData.guadian_name}
                onChange={handleChange("guadian_name")}
                placeholder="Name*"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* Surname */}
            <div className="mb-4">
              <label htmlFor="kin_surname" className="block text-sm font-medium text-gray-700 mb-1">
                Guardian Surname*
              </label>
              <input
                type="text"
                id="kin_surname"
                name="kin_surname"
                value={formData.guadian_surname}
                onChange={handleChange("guadian_surname")}
                placeholder="Surname*"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* ID Number */}
            <div className="mb-4">
              <label htmlFor="kin_id" className="block text-sm font-medium text-gray-700 mb-1">
                Guardian ID*
              </label>
              <input
                type="text"
                id="kin_id"
                name="kin_id"
                minLength={13}
                maxLength={13}
                value={formData.guadian_id}
                onChange={handleChange("guadian_id")}
                placeholder="ID Number (RSA)*"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label htmlFor="kin_phone" className="block text-sm font-medium text-gray-700 mb-1">
                Guardian Phone Number*
              </label>
              <input
                type="tel"
                id="kin_phone"
                name="kin_phone"
                minLength={10}
                maxLength={10}
                value={formData.guadian_number}
                onChange={handleChange("guadian_number")}
                placeholder="Phone Number*"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="kin_email" className="block text-sm font-medium text-gray-700 mb-1">
                Guardian Email
              </label>
              <input
                type="email"
                id="kin_email"
                name="kin_email"
                value={formData.guadian_email || ""}
                onChange={handleChange("guadian_email")}
                placeholder="Email"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Monthly Income */}
            <div className="mb-4">
              <label htmlFor="kin_income" className="block text-sm font-medium text-gray-700 mb-1">
                Guardian Income Per Month
              </label>
              <input
                type="text"
                id="kin_income"
                name="kin_income"
                value={formData.guadian_income}
                onChange={handleChange("guadian_income")}
                placeholder="Income per month"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
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

export default Guardian;