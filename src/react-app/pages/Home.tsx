import Hero from '@/react-app/components/Hero';
import CollegeCarousel from '@/react-app/components/CollegeCarousel';
import UploadForm from '@/react-app/components/UploadForm';
import Footer from '@/react-app/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <CollegeCarousel />
      <UploadForm />
      <Footer />
    </div>
  );
}
