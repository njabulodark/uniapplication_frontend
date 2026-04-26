import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { supabase } from '../../helper/SupabaseClient';
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { BookOpen, GraduationCap, Percent, ChevronDown } from "lucide-react";
// Define subject options for dropdowns
const subjects = [
  "ABITUR CHEMISTRY",
  "ABITUR BIOLOGY",
  "ABITUR FRENCH FIRST ADDIT",
  "ABITUR GERMAN HOME LANGUA",
  "ABITUR HISTORY",
  "ABITUR MATHEMATICS",
  "Accounting",
  "Agricultural Management Practices",
  "Agricultural Sciences",
  "Agricultural Technology",
  "Ancient Greek",
  "Arabic First Additional",
  "Arabic Home",
  "Arabic Second Additional",
  "Art",
  "Automotive Repair and Maintenance",
  "Biology",
  "Business Studies",
  "Chemistry",
  "Civil Technology",
  "Classical Civilisation",
  "Computer Applications Technology",
  "Computer Programming",
  "Computer Science",
  "Consumer Studies",
  "Dance Studies",
  "Design",
  "Drama",
  "Economics",
  "Electrical Technology",
  "Engineering Graphics and Design",
  "English First Additional",
  "English Home Language",
  "French First Additional",
  "Geography",
  "German First Additional",
  "History",
  "Hospitality Studies",
  "Information Technology",
  "IsiNdebele First Additional",
  "IsiNdebele Home",
  "IsiXhosa First Additional",
  "IsiXhosa Home",
  "IsiZulu First Additional",
  "IsiZulu Home",
  "Life Orientation",
  "Life Sciences",
  "Mathematical Literacy",
  "Mathematics",
  "Mechanical Technology",
  "Music",
  "Physical Sciences",
  "Religion Studies",
  "Sepedi First Additional",
  "Sepedi Home",
  "Sesotho First Additional",
  "Sesotho Home",
  "Setswana First Additional",
  "Setswana Home",
  "Sign Language Home",
  "Social Sciences",
  "Sociology",
  "Spanish First Additional",
  "Technical Mathematics",
  "Technical Sciences",
  "Technology",
  "Tourism",
  "Visual Arts",
  "Xitsonga First Additional",
  "Xitsonga Home",
];

// TypeScript interface for form data
interface SubjectFormData {
  subject1?: string;
  subject2?: string;
  subject3?: string;
  subject4?: string;
  subject5?: string;
  subject6?: string;
  subject7?: string;
  subject8?: string;
  subject9?: string;
  level1?: string;
  level2?: string;
  level3?: string;
  level4?: string;
  level5?: string;
  level6?: string;
  level7?: string;
  level8?: string;
  level9?: string;
  percentage1?: string;
  percentage2?: string;
  percentage3?: string;
  percentage4?: string;
  percentage5?: string;
  percentage6?: string;
  percentage7?: string;
  percentage8?: string;
  percentage9?: string;
}

const Subjects: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SubjectFormData>({
    subject1: "", subject2: "", subject3: "", subject4: "", subject5: "",
    subject6: "", subject7: "", subject8: "", subject9: "",
    level1: "", level2: "", level3: "", level4: "", level5: "",
    level6: "", level7: "", level8: "", level9: "",
    percentage1: "", percentage2: "", percentage3: "", percentage4: "", percentage5: "",
    percentage6: "", percentage7: "", percentage8: "", percentage9: "",
  });

  const [originalData, setOriginalData] = useState<SubjectFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Modify Subjects Information";
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
          console.error("Error fetching subjects:", error.message);
          return;
        }

        if (data) {
          const fetched: SubjectFormData = {
            subject1: data.subject1 || "", subject2: data.subject2 || "", subject3: data.subject3 || "",
            subject4: data.subject4 || "", subject5: data.subject5 || "", subject6: data.subject6 || "",
            subject7: data.subject7 || "", subject8: data.subject8 || "", subject9: data.subject9 || "",
            level1: data.level1 || "", level2: data.level2 || "", level3: data.level3 || "",
            level4: data.level4 || "", level5: data.level5 || "", level6: data.level6 || "",
            level7: data.level7 || "", level8: data.level8 || "", level9: data.level9 || "",
            percentage1: data.percentage1 || "", percentage2: data.percentage2 || "", percentage3: data.percentage3 || "",
            percentage4: data.percentage4 || "", percentage5: data.percentage5 || "", percentage6: data.percentage6 || "",
            percentage7: data.percentage7 || "", percentage8: data.percentage8 || "", percentage9: data.percentage9 || "",
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
    (field: keyof SubjectFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allFields: (keyof SubjectFormData)[] = [
      "subject1", "subject2", "subject3", "subject4", "subject5",
      "subject6", "subject7", "subject8", "subject9",
      "level1", "level2", "level3", "level4", "level5",
      "level6", "level7", "level8", "level9",
      "percentage1", "percentage2", "percentage3", "percentage4", "percentage5",
      "percentage6", "percentage7", "percentage8", "percentage9",
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
        console.error("Error submitting subject info:", error.message);
        alert("Failed to submit subject information. Please try again.");
        return;
      }

      alert("Subject information submitted successfully!");
      navigate("/my_application#subjects");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 12 },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-[#fbfbfb]">
        <Navbar />
        <main className="flex-1 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-8 h-8 rounded-full border-2 border-slate-300 border-t-slate-800 animate-spin" />
            <p className="text-slate-500 tracking-wide text-sm uppercase">Loading Records</p>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#fbfbfb] text-slate-900 selection:bg-slate-200">
      <Navbar />
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-16 sm:py-24 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Academic Profile
          </h2>
          <p className="text-slate-500 text-lg sm:text-xl font-light max-w-2xl mx-auto">
            Curate your academic records. Precision and transparency define your educational journey.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="on" className="w-full">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
          >
            {[...Array(9)].map((_, index) => (
              <motion.div key={index + 1} variants={itemVariants}>
                <Card className="overflow-hidden border border-slate-200/60 bg-white/70 backdrop-blur-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-500 group rounded-2xl">
                  <div className="h-1.5 w-full bg-slate-100 group-hover:bg-slate-800 transition-colors duration-500" />
                  <CardContent className="p-6 sm:p-8 space-y-6">
                    
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-colors duration-300">
                        <BookOpen className="w-5 h-5 stroke-[1.5]" />
                      </div>
                      <h3 className="font-semibold text-slate-800 tracking-wide text-lg">Subject {index + 1}</h3>
                    </div>

                    <div className="space-y-5">
                      {/* Subject Selection */}
                      <div className="space-y-2 relative">
                        <label htmlFor={`subject${index + 1}`} className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">
                          Discipline
                        </label>
                        <div className="relative">
                          <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          <select
                            id={`subject${index + 1}`}
                            name={`subject${index + 1}`}
                            value={formData[`subject${index + 1}` as keyof SubjectFormData] || ""}
                            onChange={handleChange(`subject${index + 1}` as keyof SubjectFormData)}
                            className="w-full appearance-none bg-slate-50/50 border border-slate-200 text-slate-700 rounded-xl pl-11 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all duration-300 cursor-pointer"
                          >
                            <option value="" disabled hidden>Select Discipline</option>
                            {subjects.map((sub, i) => (
                              <option key={i} value={sub}>{sub}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Level Input */}
                      <div className="space-y-2 relative">
                        <label htmlFor={`level${index + 1}`} className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">
                          Achievement Level
                        </label>
                        <div className="relative">
                          <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            id={`level${index + 1}`}
                            name={`level${index + 1}`}
                            value={formData[`level${index + 1}` as keyof SubjectFormData] || ""}
                            onChange={handleChange(`level${index + 1}` as keyof SubjectFormData)}
                            placeholder="e.g. 7"
                            className="w-full bg-slate-50/50 border border-slate-200 text-slate-700 rounded-xl pl-11 pr-4 py-3 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Percentage Input */}
                      <div className="space-y-2 relative">
                        <label htmlFor={`percentage${index + 1}`} className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">
                          Final Score
                        </label>
                        <div className="relative">
                          <Percent className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            id={`percentage${index + 1}`}
                            name={`percentage${index + 1}`}
                            value={formData[`percentage${index + 1}` as keyof SubjectFormData] || ""}
                            onChange={handleChange(`percentage${index + 1}` as keyof SubjectFormData)}
                            placeholder="e.g. 85"
                            className="w-full bg-slate-50/50 border border-slate-200 text-slate-700 rounded-xl pl-11 pr-4 py-3 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all duration-300"
                          />
                        </div>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center mt-16 pb-12"
          >
            <Button
              type="submit"
              size="lg"
              className="px-10 py-7 text-lg rounded-2xl bg-slate-900 text-white hover:bg-slate-800 shadow-[0_10px_30px_rgb(0,0,0,0.15)] hover:shadow-[0_10px_40px_rgb(0,0,0,0.25)] transition-all duration-300 group"
            >
              <span className="tracking-wide font-medium">Commit Changes</span>
              <BookOpen className="ml-3 w-5 h-5 group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Button>
          </motion.div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Subjects;