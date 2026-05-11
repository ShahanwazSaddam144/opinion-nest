"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import { fadeUp } from "./animations";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ModelUi = () => {
  const [form, setForm] = useState({
    name: "",
    industry: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat-history`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          business_name: form.name,
          business_industry: form.industry,
          business_description: form.description,
        }),
      });

      const payload = await res.json();

      if (!res.ok) throw new Error(payload.message || "Server error");

      const saved = payload.data;

      setResult(saved.ai_result || null);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }

    setLoading(false);
  };

  const chartSlides = result
    ? [
        {
          title: "Historical Performance",
          subtitle: "Past 6 years",
          data: result.past_yearly_analysis?.data || [],
        },
        {
          title: "Growth Projection",
          subtitle: "Next 6 years",
          data: result.yearly_analysis || [],
        },
      ]
    : [];

  const scaleSlides = result
    ? [
        {
          title: "Small Scale",
          data: result.scale?.small,
          accent: "#64748b",
          featured: false,
        },
        {
          title: "Medium Scale",
          data: result.scale?.medium,
          accent: "#2563eb",
          featured: true,
        },
        {
          title: "Large Scale",
          data: result.scale?.large,
          accent: "#0f172a",
          featured: false,
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-[#f8f9fb] px-4 py-12 font-[DM_Sans]">
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="mx-auto max-w-[860px]">
        <Header />

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={1}
          className="mb-8 rounded-[20px] bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_32px_rgba(37,99,235,0.06)]"
        >
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <Label>Business Name</Label>

                <Input
                  name="name"
                  placeholder="e.g. NovaBrew"
                  onChange={handleChange}
                />
              </Field>

              <Field>
                <Label>Industry</Label>

                <Input
                  name="industry"
                  placeholder="e.g. tech, food, manufacturing"
                  onChange={handleChange}
                />
              </Field>
            </div>

            <Field>
              <Label>Business Description</Label>

              <textarea
                name="description"
                rows={4}
                placeholder="Describe your business idea in detail..."
                onChange={handleChange}
                className="w-full resize-none rounded-xl border-[1.5px] border-[#e2e8f0] bg-[#f8fafd] px-4 py-3 text-sm font-light text-[#0f172a] outline-none transition-all focus:border-[#2563eb]"
              />
            </Field>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-[15px] font-medium text-white transition-all ${
                loading
                  ? "cursor-not-allowed bg-[#94a3b8]"
                  : "bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(37,99,235,0.3)]"
              }`}
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Analyzing...
                </>
              ) : (
                "Analyze Business"
              )}
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-6"
            >
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0}
                className="rounded-[20px] bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_32px_rgba(37,99,235,0.06)]"
              >
                <SectionLabel>Overview</SectionLabel>

                <p className="mb-7 text-[15px] font-light leading-[1.8] text-[#475569]">
                  {result.description}
                </p>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    label="Investment"
                    value={result.investment}
                    color="#2563eb"
                  />

                  <StatCard
                    label="Workers"
                    value={result.workers}
                    color="#0f172a"
                  />

                  <StatCard
                    label="Profit Range"
                    value={result.profit?.range}
                    color="#16a34a"
                  />

                  <StatCard
                    label="Risk Level"
                    value={result.risk}
                    color="#dc2626"
                  />
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0.5}
                className="rounded-[20px] bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_32px_rgba(37,99,235,0.06)]"
              >
                <SectionLabel>Industry Insights</SectionLabel>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-2xl bg-[#f8fafd] p-5">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8]">
                      Past 6 Years Summary
                    </p>

                    <p className="text-[14px] font-light leading-7 text-[#475569]">
                      {result.past_yearly_analysis?.summary}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#eff6ff] p-5">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2563eb]">
                      Future 6 Years Outlook
                    </p>

                    <p className="text-[14px] font-light leading-7 text-[#334155]">
                      {result.future_summary}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={1}
              >
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={16}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  breakpoints={{
                    768: {
                      slidesPerView: 2,
                    },
                  }}
                  className="pb-10"
                >
                  {chartSlides.map((slide, i) => (
                    <SwiperSlide key={i}>
                      <ChartCard
                        title={slide.title}
                        subtitle={slide.subtitle}
                        data={slide.data}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={2}
                className="rounded-[20px] bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_32px_rgba(37,99,235,0.06)]"
              >
                <SectionLabel>Scale Comparison</SectionLabel>

                <Swiper
                  modules={[Pagination]}
                  spaceBetween={16}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  breakpoints={{
                    768: {
                      slidesPerView: 3,
                    },
                  }}
                  className="mt-2 pb-10"
                >
                  {scaleSlides.map((slide, i) => (
                    <SwiperSlide key={i}>
                      <ScaleCard
                        title={slide.title}
                        data={slide.data}
                        accent={slide.accent}
                        featured={slide.featured}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="fixed bottom-6 right-6 flex max-w-[320px] items-center gap-3 rounded-xl bg-[#0f172a] px-5 py-4 text-sm text-white shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
            >
              <span className="h-[6px] w-[6px] rounded-full bg-[#f87171]" />

              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx global>{`
          .swiper-pagination-bullet {
            background: #cbd5e1;
            opacity: 1;
          }

          .swiper-pagination-bullet-active {
            background: #2563eb;
          }
        `}</style>
      </div>
    </div>
  );
};

const Field = ({ children }) => {
  return <div className="flex flex-col gap-[7px]">{children}</div>;
};

const Label = ({ children }) => {
  return (
    <label className="text-[12px] font-medium uppercase tracking-[0.04em] text-[#64748b]">
      {children}
    </label>
  );
};

const Input = ({ name, placeholder, onChange }) => {
  return (
    <input
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full rounded-xl border-[1.5px] border-[#e2e8f0] bg-[#f8fafd] px-4 py-3 text-sm font-light text-[#0f172a] outline-none transition-all placeholder:text-[#94a3b8] focus:border-[#2563eb]"
    />
  );
};

const SectionLabel = ({ children }) => {
  return (
    <h3 className="mb-4 mt-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#94a3b8]">
      {children}
    </h3>
  );
};

const StatCard = ({ label, value, color }) => {
  return (
    <div className="rounded-[14px] bg-[#f8fafd] px-5 py-[18px]">
      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#94a3b8]">
        {label}
      </p>

      <p
        className="m-0 text-[20px] font-semibold tracking-[-0.02em]"
        style={{ color }}
      >
        {value}
      </p>
    </div>
  );
};

const ChartCard = ({ title, subtitle, data }) => {
  const R = 28;
  const STROKE = 5.5;

  const CIRC = 2 * Math.PI * R;

  const INNER_R = R - STROKE - 2;
  const INNER_CIRC = 2 * Math.PI * INNER_R;

  const max = data?.length
    ? Math.max(
        ...data.map((d) =>
          Math.max(d.revenue || 0, d.profit || 0)
        )
      )
    : 100;

  return (
    <div className="rounded-[20px] bg-white px-6 py-7 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_32px_rgba(37,99,235,0.06)]">
      <SectionLabel>{subtitle}</SectionLabel>

      <h3 className="mb-5 text-[16px] font-semibold tracking-[-0.01em] text-[#0f172a]">
        {title}
      </h3>

      <div className="flex flex-wrap items-center justify-center gap-5 py-2 pb-4">
        {(data || []).map((d) => {
          const rPct = Math.round((d.revenue / max) * 100);

          const pPct = Math.round((d.profit / max) * 100);

          const rOff = CIRC - (rPct / 100) * CIRC;

          const pOff =
            INNER_CIRC - (pPct / 100) * INNER_CIRC;

          const size = (R + STROKE) * 2 + 4;

          const cx = size / 2;

          return (
            <div
              key={d.year}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="relative"
                style={{
                  width: size,
                  height: size,
                }}
              >
                <svg
                  width={size}
                  height={size}
                  className="-rotate-90"
                >
                  <circle
                    cx={cx}
                    cy={cx}
                    r={R}
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth={STROKE + 2}
                  />

                  <circle
                    cx={cx}
                    cy={cx}
                    r={R}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth={STROKE}
                    strokeDasharray={CIRC}
                    strokeDashoffset={rOff}
                    strokeLinecap="round"
                  />

                  <circle
                    cx={cx}
                    cy={cx}
                    r={INNER_R}
                    fill="none"
                    stroke="#dcfce7"
                    strokeWidth={STROKE - 1}
                  />

                  <circle
                    cx={cx}
                    cy={cx}
                    r={INNER_R}
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth={STROKE - 1}
                    strokeDasharray={INNER_CIRC}
                    strokeDashoffset={pOff}
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[11px] font-semibold text-[#2563eb]">
                    {rPct}%
                  </span>

                  <span className="text-[9px] font-medium text-[#16a34a]">
                    {pPct}%
                  </span>
                </div>
              </div>

              <span className="text-[11px] font-normal text-[#94a3b8]">
                {d.year}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-5">
        <LegendItem color="#2563eb" label="Revenue" />

        <LegendItem color="#16a34a" label="Profit" />
      </div>
    </div>
  );
};

const LegendItem = ({ color, label }) => {
  return (
    <div className="flex items-center gap-[7px]">
      <span
        className="inline-block h-[2.5px] w-6 rounded-[2px]"
        style={{ background: color }}
      />

      <span className="text-[12px] font-normal text-[#64748b]">
        {label}
      </span>
    </div>
  );
};

const ScaleCard = ({
  title,
  data,
  accent,
  featured,
}) => {
  return (
    <div
      className={`relative rounded-2xl p-6 transition-all ${
        featured
          ? "bg-[#eff6ff] outline outline-2 outline-[#2563eb]"
          : "bg-[#f8fafd]"
      }`}
    >
      {featured && (
        <span className="absolute left-1/2 top-[-10px] -translate-x-1/2 rounded-[20px] bg-[#2563eb] px-3 py-[3px] text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
          Recommended
        </span>
      )}

      <h4
        className="mb-4 text-[14px] font-semibold tracking-[-0.01em]"
        style={{ color: accent }}
      >
        {title}
      </h4>

      <div className="flex flex-col gap-[10px]">
        <ScaleRow
          label="Workers"
          value={data?.workers}
        />

        <ScaleRow
          label="Investment"
          value={data?.investment}
        />

        <ScaleRow
          label="Revenue"
          value={data?.revenue}
        />

        <ScaleRow
          label="Profit"
          value={data?.profit}
        />
      </div>
    </div>
  );
};

const ScaleRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[12px] font-normal text-[#94a3b8]">
        {label}
      </span>

      <span className="text-[13px] font-medium text-[#0f172a]">
        {value}
      </span>
    </div>
  );
};

export default ModelUi;