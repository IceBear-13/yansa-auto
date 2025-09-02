import MainLayout from "../layout/MainLayout";

function Contact() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          <div className="flex flex-col space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Visit Our Showroom
              </h2>
              <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg shadow-lg">
                <iframe
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=Yansa%20Auto%20BMS%20Tangerang+(BMS)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  title="Yansa Auto location"
                  style={{ width: '100%', height: '100%', border: 0 }}
                  loading="lazy"
                />
              </div>
              <p className="mt-4 text-lg">Bursa Mobil Summarecon, Jhl Solitaire, Jl. Boulevard Raya Gading Serpong No.2 Blok C, Curug Sangereng, Kec. Klp. Dua, Kabupaten Tangerang, Banten 15810, Indonesia</p>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Or Contact Us via</h1>
            <div className="flex mt-8 items-center gap-2">
                <img src="https://pngimg.com/d/whatsapp_PNG21.png" className="size-8"></img>
                <p className="ml-2">WhatsApp</p>
            </div>
                <div className="flex mt-8 items-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png" className="size-8"></img>
                <p className="ml-2">Instagram</p>
            </div>
                <div className="flex mt-8 items-center gap-2">
                <img src="https://www.vhv.rs/dpng/d/449-4498595_email-icon-email-logo-white-png-transparent-png.png" className="size-8"></img>
                <p className="ml-2">Email</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Contact;
