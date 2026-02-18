-- HomeSync sample seed data
-- Assumes db/schema.sql has already been executed.

TRUNCATE TABLE
  message,
  conversation,
  listing_assignment,
  collab_item,
  listing,
  realtor,
  buyer,
  app_user
RESTART IDENTITY CASCADE;

INSERT INTO app_user (email, password_hash, user_type, is_active)
VALUES
  ('alex.buyer@homesync.local', 'demo_hash_1', 'buyer', TRUE),
  ('sarah.realtor@homesync.local', 'demo_hash_2', 'realtor', TRUE),
  ('michael.lender@homesync.local', 'demo_hash_3', 'collaborator', TRUE);

INSERT INTO buyer (user_id, phone, budget_min, budget_max, preapproved, preferred_city)
VALUES
  (1, '801-555-0101', 500000, 900000, TRUE, 'Riverdale');

INSERT INTO realtor (user_id, phone, brokerage_name, license_number, service_area, years_experience)
VALUES
  (2, '801-555-0202', 'Summit Realty Group', 'UT-RE-100200', 'Salt Lake County', 9);

INSERT INTO listing (address_line1, city, state, zip, price, status, created_by_user_id)
VALUES
  ('123 Maple Avenue', 'Riverdale', 'UT', '84067', 850000, 'active', 2),
  ('456 Main Street Unit 4B', 'Salt Lake City', 'UT', '84101', 625000, 'new', 2);

INSERT INTO listing_assignment (listing_id, buyer_id, realtor_id, assignment_role)
VALUES
  (1, 1, 1, 'lead_realtor');

INSERT INTO conversation (listing_id, buyer_id, realtor_id, last_message_at)
VALUES
  (1, 1, 1, NOW());

INSERT INTO collab_item (listing_id, created_by_user_id, item_type, title, body_text, status, due_date)
VALUES
  (1, 2, 'task', 'Submit Pre-approval', 'Upload signed pre-approval to board.', 'done', NOW() + INTERVAL '1 day'),
  (1, 1, 'task', 'Schedule Inspection', 'Coordinate inspector and confirm date/time.', 'in_progress', NOW() + INTERVAL '3 days'),
  (1, 1, 'task', 'Review HOA Documents', 'Read HOA docs and mark key questions.', 'todo', NOW() + INTERVAL '7 days'),
  (1, 2, 'note', 'Kitchen Renovation Ideas', 'Open shelving, quartz countertops, brass hardware.', 'todo', NULL);

INSERT INTO message (conversation_id, sender_user_id, message_text)
VALUES
  (1, 2, 'I have scheduled the viewing for Saturday at 2 PM.'),
  (1, 1, 'Perfect, thank you!');
