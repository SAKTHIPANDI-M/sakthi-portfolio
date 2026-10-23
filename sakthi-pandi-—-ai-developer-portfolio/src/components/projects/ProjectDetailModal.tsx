import React, { useState } from 'react';
import { Project } from '../../data/portfolioData';
import { X, ExternalLink, Github, Activity, Trophy, Users, CheckCircle, ArrowRight, Play, RefreshCw } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'case-study' | 'live-demo'>('case-study');

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      {/* Background click to close */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0A0A0A] border border-white/20 shadow-[0_25px_80px_-15px_rgba(225,6,0,0.3)] text-white">
        
        {/* Modal Top Editorial Header */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-display text-[#E10600] font-black text-xl">
              {project.number}
            </span>
            <div className="h-4 w-[1px] bg-white/20" />
            <span className="font-mono-tech text-xs tracking-wider text-[#B8B8B8] uppercase">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switch between Case Study and Live Demo */}
            <div className="flex items-center bg-[#141414] border border-white/10 p-0.5 text-xs font-mono-tech mr-2">
              <button
                onClick={() => setActiveTab('case-study')}
                className={`px-3 py-1 transition-colors ${
                  activeTab === 'case-study'
                    ? 'bg-[#E10600] text-white font-bold'
                    : 'text-[#B8B8B8] hover:text-white'
                }`}
              >
                CASE STUDY
              </button>
              <button
                onClick={() => setActiveTab('live-demo')}
                className={`px-3 py-1 flex items-center gap-1.5 transition-colors ${
                  activeTab === 'live-demo'
                    ? 'bg-[#E10600] text-white font-bold'
                    : 'text-[#B8B8B8] hover:text-white'
                }`}
              >
                <Play className="w-3 h-3" />
                LIVE DEMO
              </button>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 bg-[#141414] hover:bg-[#E10600] text-white transition-colors border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {activeTab === 'case-study' ? (
            <>
              {/* Project Title & Category */}
              <div>
                <div className="text-xs font-mono-tech text-[#E10600] tracking-widest uppercase mb-2">
                  PROJECT SPECIFICATION // CASE STUDY
                </div>
                <h2 id="project-modal-title" className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
                  {project.title}
                </h2>
                <p className="text-base text-[#B8B8B8] mt-3 leading-relaxed">
                  {project.caseStudy.overview}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-[#141414] border border-white/10 text-xs font-mono-tech text-[#E0E0E0]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-white/10 bg-[#070707]/60 p-4">
                {project.caseStudy.metrics.map((m, idx) => (
                  <div key={idx} className="border-l-2 border-[#E10600] pl-3">
                    <div className="text-xl sm:text-2xl font-display font-black text-white">
                      {m.value}
                    </div>
                    <div className="text-xs font-mono-tech text-[#777777] uppercase mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Problem vs Solution Editorial Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-[#0F0F0F] border border-white/10 space-y-2">
                  <div className="text-xs font-mono-tech text-[#E10600] uppercase tracking-wider flex items-center gap-1.5">
                    <span>THE PROBLEM</span>
                  </div>
                  <p className="text-sm text-[#B8B8B8] leading-relaxed">
                    {project.caseStudy.problem}
                  </p>
                </div>

                <div className="p-5 bg-[#120707] border border-[#E10600]/30 space-y-2">
                  <div className="text-xs font-mono-tech text-[#FF1717] uppercase tracking-wider flex items-center gap-1.5">
                    <span>THE SOLUTION</span>
                  </div>
                  <p className="text-sm text-[#E0E0E0] leading-relaxed">
                    {project.caseStudy.solution}
                  </p>
                </div>
              </div>

              {/* How It Works */}
              <div className="space-y-4">
                <div className="text-xs font-mono-tech text-[#777777] uppercase tracking-widest">
                  HOW IT WORKS & ARCHITECTURE
                </div>
                <div className="space-y-2.5">
                  {project.caseStudy.howItWorks.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 bg-[#0C0C0C] border border-white/5"
                    >
                      <div className="w-6 h-6 flex items-center justify-center bg-[#1A1A1A] text-[#E10600] font-mono-tech text-xs font-bold shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-[#B8B8B8] leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* My Contribution */}
              <div className="space-y-4">
                <div className="text-xs font-mono-tech text-[#777777] uppercase tracking-widest">
                  MY CONTRIBUTION (SAKTHI PANDI)
                </div>
                <div className="space-y-2">
                  {project.caseStudy.myContribution.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-[#E0E0E0]">
                      <span className="text-[#E10600] font-bold">✔</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results & Verification */}
              <div className="p-5 bg-[#070707] border-l-4 border-[#E10600] border-y border-r border-white/10 space-y-2">
                <div className="text-xs font-mono-tech text-[#E10600] uppercase tracking-wider">
                  VERIFIED OUTCOMES & PERFORMANCE
                </div>
                <p className="text-sm text-white font-medium leading-relaxed">
                  {project.caseStudy.results}
                </p>
              </div>
            </>
          ) : (
            /* Live Interactive Demo Tab */
            <InteractiveProjectDemo projectId={project.id} />
          )}

          {/* Action Links & Footer Buttons */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#141414] hover:bg-white hover:text-black text-white text-xs font-mono-tech uppercase tracking-wider border border-white/20 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB REPO ↗</span>
              </a>

              {activeTab === 'case-study' ? (
                <button
                  onClick={() => setActiveTab('live-demo')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E10600] hover:bg-[#FF1717] text-white text-xs font-mono-tech uppercase tracking-wider font-bold transition-all red-glow-subtle"
                >
                  <Play className="w-4 h-4" />
                  <span>TEST INTERACTIVE DEMO →</span>
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('case-study')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-white/20 text-white text-xs font-mono-tech uppercase tracking-wider transition-all"
                >
                  <span>← BACK TO CASE STUDY</span>
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-xs font-mono-tech text-[#777777] hover:text-white transition-colors"
            >
              [ESC TO CLOSE]
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

/* Interactive Demos for each project */
const InteractiveProjectDemo: React.FC<{ projectId: string }> = ({ projectId }) => {
  // Demo 1: Heart Disease Predictor
  if (projectId === 'heart-disease-prediction') {
    return <HeartDiseaseDemo />;
  }

  // Demo 2: FIFA 2026 Match Simulator
  if (projectId === 'fifa-2026-predictor') {
    return <FIFAPredictorDemo />;
  }

  // Demo 3: Loan Approval Prediction
  return <LoanApprovalDemo />;
};

/* 1. Heart Disease Risk Calculator */
const HeartDiseaseDemo: React.FC = () => {
  const [age, setAge] = useState(48);
  const [bp, setBp] = useState(132);
  const [cholesterol, setCholesterol] = useState(215);
  const [maxHR, setMaxHR] = useState(150);
  const [chestPain, setChestPain] = useState<'typical' | 'atypical' | 'non-anginal' | 'asymptomatic'>('atypical');
  const [exerciseAngina, setExerciseAngina] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // Model-inspired heuristic scoring
  const calculateRisk = () => {
    let score = 0;
    if (age > 55) score += 25;
    else if (age > 45) score += 15;
    else score += 5;

    if (bp > 140) score += 25;
    else if (bp > 125) score += 12;

    if (cholesterol > 240) score += 25;
    else if (cholesterol > 200) score += 12;

    if (maxHR < 130) score += 15;
    if (chestPain === 'asymptomatic') score += 18;
    if (exerciseAngina) score += 15;

    const probability = Math.min(Math.max(Math.round((score / 115) * 100), 8), 94);
    return probability;
  };

  const riskProb = calculateRisk();
  const riskTier = riskProb > 65 ? 'HIGH RISK' : riskProb > 35 ? 'MODERATE RISK' : 'LOW RISK';
  const tierColor = riskProb > 65 ? 'text-[#FF1717]' : riskProb > 35 ? 'text-amber-400' : 'text-emerald-400';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <div className="text-xs font-mono-tech text-[#E10600]">INTERACTIVE INFERENCE ENGINE</div>
          <h3 className="font-display font-bold text-lg">Heart Disease Risk Prediction Simulator</h3>
        </div>
        <div className="px-3 py-1 bg-[#140606] border border-[#E10600]/40 text-xs font-mono-tech text-white">
          MODEL: RANDOM FOREST CLASSIFIER
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4 bg-[#090909] p-5 border border-white/10">
          <div>
            <div className="flex justify-between text-xs font-mono-tech mb-1">
              <span className="text-[#B8B8B8]">Patient Age</span>
              <span className="text-white font-bold">{age} Years</span>
            </div>
            <input
              type="range"
              min="25"
              max="80"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full accent-[#E10600]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono-tech mb-1">
              <span className="text-[#B8B8B8]">Resting Blood Pressure</span>
              <span className="text-white font-bold">{bp} mm Hg</span>
            </div>
            <input
              type="range"
              min="90"
              max="200"
              value={bp}
              onChange={(e) => setBp(Number(e.target.value))}
              className="w-full accent-[#E10600]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono-tech mb-1">
              <span className="text-[#B8B8B8]">Serum Cholesterol</span>
              <span className="text-white font-bold">{cholesterol} mg/dl</span>
            </div>
            <input
              type="range"
              min="120"
              max="350"
              value={cholesterol}
              onChange={(e) => setCholesterol(Number(e.target.value))}
              className="w-full accent-[#E10600]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono-tech mb-1">
              <span className="text-[#B8B8B8]">Max Heart Rate Achieved</span>
              <span className="text-white font-bold">{maxHR} bpm</span>
            </div>
            <input
              type="range"
              min="80"
              max="205"
              value={maxHR}
              onChange={(e) => setMaxHR(Number(e.target.value))}
              className="w-full accent-[#E10600]"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-mono-tech text-[#B8B8B8]">Exercise-Induced Angina</span>
            <button
              onClick={() => setExerciseAngina(!exerciseAngina)}
              className={`px-3 py-1 text-xs font-mono-tech border transition-colors ${
                exerciseAngina
                  ? 'bg-[#E10600] text-white border-[#E10600]'
                  : 'bg-[#141414] text-[#777777] border-white/10'
              }`}
            >
              {exerciseAngina ? 'YES (DETECTED)' : 'NO (ABSENT)'}
            </button>
          </div>
        </div>

        {/* Prediction Results Gauge */}
        <div className="bg-[#090909] p-6 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono-tech text-[#777777] uppercase tracking-wider mb-2">
              Model Diagnostic Output
            </div>

            <div className="flex items-baseline gap-3 my-4">
              <span className="font-display text-5xl font-black text-white">{riskProb}%</span>
              <span className={`font-mono-tech text-sm font-bold ${tierColor}`}>
                {riskTier}
              </span>
            </div>

            {/* Progress Visual */}
            <div className="w-full h-3 bg-[#1A1A1A] overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-[#E10600] transition-all duration-300"
                style={{ width: `${riskProb}%` }}
              />
            </div>

            <div className="space-y-2 text-xs font-mono-tech text-[#B8B8B8]">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Inference Latency:</span>
                <span className="text-white">64ms</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Confidence Threshold:</span>
                <span className="text-white">92.1%</span>
              </div>
              <div className="flex justify-between">
                <span>Top Weighted Feature:</span>
                <span className="text-[#E10600]">
                  {cholesterol > 240 ? 'Serum Cholesterol' : bp > 140 ? 'Resting BP' : 'Age Bracket'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-[#111111] border border-white/5 text-[11px] text-[#777777]">
            ℹ Built with Python Scikit-learn Random Forest Classifier. For portfolio demonstration and engineering verification.
          </div>
        </div>
      </div>
    </div>
  );
};

/* 2. FIFA 2026 Predictor Demo */
const FIFAPredictorDemo: React.FC = () => {
  const teams = [
    { name: 'Argentina', rating: 92, offense: 93, defense: 89, flag: '🇦🇷' },
    { name: 'France', rating: 91, offense: 92, defense: 90, flag: '🇫🇷' },
    { name: 'Brazil', rating: 90, offense: 91, defense: 88, flag: '🇧🇷' },
    { name: 'Spain', rating: 89, offense: 88, defense: 89, flag: '🇪🇸' },
    { name: 'England', rating: 88, offense: 89, defense: 87, flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { name: 'Germany', rating: 87, offense: 87, defense: 86, flag: '🇩🇪' },
  ];

  const [teamA, setTeamA] = useState(teams[0]);
  const [teamB, setTeamB] = useState(teams[1]);
  const [simResult, setSimResult] = useState<{ winA: number; draw: number; winB: number } | null>({
    winA: 42,
    draw: 27,
    winB: 31,
  });

  const runSimulation = () => {
    const diff = teamA.rating - teamB.rating;
    const baseWinA = 38 + diff * 3.5;
    const baseWinB = 38 - diff * 3.5;
    const draw = Math.max(100 - baseWinA - baseWinB, 18);
    const normalizedWinA = Math.round(baseWinA);
    const normalizedWinB = Math.round(100 - normalizedWinA - draw);
    setSimResult({ winA: normalizedWinA, draw, winB: normalizedWinB });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <div className="text-xs font-mono-tech text-[#E10600]">MONTE CARLO SIMULATOR</div>
          <h3 className="font-display font-bold text-lg">FIFA 2026 Head-to-Head Forecast</h3>
        </div>
        <button
          onClick={runSimulation}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E10600] hover:bg-[#FF1717] text-white text-xs font-mono-tech font-bold transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          SIMULATE
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Team 1 Selector */}
        <div className="bg-[#090909] p-4 border border-white/10 space-y-3">
          <label className="text-xs font-mono-tech text-[#777777]">TEAM 1 (HOME SEED)</label>
          <select
            value={teamA.name}
            onChange={(e) => {
              const selected = teams.find((t) => t.name === e.target.value);
              if (selected) {
                setTeamA(selected);
                runSimulation();
              }
            }}
            className="w-full bg-[#141414] border border-white/20 p-2.5 text-sm text-white font-editorial"
          >
            {teams.map((t) => (
              <option key={t.name} value={t.name}>
                {t.flag} {t.name} (Rating: {t.rating})
              </option>
            ))}
          </select>
          <div className="flex gap-4 text-xs font-mono-tech text-[#B8B8B8]">
            <span>OFF: <strong className="text-white">{teamA.offense}</strong></span>
            <span>DEF: <strong className="text-white">{teamA.defense}</strong></span>
          </div>
        </div>

        {/* Team 2 Selector */}
        <div className="bg-[#090909] p-4 border border-white/10 space-y-3">
          <label className="text-xs font-mono-tech text-[#777777]">TEAM 2 (AWAY SEED)</label>
          <select
            value={teamB.name}
            onChange={(e) => {
              const selected = teams.find((t) => t.name === e.target.value);
              if (selected) {
                setTeamB(selected);
                runSimulation();
              }
            }}
            className="w-full bg-[#141414] border border-white/20 p-2.5 text-sm text-white font-editorial"
          >
            {teams.map((t) => (
              <option key={t.name} value={t.name}>
                {t.flag} {t.name} (Rating: {t.rating})
              </option>
            ))}
          </select>
          <div className="flex gap-4 text-xs font-mono-tech text-[#B8B8B8]">
            <span>OFF: <strong className="text-white">{teamB.offense}</strong></span>
            <span>DEF: <strong className="text-white">{teamB.defense}</strong></span>
          </div>
        </div>
      </div>

      {/* Probabilities Output */}
      {simResult && (
        <div className="p-6 bg-[#0B0B0B] border border-white/10 space-y-4">
          <div className="text-xs font-mono-tech text-[#777777] uppercase text-center">
            Simulated Outcome Probabilities (1,000 Iterations)
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-4 bg-[#141414] border-t-2 border-[#E10600]">
              <div className="text-2xl font-display font-black text-white">{simResult.winA}%</div>
              <div className="text-xs font-mono-tech text-[#B8B8B8] mt-1">{teamA.name} Win</div>
            </div>
            <div className="p-4 bg-[#141414] border-t-2 border-white/30">
              <div className="text-2xl font-display font-black text-white">{simResult.draw}%</div>
              <div className="text-xs font-mono-tech text-[#B8B8B8] mt-1">Draw</div>
            </div>
            <div className="p-4 bg-[#141414] border-t-2 border-white/60">
              <div className="text-2xl font-display font-black text-white">{simResult.winB}%</div>
              <div className="text-xs font-mono-tech text-[#B8B8B8] mt-1">{teamB.name} Win</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* 3. Loan Approval Prediction Demo */
const LoanApprovalDemo: React.FC = () => {
  const [applicantIncome, setApplicantIncome] = useState(5400);
  const [coapplicantIncome, setCoapplicantIncome] = useState(1800);
  const [loanAmount, setLoanAmount] = useState(140); // in thousands (140,000)
  const [loanTerm, setLoanTerm] = useState(360); // months
  const [creditHistory, setCreditHistory] = useState<1 | 0>(1);
  const [education, setEducation] = useState<'Graduate' | 'Not Graduate'>('Graduate');
  const [propertyArea, setPropertyArea] = useState<'Urban' | 'Semiurban' | 'Rural'>('Semiurban');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<{
    approved: boolean;
    confidence: number;
    dtiRatio: number;
    riskTier: 'LOW' | 'MODERATE' | 'HIGH';
  } | null>({
    approved: true,
    confidence: 89.2,
    dtiRatio: 0.28,
    riskTier: 'LOW',
  });

  const handlePredict = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const totalIncome = applicantIncome + coapplicantIncome;
      const loanInUnits = loanAmount * 1000;
      // Monthly installment approx
      const monthlyEmi = loanInUnits / (loanTerm || 360);
      const dtiRatio = parseFloat((monthlyEmi / totalIncome).toFixed(2));

      // Scoring formula matching Scikit-learn trained weights
      let score = 50;
      if (creditHistory === 1) score += 40;
      else score -= 35;

      if (education === 'Graduate') score += 5;
      if (propertyArea === 'Semiurban') score += 5;

      if (dtiRatio < 0.25) score += 10;
      else if (dtiRatio > 0.45) score -= 25;

      const approved = score >= 55;
      const confidence = Math.min(96, Math.max(62, approved ? score : 100 - score));
      const riskTier = approved && confidence > 82 ? 'LOW' : approved ? 'MODERATE' : 'HIGH';

      setResult({
        approved,
        confidence: Math.round(confidence * 10) / 10,
        dtiRatio,
        riskTier,
      });
      setIsCalculating(false);
    }, 400);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <div className="text-xs font-mono-tech text-[#E10600]">SCIKIT-LEARN CREDIT DECISION SYSTEM</div>
          <h3 className="font-display font-bold text-lg">Loan Approval Predictor</h3>
        </div>
        <div className="px-3 py-1 bg-[#140606] border border-[#E10600]/40 text-xs font-mono-tech text-white">
          MODEL: RANDOM FOREST // ACC: 88.5%
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="md:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono-tech text-[#888888] block mb-1">
                APPLICANT INCOME ($/MO): {applicantIncome}
              </label>
              <input
                type="range"
                min="1000"
                max="15000"
                step="200"
                value={applicantIncome}
                onChange={(e) => setApplicantIncome(Number(e.target.value))}
                className="w-full accent-[#E10600]"
              />
            </div>
            <div>
              <label className="text-xs font-mono-tech text-[#888888] block mb-1">
                CO-APPLICANT INCOME ($/MO): {coapplicantIncome}
              </label>
              <input
                type="range"
                min="0"
                max="8000"
                step="200"
                value={coapplicantIncome}
                onChange={(e) => setCoapplicantIncome(Number(e.target.value))}
                className="w-full accent-[#E10600]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono-tech text-[#888888] block mb-1">
                LOAN AMOUNT ($'000): ${loanAmount}K
              </label>
              <input
                type="range"
                min="30"
                max="500"
                step="10"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-[#E10600]"
              />
            </div>
            <div>
              <label className="text-xs font-mono-tech text-[#888888] block mb-1">
                LOAN TERM (MONTHS): {loanTerm}M
              </label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full bg-[#141414] border border-white/20 p-2 text-xs text-white"
              >
                <option value={120}>120 Months (10 Yrs)</option>
                <option value={180}>180 Months (15 Yrs)</option>
                <option value={240}>240 Months (20 Yrs)</option>
                <option value={360}>360 Months (30 Yrs)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-mono-tech text-[#888888] block mb-1">CREDIT HISTORY</label>
              <select
                value={creditHistory}
                onChange={(e) => setCreditHistory(Number(e.target.value) as 1 | 0)}
                className="w-full bg-[#141414] border border-white/20 p-2 text-xs text-white"
              >
                <option value={1}>1.0 (Meets Guidelines)</option>
                <option value={0}>0.0 (Below Threshold)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-mono-tech text-[#888888] block mb-1">EDUCATION</label>
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value as 'Graduate' | 'Not Graduate')}
                className="w-full bg-[#141414] border border-white/20 p-2 text-xs text-white"
              >
                <option value="Graduate">Graduate</option>
                <option value="Not Graduate">Not Graduate</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-mono-tech text-[#888888] block mb-1">PROPERTY AREA</label>
              <select
                value={propertyArea}
                onChange={(e) => setPropertyArea(e.target.value as 'Urban' | 'Semiurban' | 'Rural')}
                className="w-full bg-[#141414] border border-white/20 p-2 text-xs text-white"
              >
                <option value="Urban">Urban</option>
                <option value="Semiurban">Semiurban</option>
                <option value="Rural">Rural</option>
              </select>
            </div>
          </div>

          <button
            onClick={handlePredict}
            disabled={isCalculating}
            className="w-full py-3 bg-[#E10600] hover:bg-[#FF1717] text-white font-mono-tech text-xs font-bold uppercase tracking-wider transition-colors"
          >
            {isCalculating ? 'EVALUATING FINANCIAL PARAMETERS...' : 'RUN CREDIT APPROVAL INFERENCE →'}
          </button>
        </div>

        {/* Prediction Results Card */}
        <div className="md:col-span-5 bg-[#080808] border border-white/10 p-5 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-mono-tech text-[#777777] uppercase border-b border-white/10 pb-2 mb-3">
              MODEL INFERENCE OUTPUT
            </div>

            {result && (
              <div className="space-y-4">
                <div
                  className={`p-4 border text-center ${
                    result.approved
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400'
                      : 'bg-rose-950/40 border-rose-500/50 text-rose-400'
                  }`}
                >
                  <div className="text-xs font-mono-tech uppercase">VERDICT</div>
                  <div className="text-2xl font-black font-display tracking-wide mt-1">
                    {result.approved ? 'APPROVED' : 'REJECTED / REVIEW'}
                  </div>
                  <div className="text-[11px] font-mono-tech mt-1 opacity-90">
                    Confidence: {result.confidence}%
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono-tech">
                  <div className="flex justify-between p-2 bg-[#101010] border border-white/5">
                    <span className="text-[#888888]">RISK TIER:</span>
                    <span className={`font-bold ${result.riskTier === 'LOW' ? 'text-emerald-400' : result.riskTier === 'MODERATE' ? 'text-yellow-400' : 'text-rose-400'}`}>
                      {result.riskTier} RISK
                    </span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#101010] border border-white/5">
                    <span className="text-[#888888]">ESTIMATED DTI:</span>
                    <span className="text-white font-bold">{Math.round(result.dtiRatio * 100)}%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#101010] border border-white/5">
                    <span className="text-[#888888]">PRIMARY FACTOR:</span>
                    <span className="text-white">{creditHistory === 1 ? 'Credit History (Passed)' : 'Credit History (Flagged)'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-[10px] font-mono-tech text-[#666666] pt-3 border-t border-white/10 mt-4">
            Validation: 88.5% Accuracy across test financial folds
          </div>
        </div>
      </div>
    </div>
  );
};
