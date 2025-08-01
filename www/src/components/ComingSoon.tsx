import React, { useState, useEffect } from 'react';
import "../../styles/ComingSoonBreathing.css";

const ComingSoon = () => {
  const [showContent, setShowContent] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Target launch date: 60 days from now (fixed reference point)
  const [launchDate] = useState(() => {
    // Set a fixed launch date 60 days from first render
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = launchDate.getTime();
      const difference = target - now;
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [launchDate]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 overflow-hidden bg-black">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Breathing gradient background */}
        <div
          className="absolute inset-0 animate-breathing-gradient"
          style={{
            background: 'radial-gradient(ellipse at 60% 40%, rgba(255,255,255,0.08) 0%, transparent 70%)',
            zIndex: 1
          }}
        />
        {/* Floating slow particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white opacity-10 rounded-full animate-particle"
            style={{
              left: `${(i * 100 / 12) + 2}%`,
              top: `${(i * 80 / 12) + 10}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${7 + (i % 3)}s`
            }}
          />
        ))}
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
            zIndex: 0
          }}
        />
      </div>

      <div className={`text-center relative z-10 transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Main content */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-widest mb-6">
            COMING SOON
          </h2>
          
          <div className="text-center mb-8">
            <span className="text-lg font-light text-gray-400 tracking-wider">
              something extraordinary
            </span>
          </div>

          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-4 sm:gap-8 max-w-2xl mx-auto mb-12">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINUTES', value: timeLeft.minutes },
              { label: 'SECONDS', value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={item.label} className="text-center">
                <div 
                  className="text-3xl sm:text-5xl font-light text-white mb-2 transition-all duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm tracking-widest text-gray-500 font-mono">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar - blend with background for seamless look */}
        <div className="w-full max-w-2xl mx-auto mb-12">
          <div className="relative h-px mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-white/0 via-white/80 to-white/0 transition-all duration-1000 ease-out"
              style={{ 
                width: `${Math.min(85, (60 - timeLeft.days) / 60 * 100)}%`
              }}
            />
          </div>
          <div className="text-xs tracking-widest font-mono text-gray-500 text-center">
            DEVELOPMENT IN PROGRESS
          </div>
        </div>

        {/* Additional messaging intentionally removed for minimalism */}

        {/* Subtle call-to-action */}
        <div className="mt-16">
          <div className="inline-flex items-center space-x-2 text-gray-400 text-sm tracking-wider">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            {/* intentionally left blank for minimalism */}
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ComingSoon;
