

const Services = () => {
  return (
    <div className="bg-gray-100 text-gray-900 p-6 md:p-12 min-h-screen">
      <header className="bg-purple-700 text-white text-center py-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold">Our Services</h1>
        <p className="text-lg mt-2">Comprehensive and Affordable Insurance Plans for Your Vehicle</p>
      </header>

      <section className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-purple-700">🚗 Car Insurance</h2>
          <p className="mt-2 text-gray-700">
            Get comprehensive coverage for your car, including accident protection, third-party liability, and theft coverage.
            Drive with peace of mind knowing you're protected.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-purple-700">🏍️ Bike Insurance</h2>
          <p className="mt-2 text-gray-700">
            Our two-wheeler insurance ensures that your motorcycle or scooter is covered in case of accidents, damages, or theft.
            Ride worry-free with our flexible plans.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-purple-700">🚛 Commercial Vehicle Insurance</h2>
          <p className="mt-2 text-gray-700">
            Protect your business vehicles with our commercial vehicle insurance, covering damages, accidents, and liability for trucks, vans, and more.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-purple-700">🛠️ Roadside Assistance</h2>
          <p className="mt-2 text-gray-700">
            Get 24/7 roadside assistance for emergency breakdowns, flat tires, battery issues, and towing services. We’re just a call away when you need help.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-purple-700">📄 Third-Party Liability Insurance</h2>
          <p className="mt-2 text-gray-700">
            Stay legally covered with our third-party liability insurance, ensuring you are protected against damages caused to other vehicles and individuals.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-purple-700">🔄 Renewal & Custom Plans</h2>
          <p className="mt-2 text-gray-700">
            Renew your existing policy hassle-free or customize your insurance plan according to your needs.
            Choose flexible premium options and enjoy maximum benefits.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Services;
