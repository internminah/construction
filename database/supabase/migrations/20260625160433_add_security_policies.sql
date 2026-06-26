-- Temporarily dropping the foreign key links for ALL child tables
ALTER TABLE reviews 
  DROP CONSTRAINT IF EXISTS reviews_user_id_fkey;

ALTER TABLE quotations 
  DROP CONSTRAINT IF EXISTS quotations_user_id_fkey;

-- Dropping the auto-incrementing identity from the users table
ALTER TABLE users 
  ALTER COLUMN id DROP IDENTITY IF EXISTS;

-- Changing ALL columns to UUID types at the exact same time
ALTER TABLE users 
  ALTER COLUMN id TYPE UUID USING gen_random_uuid();

ALTER TABLE reviews 
  ALTER COLUMN user_id TYPE UUID USING gen_random_uuid();

ALTER TABLE quotations 
  ALTER COLUMN user_id TYPE UUID USING gen_random_uuid();

-- Re-linking the tables with brand new, clean UUID foreign key constraints
ALTER TABLE reviews 
  ADD CONSTRAINT reviews_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE quotations 
  ADD CONSTRAINT quotations_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Setting default auto-generation for future rows
ALTER TABLE users 
  ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- Cleaning up and building the policy
DROP POLICY IF EXISTS "Users can manage their own data" ON users;

CREATE POLICY "Users can manage their own data" ON users 
    FOR ALL USING (auth.uid() = id);