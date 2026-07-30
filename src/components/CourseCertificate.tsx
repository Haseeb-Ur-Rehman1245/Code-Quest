import { useRef } from "react";
import { motion } from "framer-motion";
import { Award, Download, CheckCircle } from "lucide-react";

interface CourseCertificateProps {
  studentName: string;
  courseName: string;
  completionDate: string;
  certificateId: string;
}

const CourseCertificate = ({ studentName, courseName, completionDate, certificateId }: CourseCertificateProps) => {
  const certRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!certRef.current) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 800;

    // Background
    const bg = ctx.createLinearGradient(0, 0, 1200, 800);
    bg.addColorStop(0, "#0f172a");
    bg.addColorStop(0.5, "#1e293b");
    bg.addColorStop(1, "#0f172a");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1200, 800);

    // Border
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, 1140, 740);
    ctx.strokeStyle = "#1d4ed8";
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, 1120, 720);

    // Award icon circle
    ctx.beginPath();
    ctx.arc(600, 140, 40, 0, Math.PI * 2);
    ctx.fillStyle = "#3b82f620";
    ctx.fill();
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Star in circle
    ctx.fillStyle = "#facc15";
    ctx.font = "36px serif";
    ctx.textAlign = "center";
    ctx.fillText("★", 600, 152);

    // Title
    ctx.fillStyle = "#94a3b8";
    ctx.font = "14px sans-serif";
    ctx.letterSpacing = "6px";
    ctx.fillText("CERTIFICATE OF COMPLETION", 600, 220);

    // Divider
    const divGrad = ctx.createLinearGradient(200, 240, 1000, 240);
    divGrad.addColorStop(0, "transparent");
    divGrad.addColorStop(0.5, "#3b82f6");
    divGrad.addColorStop(1, "transparent");
    ctx.strokeStyle = divGrad;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(200, 240);
    ctx.lineTo(1000, 240);
    ctx.stroke();

    // Student name
    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 42px sans-serif";
    ctx.fillText(studentName, 600, 310);

    // "has completed"
    ctx.fillStyle = "#94a3b8";
    ctx.font = "16px sans-serif";
    ctx.fillText("has successfully completed the course", 600, 360);

    // Course name
    ctx.fillStyle = "#60a5fa";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText(courseName, 600, 420);

    // Second divider
    ctx.strokeStyle = divGrad;
    ctx.beginPath();
    ctx.moveTo(200, 460);
    ctx.lineTo(1000, 460);
    ctx.stroke();

    // Date
    ctx.fillStyle = "#94a3b8";
    ctx.font = "14px sans-serif";
    ctx.fillText(`Completed on ${completionDate}`, 600, 510);

    // Certificate ID
    ctx.fillStyle = "#64748b";
    ctx.font = "12px monospace";
    ctx.fillText(`Certificate ID: ${certificateId}`, 600, 550);

    // Platform
    ctx.fillStyle = "#3b82f6";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText("CodeQuest XP", 600, 650);

    ctx.fillStyle = "#64748b";
    ctx.font = "12px sans-serif";
    ctx.fillText("Learn • Build • Master", 600, 675);

    // Download
    const link = document.createElement("a");
    link.download = `certificate-${courseName.replace(/\s+/g, "-").toLowerCase()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-4"
    >
      {/* Preview */}
      <div
        ref={certRef}
        className="relative rounded-xl overflow-hidden border-2 border-primary/30 p-8 text-center"
        style={{ background: "linear-gradient(135deg, hsl(var(--background)), hsl(var(--muted)))" }}
      >
        <div className="absolute inset-0 border-[3px] border-primary/10 rounded-xl m-2" />
        <div className="relative z-10 space-y-4 py-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto">
            <Award size={28} className="text-xp" />
          </div>
          <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase">Certificate of Completion</p>
          <h3 className="text-2xl font-bold text-foreground">{studentName}</h3>
          <p className="text-sm text-muted-foreground">has successfully completed the course</p>
          <h4 className="text-xl font-bold text-primary">{courseName}</h4>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
            <span>Completed on {completionDate}</span>
            <span>•</span>
            <span className="font-mono">ID: {certificateId.slice(0, 12)}</span>
          </div>
        </div>
      </div>

      {/* Congrats + Download */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-success/10 border border-success/20">
        <CheckCircle size={20} className="text-success flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">🎉 Congratulations! You completed this course!</p>
          <p className="text-xs text-muted-foreground">Your certificate is ready to download.</p>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Download size={14} /> Download
        </button>
      </div>
    </motion.div>
  );
};

export default CourseCertificate;
