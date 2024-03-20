import React, { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

export const FAQPage = () => {
  const faqs: FAQ[] = [
    {
      question: 'I\'m a driver looking for parking in a busy downtown area. How can this platform help me?',
      answer: 'Our platform helps drivers like you find convenient and affordable parking spots in busy downtown areas. You can search for available spots, view detailed listings, and book a spot in advance, ensuring a hassle-free parking experience.'
    },
    {
      question: 'I own a parking space that I\'m not using all the time. How can I benefit from this platform?',
      answer: 'If you own a parking space that is underutilized, our platform allows you to list your space and earn money by renting it out to drivers in need of parking. You can manage your listings, set your own prices, and reach a wider audience of potential renters.'
    },
    {
      question: 'How does the platform ensure the safety and security of parking spaces and transactions?',
      answer: 'We take safety and security seriously. All parking spaces listed on our platform undergo verification to ensure they meet our standards. Transactions are securely processed, and we have a reliable review and rating system in place to maintain quality and trust among users.'
    },
    {
        question: 'Can I list my parking space for both short-term and long-term bookings?',
        answer: 'Yes, you can list your parking space for both short-term and long-term bookings. Our platform offers flexibility in booking durations, allowing you to cater to different user needs.'
      },
      {
        question: 'How do I pay for a parking spot reservation?',
        answer: 'You can pay for a parking spot reservation using our wallet. We ensure secure payment processing for all transactions.'
      },
      {
        question: 'What if I need to cancel a parking spot reservation?',
        answer: 'If you need to cancel a parking spot reservation, you can do so through your account on our platform. Please note that cancellation policies may vary depending on the parking space owner, so it\'s important to check the terms and conditions before booking.'
      },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">FAQ</h1>
      <div className="grid grid-cols-1 gap-4">
        {faqs.map((faq, index) => (
          <div key={index} className="flex flex-col bg-white mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 rounded-lg overflow-hidden">
            <button
              className="flex items-center justify-between px-4 py-2 bg-gray-200 hover:bg-gray-300 focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span className="text-2xl">{openIndex === index ? '-' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="flex-1 px-4 py-2 bg-gray-100">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

