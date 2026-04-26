import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  CheckCircle2,
  ListTree,
  Clock,
  HeartHandshake,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const featureCards = [
    {
      icon: CheckCircle2,
      title: "Simplified Process",
      description:
        "Applying to multiple universities can be overwhelming, with each institution having its own unique application requirements. EasyApply brings all these requirements together in one form, saving you time and effort.",
      color: "text-blue-600",
      bgGradient: "from-blue-50 to-indigo-50",
    },
    {
      icon: ListTree,
      title: "Comprehensive University List",
      description:
        "Our platform provides you with a comprehensive list of universities and courses, giving you the flexibility to explore various options that align with your interests and goals.",
      color: "text-emerald-600",
      bgGradient: "from-emerald-50 to-teal-50",
    },
    {
      icon: Clock,
      title: "Efficiency and Time Savings",
      description:
        "Applying to multiple universities often means duplicating efforts. With EasyApply, you can complete one application form and send it to multiple institutions, saving you valuable time.",
      color: "text-violet-600",
      bgGradient: "from-violet-50 to-purple-50",
    },
    {
      icon: HeartHandshake,
      title: "Your Success, Our Priority",
      description:
        "We take pride in being a part of your journey to success. Your dreams are our inspiration, and we are committed to providing you with the tools and resources you need to achieve them.",
      color: "text-rose-600",
      bgGradient: "from-rose-50 to-pink-50",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <GraduationCap className="w-16 h-16" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
              About EasyApply
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90 leading-relaxed">
              We are committed to simplifying the complex process of applying to
              multiple universities. Our mission is to provide you with a
              streamlined and hassle-free experience, making your journey to
              higher education smooth and efficient.
            </p>
          </motion.div>
        </div>
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8 lg:gap-12"
          >
            {/* Mission Card */}
            <motion.div
              variants={cardVariants}
              className="group relative bg-gradient-to-br from-gray-50 to-white p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-indigo-100 rounded-xl">
                    <Target className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Our Mission
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  We are committed to simplifying the complex process of
                  applying to multiple universities. Our mission is to provide
                  you with a streamlined and hassle-free experience, making your
                  journey to higher education smooth and efficient.
                </p>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              variants={cardVariants}
              className="group relative bg-gradient-to-br from-gray-50 to-white p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Eye className="w-8 h-8 text-purple-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Our Vision
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  We envision a world where every aspiring student can easily
                  apply to multiple universities without the stress and
                  confusion that often comes with the application process. We
                  believe that higher education is the foundation of success,
                  and we are dedicated to breaking down barriers and helping you
                  achieve your dreams.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose EasyApply
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full" />
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
              Discover the advantages that make us the preferred choice for
              university applications
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8"
          >
            {featureCards.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div className="relative p-8">
                  {/* Icon */}
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className={`p-3 bg-gradient-to-br ${feature.bgGradient} rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className={`w-7 h-7 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 pt-1">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative arrow */}
                  <div className="mt-6 flex items-center gap-2 text-gray-400 group-hover:text-gray-600 transition-colors">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Learn more</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have simplified their university
              application process with EasyApply.
            </p>
            <a
              href="/application/"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              Start Your Application
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
