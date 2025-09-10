import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("token", data.token);
      setMsg("Logged in!");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <form onSubmit={submit}>
      <input name="email" placeholder="Email" value={form.email} onChange={handle} required />
      <input name="password" placeholder="Password" type="password" value={form.password} onChange={handle} required />
      <button type="submit">Login</button>
      <div>{msg}</div>
    </form>
  );
}
