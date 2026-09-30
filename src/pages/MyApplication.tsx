import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { supabase } from '../helper/SupabaseClient';
import {
  User,
  Phone,
  FileText,
  ShieldCheck,
  GraduationCap,
  Pencil,
  CircleCheck,
  CircleX,
  Copy,
  Check,
  Send,
  Wallet,
  Building2,
  Loader,
  IdCard,
} from 'lucide-react';

// ---------- Shared helpers & sub-components ----------

const display = (value?: unknown): string =>
  value === null || value === undefined || String(value).trim() === ''
    ? 'Not available'
    : String(value).trim();

const SECTIONS = [
  { id: 'status', label: 'Overview' },
  { id: 'personal', label: 'Personal' },
  { id: 'contact', label: 'Contact' },
  { id: 'additional', label: 'Additional' },
  { id: 'guardian', label: 'Guardian' },
  { id: 'subjects', label: 'Subjects' },
  { id: 'courses', label: 'Courses' },
  { id: 'actions', label: 'Submit' },
];

function SectionNav() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  useEffect(() => {
    const sections = SECTIONS
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    let raf = 0;
    const update = () => {
      const probe = 140; // keep in sync with sticky nav + scroll-mt offset
      let current = sections[0].id;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= probe) current = el.id;
      }
      // At the very bottom of the page, highlight the last section
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = sections[sections.length - 1].id;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActiveId(id);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="sticky top-16 z-40 border-b border-gray-200 bg-white/85 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto py-3">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollTo(section.id)}
              className={
                activeId === section.id
                  ? 'whitespace-nowrap rounded-full border border-indigo-600 bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white transition'
                  : 'whitespace-nowrap rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700'
              }
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function GroupHeading({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-700">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
}

type InfoField = { label: string; value?: unknown };

function EditButton({ path }: { path: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        window.location.hash = path;
      }}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100 active:scale-[0.97]"
    >
      <Pencil className="h-3.5 w-3.5" />
      Edit
    </button>
  );
}

function InfoCard({
  id,
  title,
  subtitle,
  icon: Icon,
  tone,
  editPath,
  fields,
}: {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
  editPath: string;
  fields: InfoField[];
}) {
  return (
    <div
      id={id}
      className="flex scroll-mt-32 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tone}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-bold text-gray-900">{title}</h3>
            {subtitle && <p className="truncate text-xs text-gray-500">{subtitle}</p>}
          </div>
        </div>
        <EditButton path={editPath} />
      </div>
      <div className="flex-1">
        {fields.map((field) => (
          <div
            key={field.label}
            className="grid grid-cols-1 gap-x-4 border-b border-gray-50 px-5 py-2.5 text-sm transition-colors last:border-0 hover:bg-gray-50/70 sm:grid-cols-5"
          >
            <span className="text-gray-500 sm:col-span-2">{field.label}</span>
            <span className="break-words font-medium text-gray-900 sm:col-span-3">
              {display(field.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CopyRow({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error('Could not copy to clipboard:', error);
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-3.5 py-2.5 ring-1 ring-amber-200/70">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-700/80">{label}</p>
        <p className={`truncate text-sm font-semibold ${accent ? 'text-emerald-700' : 'text-gray-900'}`}>
          {value}
        </p>
      </div>
      <button
        type="button"
        onClick={onCopy}
        title={`Copy ${label}`}
        className="shrink-0 rounded-md p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

function UniversityCard({
  id,
  name,
  tagline,
  logo,
  rows,
  editPath,
}: {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  rows: { label?: unknown; value?: unknown }[];
  editPath: string;
}) {
  return (
    <div
      id={id}
      className="flex scroll-mt-32 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-1.5 ring-1 ring-gray-200">
          <img src={logo} alt={`${name} logo`} className="max-h-full max-w-full object-contain" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-bold text-gray-900">{name}</h3>
          <p className="truncate text-xs text-gray-500">{tagline}</p>
        </div>
        <EditButton path={editPath} />
      </div>
      <div className="flex-1">
        <div className="grid grid-cols-5 gap-x-4 px-5 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          <span className="col-span-2">Faculty / Campus</span>
          <span className="col-span-3">Course</span>
        </div>
        <div className="divide-y divide-gray-100">
          {rows.map((row, index) => (
            <div
              key={index}
              className="grid grid-cols-5 items-center gap-x-4 px-5 py-2.5 text-sm transition-colors hover:bg-gray-50/70"
            >
              <span className="col-span-2 truncate font-medium text-gray-700" title={display(row.label)}>
                {display(row.label)}
              </span>
              <span className="col-span-3 truncate font-medium text-gray-900" title={display(row.value)}>
                {display(row.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SubjectsTable({ data }: { data: Record<string, string> }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            <th className="py-2.5 pl-5 pr-4">Subject</th>
            <th className="px-4 py-2.5">Level</th>
            <th className="w-36 py-2.5 pl-4 pr-5">Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {Array.from({ length: 9 }, (_, index) => index + 1).map((i) => {
            const subject = data[`subject${i}`];
            const level = data[`level${i}`];
            const rawPct = data[`percentage${i}`];
            const pct = Number(rawPct);
            const hasPct = String(rawPct ?? '').trim() !== '' && !Number.isNaN(pct);
            const barColor = hasPct
              ? pct >= 70
                ? 'bg-emerald-500'
                : pct >= 50
                  ? 'bg-amber-500'
                  : 'bg-red-500'
              : 'bg-gray-300';
            return (
              <tr key={i} className="transition-colors hover:bg-gray-50/70">
                <td className="py-3 pl-5 pr-4 font-medium text-gray-900">{display(subject)}</td>
                <td className="px-4 py-3 text-gray-700">{display(level)}</td>
                <td className="py-3 pl-4 pr-5">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full ${barColor}`}
                        style={{ width: `${hasPct ? Math.min(100, Math.max(0, pct)) : 0}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-xs font-semibold text-gray-700">
                      {hasPct ? `${pct}%` : '—'}
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function MyApplication() {
  const [data, setData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const developer = false; // Toggle for testing without auth

  // Fetch or mock data
  useEffect(() => {
    document.title = 'My Application';

    if (developer) {
      localStorage.setItem('token', 'test_token');
      setData({
        title: 'Mr.',
        first_name: 'John',
        middle_name: 'Doe',
        initials: 'JD',
        surname: 'Smith',
        'identification_number': '987654321',
        date_of_birth: '1990-01-01',
        gender: 'Male',
        marriage_status: 'Single',
        race: 'White',
        population: 'Urban',
        disability: 'No',
        school: 'Test School',
        email: 'john.doe@example.com',
        cell_num: '1234567890',
        boxnumber: '1234',
        streat_address: '123 Main St',
        suburb: 'Downtown',
        postal_code: '12345',
        city: 'Sample City',
        province: 'Sample Province',
        examination_number: 'EX123456',
        'education_department': 'Sample Dept.',
        'specify_device': 'Laptop',
        'presentation_method': 'Online',
        matric_upgrading: 'No',
        matric_completed: 'Yes',
        highest_grade: '12',
        'matric_year': '2008',
        guadian: 'Father',
        guadian_name: 'John Sr.',
        guadian_surname: 'Doe',
        guadian_initials: 'JD',
        guadian_title: 'Mr.',
        guadian_id: '123456789',
        guadian_income: '50000',
        subject1: 'Mathematics',
        level1: 'Higher Grade',
        percentage1: '85',
        subject2: 'English',
        level2: 'Higher Grade',
        percentage2: '78',
        subject3: 'Science',
        level3: 'Higher Grade',
        percentage3: '82',
        subject4: 'History',
        level4: 'Higher Grade',
        percentage4: '75',
        subject5: 'Geography',
        level5: 'Higher Grade',
        percentage5: '80',
        subject6: 'Art',
        level6: 'Higher Grade',
        percentage6: '88',
        subject7: 'Physical Education',
        level7: 'Higher Grade',
        percentage7: '90',
        subject8: 'Biology',
        level8: 'Higher Grade',
        percentage8: '84',
        subject9: 'Economics',
        level9: 'Higher Grade',
        percentage9: '79',
        ready: '1',
        paid: '1',
        nwu_campus1: 'Potchefstroom',
        nwu_course1: 'Computer Science',
        nwu_campus2: 'Vanderbijlpark',
        nwu_course2: 'Engineering',
        uwc_faculty1: 'Faculty of Arts',
        uwc_course1: 'Philosophy',
        uwc_faculty2: 'Faculty of Science',
        uwc_course2: 'Biology',
        uj_faculty1: 'Faculty of Education',
        uj_course1: 'Teaching',
        uj_faculty2: 'Faculty of Health Sciences',
        uj_course2: 'Nursing',
        file_id: 'base64string1',
        file_matric: 'base64string2',
      });
      setLoading(false);
    } else {
      if (!localStorage.getItem('token')) {
        window.location.hash = '/login';
      } else {
        // Fetch real data from supabase
        const fetchData = async () => {
          try {
            const { data: userData, error } = await supabase
            .from('applications')
            .select('*')
            .eq('id', localStorage.getItem('userId'))
            .single();
            
            if (error) {
              console.error('Error fetching application data:', error);
              setLoading(false);
              return;
            }

            const { data: userData2 } = await supabase
              .from('courses')
              .select('*')
              .eq('id', localStorage.getItem('userId'))
              .single();

            if (userData && userData2) {
              // Merge the two data objects
              setData({ ...userData, ...userData2 });
            } else {
              console.warn('No application data found for this user.');
            }
          } catch (err) {
            console.error('Error fetching application data:', err);
          }
          setLoading(false);
        };
        fetchData();
      }
    }

    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        // Only handle simple ID hashes (e.g., '#section1'), not route paths (e.g., '#/application/')
        if (hash.startsWith('#/') || hash.includes('/')) {
          return;
        }
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Wait for content to load before scrolling
    if (!loading) {
      handleHashNavigation();
    }

    // Also handle hash changes after initial load
    window.addEventListener('hashchange', handleHashNavigation);
    return () => window.removeEventListener('hashchange', handleHashNavigation);
  }, [developer, loading]);

  const applicationSubmit = async (e: React.FormEvent, value: string) => {
    e.preventDefault();

    const { error } = await supabase.from("applications").update({
      ready: value,
    }).eq("id", localStorage.getItem("userId"));

    if (error) {
        console.error("Error submitting subject info:", error.message);
        alert("Failed to submit subject information. Please try again.");
        return;
      }

    // force reload the page to reflect changes
    window.location.reload();
  };

  // const downloadFile = (base64String: string) => {
  //   const binaryString = atob(base64String);
  //   const len = binaryString.length;
  //   const bytes = new Uint8Array(len);
  //   for (let i = 0; i < len; i++) {
  //     bytes[i] = binaryString.charCodeAt(i);
  //   }
  //   const blob = new Blob([bytes], { type: 'application/pdf' });
  //   return URL.createObjectURL(blob);
  // };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-32">
          <Loader className="h-8 w-8 animate-spin text-indigo-600" />
          <p className="text-sm font-medium text-gray-500">Loading your application…</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Derived display values
  const fullName = [data.title, data.first_name, data.surname]
    .map((part) => (part || '').trim())
    .filter(Boolean)
    .join(' ');
  const avatarInitials =
    [data.first_name, data.surname]
      .map((part) => (part || '').trim().charAt(0).toUpperCase())
      .filter(Boolean)
      .join('') || 'U';
  const ready = data.ready === '1';
  const paid = data.paid === '1';
  const universitiesSelected = [
    Boolean(data.nwu_course1 || data.nwu_course2),
    Boolean(data.uwc_course1 || data.uwc_course2),
    Boolean(data.uj_course1 || data.uj_course2),
    Boolean(
      ['cao_course1', 'cao_course2', 'cao_course3', 'cao_course4', 'cao_course5', 'cao_course6'].some(
        (key) => (data[key] || '').trim() !== '',
      ),
    ),
  ].filter(Boolean).length;
  const subjectsSelected = Array.from({ length: 9 }, (_, i) => i + 1).filter(
    (i) => (data[`subject${i}`] || '').trim() !== '',
  ).length;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />

      {/* Hero header */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.14),transparent_55%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold text-white ring-1 ring-white/30">
              {avatarInitials}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-200">My Application</p>
              <h1 className="text-2xl font-bold text-white">{fullName || 'Applicant'}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {data['identification_number'] ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-indigo-100 ring-1 ring-white/20">
                    <IdCard className="h-3.5 w-3.5" />
                    {data['identification_number']}
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-indigo-100 ring-1 ring-white/20">
                  {ready ? (
                    <CircleCheck className="h-3.5 w-3.5 text-emerald-300" />
                  ) : (
                    <CircleX className="h-3.5 w-3.5 text-red-300" />
                  )}
                  {ready ? 'Ready to submit' : 'Draft'}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-indigo-100 ring-1 ring-white/20">
                  {paid ? (
                    <CircleCheck className="h-3.5 w-3.5 text-emerald-300" />
                  ) : (
                    <Wallet className="h-3.5 w-3.5 text-amber-300" />
                  )}
                  {paid ? 'Payment received' : 'Payment pending'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 md:ml-auto md:max-w-md">
            <div className="rounded-xl bg-white/10 px-4 py-3 text-center ring-1 ring-white/15">
              <p className="text-2xl font-bold text-white">
                {universitiesSelected}
                <span className="text-sm font-medium text-indigo-200">/4</span>
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-200">Universities</p>
            </div>
            <div className="rounded-xl bg-white/10 px-4 py-3 text-center ring-1 ring-white/15">
              <p className="text-2xl font-bold text-white">
                {subjectsSelected}
                <span className="text-sm font-medium text-indigo-200">/9</span>
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-200">Subjects</p>
            </div>
            <div className="rounded-xl bg-white/10 px-4 py-3 text-center ring-1 ring-white/15">
              <p className={`text-2xl font-bold ${paid ? 'text-emerald-300' : 'text-amber-300'}`}>
                {paid ? 'Paid' : 'Due'}
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-200">Fee R50</p>
            </div>
          </div>
        </div>
      </section>
      <SectionNav />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
          {/* Overview / Status */}
          <section id="status" className="scroll-mt-32">
            {paid ? (
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
                <CircleCheck className="h-6 w-6 shrink-0 text-emerald-600" />
                <div>
                  <p className="font-bold text-emerald-800">Payment received</p>
                  <p className="text-sm text-emerald-700">
                    Your R50 application fee has been paid. Review your details and submit your
                    application when ready.
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-amber-900">Payment required</h3>
                    <p className="mt-0.5 text-sm text-amber-800">
                      Pay the R50 application fee to the account below. We verify payment using your
                      ID number, so please use it as the payment reference.
                    </p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      <CopyRow label="Bank" value="Capitec" />
                      <CopyRow label="Account type" value="Savings" />
                      <CopyRow label="Account number" value="1624390313" />
                      <CopyRow
                        label="Reference (your ID)"
                        value={display(data['identification_number'])}
                        accent
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Applicant Details */}
          <section className="space-y-5">
            <GroupHeading
              icon={User}
              title="Applicant details"
              subtitle="Review your personal, contact and background information"
            />
            <div className="grid gap-6 lg:grid-cols-2">
              <InfoCard
                id="personal"
                title="Personal Details"
                subtitle="Identity and background"
                icon={User}
                tone="bg-indigo-50 text-indigo-600"
                editPath="/application/course/personal"
                fields={[
                  { label: 'Title', value: data.title },
                  { label: 'First Name', value: data.first_name },
                  { label: 'Middle Name', value: data.middle_name },
                  { label: 'Initials', value: data.initials },
                  { label: 'Surname', value: data.surname },
                  { label: 'ID Number', value: data['identification_number'] },
                  { label: 'Date of Birth', value: data.date_of_birth?.split('T')[0] },
                  { label: 'Gender', value: data.gender },
                  { label: 'Marriage Status', value: data.marriage_status },
                  { label: 'Race', value: data.race },
                  { label: 'Population', value: data.population },
                  { label: 'Disability', value: data.disability },
                  { label: 'School', value: data.school },
                ]}
              />

              <InfoCard
                id="contact"
                title="Contact Information"
                subtitle="How universities can reach you"
                icon={Phone}
                tone="bg-sky-50 text-sky-600"
                editPath="/application/course/contact"
                fields={[
                  { label: 'Email', value: data.email },
                  { label: 'Phone Number', value: data.cell_num },
                  { label: 'Box Number', value: data.boxnumber },
                  { label: 'Street Address', value: data.streat_address },
                  { label: 'Suburb', value: data.suburb },
                  { label: 'Postal Code', value: data.postal_code },
                  { label: 'City', value: data.city },
                  { label: 'Province', value: data.province },
                ]}
              />

              <InfoCard
                id="additional"
                title="Additional Information"
                subtitle="Matric and academic details"
                icon={FileText}
                tone="bg-amber-50 text-amber-600"
                editPath="/application/course/Additional"
                fields={[
                  { label: 'Examination Number', value: data.examination_number },
                  { label: 'Education Department', value: data['education_department'] },
                  { label: 'Specify Device', value: data['specify_device'] },
                  { label: 'Presentation Method', value: data['presentation_method'] },
                  { label: 'Matric Upgrading', value: data.matric_upgrading },
                  { label: 'Matric Completed', value: data.matric_completed },
                  { label: 'Highest Grade Passed', value: data.highest_grade },
                  { label: 'Matric Year', value: data['matric_year'] },
                ]}
              />

              <InfoCard
                id="guardian"
                title="Guardian Information"
                subtitle="Your guardian or sponsor"
                icon={ShieldCheck}
                tone="bg-violet-50 text-violet-600"
                editPath="/application/course/guadian"
                fields={[
                  { label: 'Relation to Applicant', value: data.guadian },
                  { label: 'Guardian Name', value: data.guadian_name },
                  { label: 'Guardian Surname', value: data.guadian_surname },
                  { label: 'Guardian Initials', value: data.guadian_initials },
                  { label: 'Guardian Title', value: data.guadian_title },
                  { label: 'Guardian ID', value: data.guadian_id },
                  { label: 'Guardian Income', value: data.guadian_income },
                ]}
              />
            </div>
          </section>

          {/* Subjects */}
          <section id="subjects" className="scroll-mt-32 space-y-5">
            <GroupHeading
              icon={GraduationCap}
              title="Subjects & Levels"
              subtitle="Your matric subjects and performance"
            />
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-gray-900">Subject and Level Information</h3>
                </div>
                <EditButton path="/application/course/subjects" />
              </div>

            <SubjectsTable data={data} />
            </div>
          </section>

          {/* University Courses */}
          <section id="courses" className="scroll-mt-32 space-y-5">
            <GroupHeading
              icon={Building2}
              title="University Courses"
              subtitle="Programmes you applied for at each institution"
            />
            <div className="grid gap-6 md:grid-cols-2">

              <UniversityCard
                id="nwu"
                name="North-West University"
                tagline="NWU"
                logo="https://veldfiremedia.com/wp-content/uploads/2022/12/NWU-logo-1200x620-1.png"
                rows={[
                  { label: data.nwu_campus1, value: data.nwu_course1 },
                  { label: data.nwu_campus2, value: data.nwu_course2 },
                ]}
                editPath="/application/course/nwu"
              />

              <UniversityCard
                id="uwc"
                name="University of Western Cape"
                tagline="UWC"
                logo="https://www.sabcnews.com/sabcnews/wp-content/uploads/2018/01/uwc-logo.jpg"
                rows={[
                  { label: data.uwc_faculty1, value: data.uwc_course1 },
                  { label: data.uwc_faculty2, value: data.uwc_course2 },
                ]}
                editPath="/application/course/uwc"
              />

              <UniversityCard
                id="cao"
                name="Central Admission Office"
                tagline="CAO"
                logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTFcP-BCdvm1jpyx6fLd-naad3YjGBJ3RCWkZEUvGp2suQLjpburtkO76-&s=10"
                rows={Array.from({ length: 6 }, (_, i) => i + 1).map((i) => ({
                  label: data[`cao_institution${i}`],
                  value: data[`cao_course${i}`],
                }))}
                editPath="/application/course/cao"
              />

              <UniversityCard
                id="uj"
                name="University of Johannesburg"
                tagline="UJ"
                logo="https://www.go2ppo.com/wp-content/uploads/2022/10/uj_logo.png"
                rows={[
                  { label: data.uj_faculty1, value: data.uj_course1 },
                  { label: data.uj_faculty2, value: data.uj_course2 },
                ]}
                editPath="/application/course/uj"
              />
            </div>
          </section>

          {/* Submit */}
          <section id="actions" className="scroll-mt-32">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-700 px-6 py-4">
                <h2 className="flex items-center gap-2 font-bold text-white">
                  <Send className="h-5 w-5" />
                  Submit your application
                </h2>
                <p className="mt-0.5 text-sm text-indigo-100">
                  Double-check all the information above before submitting.
                </p>
              </div>
              <div className="px-6 py-8 text-center">
                <p className="mx-auto max-w-xl text-sm text-gray-600">
                  If all your information is correct and you're ready to send your application
                  to the selected universities, press <strong>Send Application</strong> below.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={(e) => applicationSubmit(e, '1')}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98]"
                  >
                    <Send className="h-4 w-4" />
                    Send Application
                  </button>
                  <button
                    type="button"
                    onClick={(e) => applicationSubmit(e, '0')}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-8 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 active:scale-[0.98]"
                  >
                    <CircleX className="h-4 w-4" />
                    Cancel Application
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MyApplication;