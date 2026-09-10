"use client";

import { useState } from "react";
import type { ChangeEvent, Dispatch, FormEvent, ReactNode, SetStateAction } from "react";

const listFields = ["approach", "designDecisions", "technologies", "results"] as const;

type ProjectForm = {
  slug: string;
  title: string;
  category: string;
  serviceSlug: string;
  role: string;
  timeline: string;
  year: string;
  displayIndex: string;
  typeTags: string;
  status: "draft" | "live";
  approved: boolean;
  featured: boolean;
  primaryFeatured: boolean;
  outcome: string;
  problem: string;
  insight: string;
  approach: string;
  designDecisions: string;
  technologies: string;
  interactionDetail: string;
  results: string;
  reflection: string;
  liveUrl: string;
  githubUrl: string;
  accent: "gold" | "cyan" | "fog";
};

const initialProject: ProjectForm = {
  slug: "", title: "", category: "", serviceSlug: "", role: "", timeline: "", year: new Date().getFullYear().toString(),
  displayIndex: "1", typeTags: "", status: "draft", approved: false, featured: false, primaryFeatured: false,
  outcome: "", problem: "", insight: "", approach: "", designDecisions: "", technologies: "", interactionDetail: "",
  results: "", reflection: "", liveUrl: "", githubUrl: "", accent: "gold",
};

export function AdminConsole({ initialAuthenticated }: { initialAuthenticated: boolean }) {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [project, setProject] = useState(initialProject);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submitLogin(event: FormEvent) {
    event.preventDefault();
    setError(""); setMessage("");
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(login) });
    if (!response.ok) { setError((await response.json()).error); return; }
    setAuthenticated(true);
  }

  async function submitProject(event: FormEvent) {
    event.preventDefault();
    setError(""); setMessage("");
    const payload = {
      ...project,
      displayIndex: Number(project.displayIndex),
      typeTags: project.typeTags.split(",").map((item) => item.trim()).filter(Boolean),
      ...Object.fromEntries(listFields.map((field) => [field, split(project[field])])),
    };
    const response = await fetch("/api/admin/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!response.ok) { setError((await response.json()).error); return; }
    setMessage("Project saved. It is now available at its case-study URL.");
    setProject(initialProject);
  }

  async function submitSettings(event: FormEvent<HTMLFormElement>, action: "change-password" | "add-admin") {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/settings", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, password: form.get("password"), newEmail: form.get("newEmail") }),
    });
    if (!response.ok) { setError((await response.json()).error); return; }
    setMessage(action === "change-password" ? "Password changed." : "New admin added.");
    event.currentTarget.reset();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
  }

  if (!authenticated) {
    return <main className="admin-console min-h-dvh bg-ink px-6 py-20 text-paper"><div className="mx-auto max-w-md">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">Private route / admin</p>
      <form onSubmit={submitLogin} className="mt-10 space-y-5 rounded-lg border border-line bg-ink-soft p-6">
        <Field label="Email"><input required type="email" value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} /></Field>
        <Field label="Password"><input required type="password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} /></Field>
        <Submit>Sign in</Submit>
        {error && <p className="text-sm text-red-300" role="alert">{error}</p>}
      </form>
    </div></main>;
  }

  return <main className="admin-console min-h-dvh bg-ink px-6 py-12 text-paper"><div className="mx-auto max-w-5xl">
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-8">
      <div><p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">Private route / admin</p></div>
      <button type="button" onClick={logout} className="font-mono text-xs uppercase tracking-widest text-text-muted hover:text-paper">Sign out</button>
    </div>
    {message && <p className="mt-6 border border-signal/40 bg-signal/10 p-4 text-sm text-signal">{message}</p>}
    {error && <p className="mt-6 border border-red-400/40 bg-red-400/10 p-4 text-sm text-red-200">{error}</p>}
    <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
      <form onSubmit={submitProject} className="space-y-8">
        <Panel title="New project">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Slug" hint="Lowercase URL slug"><input required value={project.slug} onChange={update(setProject, project, "slug")} /></Field>
            <Field label="Title"><input required value={project.title} onChange={update(setProject, project, "title")} /></Field>
            <Field label="Category"><input required value={project.category} onChange={update(setProject, project, "category")} /></Field>
            <Field label="Service slug"><input required value={project.serviceSlug} onChange={update(setProject, project, "serviceSlug")} /></Field>
            <Field label="Role"><input required value={project.role} onChange={update(setProject, project, "role")} /></Field>
            <Field label="Timeline"><input required value={project.timeline} onChange={update(setProject, project, "timeline")} /></Field>
            <Field label="Year"><input required value={project.year} onChange={update(setProject, project, "year")} /></Field>
            <Field label="Display index"><input required type="number" min="1" value={project.displayIndex} onChange={update(setProject, project, "displayIndex")} /></Field>
            <Field label="Type tags" hint="Comma-separated"><input value={project.typeTags} onChange={update(setProject, project, "typeTags")} /></Field>
            <Field label="Accent"><select value={project.accent} onChange={update(setProject, project, "accent")}><option value="gold">Gold</option><option value="cyan">Cyan</option><option value="fog">Fog</option></select></Field>
          </div>
          <div className="mt-6 flex flex-wrap gap-5 text-sm text-text-muted">
            <Toggle label="Approved for public display" checked={project.approved} onChange={(e) => setProject({ ...project, approved: e.target.checked })} />
            <Toggle label="Featured on homepage" checked={project.featured} onChange={(e) => setProject({ ...project, featured: e.target.checked })} />
            <Toggle label="Primary featured card" checked={project.primaryFeatured} onChange={(e) => setProject({ ...project, primaryFeatured: e.target.checked })} />
          </div>
        </Panel>
        <Panel title="Case study content">
          <div className="space-y-5">
            <Field label="Outcome"><textarea required value={project.outcome} onChange={update(setProject, project, "outcome")} /></Field>
            <Field label="Problem"><textarea required value={project.problem} onChange={update(setProject, project, "problem")} /></Field>
            <Field label="Insight"><textarea required value={project.insight} onChange={update(setProject, project, "insight")} /></Field>
            <ListField label="Approach" value={project.approach} onChange={update(setProject, project, "approach")} />
            <ListField label="Design decisions" value={project.designDecisions} onChange={update(setProject, project, "designDecisions")} />
            <ListField label="Technologies" value={project.technologies} onChange={update(setProject, project, "technologies")} />
            <Field label="Interaction detail" hint="Optional"><textarea value={project.interactionDetail} onChange={update(setProject, project, "interactionDetail")} /></Field>
            <ListField label="Results" value={project.results} onChange={update(setProject, project, "results")} />
            <Field label="Reflection"><textarea required value={project.reflection} onChange={update(setProject, project, "reflection")} /></Field>
          </div>
        </Panel>
        <Panel title="Links and publishing">
          <div className="grid gap-5 md:grid-cols-2"><Field label="Live URL" hint="Optional"><input type="url" value={project.liveUrl} onChange={update(setProject, project, "liveUrl")} /></Field><Field label="GitHub URL" hint="Optional"><input type="url" value={project.githubUrl} onChange={update(setProject, project, "githubUrl")} /></Field><Field label="Status"><select value={project.status} onChange={update(setProject, project, "status")}><option value="draft">Draft</option><option value="live">Live</option></select></Field></div>
        </Panel>
        <Submit>Save project</Submit>
      </form>
      <aside className="space-y-6">
        <Panel title="Change password"><form onSubmit={(e) => submitSettings(e, "change-password")} className="space-y-4"><Field label="New password"><input required minLength={10} name="password" type="password" /></Field><Submit>Update password</Submit></form></Panel>
        <Panel title="Add admin"><form onSubmit={(e) => submitSettings(e, "add-admin")} className="space-y-4"><Field label="Email"><input required name="newEmail" type="email" /></Field><Field label="Temporary password"><input required minLength={10} name="password" type="password" /></Field><Submit>Add admin</Submit></form></Panel>
      </aside>
    </div>
  </div></main>;
}

function split(value: string) { return value.split("\n").map((item) => item.trim()).filter(Boolean); }
function update<T extends keyof ProjectForm>(set: Dispatch<SetStateAction<ProjectForm>>, state: ProjectForm, key: T) {
  return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => set({ ...state, [key]: event.target.value });
}
function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) { return <label className="block text-sm text-text-muted"><span className="mb-2 block text-paper">{label}</span>{children}{hint && <span className="mt-1 block text-xs text-text-subtle">{hint}</span>}</label>; }
function ListField({ label, value, onChange }: { label: string; value: string; onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void }) { return <Field label={label} hint="One item per line"><textarea required value={value} onChange={onChange} /></Field>; }
function Panel({ title, children }: { title: string; children: ReactNode }) { return <section className="rounded-lg border border-line bg-ink-soft p-6"><h2 className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-signal">{title}</h2>{children}</section>; }
function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (event: ChangeEvent<HTMLInputElement>) => void }) { return <label className="flex items-center gap-2"><input type="checkbox" checked={checked} onChange={onChange} />{label}</label>; }
function Submit({ children }: { children: ReactNode }) { return <button type="submit" className="rounded-md bg-signal px-5 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:bg-signal-hover">{children}</button>; }
