ALTER TABLE IF EXISTS app_user
  DROP CONSTRAINT IF EXISTS app_user_user_type_check;

ALTER TABLE IF EXISTS app_user
  ADD CONSTRAINT app_user_user_type_check
  CHECK (user_type IN ('buyer', 'realtor', 'collaborator', 'admin'));
