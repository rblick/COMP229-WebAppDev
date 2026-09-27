export default function Contact() {
  return (
    <main>
      <h1>Contact Me</h1>

      <section>
        <h2>Contact Information</h2>

        <p>Phone: (416) 627-9615<br></br>
        Email: robertblick@gmail.com<br></br>
        Location: Ontario, Canada</p>
      </section>

      <section>
        <h2>Send Me a Message</h2>

        <form>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
            />
          </div>

          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
            />
          </div>

          <div>
            <label htmlFor="phone">Contact Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
            />
          </div>

          <div>
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
            />
          </div>

          <div>
            <label htmlFor="message">Message:</label>

            <textarea
              id="message"
              name="message"
              rows="5"
            ></textarea>
          </div>

          <button type="submit">
            Send Message
          </button>
        </form>
      </section>

    </main>
  );
}
