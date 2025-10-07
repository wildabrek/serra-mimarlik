import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Maximize2, X } from 'lucide-react';
import { mockProjects } from '../data/mockProjects';
import { Project } from '../lib/supabase';
import serraLogo from '../serra_logo.png';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const foundProject = mockProjects.find(p => p.slug === slug);
    if (foundProject) {
      setProject(foundProject);
    }
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-stone-600">Proje bulunamadı</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-stone-50"
    >
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-40 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm tracking-wide">ANA SAYFA</span>
          </button>
          <img 
            src={serraLogo} 
            alt="Serra Mimarlık" 
            className="h-10 w-auto cursor-pointer" 
            onClick={() => navigate('/')}
          />
        </div>
      </div>

      <div className="pt-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[70vh] overflow-hidden"
        >
          <img
            src={project.main_image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-sm tracking-wider text-stone-300 mb-4">{project.category}</p>
              <h1 className="text-5xl md:text-7xl font-light tracking-wide mb-6">
                {project.title}
              </h1>
              <p className="text-xl text-stone-200 max-w-2xl">
                {project.description}
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-3 gap-16 mb-16">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:col-span-2"
            >
              <h2 className="text-3xl font-light tracking-wide text-stone-900 mb-6">
                Projeye Genel Bakış
              </h2>
              <p className="text-lg text-stone-600 leading-relaxed">
                {project.full_description}
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="border-b border-stone-200 pb-6">
                <div className="flex items-start gap-3 mb-2">
                  <MapPin size={20} className="text-stone-400 mt-1" />
                  <div>
                    <p className="text-sm tracking-wide text-stone-500 mb-1">KONUM</p>
                    <p className="text-stone-900">{project.location}</p>
                  </div>
                </div>
              </div>

              <div className="border-b border-stone-200 pb-6">
                <div className="flex items-start gap-3 mb-2">
                  <Calendar size={20} className="text-stone-400 mt-1" />
                  <div>
                    <p className="text-sm tracking-wide text-stone-500 mb-1">YIL</p>
                    <p className="text-stone-900">{project.year}</p>
                  </div>
                </div>
              </div>

              <div className="border-b border-stone-200 pb-6">
                <div className="flex items-start gap-3 mb-2">
                  <Maximize2 size={20} className="text-stone-400 mt-1" />
                  <div>
                    <p className="text-sm tracking-wide text-stone-500 mb-1">ALAN</p>
                    <p className="text-stone-900">{project.area}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div>
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-3xl font-light tracking-wide text-stone-900 mb-8"
            >
              Proje Galerisi
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
              {project.gallery_images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="relative h-96 overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-stone-900/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-stone-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
