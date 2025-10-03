// SecurityTrustRadialHex.tsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaLock, FaShieldAlt, FaCheckCircle, FaUserShield, FaFingerprint, FaRegSmile } from "react-icons/fa";

const trustItems = [
  { icon: <FaLock size={28} />, title: "Bank-Level Encryption", description: "Your data is always safe and encrypted." },
  { icon: <FaShieldAlt size={28} />, title: "GDPR Compliant", description: "We fully respect privacy regulations." },
  { icon: <FaCheckCircle size={28} />, title: "Secure Connections", description: "All communications are SSL-protected." },
  { icon: <FaUserShield size={28} />, title: "Identity Protection", description: "Your personal identity remains confidential." },
  { icon: <FaFingerprint size={28} />, title: "Biometric Security", description: "Advanced authentication for maximum security." },
  { icon: <FaRegSmile size={28} />, title: "Trusted by Users", description: "Thousands of happy users trust our platform." },
];

const SecurityTrustRadialHex = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const radius = 220;
  const angleStep = (2 * Math.PI) / trustItems.length;

  return (
    <section id="security" ref={ref} className="py-32 bg-black text-white text-center relative">
      <h2 className="text-3xl md:text-4xl font-bold text-violet-500 mb-16">Security & Trust</h2>

      <div className="relative w-full h-[450px] flex justify-center items-center">
        {trustItems.map((item, i) => {
          const angle = i * angleStep;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={i}
              className="absolute w-36 h-36 bg-violet-900/50 backdrop-blur-md rounded-lg flex flex-col justify-center items-center p-4 shadow-xl cursor-pointer"
              initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
              animate={isInView ? { opacity: 1, scale: 1, x, y } : {}}
              transition={{ delay: i * 0.2, type: "spring", stiffness: 120, damping: 12 }}
              whileHover={{
                scale: 1.15,
                rotate: 5,
                boxShadow: "0 20px 30px rgba(139, 92, 246, 0.6)",
                transition: { type: "spring", stiffness: 200, damping: 10 },
              }}
              whileTap={{ scale: 1.05 }}
              style={{ transformOrigin: "50% 50%" }}
            >
              <div className="text-violet-500 mb-2">{item.icon}</div>
              <h3 className="text-white font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-300 text-xs mt-1">{item.description}</p>
            </motion.div>
          );
        })}

        {/* Center AI Circle */}
        <div className="absolute w-28 h-28 rounded-full bg-violet-700/40 flex items-center justify-center text-white font-bold text-xl shadow-lg">
          AI
        </div>
      </div>
    </section>
  );
};

export default SecurityTrustRadialHex;
