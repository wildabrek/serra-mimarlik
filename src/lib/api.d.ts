import { Hero, Project, About, Service, Contact } from './supabase';

export const api: {
  hero: {
    get: () => Promise<Hero>;
    update: (data: Partial<Hero>) => Promise<Hero>;
  };
  projects: {
    get: () => Promise<Project[]>;
    update: (data: Project[]) => Promise<Project[]>;
  };
  about: {
    get: () => Promise<About>;
    update: (data: Partial<About>) => Promise<About>;
  };
  services: {
    get: () => Promise<Service[]>;
    update: (data: Service[]) => Promise<Service[]>;
  };
  contact: {
    get: () => Promise<Contact>;
    update: (data: Partial<Contact>) => Promise<Contact>;
  };
  health: () => Promise<any>;
};

