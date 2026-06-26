--  ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES

ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access" ON portfolio;
DROP POLICY IF EXISTS "Admins can manage portfolio" ON portfolio;

DROP POLICY IF EXISTS "Allow public read access" ON services;
DROP POLICY IF EXISTS "Admins can manage services" ON services;

DROP POLICY IF EXISTS "Allow public read access" ON reviews;
DROP POLICY IF EXISTS "Users can manage their own reviews" ON reviews;

DROP POLICY IF EXISTS "Users can manage their own quotations" ON quotations;
DROP POLICY IF EXISTS "Anonymous lead insertion" ON contacts;

-- PORTFOLIO POLICIES (Global Showcase)
CREATE POLICY "Allow public read access" ON portfolio 
    FOR SELECT USING (true); -- Anyone visiting the website can see projects

CREATE POLICY "Admins can manage portfolio" ON portfolio 
    FOR ALL TO authenticated USING (true); -- Only logged-in team members can add/edit


-- SERVICES POLICIES (Global Showcase)
CREATE POLICY "Allow public read access" ON services 
    FOR SELECT USING (true); -- Anyone can see the services offered

CREATE POLICY "Admins can manage services" ON services 
    FOR ALL TO authenticated USING (true); 


--  REVIEWS POLICIES (Linked via user_id UUID)
CREATE POLICY "Allow public read access" ON reviews 
    FOR SELECT USING (true); -- Everyone can read customer reviews

CREATE POLICY "Users can manage their own reviews" ON reviews 
    FOR ALL TO authenticated USING (auth.uid() = user_id); -- Only the creator can modify


-- QUOTATIONS POLICIES (Linked via user_id UUID + Role Check)
CREATE POLICY "Users can manage their own quotations" ON quotations 
    FOR ALL USING (
        auth.uid() = user_id 
        OR (auth.jwt() ->> 'role') IN ('Admin', 'Manager')
    );


-- ONTACTS POLICIES (Form Submission)
CREATE POLICY "Anonymous lead insertion" ON contacts 
    FOR INSERT WITH CHECK (true); -- Allows potential clients to submit the form without logging in

CREATE POLICY "Admins can view contacts" ON contacts 
    FOR SELECT TO authenticated USING (true); -- Only logged-in team members can read messages