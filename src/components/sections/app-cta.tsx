'use client';

import React from 'react';

const AppCTA: React.FC = () => {
    return (
      <section className="relative w-full py-[120px] md:py-[160px] px-5 sm:px-10 overflow-hidden">
        <div className="container max-w-[1280px] mx-auto">
          <div className="relative rounded-[40px] md:rounded-[48px] overflow-hidden h-[400px] md:h-[500px] lg:h-[580px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86890.67977986!2d-71.31788!3d46.8139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cb8968a05db8893%3A0x8fc52d63f0e83a03!2sQuebec%20City%2C%20QC%2C%20Canada!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Quebec City Service Area Map"
            />
          </div>
        </div>
      </section>
    );
};

export default AppCTA;