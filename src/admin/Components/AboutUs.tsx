

const AboutUs = () => {
  return (
    <div className="bg-gray-100 text-gray-900 p-6 md:p-12 min-h-screen">
      <header className="bg-purple-700 text-white text-center py-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-lg mt-2">Your Trusted Partner for Comprehensive Vehicle Insurance</p>
      </header>

      <section className="mt-10 space-y-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-purple-700">Who We Are</h2>
          <p className="mt-2 text-gray-700">
            At <span className="font-semibold">V2 Enterpirses</span>, we believe in providing our customers with the best and most affordable vehicle insurance options.
            With years of experience in the industry, our mission is to offer comprehensive coverage for cars, motorcycles, trucks, and more.
            We prioritize customer satisfaction and peace of mind, ensuring that you are always protected on the road.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-purple-700">Why Choose Us?</h2>
          <p className="mt-2 text-gray-700">We understand the importance of reliable insurance coverage. Here's why we're the preferred choice:</p>
          <ul className="mt-4 space-y-2 list-disc pl-6 text-gray-700">
            <li><strong className="text-purple-700">Comprehensive Coverage:</strong> All-inclusive plans for accidents, theft, or damage.</li>
            <li><strong className="text-purple-700">Affordable Premiums:</strong> Budget-friendly policies with quality coverage.</li>
            <li><strong className="text-purple-700">24/7 Customer Support:</strong> Assistance whenever you need it.</li>
            <li><strong className="text-purple-700">Customizable Plans:</strong> Tailor your insurance to fit your needs.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-purple-700">Our Vehicle Insurance Plans</h2>
          <p className="mt-2 text-gray-700">We offer a variety of plans to suit every vehicle type and requirement:</p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-purple-100 p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold text-purple-800">Car Insurance</h3>
              <p className="text-gray-700">Comprehensive coverage for your car, including accident protection, theft coverage, and third-party liability.</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold text-purple-800">Motorcycle Insurance</h3>
              <p className="text-gray-700">Flexible and affordable plans to keep your bike protected from accidents, theft, and natural calamities.</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold text-purple-800">Commercial Vehicle Insurance</h3>
              <p className="text-gray-700">Insurance tailored for business vehicles, including trucks, vans, and delivery vehicles.</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold text-purple-800">Roadside Assistance</h3>
              <p className="text-gray-700">24/7 emergency support, including towing, flat tire assistance, and more.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-purple-700">Our Mission</h2>
          <p className="mt-2 text-gray-700">
            Our goal is to provide reliable, cost-effective, and customer-centric vehicle insurance services.
            We aim to simplify the insurance process and help you choose the best options for your vehicle.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-purple-700">Get In Touch</h2>
          <p className="mt-2 text-gray-700">If you have any questions or would like to learn more, feel free to contact us!</p>
          <p className="mt-2 text-gray-900 font-semibold">Email: support@V2_Enterpirses.com</p>
          <p className="text-gray-900 font-semibold">Phone: 123-456-7890</p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
