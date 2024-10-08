"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import bitbotLogo from './images/bitbot_logo.png';


interface Week {
  title: string;
  content: string[];
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [openWeek, setOpenWeek] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 1);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


    const [formData, setFormData] = useState({
      parentName: '',
      email: '',
      phoneNumber: '',
      childName: '',
      childAge: '',
    });
  
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSignUp = async (event: { preventDefault: () => void; }) => {
      event.preventDefault(); 
    
      try {
        const response = await fetch('/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.email,  
            message: `Hello ${formData.parentName}, thank you for signing up, ${formData.childName}!`
          })
        });
    
        if (response.ok) {
          alert('Email sent successfully!');
        } else {
          const errorData = await response.json();
          console.error('Failed to send email:', errorData);
          alert(`Failed to send email. Error: ${errorData.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error sending email:', error);
        alert(`An error occurred while sending the email`);
      }
    };
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleWeek = (weekIndex: number) => {
    setOpenWeek(openWeek === weekIndex ? null : weekIndex);
  };

  const weeks: Week[] = [
    {
      "title": "Week 1: Python Fundamentals",
      "content": [
        "Introduction to programming concepts",
        "Setting up Python environment",
        "Variables and data types",
        "Basic input/output operations",
        "Simple math operations"
      ]
    },
    {
      "title": "Week 2: Control Structures",
      "content": [
        "Conditional statements (if, else, elif)",
        "Loops (for and while)",
        "Basic error handling",
        "Simple game development"
      ]
    },
    {
      "title": "Week 3: Functions and Modules",
      "content": [
        "Creating and using functions",
        "Parameters and return values",
        "Importing and using modules",
        "Introduction to Python libraries"
      ]
    },
    {
      "title": "Week 4: Data Structures",
      "content": [
        "Lists and list comprehensions",
        "Dictionaries and sets",
        "Working with strings",
        "File handling basics"
      ]
    },
    {
      "title": "Week 5: Object-Oriented Programming",
      "content": [
        "Introduction to classes and objects",
        "Creating methods and attributes",
        "Inheritance and polymorphism"
      ]
    },
    {
      "title": "Week 6: GUI Programming",
      "content": [
        "Introduction to Tkinter",
        "Creating windows and widgets",
        "Event handling",
        "Building a simple GUI application"
      ]
    },
    {
      "title": "Week 7: Introduction to AI Concepts",
      "content": [
        "Basic AI and machine learning concepts",
        "Introduction to natural language processing",
        "Simple chatbot development"
      ]
    },
    {
      "title": "Week 8: Final Project",
      "content": [
        "Build a project incorporating key concepts learned (e.g., an AI-enhanced application or a game with a GUI)"
      ]
    }
  ];


  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 bg-blue-600 text-white p-4 z-10">
        <div className="max-w-6xl mx-auto flex h-full">
        <div className="flex justify-between items-center w-full">
          <a 
            href="#"
            className="text-xl hover:text-blue-200 transition duration-300"
            style={{ fontFamily: 'Poppins, sans-serif' }}
            onClick={(e) => {
              e.preventDefault(); 
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            BitBot Academy
          </a>

          <div className="flex space-x-4 items-center">
            <a 
              href="#"
              className="text-l hover:text-blue-200 transition duration-300"
              style={{ fontFamily: 'Poppins, sans-serif' }}
              onClick={(e) => {
                e.preventDefault(); 
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              About
            </a>

            <a 
              href="#curriculum" 
              className="text-l hover:text-blue-200 transition duration-300"
              style={{ fontFamily: 'Poppins, sans-serif' }}
              onClick={() => scrollToSection('curriculum')}
            >
              Curriculum
            </a>

            <a 
              href="#enroll" 
              className="text-l bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition duration-300"
              style={{ fontFamily: 'Poppins, sans-serif' }}
              onClick={() => scrollToSection('enroll')}
            >
              Enroll Now
            </a>
          </div>
        </div>
        </div>
      </header>

      <main className={`flex-grow pt-24 pb-20 px-8 bg-gradient-to-b from-blue-100 to-purple-100 transition-opacity duration-1000`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
          <h1 className="text-5xl font-bold mb-4 text-blue-800" style={{ fontFamily: 'Poppins, sans-serif' }}>Welcome to BitBots Academy!</h1>   
          <p className="text-xl mb-8 text-gray-600">Empowering kids aged 6-17 with AI-powered coding education</p>
            <a href="#enroll" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition duration-300">
              Start Your Coding Journey
            </a>
          </div>

          <section id="about" className={`mb-16 text-center transform transition-all duration-1000 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

            <h2 className="text-3xl font-semibold mb-4 text-blue-700"             style={{ fontFamily: 'Poppins, sans-serif' }}
            >Why Choose BitBots Academy?</h2>
            <p className="text-lg mb-6 text-gray-700">
              In a future increasingly driven by AI and programming, BitBots Academy equips your child with the skills needed to excel. 
              Our comprehensive 8-week course integrates advanced AI technology with interactive lessons, making coding both enjoyable and accessible.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-blue-600"            style={{ fontFamily: 'Poppins, sans-serif' }}
                >AI-Powered Learning</h3>
                  <p className="text-gray-600">Personalized instruction adapts to your child&apos;s pace and style</p>
                  </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-blue-600"            style={{ fontFamily: 'Poppins, sans-serif' }}
                >Age-Appropriate Content</h3>
                <p className="text-gray-600">Tailored lessons for ages 6-17, ensuring the right challenge level</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-blue-600"            style={{ fontFamily: 'Poppins, sans-serif' }}
                >Real-World Projects</h3>
                <p className="text-gray-600">Apply coding skills to exciting, practical projects</p>
              </div>
            </div>
          </section>

          
<section id="curriculum" className={`mb-16 text-center transform transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
  <h2 className="text-3xl font-semibold mb-6 text-blue-700"            style={{ fontFamily: 'Poppins, sans-serif' }}
  >
    Our 10-Week Python Adventure
  </h2>
  <p className="text-lg mb-8 text-gray-600">
    A comprehensive journey from coding basics to advanced concepts and AI integration, tailored for ages 6-17.
  </p>
  <div className="space-y-4">
    {weeks.map((week, index) => (
      <div key={index} className="border border-blue-300 rounded-lg shadow-lg overflow-hidden">
        <button
          className="w-full text-left px-6 py-4 bg-blue-50 hover:bg-blue-100 transition-colors duration-300 flex justify-between items-center"
          onClick={() => toggleWeek(index)}
        >
          <span className="text-lg font-semibold text-blue-600"            style={{ fontFamily: 'Poppins, sans-serif' }}
          >{week.title}</span>
          <span className="text-blue-500 text-xl">{openWeek === index ? '▲' : '▼'}</span>
        </button>
        {openWeek === index && (
          <div className="bg-white p-6 border-t border-blue-200">
            <ul className="list-disc list-inside text-gray-700 text-left space-y-2">
              {week.content.map((item, itemIndex) => (
                <li key={itemIndex} className="text-lg">{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ))}
  </div>
  <p className="text-lg mt-8 text-gray-600">
    Each week includes hands-on projects, coding challenges, and interactive lessons to reinforce learning and spark creativity.
  </p>
</section>
          <section id="enroll" className="w-full max-w-md mx-auto text-center transform transition-all duration-1000 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
            <h2 className="text-3xl font-semibold mb-4 text-blue-700"            style={{ fontFamily: 'Poppins, sans-serif' }}
            >Enroll Now</h2>
            <div className="flex justify-center mb-6">
              <Image
                src={bitbotLogo}
                alt="BitBots Academy Logo"
                width={250}
                height={20}
                priority
                className="mx-auto"
              />
            </div>
            <p className="text-lg mb-6 text-gray-700">
              Start your child&apos;s coding adventure today!
            </p>
          <form>
            <input
              type="text"
              name="parentName"
              placeholder="Parent's Name"
              className="w-full px-4 py-2 rounded border"
              style={{color: 'black'}}
              value={formData.parentName}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 rounded border"
              style={{color: 'black'}}
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              className="w-full px-4 py-2 rounded border"
              style={{color: 'black'}}
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <input
              type="text"
              name="childName"
              placeholder="Child's Name"
              className="w-full px-4 py-2 rounded border"
              style={{color: 'black'}}
              value={formData.childName}
              onChange={handleChange}
            />
            <input
              type="number"
              name="childAge"
              placeholder="Child's Age"
              className="w-full px-4 py-2 rounded border"
              style={{color: 'black'}}
              value={formData.childAge}
              onChange={handleChange}
            />
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300" 
              onClick={handleSignUp}>
              Sign Up
            </button>
          </form>
          </section>
        </div>
      </main>

      <footer className={`fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-4 text-center transition-opacity duration-300 ${isAtBottom ? 'opacity-100' : 'opacity-0'}`}>
        <p>&copy; 2024 BitBots Academy. All rights reserved.</p>
      </footer>
    </div>
  );
}