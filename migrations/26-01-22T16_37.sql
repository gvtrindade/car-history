ALTER TABLE cars DROP CONSTRAINT cars_user_id_fkey;

ALTER TABLE cars ALTER COLUMN user_id TYPE TEXT;

ALTER TABLE cars ALTER COLUMN linked_users TYPE TEXT[];

ALTER TABLE cars ALTER COLUMN linked_users SET DEFAULT '{}';

ALTER TABLE cars ADD CONSTRAINT car_user_fkey FOREIGN KEY (user_id) REFERENCES "user" (id);
