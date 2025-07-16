"use client";
import { Home as HomeIcon, Info, Star, LogIn, UserPlus } from 'lucide-react';
import { HeroGeometric } from '../components/ui/shape-landing-hero';
import { NavBar } from '../components/ui/tubelight-navbar';
import { FeaturesSectionWithHoverEffects } from '../components/ui/feature-section';
import { AboutUsSection } from '../components/ui/about-us-section';

const Home = () => {
  const navItems = [
    { name: 'Home', url: '#hero', icon: HomeIcon },
    { name: 'Features', url: '#features', icon: Star },
    { name: 'About Us', url: '#about', icon: Info },
    { name: 'Sign In', url: '/sign-in', icon: LogIn, isButton: true, variant: 'signin' as const },
    { name: 'Sign Up', url: '/sign-up', icon: UserPlus, isButton: true, variant: 'signup' as const }
  ];

  return (
    <div className="min-h-screen w-full bg-[#030303] overflow-x-hidden">
      <NavBar items={navItems} />
      <HeroGeometric
        badge="Campus Connect"
        title1="Lost Something?"
        title2="Find It Here"
        id="hero"
      />
      <FeaturesSectionWithHoverEffects id="features" />
      <AboutUsSection />
    </div>
  );
}

export default Home;