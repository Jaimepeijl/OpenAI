import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [title, setTitle] = useState("")
  const [result, setResult] = useState();
  const [loading, toggleLoading] = useState(false)
  const [div, toggleDiv] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    toggleLoading(true)
    toggleDiv(true)
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, input: input }),
    });
    toggleLoading(false)
    const data = await response.json();
    setResult(data.result);
    console.log(result)
    console.log(response)
  }

  return (
      <>
      <main className={styles.main}>
        <form onSubmit={onSubmit}>
          <div className={styles.title}>
          <h3>Jaimes</h3>
          <h3>Verhalen verteller</h3>
        </div>
          <p>De titel is :</p>
          <input
              className={styles.input}
              type="text"
              name="title"
              placeholder="Bijv. De avonturen van Jaimes verhalen verteller"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
          />
          <p>Het verhaal gaat over :</p>
          <textarea
            className={styles.textarea}
            name="input"
            placeholder="Bijv. Een losgeslagen AI verhalen verteller die plunderend het land doortrekt op zoek naar betekenis. "
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input type="submit" value="Genereer een verhaal" />
        </form>
        {div && <div className={styles.result}>
          {loading && <span>Aan het laden ...</span>}
          <h2>{title}</h2>
          {result}
        </div>}
      </main>
      </>
  );
}
