import MainLayout from "../layout/MainLayout";

function About() {
  return (
    <MainLayout>
      <section>
        <div
          className="relative h-80 bg-cover bg-center"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://www.topgear.com/sites/default/files/2023/12/1%20Land%20Rover%20Range%20Rover%20review.jpeg")',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-5xl font-bold tracking-wider">
              About <br className="lg:hidden"/> 
              Yansa Auto
            </h1>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed text-center">
              From a shared passion for cars and a vision to simplify the buying
              process, AutoVerse was born. We set out to create a trusted online
              showroom where quality, transparency, and customer satisfaction
              drive everything we do. Our journey is fueled by a commitment to
              innovation and a dedication to helping you find the car of your
              dreams with confidence and ease.
            </p>
          </section>
          <section className="mb-16 bg-white p-12 rounded-lg shadow-lg">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  To revolutionize the car buying experience by providing a
                  seamless, transparent, and customer-centric platform. We aim
                  to empower our customers with the knowledge and tools they
                  need to make informed decisions, ensuring they find the
                  perfect vehicle to meet their needs and preferences.
                </p>
                <a
                  className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-800 transition-colors"
                  href="/cars"
                >
                  Explore Our Cars
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-blue-50 rounded-lg text-center">
                  <span className="material-symbols-outlined text-4xl text-[var(--primary-color)] mb-2 flex justify-center items-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/6711/6711626.png" className="size-16 mx-auto" />
                  </span>
                  <h4 className="font-bold text-lg text-gray-900">Integrity</h4>
                </div>
                <div className="p-6 bg-blue-50 rounded-lg text-center">
                  <span className="material-symbols-outlined text-4xl text-[var(--primary-color)] mb-2 flex justify-center items-center">
                    <img src="https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_640.png" className="size-16 mx-auto"/>
                  </span>
                  <h4 className="font-bold text-lg text-gray-900">
                    Customer Focus
                  </h4>
                </div>
                <div className="p-6 bg-blue-50 rounded-lg text-center">
                  <span className="material-symbols-outlined text-4xl text-[var(--primary-color)] mb-2 flex justify-center items-center">
                    <img src="https://cdn3.iconfinder.com/data/icons/shopping-1/256/Discount-512.png" className="size-16 mx-auto" />
                  </span>
                  <h4 className="font-bold text-lg text-gray-900">
                    Discounts
                  </h4>
                </div>
                <div className="p-6 bg-blue-50 rounded-lg text-center">
                  <span className="material-symbols-outlined text-4xl text-[var(--primary-color)] mb-2 flex justify-center items-center">
                    <img src="https://cdn-icons-png.freepik.com/512/8420/8420332.png" className="size-16 mx-auto"/>
                  </span>
                  <h4 className="font-bold text-lg text-gray-900">Quality</h4>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

export default About;
