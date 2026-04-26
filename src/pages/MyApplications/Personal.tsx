import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { supabase } from '../../helper/SupabaseClient'

// Define TypeScript interfaces
interface PersonalFormData {
  title: string;
  first_name: string;
  middle_name?: string;
  initials: string;
  surname: string;
  identification_number: string;
  email: string;
  date_of_birth?: string;
  gender?: string;
  marriage_status?: string;
  h_language?: string;
  p_language?: string;
  race?: string;
  population?: string;
  disability?: string;
  specify_device?: string;
  school?: string;
  highest_grade?: string;
  examination_number?: string;
  currentActivity?: string;
}

const Personal: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<PersonalFormData>({
    title: "",
    first_name: "",
    middle_name: "",
    initials: "",
    surname: "",
    identification_number: "",
    email: "",
    date_of_birth: "",
    gender: "",
    marriage_status: "",
    h_language: "",
    race: "",
    population: "",
    disability: "",
    specify_device: "",
    school: "",
    highest_grade: "",
    examination_number: "",
    currentActivity: "",
  });

  const [originalData, setOriginalData] = useState<PersonalFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [deviceDisplay, setDeviceDisplay] = useState("none");
  const [examDisplay, setExamDisplay] = useState("none");

  useEffect(() => {
    document.title = "Modify Personal Information";
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
          console.error("Error fetching application:", error.message);
          return;
        }

        if (data) {
          const fetched: PersonalFormData = {
            title: data.title || "",
            first_name: data.first_name || "",
            middle_name: data.middle_name || "",
            initials: data.initials || "",
            surname: data.surname || "",
            identification_number: data.identification_number || "",
            email: data.email || "",
            date_of_birth: data.date_of_birth || "",
            gender: data.gender || "",
            marriage_status: data.marriage_status || "",
            h_language: data.h_language || "",
            race: data.race || "",
            population: data.population || "",
            disability: data.disability || "",
            specify_device: data.specify_device || "",
            school: data.school || "",
            highest_grade: data.highest_grade || "",
            examination_number: data.examination_number || "",
            currentActivity: data.currentActivity || "",
          };

          setFormData(fetched);
          setOriginalData(fetched);

          if (fetched.disability && fetched.disability !== "None") {
            setDeviceDisplay("block");
          }
          if (fetched.highest_grade === "12") {
            setExamDisplay("block");
          }
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
    (field: keyof PersonalFormData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));
      };

  const toggleDeviceField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "None") {
      setDeviceDisplay("block");
    } else {
      setDeviceDisplay("none");
    }
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const grade = e.target.value;
    if (grade === "12") {
      setExamDisplay("block");
    } else {
      setExamDisplay("none");
    }
    setFormData((prev) => ({ ...prev, highest_grade: grade }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allFields: (keyof PersonalFormData)[] = [
      "title", "first_name", "middle_name", "initials", "surname",
      "identification_number", "email", "date_of_birth", "gender",
      "marriage_status", "h_language", "race", "population", "disability",
      "specify_device", "school", "highest_grade", "examination_number",
      "currentActivity",
    ];

    const updatePayload: Record<string, string> = {};

    for (const field of allFields) {
      const currentValue = formData[field] ?? "";
      const originalValue = originalData?.[field] ?? "";

      if (currentValue === "") continue;
      if (currentValue === originalValue) continue;

      if (field === "date_of_birth") {
        updatePayload[field] = currentValue.split("T")[0];
      } else {
        updatePayload[field] = currentValue;
      }
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
        console.error("Error submitting form:", error.message);
        alert("Failed to submit form. Please try again.");
        return;
      }

      alert("Form submitted successfully!");
      navigate("/my_application#personal");
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
          <h2 className="text-2xl font-bold mb-4 text-center">Modify Personal Information</h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            All fields with a star (*) are required
          </p>

          <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="on">
            {/* Title */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Select Your Title*
              </label>
              <select
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange("title")}
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

            {/* First Name */}
            <div className="mb-4">
              <label htmlFor="name1" className="block text-sm font-medium text-gray-700 mb-1">
                First Name*
              </label>
              <input
                type="text"
                id="name1"
                name="name1"
                value={formData.first_name}
                onChange={handleChange("first_name")}
                placeholder="First Name"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* Middle Name */}
            <div className="mb-4">
              <label htmlFor="name2" className="block text-sm font-medium text-gray-700 mb-1">
                Middle Name(s)
              </label>
              <input
                type="text"
                id="name2"
                name="name2"
                value={formData.middle_name || ""}
                onChange={handleChange("middle_name")}
                placeholder="Middle Name(s)"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Initials */}
            <div className="mb-4">
              <label htmlFor="initials" className="block text-sm font-medium text-gray-700 mb-1">
                Initials*
              </label>
              <input
                type="text"
                id="initials"
                name="initials"
                value={formData.initials}
                onChange={handleChange("initials")}
                placeholder="Initials"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* Surname */}
            <div className="mb-4">
              <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
                Surname*
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange("surname")}
                placeholder="E.g Simelani"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* ID Number */}
            <div className="mb-4">
              <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                ID Number (RSA)*
              </label>
              <input
                type="text"
                id="id"
                name="id"
                minLength={13}
                maxLength={13}
                value={formData.identification_number}
                onChange={handleChange("identification_number")}
                placeholder="E.g 9855555613535"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth*
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.date_of_birth || ""}
                onChange={handleChange("date_of_birth")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender*
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange("gender")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="" disabled hidden>
                  Select
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Martial Status */}
            <div className="mb-4">
              <label htmlFor="m_status" className="block text-sm font-medium text-gray-700 mb-1">
                Martial Status*
              </label>
              <select
                id="m_status"
                name="m_status"
                value={formData.marriage_status || ""}
                onChange={handleChange("marriage_status")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="" disabled hidden>
                  Select
                </option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widow/er">Widow/er</option>
              </select>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange("email")}
                placeholder="E.g ******@***.com"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* Home Language */}
            <div className="mb-4">
              <label htmlFor="h_lang" className="block text-sm font-medium text-gray-700 mb-1">
                Home Language*
              </label>
              <select
                id="h_lang"
                name="h_lang"
                value={formData.h_language || ""}
                onChange={handleChange("h_language")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="" disabled hidden>
                  Select
                </option>
                <option value="Afrikaans">Afrikaans</option>
                <option value="English">English</option>
                <option value="Swati">Swati</option>
                <option value="Zulu">Zulu</option>
                <option value="Tshwana">Tshwana</option>
                <option value="Spedi">Spedi</option>
                <option value="Ndebele">Ndebele</option>
                <option value="Swahili">Swahili</option>
                <option value="Sotho">Sotho</option>
                <option value="Tsonga">Tsonga</option>
                <option value="Vhenda">Vhenda</option>
                <option value="Xhosa">Xhosa</option>
              </select>
            </div>

            {/* Race */}
            <div className="mb-4">
              <label htmlFor="race" className="block text-sm font-medium text-gray-700 mb-1">
                Race*
              </label>
              <select
                id="race"
                name="race"
                value={formData.race || ""}
                onChange={handleChange("race")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="" disabled hidden>
                  Select
                </option>
                <option value="African">African</option>
                <option value="Coloured">Coloured</option>
                <option value="Indian">Indian</option>
                <option value="White">White</option>
              </select>
            </div>

            {/* Population Group */}
            <div className="mb-4">
              <label htmlFor="population" className="block text-sm font-medium text-gray-700 mb-1">
                Population Group*
              </label>
              <select
                id="population"
                name="population"
                value={formData.population || ""}
                onChange={handleChange("population")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="" disabled hidden>
                  Select
                </option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Asian">Asian</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Disability */}
            <div className="mb-4">
              <label htmlFor="dKind" className="block text-sm font-medium text-gray-700 mb-1">
                Indicate Disability (if any)
              </label>
              <select
                id="dKind"
                name="dKind"
                onChange={(e) => {
                  handleChange("disability")(e);
                  toggleDeviceField(e);
                }}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="" disabled hidden>
                  Select
                </option>
                <option value="None">None</option>
                <option value="Deaf">Deaf</option>
                <option value="Blind">Blind</option>
                <option value="Speech">Speech</option>
                <option value="Dyslexia">Dyslexia</option>
                <option value="Paraplegic">Paraplegic</option>
                <option value="Quadriplegic">Quadriplegic</option>
                <option value="Impaired Mobility">Impaired Mobility</option>
                <option value="Learning Disability">Learning Disability</option>
                <option value="Attention Deficit Disorder">Attention Deficit Disorder</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Disability Device Field */}
            <div className="mb-4" style={{ display: deviceDisplay }}>
              <label htmlFor="device" className="block text-sm font-medium text-gray-700 mb-1">
                If any disability device is needed, specify it
              </label>
              <input
                type="text"
                id="device"
                name="device"
                value={formData.specify_device || ""}
                onChange={handleChange("specify_device")}
                placeholder="E.g Wheelchair"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* School Name */}
            <div className="mb-4">
              <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
                High School Name*
              </label>
              <input
                type="text"
                id="school"
                name="school"
                value={formData.school || ""}
                onChange={handleChange("school")}
                placeholder="High School Name*"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {/* Highest Grade Passed */}
            <div className="mb-4">
              <label htmlFor="g_passed" className="block text-sm font-medium text-gray-700 mb-1">
                Highest Grade Passed*
              </label>
              <select
                id="g_passed"
                name="g_passed"
                onChange={(e) => {
                  handleChange("highest_grade")(e);
                  handleGradeChange(e);
                }}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="" disabled hidden selected>
                  Select
                </option>
                <option value="12">Grade 12 (Matric)</option>
                <option value="11">Grade 11</option>
                <option value="10">Grade 10</option>
              </select>
            </div>

            {/* Examination Number */}
            <div className="mb-4" style={{ display: examDisplay }}>
              <label htmlFor="examinationN" className="block text-sm font-medium text-gray-700 mb-1">
                Examination Number*
              </label>
              <input
                type="text"
                id="examinationN"
                name="examinationN"
                value={formData.examination_number || ""}
                onChange={handleChange("examination_number")}
                placeholder="E.g 56195498498"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Current Activity */}
            <div className="mb-4">
              <label htmlFor="currentActivity" className="block text-sm font-medium text-gray-700 mb-1">
                Select Your Current Activity*
              </label>
              <select
                id="currentActivity"
                name="currentActivity"
                value={formData.currentActivity || ""}
                onChange={handleChange("currentActivity")}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="" disabled hidden selected>
                  Select
                </option>
                <option value="Schooling">Doing Grade 12</option>
                <option value="Studying">Studying (College/University)</option>
                <option value="Working">Working</option>
                <option value="GapYear">Gap Year</option>
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

export default Personal;