import { useRef, useState } from "react";
import { api } from "../lib/api";
import Brand from "../components/Brand";
import Button from "../components/Button";
import Field, { inputClass } from "../components/Field";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const processSteps = [
  {
    number: "01",
    title: "Tell us what you need",
    description:
      "Share the required blood group and patient details, along with a supporting document.",
  },
  {
    number: "02",
    title: "We coordinate the help",
    description:
      "Our coordination team connects your request with the appropriate network partners.",
  },
  {
    number: "03",
    title: "Stay informed",
    description:
      "Keep your request reference handy and stay connected as your request progresses.",
  },
];

const benefits = [
  {
    title: "Connected partner workflow",
    description:
      "Requests can be coordinated with participating network partners.",
  },
  {
    title: "Supporting document upload",
    description:
      "Provide the relevant document through the request form.",
  },
  {
    title: "Human-led coordination",
    description:
      "A coordination team helps guide the request process.",
  },
];

function TrustPill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-800">
      <span className="text-red-500" aria-hidden="true">
        ✓
      </span>
      {children}
    </span>
  );
}

function SectionEyebrow({ children, light = false }) {
  return (
    <p
      className={`text-[11px] font-extrabold uppercase tracking-[0.22em] ${
        light ? "text-blue-200" : "text-blue-700"
      }`}
    >
      {children}
    </p>
  );
}

function BloodMark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M24 4C19 13 9 22 9 30a15 15 0 0 0 30 0C39 22 29 13 24 4Z"
        fill="currentColor"
      />
      <path
        d="M16 30c0 4 3 7 7 8"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-5 transition-transform duration-300 group-hover:translate-x-1"
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-5"
    >
      <path
        d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4"
    >
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-5"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function PublicHome() {
  const [form, setForm] = useState({
    patientName: "",
    bloodGroup: "",
    contact: "",
    documentName: "",
    documentType: "",
  });

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (message) setMessage("");
  };

  const submit = async (event) => {
    event.preventDefault();

    if (!file) {
      setMessage("Please attach a supporting document.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Your document must be 5 MB or smaller.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const payload = new FormData();

      Object.entries({
        ...form,
        component: "Red cells",
        units: 1,
        urgency: "urgent",
        idempotencyKey: crypto.randomUUID(),
      }).forEach(([key, value]) => payload.append(key, value));

      payload.append("document", file);

      const { data } = await api.post("/requests", payload);
      setSubmitted(data.request);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "We couldn't submit your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSubmitted(null);
    setFile(null);
    setMessage("");

    setForm({
      patientName: "",
      bloodGroup: "",
      contact: "",
      documentName: "",
      documentType: "",
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-900 antialiased selection:bg-blue-200 selection:text-blue-950">
      {/* HERO + REQUEST FORM */}
      <section className="relative isolate overflow-hidden bg-[#071A46] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 -z-10 size-[34rem] rounded-full bg-blue-500/30 blur-[110px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-20 -z-10 size-[32rem] rounded-full bg-red-500/20 blur-[110px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/3 -z-10 size-72 rounded-full bg-sky-400/10 blur-[100px]"
        />

        {/* NAVIGATION */}
        <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:h-24 sm:px-8 lg:px-10">
          <a href="#" aria-label="Blood Bridge home" className="shrink-0">
            <Brand light />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a
              className="text-sm font-semibold text-blue-100/80 transition hover:text-white"
              href="#how-it-works"
            >
              How it works
            </a>

            <a
              className="text-sm font-semibold text-blue-100/80 transition hover:text-white"
              href="#why-us"
            >
              Why Blood Bridge
            </a>

            <a
              className="group inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-blue-300/70 hover:bg-white/10"
              href="#request"
            >
              Request blood <ArrowIcon />
            </a>

            <a
              className="inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-900 transition hover:bg-blue-50"
              href="/admin"
            >
              Login
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href="/admin"
              className="inline-flex items-center rounded-xl border border-white/20 px-4 py-2.5 text-xs font-extrabold text-white transition hover:border-blue-300/70 hover:bg-white/10"
            >
              Login
            </a>
            <a
              href="#request"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-extrabold text-blue-900 transition hover:bg-blue-50"
            >
              Get help <ArrowIcon />
            </a>
          </div>
        </nav>

        {/* MAIN HERO */}
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(390px,0.86fr)] lg:gap-16 lg:px-10 lg:pb-24 lg:pt-12 xl:gap-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-300/25 bg-blue-400/10 px-4 py-2.5 text-xs font-bold text-blue-50 backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-red-400" />
              </span>
              Connected by care. Driven by hope.
            </div>

            <h1 className="mt-7 max-w-3xl font-[Manrope] text-[2.7rem] font-extrabold leading-[1.08] tracking-[-0.055em] sm:text-3xl ">
              When every
             
              moment matters,
              <br />
              <span className="bg-gradient-to-r from-sky-300 via-blue-300 to-white bg-clip-text text-transparent">
                We connect.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-blue-100/75 sm:text-base sm:leading-8">
              Finding the right blood support shouldn't feel overwhelming.
              Blood Bridge connects patients, hospitals and blood banks through
              one coordinated request experience.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#request"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-950/30 transition duration-300 hover:-translate-y-0.5 hover:from-blue-400 hover:to-blue-500"
              >
                Request blood support <ArrowIcon />
              </a>

              <a
                href="#how-it-works"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/[0.07]"
              >
                See how it works
              </a>
            </div>

            {/* FEATURE HIGHLIGHTS */}
            <div className="mt-10 grid max-w-xl grid-cols-1 gap-5 border-t border-white/15 pt-7 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-blue-300/20 bg-blue-400/10 text-blue-200">
                  <ShieldIcon />
                </span>

                <div>
                  <p className="text-sm font-bold text-white">
                    Privacy-minded
                  </p>
                  <p className="mt-1 text-xs leading-5 text-blue-100/60">
                    Protected information
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-red-300/20 bg-red-400/10 text-red-200">
                  <ClockIcon />
                </span>

                <div>
                  <p className="text-sm font-bold text-white">
                    Clear next steps
                  </p>
                  <p className="mt-1 text-xs leading-5 text-blue-100/60">
                    Guided coordination
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-blue-300/20 bg-blue-400/10 text-blue-200">
                  <BloodMark className="size-5 text-red-400" />
                </span>

                <div>
                  <p className="text-sm font-bold text-white">
                    Network-based
                  </p>
                  <p className="mt-1 text-xs leading-5 text-blue-100/60">
                    Connected partners
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-7 max-w-lg text-[11px] leading-5 text-blue-100/45">
              Blood Bridge coordinates requests; blood availability and
              fulfillment depend on participating providers and clinical
              verification.
            </p>
          </div>

          {/* REQUEST CARD */}
          <div
            id="request"
            className="scroll-mt-6 rounded-[1.5rem] border border-blue-100 bg-white p-5 text-slate-900 shadow-[0_35px_100px_-30px_rgba(0,0,0,0.55)] sm:rounded-[1.75rem] sm:p-8 lg:p-9"
          >
            {submitted ? (
              <div className="py-8 text-center sm:py-12">
                <div className="mx-auto grid size-[72px] place-items-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-9"
                    aria-hidden="true"
                  >
                    <path
                      d="m5 12 4 4L19 6"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="mt-5">
                  <SectionEyebrow>Request received</SectionEyebrow>
                </div>

                <h2 className="mt-3 font-[Manrope] text-3xl font-extrabold tracking-tight text-slate-950">
                  We're on it.
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-500">
                  Your request has been submitted to the coordination team.
                  Keep your reference number for future updates.
                </p>

                <div className="my-7 rounded-2xl border border-blue-100 bg-blue-50/80 p-5 text-left">
                  <p className="text-xs font-extrabold tracking-wide text-blue-700">
                    YOUR REQUEST REFERENCE
                  </p>

                  <p className="mt-2 break-all font-[Manrope] text-2xl font-extrabold tracking-wide text-blue-950">
                    {submitted.reference}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={reset}
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
                >
                  Submit another request <ArrowIcon />
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-red-500" />
                      <SectionEyebrow>Start here</SectionEyebrow>
                    </div>

                    <h2 className="mt-3 font-[Manrope] text-3xl font-extrabold tracking-[-0.045em] text-slate-950 sm:text-[2.15rem]">
                      Request blood
                    </h2>
                  </div>

                  <span className="shrink-0 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-[10px] font-extrabold tracking-wider text-blue-800">
                    QUICK FORM
                  </span>
                </div>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                  Tell us a little about the patient. Our team will use these
                  details to coordinate your request.
                </p>

                <div className="my-6 h-px bg-slate-100" />

                <form onSubmit={submit} className="space-y-5">
                  <Field label="Patient's full name">
                    <input
                      className={inputClass}
                      autoComplete="name"
                      required
                      maxLength={120}
                      value={form.patientName}
                      onChange={(event) =>
                        update("patientName", event.target.value)
                      }
                      placeholder="Enter patient's full name"
                    />
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Blood group">
                      <select
                        className={inputClass}
                        required
                        value={form.bloodGroup}
                        onChange={(event) =>
                          update("bloodGroup", event.target.value)
                        }
                      >
                        <option value="">Choose group</option>

                        {bloodGroups.map((group) => (
                          <option key={group} value={group}>
                            {group}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Contact number">
                      <input
                        className={inputClass}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        maxLength={20}
                        value={form.contact}
                        onChange={(event) =>
                          update("contact", event.target.value)
                        }
                        placeholder="+91 00000 00000"
                      />
                    </Field>
                  </div>

                  <Field label="Supporting document">
                    <input
                      ref={fileInputRef}
                      id="blood-bridge-document"
                      className="sr-only"
                      type="file"
                      required={!file}
                      accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                      onChange={(event) => {
                        const selected = event.target.files?.[0] || null;

                        if (selected && selected.size > 5 * 1024 * 1024) {
                          setMessage(
                            "Your document must be 5 MB or smaller."
                          );
                          setFile(null);
                          update("documentName", "");
                          update("documentType", "");
                          event.target.value = "";
                          return;
                        }

                        setFile(selected);
                        update("documentName", selected?.name || "");
                        update("documentType", selected?.type || "");
                      }}
                    />

                    <label
                      htmlFor="blood-bridge-document"
                      className={`mt-2 flex min-h-[100px] cursor-pointer items-center gap-4 rounded-2xl border border-dashed p-4 transition duration-200 focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 ${
                        file
                          ? "border-blue-400 bg-blue-50/80"
                          : "border-slate-300 bg-slate-50/70 hover:border-blue-400 hover:bg-blue-50/60"
                      }`}
                    >
                      <span
                        className={`grid size-12 shrink-0 place-items-center rounded-xl ${
                          file
                            ? "bg-blue-100 text-blue-800"
                            : "bg-white text-blue-700 shadow-sm ring-1 ring-slate-200"
                        }`}
                      >
                        {file ? (
                          <CheckIcon />
                        ) : (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="size-6"
                            aria-hidden="true"
                          >
                            <path
                              d="M12 16V4m0 0L7 9m5-5 5 5M5 15v4h14v-4"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>

                      <span className="min-w-0 flex-1">
                        <strong className="block break-words text-sm font-bold text-slate-800">
                          {file ? file.name : "Choose a supporting document"}
                        </strong>

                        <span className="mt-1.5 block text-xs leading-5 text-slate-500">
                          {file
                            ? `${(file.size / 1024).toFixed(0)} KB · Selected`
                            : "Prescription or accepted supporting document"}
                        </span>

                        <span className="mt-1 block text-[10px] font-medium text-slate-400">
                          PDF, JPG or PNG · Maximum 5 MB
                        </span>
                      </span>

                      {file && (
                        <span className="shrink-0 text-xs font-bold text-blue-700">
                          Change
                        </span>
                      )}
                    </label>
                  </Field>

                  {message && (
                    <p
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                    >
                      {message}
                    </p>
                  )}

                  <div className="[&>button]:!h-13 [&>button]:!w-full [&>button]:!rounded-xl [&>button]:!bg-blue-700 [&>button]:!font-extrabold [&>button]:!text-white [&>button]:!shadow-lg [&>button]:!shadow-blue-700/15 [&>button]:!transition [&>button:hover]:!bg-blue-800">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="h-13 w-full"
                    >
                      {loading
                        ? "Submitting request..."
                        : "Submit blood request"}
                      {!loading && <ArrowIcon />}
                    </Button>
                  </div>

                  <div className="flex items-start justify-center gap-2 px-2 text-center text-[11px] leading-5 text-slate-400">
                    <span className="mt-0.5 shrink-0 text-blue-700">
                      <ShieldIcon />
                    </span>

                    <p>
                      Please share only necessary information. Access and
                      document protection depend on your application's
                      security configuration.
                    </p>
                  </div>
                </form>
              </>
            )}

            <div className="mt-7 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
              <TrustPill>No account needed</TrustPill>
              <TrustPill>Guided coordination</TrustPill>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="h-px bg-gradient-to-r from-transparent via-blue-300/50 to-red-400/50"
        />
      </section>

      {/* QUICK HIGHLIGHTS */}
      <section
        aria-label="Blood Bridge highlights"
        className="border-b border-blue-100 bg-white"
      >
        <div className="mx-auto grid max-w-7xl gap-0 px-5 sm:grid-cols-3 sm:px-8 lg:px-10">
          {[
            {
              number: "01",
              title: "Easy to get started",
              description: "A simple request without account registration",
            },
            {
              number: "24/7",
              title: "Designed for urgent needs",
              description: "A clear, accessible request experience",
            },
            {
              number: "01",
              title: "One connected network",
              description: "A coordination point for participating partners",
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className={`flex items-center gap-4 py-6 sm:px-5 sm:py-7 lg:px-8 ${
                index !== 0
                  ? "border-t border-slate-100 sm:border-l sm:border-t-0"
                  : ""
              }`}
            >
              <span
                className={`font-[Manrope] text-2xl font-extrabold tracking-tight ${
                  index === 1 ? "text-red-600" : "text-blue-700"
                }`}
              >
                {item.number}
              </span>

              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="scroll-mt-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow>How Blood Bridge works</SectionEyebrow>

            <h2 className="mt-4 font-[Manrope] text-4xl font-extrabold leading-[1.12] tracking-[-0.055em] sm:text-5xl">
              Less searching.
              <br />
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-red-500 bg-clip-text text-transparent">
                More moving forward.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-slate-500 sm:text-base">
            A more straightforward first step for patients and families,
            supported by a connected network and human coordination.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <article
              key={step.number}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_55px_-25px_rgba(37,99,235,0.22)] sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`grid size-12 place-items-center rounded-xl font-[Manrope] text-sm font-extrabold text-white transition duration-300 ${
                    index === 1
                      ? "bg-red-500 group-hover:bg-red-600"
                      : "bg-blue-700 group-hover:bg-blue-800"
                  }`}
                >
                  {step.number}
                </span>

                <span className="font-[Manrope] text-4xl font-extrabold tracking-tight text-slate-100 transition group-hover:text-blue-100">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-8 font-[Manrope] text-xl font-extrabold tracking-tight text-slate-900">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                {step.description}
              </p>

              <div
                aria-hidden="true"
                className={`absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 group-hover:w-full ${
                  index === 1 ? "bg-red-500" : "bg-blue-600"
                }`}
              />
            </article>
          ))}
        </div>
      </section>

      {/* WHY BLOOD BRIDGE */}
      <section
        id="why-us"
        className="scroll-mt-10 relative isolate mx-5 mb-20 overflow-hidden rounded-[1.75rem] bg-[#071A46] text-white sm:mx-8 sm:rounded-[2rem] lg:mx-auto lg:mb-28 lg:max-w-7xl"
      >
        <div className="relative isolate grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-16 lg:px-16 lg:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 -z-10 size-80 rounded-full bg-blue-400/20 blur-[100px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 -z-10 size-72 rounded-full bg-red-500/15 blur-[100px]"
          />

          <div>
            <SectionEyebrow light>Care, connected</SectionEyebrow>

            <h2 className="mt-4 max-w-xl font-[Manrope] text-3xl font-extrabold leading-tight tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              A clearer path when it matters most.
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-blue-100/75 sm:text-base sm:leading-8">
              Blood Bridge brings patient requests and participating
              healthcare partners into a coordinated workflow, helping people
              understand the next step instead of navigating the process
              alone.
            </p>

            <a
              href="#request"
              className="group mt-7 inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-blue-900 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Start a request <ArrowIcon />
            </a>
          </div>

          <div className="grid gap-3">
            {benefits.map((item, index) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-4 transition duration-300 hover:border-blue-300/30 hover:bg-white/[0.09] sm:p-5"
              >
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-xl ${
                    index === 1
                      ? "bg-red-400/15 text-red-200"
                      : "bg-blue-400/15 text-blue-200"
                  }`}
                >
                  <CheckIcon />
                </span>

                <div>
                  <h3 className="text-sm font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-xs leading-6 text-blue-100/65">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-blue-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <a href="#" aria-label="Blood Bridge home" className="inline-flex">
            <Brand />
          </a>

          <p className="max-w-sm text-xs leading-6 text-slate-500 sm:text-right">
            Connecting people and healthcare partners through coordinated
            blood requests.
          </p>
        </div>

        <div className="border-t border-slate-100">
          <p className="mx-auto max-w-7xl px-5 py-4 text-[11px] leading-5 text-slate-400 sm:px-8 lg:px-10">
            Blood Bridge is a coordination platform and does not itself
            guarantee blood availability or replace professional medical care.
          </p>
        </div>
      </footer>
    </main>
  );
}
