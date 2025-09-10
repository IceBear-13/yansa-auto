import MainLayout from "../layout/MainLayout";
import { submitInquiry } from "../api/inquiries";


function Contact() {
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = (document.getElementById("full-name") as HTMLInputElement).value;
    const phoneNumber = (document.getElementById("phone") as HTMLInputElement).value;
    const message = (document.getElementById("message") as HTMLInputElement).value;

    if (!name || !phoneNumber || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const inquiry = {
      name,
      phoneNumber,
      message,
      createdAt: new Date(),
      updatedAt: new Date(),
      settled: false,
    };
    try {
      await submitInquiry(inquiry);
      alert("Inquiry submitted successfully.");
      (document.getElementById("full-name") as HTMLInputElement).value = "";
      (document.getElementById("phone") as HTMLInputElement).value = "";
      (document.getElementById("message") as HTMLInputElement).value = "";
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("There was an error submitting your inquiry. Please try again later.");
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="flex flex-col">
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
                Make an inquiry
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                We're here to help. Reach out to us with any questions or
                inquiries.
              </p>
            </div>
            <form className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                  htmlFor="full-name"
                >
                  Full Name
                </label>
                <input
                  className="form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4"
                  id="full-name"
                  placeholder="Enter your full name"
                  type="text"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  className="form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4"
                  id="phone"
                  placeholder="Enter your phone number"
                  type="tel"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="form-textarea block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm min-h-36 py-3 px-4"
                  id="message"
                  placeholder="Enter your message"
                  rows={4}
                ></textarea>
              </div>
              <div>
                <button
                  className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Visit Our Showroom
              </h2>
              <div className="mt-4 aspect-video overflow-hidden rounded-lg shadow-lg">
                <div style={{ width: "100%" }}>
                  <iframe
                    width="100%"
                    height="500"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Yansa%20Auto%20BMS+(Yansa%20Auto)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  >
                    <a href="https://www.mapsdirections.info/fr/calculer-la-population-sur-une-carte">
                      calculer la population sur la carte
                    </a>
                  </iframe>
                </div>
              </div>
              <p className="mt-4 text-base text-gray-600">
                Bursa Mobil Summarecon, Jhl Solitaire, Jl. Boulevard Raya Gading
                Serpong No.2 Blok C, Curug Sangereng, Kec. Klp. Dua, Kabupaten
                Tangerang, Banten 15810, Indonesia
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Contact Information
              </h2>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-blue-600">
                    {" "}
                    phone{" "}
                  </span>
                  <p className="text-base text-gray-600">
                    Phone: (555) 123-4567
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-blue-600">
                    {" "}
                    email{" "}
                  </span>
                  <p className="text-base text-gray-600">
                    Email: contact@autohub.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Contact;
