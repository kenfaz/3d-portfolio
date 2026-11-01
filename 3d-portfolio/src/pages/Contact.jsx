
import { useState } from "react";
import {
  Send,
  Mail,
  MapPin,
  Code2,
  BriefcaseBusiness,
  Sparkles,
  ArrowUpRight,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
  Copy,
} from "lucide-react";
import "./Contact.css";

// Replace this with your real Formspree endpoint.
// Example format: https://formspree.io/f/xxxxxxxx
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

// Replace these values with your actual contact information.
const contactDetails = {
  email: "khendavidfamadico@gmail.com",
  location: "Philippines",
  github: "https://github.com/kenfaz",
  // facebook: "https://www.facebook.com/kenfaz",
  linkedin: "https://www.linkedin.com/in/khen-david-famadico-50ba49292", // Add your LinkedIn profile URL if you have one.
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (status !== "idle") {
      setStatus("idle");
      setFeedback("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setStatus("error");
      setFeedback("Please complete all fields before submitting.");
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      setStatus("error");
      setFeedback("Please enter a valid email address.");
      return;
    }

    if (
      FORM_ENDPOINT.includes("YOUR_FORM_ID") ||
      !FORM_ENDPOINT.startsWith("https://")
    ) {
      setStatus("error");
      setFeedback(
        "The contact form has not been connected yet. Please use the email link instead."
      );
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("The message could not be sent.");
      }

      setStatus("success");
      setFeedback("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch {
      setStatus("error");
      setFeedback(
        "We couldn't send your message. Please try again or contact me by email."
      );
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contactDetails.email);
      setFeedback("Email address copied.");
      setStatus("copied");
    } catch {
      setFeedback("Please copy the email address manually.");
      setStatus("error");
    }
  }

  return (
    <main className="contact-page" id="contact">
      <div className="contact-stars" aria-hidden="true" />
      <div className="contact-orbit contact-orbit-one" aria-hidden="true" />
      <div className="contact-orbit contact-orbit-two" aria-hidden="true" />

      <section className="contact-hero">
        <div className="contact-hero-copy">
          <span className="contact-eyebrow">
            <Sparkles size={15} aria-hidden="true" />
            LET'S CONNECT
          </span>

          <h1>
            Have an idea?
            <span>Let's talk.</span>
          </h1>

          <p>
            Have a project in mind, want to collaborate, or simply want
            to connect? Send me a message. I'd be happy to hear from you.
          </p>

          <div className="contact-availability">
            <span className="contact-status-dot" />
            <span>Open to conversations and opportunities</span>
          </div>
        </div>

        <div className="contact-hero-visual" aria-hidden="true">
          <div className="contact-planet-ring contact-ring-one" />
          <div className="contact-planet-ring contact-ring-two" />
          <div className="contact-planet">
            <div className="contact-planet-shine" />
          </div>
          <div className="contact-icon-orbit contact-icon-orbit-one">
            <div className="contact-floating-icon contact-floating-mail">
              <Mail size={22} />
            </div>
          </div>
          <div className="contact-icon-orbit contact-icon-orbit-two">
            <div className="contact-floating-icon contact-floating-message">
              <MessageCircle size={22} />
            </div>
          </div>
          <span className="contact-star contact-star-one" />
          <span className="contact-star contact-star-two" />
          <span className="contact-star contact-star-three" />
        </div>
      </section>

      <section className="contact-content">
        <aside className="contact-info-panel">
          <span className="contact-section-kicker">CONTACT DETAILS</span>
          <h2>Find me across the universe.</h2>
          <p className="contact-info-intro">
            Choose whichever channel works best for you. I'll get back
            to you as soon as I can.
          </p>

          <a
            className="contact-info-item"
            href={`mailto:${contactDetails.email}`}
          >
            <span className="contact-info-icon">
              <Mail size={20} aria-hidden="true" />
            </span>
            <span className="contact-info-text">
              <span>Email</span>
              <strong>{contactDetails.email}</strong>
            </span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>

          <button
            type="button"
            className="contact-copy-email"
            onClick={copyEmail}
          >
            <Copy size={14} aria-hidden="true" />
            Copy email address
          </button>

          <div className="contact-info-item contact-location-item">
            <span className="contact-info-icon">
              <MapPin size={20} aria-hidden="true" />
            </span>
            <span className="contact-info-text">
              <span>Location</span>
              <strong>{contactDetails.location}</strong>
            </span>
          </div>

          <div className="contact-social-section">
            <h3>Connect socially</h3>
            <div className="contact-social-links">
              <a
                href={contactDetails.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                title="GitHub"
              >
                <Code2 size={20} />
              </a>

              {contactDetails.linkedin && (
                <a
                  href={contactDetails.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                  title="LinkedIn"
                >
                  <BriefcaseBusiness size={20} />
                </a>
              )}

              <a
                href={`mailto:${contactDetails.email}`}
                aria-label="Send an email"
                title="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="contact-side-decoration" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </aside>

        <section className="contact-form-panel">
          <div className="contact-form-heading">
            <span className="contact-section-kicker">SEND A MESSAGE</span>
            <h2>Let's start a conversation.</h2>
            <p>Fill out the form below and tell me what's on your mind.</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-row">
              <div className="contact-field">
                <label htmlFor="contact-name">Your name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  maxLength={100}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email">Email address</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={254}
                  required
                />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="What would you like to discuss?"
                value={formData.subject}
                onChange={handleChange}
                maxLength={150}
                required
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                placeholder="Tell me a little about your idea..."
                value={formData.message}
                onChange={handleChange}
                maxLength={5000}
                required
              />
              <span className="contact-character-count">
                {formData.message.length}/5000
              </span>
            </div>

            {feedback && (
              <div
                className={`contact-feedback contact-feedback-${status}`}
                role={status === "error" ? "alert" : "status"}
                aria-live="polite"
              >
                {status === "sending" && (
                  <LoaderCircle size={18} className="contact-spinner" />
                )}
                {status === "success" && <CheckCircle2 size={18} />}
                {status === "error" && <AlertCircle size={18} />}
                {status === "copied" && <CheckCircle2 size={18} />}
                <span>{feedback}</span>
              </div>
            )}

            <button
              className="contact-submit-button"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <>
                  <LoaderCircle
                    size={18}
                    className="contact-spinner"
                    aria-hidden="true"
                  />
                  Sending message...
                </>
              ) : (
                <>
                  Send message
                  <Send size={17} aria-hidden="true" />
                </>
              )}
            </button>

            <p className="contact-form-privacy">
              Your information is used to respond to your message.
            </p>
          </form>
        </section>
      </section>

      <footer className="contact-bottom-note">
        <Sparkles size={16} aria-hidden="true" />
        <p>Thanks for stopping by. I look forward to hearing from you.</p>
      </footer>
    </main>
  );
}
