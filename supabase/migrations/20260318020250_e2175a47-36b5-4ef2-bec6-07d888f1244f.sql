-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);

-- Allow anyone to view project images
CREATE POLICY "Public read project images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'project-images');

-- Allow admins to upload project images
CREATE POLICY "Admins upload project images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete project images
CREATE POLICY "Admins delete project images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));

-- Create project_images table for gallery
CREATE TABLE public.project_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  sort_order int DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read project images table" ON public.project_images FOR SELECT TO public USING (true);

CREATE POLICY "Admins manage project images" ON public.project_images FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));