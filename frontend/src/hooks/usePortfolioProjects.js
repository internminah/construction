'use client';

import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Maps a DB portfolio row to the shape expected by ProjectCard / OngoingProjects
 * The DB has: { id, project_name, category, description, image, status, service_id }
 */
function mapProject(p) {
  return {
    id: p.id.toString(),
    title: p.project_name || '',
    category: p.category || 'General',
    description: p.description || '',
    image: p.image || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=900',
    // Map status to completionStatus shape expected by ProjectCard
    completionStatus: p.status || 'Completed',
    status: p.status || 'Completed',
    // Fields not in DB — kept as graceful fallbacks
    client: '',
    location: '',
    year: '',
    tags: [],
    progress: p.status === 'In Progress' ? 50 : 100,
    phase: p.status === 'In Progress' ? 'Active Construction' : 'Delivered',
  };
}

/**
 * Fetches all projects from the backend API.
 * Returns { projects, loading, error }
 */
export function usePortfolioProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProjects() {
      try {
        const res = await fetch(`${API_URL}/api/projects`);
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const data = await res.json();
        const raw = Array.isArray(data.data)
          ? data.data
          : data.data?.projects || data.projects || [];

        if (!cancelled) {
          setProjects(raw.map(mapProject));
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProjects();
    return () => { cancelled = true; };
  }, []);

  return { projects, loading, error };
}
