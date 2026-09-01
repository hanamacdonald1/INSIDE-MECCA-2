import Link from "next/link";
import { PageHero, SitePage } from "../site-shell";

const participants = ["Current or former employees", "Managers and regional leaders", "Head Office and HR staff", "Contractors"];
const choices = [
  ["Identity", "Use your name, a pseudonym or remain anonymous."],
  ["Format", "Choose filmed, blurred, voice-altered, audio-only or written participation."],
  ["Use", "Approve each proposed use of your interview before publication."],
];
const questions = [
  "What did you expect when you joined MECCA?",
  "What happened, and what changed for you?",
  "How did the experience affect your work or life?",
  "What would meaningful change look like?",
];

export default function Documentary(){return <SitePage>
  <PageHero label="Documentary interviews" title="There is a person behind every record" dark><p>The questionnaire helps us collect structured evidence. An interview has a different purpose: to understand what a workplace experience meant to the person who lived it, in their own voice.</p><p>You can ask about an interview without agreeing to be recorded, identified or published.</p><div className="rb-actions"><a className="rb-button red" href="mailto:media@insidemecca.net?subject=Documentary%20Interview">Ask about an interview</a><Link className="rb-button" href="/share-story/research-questionnaire">Use the research questionnaire</Link></div></PageHero>
  <section className="rb-section"><p className="rb-kicker">Who we want to hear from</p><h2>People who know the workplace directly</h2><p className="rb-lede">That may include:</p><ul className="rb-participant-grid">{participants.map(x=><li key={x}>{x}</li>)}</ul><p className="rb-note">Positive, negative and mixed experiences are all relevant.</p></section>
  <section className="rb-section dark"><p className="rb-kicker">Before anything is recorded</p><h2>You choose the boundaries</h2><p className="rb-lede">We will discuss identity, format and possible use with you. Those choices can include:</p><div className="rb-grid">{choices.map(([title,copy])=><article className="rb-card" key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div><p className="rb-note"><strong>Identifiable material is not published without explicit consent.</strong></p></section>
  <section className="rb-section"><p className="rb-kicker">What we might talk about</p><h2>The conversation starts with your experience</h2><p className="rb-lede">There is no script you need to prepare. These are some of the questions that may help us begin:</p><ol className="rb-interview-questions">{questions.map(item=><li key={item}>{item}</li>)}</ol></section>
  <section className="rb-section dark"><p className="rb-kicker">If you are considering it</p><h2>Start with a private conversation</h2><p className="rb-lede">Ask questions, talk through safety and decide whether you want to go any further. You can stop before recording, and recording is not the same as publication consent.</p><a className="rb-button red" href="mailto:media@insidemecca.net?subject=Documentary%20Interview">Contact the documentary team</a></section>
</SitePage>}
