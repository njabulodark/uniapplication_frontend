import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { supabase } from '../../helper/SupabaseClient'


// Define TypeScript interface for form data
interface ContactFormData {
  email: string;
  cell_num: string;
  streat_address: string;
  boxnumber: string;
  suburb: string;
  postal_code: string;
  city: string;
  province: string;
}

const Contact: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ContactFormData>({
    email: "",
    cell_num: "",
    streat_address: "",
    boxnumber: "",
    suburb: "",
    postal_code: "",
    city: "",
    province: "",
  });

  const [originalData, setOriginalData] = useState<ContactFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Modify Contact Information";
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
          console.error("Error fetching contact info:", error.message);
          return;
        }

        if (data) {
          const fetched: ContactFormData = {
            email: data.email || "",
            cell_num: data.cell_num || "",
            streat_address: data.streat_address || "",
            boxnumber: data.boxnumber || "",
            suburb: data.suburb || "",
            postal_code: data.postal_code || "",
            city: data.city || "",
            province: data.province || "",
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
    (field: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allFields: (keyof ContactFormData)[] = [
      "email", "cell_num", "streat_address", "boxnumber",
      "suburb", "postal_code", "city", "province",
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
        console.error("Error submitting contact info:", error.message);
        alert("Failed to submit contact information. Please try again.");
        return;
      }

      alert("Contact information submitted successfully!");
      navigate("/my_application#contact");
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
          <h2 className="text-2xl font-bold mb-4 text-center">Modify Contact Information</h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            All fields with a star (*) are required
          </p>

          <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="on">
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange("email")}
                placeholder="e.g *****@gmail.com"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number*
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                minLength={10}
                maxLength={10}
                value={formData.cell_num}
                onChange={handleChange("cell_num")}
                placeholder="e.g 06********"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* Postal Address */}
            <div className="mb-4">
              <label htmlFor="postal" className="block text-sm font-medium text-gray-700 mb-1">
                Postal Address*
              </label>
              <input
                type="text"
                id="postal"
                name="postal"
                value={formData.boxnumber}
                onChange={handleChange("boxnumber")}
                placeholder="PO Box number e.g 2547"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* Physical Address */}
            <div className="mb-4">
              <label htmlFor="physical" className="block text-sm font-medium text-gray-700 mb-1">
                Physical Address*
              </label>
              <input
                type="text"
                id="physical"
                name="physical"
                value={formData.streat_address}
                onChange={handleChange("streat_address")}
                placeholder="Physical Address"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Suburb */}
            <div className="mb-4">
              <label htmlFor="suburb" className="block text-sm font-medium text-gray-700 mb-1">
                Suburb*
              </label>
              <input
                type="text"
                id="suburb"
                name="suburb"
                value={formData.suburb}
                onChange={handleChange("suburb")}
                placeholder="Suburb*"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* Postal Code */}
            <div className="mb-4">
              <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code*
              </label>
              <input
                type="text"
                id="postal_code"
                name="postal_code"
                minLength={4}
                maxLength={4}
                value={formData.postal_code}
                onChange={handleChange("postal_code")}
                placeholder="Postal Code*"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* City */}
            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                Town/City*
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange("city")}
                placeholder="Town/City*"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* Province */}
            <div className="mb-4">
              <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                Select Your Province*
              </label>
              <select
                id="province"
                name="province"
                value={formData.province}
                onChange={handleChange("province")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="" disabled hidden>
                  Province*
                </option>
                <option value="Mpumalanga">Mpumalanga</option>
                <option value="Gauteng">Gauteng</option>
                <option value="NorthWest">North West</option>
                <option value="FreeState">Free State</option>
                <option value="KwaZuluNatal">KwaZulu Natal</option>
                <option value="Limpopo">Limpopo</option>
                <option value="WesternCape">Western Cape</option>
                <option value="EasternCape">Eastern Cape</option>
                <option value="NorthernCape">Northern Cape</option>
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

export default Contact;