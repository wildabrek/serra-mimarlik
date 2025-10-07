import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Project, About, Service, Contact, Hero } from '../lib/supabase';
// @ts-ignore - API module type definition
import { api } from '../lib/api';
import { Upload, Save, Edit, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminProps {}

export default function Admin({}: AdminProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'hero' | 'projects' | 'about' | 'services' | 'contact'>('hero');

  // Hero state
  const [hero, setHero] = useState<Hero | null>(null);
  const [editingHero, setEditingHero] = useState<Partial<Hero> | null>(null);

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [uploadingImages, setUploadingImages] = useState(false);

  // About state
  const [about, setAbout] = useState<About | null>(null);
  const [editingAbout, setEditingAbout] = useState<Partial<About> | null>(null);

  // Services state
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);

  // Contact state
  const [contact, setContact] = useState<Contact | null>(null);
  const [editingContact, setEditingContact] = useState<Partial<Contact> | null>(null);

  useEffect(() => {
    // Load data from API
    const loadData = async () => {
      try {
        const [heroData, projectsData, aboutData, servicesData, contactData] = await Promise.all([
          api.hero.get(),
          api.projects.get(),
          api.about.get(),
          api.services.get(),
          api.contact.get()
        ]);

        setHero(heroData);
        setProjects(projectsData);
        setAbout(aboutData);
        setServices(servicesData);
        setContact(contactData);
      } catch (error) {
        console.error('Failed to load data from API:', error);
        // API failed, show error
        console.error('Failed to connect to backend. Please restart the server.');
        alert('Backend sunucusuna bağlanılamıyor. Lütfen npm run server komutunu çalıştırın.');
      }
    };

    loadData();
  }, []);

  // File upload helper - for now just return data URL
  const uploadFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  // Projects functions
  const saveProject = async (project: Partial<Project>) => {
    try {
      const updatedProjects = project.id
        ? projects.map(p => p.id === project.id ? { ...p, ...project } as Project : p)
        : [...projects, { ...project, id: Date.now().toString(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as Project];

      await api.projects.update(updatedProjects);
      setProjects(updatedProjects);
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
      // Still update local state if API fails
      const updatedProjects = project.id
        ? projects.map(p => p.id === project.id ? { ...p, ...project } as Project : p)
        : [...projects, { ...project, id: Date.now().toString(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as Project];
      setProjects(updatedProjects);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      setEditingProject(null);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const updatedProjects = projects.filter(p => p.id !== id);
      await api.projects.update(updatedProjects);
      setProjects(updatedProjects);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
    } catch (error) {
      console.error('Error deleting project:', error);
      // Still update local state if API fails
      const updatedProjects = projects.filter(p => p.id !== id);
      setProjects(updatedProjects);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
    }
  };

  // About functions
  const saveAbout = async (aboutData: Partial<About>) => {
    try {
      const updatedAbout = about?.id
        ? { ...about, ...aboutData, updated_at: new Date().toISOString() }
        : { ...aboutData, id: '1', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };

      await api.about.update(updatedAbout);
      setAbout(updatedAbout as About);
      localStorage.setItem('about', JSON.stringify(updatedAbout));
      setEditingAbout(null);
    } catch (error) {
      console.error('Error saving about:', error);
      const updatedAbout = about?.id
        ? { ...about, ...aboutData, updated_at: new Date().toISOString() }
        : { ...aboutData, id: '1', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
      setAbout(updatedAbout as About);
      localStorage.setItem('about', JSON.stringify(updatedAbout));
      setEditingAbout(null);
    }
  };

  // Services functions
  const saveService = async (service: Partial<Service>) => {
    try {
      const updatedServices = service.id
        ? services.map(s => s.id === service.id ? { ...s, ...service } as Service : s)
        : [...services, { ...service, id: Date.now().toString(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as Service];

      await api.services.update(updatedServices);
      setServices(updatedServices);
      localStorage.setItem('services', JSON.stringify(updatedServices));
      setEditingService(null);
    } catch (error) {
      console.error('Error saving service:', error);
      const updatedServices = service.id
        ? services.map(s => s.id === service.id ? { ...s, ...service } as Service : s)
        : [...services, { ...service, id: Date.now().toString(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as Service];
      setServices(updatedServices);
      localStorage.setItem('services', JSON.stringify(updatedServices));
      setEditingService(null);
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const updatedServices = services.filter(s => s.id !== id);
      await api.services.update(updatedServices);
      setServices(updatedServices);
      localStorage.setItem('services', JSON.stringify(updatedServices));
    } catch (error) {
      console.error('Error deleting service:', error);
      const updatedServices = services.filter(s => s.id !== id);
      setServices(updatedServices);
      localStorage.setItem('services', JSON.stringify(updatedServices));
    }
  };

  // Contact functions
  const saveContact = async (contactData: Partial<Contact>) => {
    try {
      const updatedContact = contact?.id
        ? { ...contact, ...contactData, updated_at: new Date().toISOString() }
        : { ...contactData, id: '1', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };

      await api.contact.update(updatedContact);
      setContact(updatedContact as Contact);
      localStorage.setItem('contact', JSON.stringify(updatedContact));
      setEditingContact(null);
    } catch (error) {
      console.error('Error saving contact:', error);
      const updatedContact = contact?.id
        ? { ...contact, ...contactData, updated_at: new Date().toISOString() }
        : { ...contactData, id: '1', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
      setContact(updatedContact as Contact);
      localStorage.setItem('contact', JSON.stringify(updatedContact));
      setEditingContact(null);
    }
  };

  // Hero functions
  const saveHero = async (heroData: Partial<Hero>) => {
    try {
      const updatedHero = hero?.id
        ? { ...hero, ...heroData, updated_at: new Date().toISOString() }
        : { ...heroData, id: '1', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };

      await api.hero.update(updatedHero);
      setHero(updatedHero as Hero);
      localStorage.setItem('hero', JSON.stringify(updatedHero));
      setEditingHero(null);
    } catch (error) {
      console.error('Error saving hero:', error);
      const updatedHero = hero?.id
        ? { ...hero, ...heroData, updated_at: new Date().toISOString() }
        : { ...heroData, id: '1', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
      setHero(updatedHero as Hero);
      localStorage.setItem('hero', JSON.stringify(updatedHero));
      setEditingHero(null);
    }
  };

  const tabs = [
    { id: 'hero', label: 'Hero' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ] as const;

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light text-stone-900">Admin Panel</h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            Back to Site
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-stone-900 border-b-2 border-stone-900'
                  : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'hero' && (
            <div>
              <h2 className="text-2xl font-light text-stone-900 mb-6">Hero Section</h2>
              {editingHero ? (
                <HeroForm hero={editingHero} onSave={saveHero} onCancel={() => setEditingHero(null)} uploadFile={uploadFile} />
              ) : (
                <div>
                  {hero ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">Title: {hero.title}</h3>
                        <p className="text-stone-600">Subtitle: {hero.subtitle}</p>
                      </div>
                      <div>
                        <p className="text-stone-600">Background Image:</p>
                        <img src={hero.background_image} alt="hero background" className="mt-2 w-48 h-32 object-cover rounded" />
                      </div>
                      <button onClick={() => setEditingHero(hero)} className="px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors">
                        Edit Hero Section
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setEditingHero({ title: '', subtitle: '', background_image: '' })} className="px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors">
                      Create Hero Section
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-light text-stone-900">Projects</h2>
                <button
                  onClick={() => setEditingProject({ title: '', slug: '', category: '', description: '', full_description: '', location: '', year: '', area: '', main_image: '', gallery_images: [], featured: false })}
                  className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
                >
                  <Plus size={18} />
                  Add Project
                </button>
              </div>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border border-stone-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <img src={project.main_image || '/placeholder.jpg'} alt={project.title} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <h3 className="text-lg font-medium text-stone-900">{project.title}</h3>
                        <p className="text-stone-600 text-sm">{project.location} • {project.year}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingProject(project)} className="p-2 text-stone-600 hover:text-stone-900">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => deleteProject(project.id)} className="p-2 text-red-600 hover:text-red-900">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div>
              <h2 className="text-2xl font-light text-stone-900 mb-6">About Section</h2>
              {editingAbout ? (
                <AboutForm about={editingAbout} onSave={saveAbout} onCancel={() => setEditingAbout(null)} uploadFile={uploadFile} />
              ) : (
                <div>
                  {about ? (
                    <div className="space-y-4">
                      <p className="text-stone-600">{about.content1}</p>
                      <p className="text-stone-600">{about.content2}</p>
                      <button onClick={() => setEditingAbout(about)} className="px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors">
                        Edit About
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setEditingAbout({ title: '', content1: '', content2: '', projects_count: '', awards_count: '', satisfaction_rate: '', image_url: '' })} className="px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors">
                      Create About Section
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-light text-stone-900">Services</h2>
                <button
                  onClick={() => setEditingService({ title: '', description: '', order_index: services.length })}
                  className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
                >
                  <Plus size={18} />
                  Add Service
                </button>
              </div>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 border border-stone-200 rounded-lg">
                    <div>
                      <h3 className="text-lg font-medium text-stone-900">{service.title}</h3>
                      <p className="text-stone-600 text-sm">{service.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingService(service)} className="p-2 text-stone-600 hover:text-stone-900">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => deleteService(service.id)} className="p-2 text-red-600 hover:text-red-900">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <h2 className="text-2xl font-light text-stone-900 mb-6">Contact Information</h2>
              {editingContact ? (
                <ContactForm contact={editingContact} onSave={saveContact} onCancel={() => setEditingContact(null)} />
              ) : (
                <div>
                  {contact ? (
                    <div className="space-y-4">
                      <p>Phone: {contact.phone}</p>
                      <p>Email: {contact.email}</p>
                      <button onClick={() => setEditingContact(contact)} className="px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors">
                        Edit Contact
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setEditingContact({ address: '', city: '', phone: '', email: '', instagram_url: '', linkedin_url: '' })} className="px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors">
                      Create Contact Info
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Project Edit Modal */}
        {editingProject && (
          <ProjectForm project={editingProject} onSave={saveProject} onCancel={() => setEditingProject(null)} uploadFile={uploadFile} uploading={uploadingImages} setUploading={setUploadingImages} />
        )}

        {/* Service Edit Modal */}
        {editingService && (
          <ServiceForm service={editingService} onSave={saveService} onCancel={() => setEditingService(null)} />
        )}
      </div>
    </div>
  );
}

// Additional Components (Forms)

// ProjectForm
function ProjectForm({ project, onSave, onCancel, uploadFile, uploading, setUploading }: {
  project: Partial<Project>, onSave: (p: Partial<Project>) => void, onCancel: () => void, uploadFile: (f: File) => Promise<string>, uploading: boolean, setUploading: (b: boolean) => void
}) {
  const [form, setForm] = useState(project);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'main_image' | 'gallery_images') => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      if (field === 'main_image') {
        setForm({ ...form, main_image: url });
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h3 className="text-xl font-medium mb-4">{project.id ? 'Edit Project' : 'Add Project'}</h3>
        <div className="space-y-4">
          <input placeholder="Title" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full p-2 border rounded" />
          <input placeholder="Slug" value={form.slug || ''} onChange={e => setForm({ ...form, slug: e.target.value })} className="w-full p-2 border rounded" />
          <input placeholder="Category" value={form.category || ''} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full p-2 border rounded" />
          <textarea placeholder="Description" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full p-2 border rounded" rows={3} />
          <textarea placeholder="Full Description" value={form.full_description || ''} onChange={e => setForm({ ...form, full_description: e.target.value })} className="w-full p-2 border rounded" rows={5} />
          <input placeholder="Location" value={form.location || ''} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full p-2 border rounded" />
          <input placeholder="Year" value={form.year || ''} onChange={e => setForm({ ...form, year: e.target.value })} className="w-full p-2 border rounded" />
          <input placeholder="Area" value={form.area || ''} onChange={e => setForm({ ...form, area: e.target.value })} className="w-full p-2 border rounded" />
          <div>
            <label>Main Image:</label>
            <input type="file" onChange={e => handleFileUpload(e, 'main_image')} className="w-full p-2 border rounded" />
            {uploading && <p>Uploading...</p>}
            {form.main_image && <img src={form.main_image} alt="preview" className="mt-2 w-32 h-32 object-cover" />}
          </div>

          <div>
            <label>Gallery Images:</label>
            <input type="file" multiple onChange={async (e) => {
              const files = Array.from(e.target.files || []);
              if (files.length > 0) {
                setUploading(true);
                for (const file of files) {
                  try {
                    const url = await uploadFile(file);
                    setForm(prev => ({ ...prev, gallery_images: [...(prev.gallery_images || []), url] }));
                  } catch (error) {
                    console.error('Gallery upload error:', error);
                  }
                }
                setUploading(false);
              }
            }} className="w-full p-2 border rounded" />
            {uploading && <p>Uploading gallery images...</p>}

            {form.gallery_images && form.gallery_images.length > 0 && (
              <div className="mt-2 grid grid-cols-4 gap-2">
                {form.gallery_images.map((img, index) => (
                  <div key={index} className="relative">
                    <img src={img} alt={`gallery ${index}`} className="w-20 h-20 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => {
                        const newGallery = (form.gallery_images || []).filter((_, i) => i !== index);
                        setForm(prev => ({ ...prev, gallery_images: newGallery }));
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <label className="flex items-center">
            <input type="checkbox" checked={form.featured || false} onChange={e => setForm({ ...form, featured: e.target.checked })} /> Featured
          </label>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onCancel} className="px-4 py-2 text-stone-600 hover:text-stone-900">Cancel</button>
          <button onClick={() => onSave(form)} className="px-4 py-2 bg-stone-900 text-white rounded hover:bg-stone-800">
            {project.id ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Similarly for AboutForm, ServiceForm, ContactForm
// I'll add them as needed, but for brevity, I'll use placeholders

function AboutForm({ about, onSave, onCancel, uploadFile }: {
  about: Partial<About>, onSave: (a: Partial<About>) => void, onCancel: () => void, uploadFile: (f: File) => Promise<string>
}) {
  const [form, setForm] = useState(about);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      setForm({ ...form, image_url: url });
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input placeholder="Title" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full p-2 border rounded" />
      <textarea placeholder="Content 1" value={form.content1 || ''} onChange={e => setForm({ ...form, content1: e.target.value })} className="w-full p-2 border rounded" rows={4} />
      <textarea placeholder="Content 2" value={form.content2 || ''} onChange={e => setForm({ ...form, content2: e.target.value })} className="w-full p-2 border rounded" rows={4} />
      <input placeholder="Projects Count" value={form.projects_count || ''} onChange={e => setForm({ ...form, projects_count: e.target.value })} className="w-full p-2 border rounded" />
      <input placeholder="Awards Count" value={form.awards_count || ''} onChange={e => setForm({ ...form, awards_count: e.target.value })} className="w-full p-2 border rounded" />
      <input placeholder="Satisfaction Rate" value={form.satisfaction_rate || ''} onChange={e => setForm({ ...form, satisfaction_rate: e.target.value })} className="w-full p-2 border rounded" />
      <div>
        <label>Image:</label>
        <input type="file" onChange={handleFileUpload} className="w-full p-2 border rounded" />
        {uploading && <p>Uploading...</p>}
        {form.image_url && <img src={form.image_url} alt="preview" className="mt-2 w-32 h-32 object-cover" />}
      </div>
      <div className="flex justify-end gap-4">
        <button onClick={onCancel} className="px-4 py-2 text-stone-600 hover:text-stone-900">Cancel</button>
        <button onClick={() => onSave(form)} className="px-4 py-2 bg-stone-900 text-white rounded hover:bg-stone-800">Save</button>
      </div>
    </div>
  );
}

function ServiceForm({ service, onSave, onCancel }: {
  service: Partial<Service>, onSave: (s: Partial<Service>) => void, onCancel: () => void
}) {
  const [form, setForm] = useState(service);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-xl font-medium mb-4">{service.id ? 'Edit Service' : 'Add Service'}</h3>
        <div className="space-y-4">
          <input placeholder="Title" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full p-2 border rounded" />
          <textarea placeholder="Description" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full p-2 border rounded" rows={4} />
          <input placeholder="Order Index" type="number" value={form.order_index || 0} onChange={e => setForm({ ...form, order_index: parseInt(e.target.value) })} className="w-full p-2 border rounded" />
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onCancel} className="px-4 py-2 text-stone-600 hover:text-stone-900">Cancel</button>
          <button onClick={() => onSave(form)} className="px-4 py-2 bg-stone-900 text-white rounded hover:bg-stone-800">
            {service.id ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ContactForm({ contact, onSave, onCancel }: {
  contact: Partial<Contact>, onSave: (c: Partial<Contact>) => void, onCancel: () => void
}) {
  const [form, setForm] = useState(contact);

  return (
    <div className="space-y-4">
      <input placeholder="Address" value={form.address || ''} onChange={e => setForm({ ...form, address: e.target.value })} className="w-full p-2 border rounded" />
      <input placeholder="City" value={form.city || ''} onChange={e => setForm({ ...form, city: e.target.value })} className="w-full p-2 border rounded" />
      <input placeholder="Phone" value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full p-2 border rounded" />
      <input placeholder="Email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full p-2 border rounded" />
      <input placeholder="Instagram URL" value={form.instagram_url || ''} onChange={e => setForm({ ...form, instagram_url: e.target.value })} className="w-full p-2 border rounded" />
      <input placeholder="LinkedIn URL" value={form.linkedin_url || ''} onChange={e => setForm({ ...form, linkedin_url: e.target.value })} className="w-full p-2 border rounded" />
      <div className="flex justify-end gap-4">
        <button onClick={onCancel} className="px-4 py-2 text-stone-600 hover:text-stone-900">Cancel</button>
        <button onClick={() => onSave(form)} className="px-4 py-2 bg-stone-900 text-white rounded hover:bg-stone-800">Save</button>
      </div>
    </div>
  );
}

function HeroForm({ hero, onSave, onCancel, uploadFile }: {
  hero: Partial<Hero>, onSave: (h: Partial<Hero>) => void, onCancel: () => void, uploadFile: (f: File) => Promise<string>
}) {
  const [form, setForm] = useState(hero);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      setForm({ ...form, background_image: url });
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input placeholder="Hero Title" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full p-2 border rounded" />
      <textarea placeholder="Hero Subtitle" value={form.subtitle || ''} onChange={e => setForm({ ...form, subtitle: e.target.value })} className="w-full p-2 border rounded" rows={3} />
      <div>
        <label>Background Image:</label>
        <input type="file" onChange={handleFileUpload} className="w-full p-2 border rounded" />
        {uploading && <p>Uploading...</p>}
        {form.background_image && <img src={form.background_image} alt="hero background preview" className="mt-2 w-48 h-32 object-cover rounded" />}
      </div>
      <div className="flex justify-end gap-4">
        <button onClick={onCancel} className="px-4 py-2 text-stone-600 hover:text-stone-900">Cancel</button>
        <button onClick={() => onSave(form)} className="px-4 py-2 bg-stone-900 text-white rounded hover:bg-stone-800">Save</button>
      </div>
    </div>
  );
}
