import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-base-300 text-base-content p-4 mt-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

                <div>
                    <h1 className="text-2xl font-bold text-primary">CodeFusion</h1>
                    <p className="mt-3 text-sm">
                        Empowering developers to connect, collaborate, and grow. Join us to
                        explore job opportunities, mentorship, and coding solutions.
                    </p>
                </div>

                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-xl font-semibold">Contact Us</h3>
                    <div className="flex items-center gap-3 mt-3">
                        <MapPin size={24} />
                        <div>
                            <p>221B Baker Street</p>
                            <p>Pune, India</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                        <Phone size={24} />
                        <div>
                            <p>+91 9529563325</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                        <Mail size={24} />
                        <div>
                            <a href="mailto:contact@codefusion.com" className="text-primary hover:underline">
                                contact@codefusion.com
                            </a>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-xl font-semibold">About Us</h3>
                    <p className="mt-3 text-sm">
                        Join a thriving community of developers to share knowledge, solve
                        problems, and grow your career.
                    </p>

                    <div className="flex gap-4 mt-4">
                        <Linkedin size={24} className="hover:text-blue-500 cursor-pointer" />
                        <Twitter size={24} className="hover:text-blue-400 cursor-pointer" />
                        <Instagram size={24} className="hover:text-pink-500 cursor-pointer" />
                        <Facebook size={24} className="hover:text-blue-600 cursor-pointer" />
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-sm">
                © {new Date().getFullYear()} CodeFusion. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
