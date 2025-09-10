import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Register failed");
      localStorage.setItem("token", data.token);
      setMsg("Registered and logged in!");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <form onSubmit={submit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handle} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handle} required />
      <input name="password" placeholder="Password" type="password" value={form.password} onChange={handle} required />
      <button type="submit">Register</button>
      <div>{msg}</div>
    </form>
  );
}
