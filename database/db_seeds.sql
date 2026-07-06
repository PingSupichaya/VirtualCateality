-- =====================
-- CATS
-- cluster: 1 = energetic/bold, 2 = calm/shy, 3 = social/friendly
-- =====================
INSERT INTO cats (catId, breed, personality, imgPath, cluster) VALUES
(1, 'Bengal', ARRAY['energetic', 'affectionate', 'adventurous'], '/assets/Bengal.png', 3),
(2, 'British Shorthair', ARRAY['calm', 'devoted', 'easy-going'], '/assets/BritishShorthair.png', 2),
(3, 'Maine Coon', ARRAY['playful', 'friendly', 'adaptable'], '/assets/MaineCoon.png', 1),
(4, 'Persian', ARRAY['sweet', 'quiet', 'gentle'], '/assets/Persian.png', 2),
(5, 'Ragdoll', ARRAY['sweet', 'laid-back', 'loving'], '/assets/Ragdoll.png', 2),
(6, 'Russian Blue', ARRAY['playful', 'loyal', 'independent'], '/assets/RussianBlue.png', 3),
(7, 'Siamese', ARRAY['vocal', 'loving', 'entertaining'], '/assets/Siamese.png', 1),
(8, 'Turkish Van and Angora', ARRAY['friendly', 'playful', 'intelligent'], '/assets/TurkishVan.png', 4);

-- =====================
-- QUESTIONS
-- =====================
INSERT INTO questions (questionId, questionText) VALUES
(1, 'How do you usually spend your free time?'),
(2, 'What''s your ideal weekend morning?'),
(3, 'How do you handle stress?'),
(4, 'What quality do you value most in a companion?'),
(5, 'How would your friends describe you?'),
(6, 'What kind of living space do you prefer?'),
(7, 'How do you show love to someone you care about?');

-- =====================
-- ANSWERS (answerId uses questionId * 10 + answer index)
-- =====================
INSERT INTO answers (answerId, questionId, answerText, interactionScore, aggressiveScore, shynessScore) VALUES
-- Question 1
(11, 1, 'Outdoor adventures and sports', 2, 3, 0),
(12, 1, 'Reading or watching movies at home', 0, 0, 3),
(13, 1, 'Hanging out with friends', 3, 1, 0),
(14, 1, 'Working on creative projects alone', 0, 1, 2),
-- Question 2
(21, 2, 'Wake up early for a jog or hike', 1, 3, 0),
(22, 2, 'Sleep in and have a lazy brunch', 0, 0, 3),
(23, 2, 'Call a friend and make spontaneous plans', 3, 2, 0),
(24, 2, 'Quietly enjoy coffee and my own routine', 0, 0, 2),
-- Question 3
(31, 3, 'Burn it off with exercise', 1, 3, 0),
(32, 3, 'Curl up somewhere cozy and rest', 0, 0, 3),
(33, 3, 'Talk it out with someone I trust', 3, 1, 0),
(34, 3, 'Spend time alone until I feel better', 0, 0, 2),
-- Question 4
(41, 4, 'Energy and enthusiasm', 2, 3, 0),
(42, 4, 'Calmness and patience', 1, 0, 3),
(43, 4, 'Loyalty and affection', 3, 0, 1),
(44, 4, 'Intelligence and independence', 0, 2, 2),
-- Question 5
(51, 5, 'The adventurous one who''s always up for anything', 2, 3, 0),
(52, 5, 'The calm and reliable one', 1, 0, 2),
(53, 5, 'The social butterfly who keeps the group together', 3, 1, 0),
(54, 5, 'The quiet thinker with deep thoughts', 0, 0, 3),
-- Question 6
(61, 6, 'A big house with a yard to explore', 2, 3, 0),
(62, 6, 'A cozy small apartment', 0, 0, 3),
(63, 6, 'Somewhere lively with lots of activity', 3, 2, 0),
(64, 6, 'A quiet, well-organized space', 0, 0, 2),
-- Question 7
(71, 7, 'Plan fun activities together', 3, 2, 0),
(72, 7, 'Just being there quietly by their side', 1, 0, 3),
(73, 7, 'Lots of hugs and verbal affection', 3, 1, 0),
(74, 7, 'Small thoughtful gestures and gifts', 1, 0, 2);

-- =====================
-- STORIES (shown before each question)
-- =====================
INSERT INTO stories (storyId, questionId, pageOrder, storyText, imgPath) VALUES
-- Before question 2: 1 story page
(1, 2, 1, 'Cause you look like trouble, but it could be good.
I''ve been the same, kind of misunderstood.
Whatever you''ve done, trust, it ain''t nothing new.
You know by now we''ve seen it all', NULL),
-- Before question 4: 2 story pages
(2, 4, 1, 'The night is young, the stars are out.
And somewhere a cat is waiting for you.', NULL),
(3, 4, 2, 'You feel a soft purr in the distance...
Something tells you this is meant to be.', NULL),
-- Before question 6: 1 story page
(4, 6, 1, 'The journey continues.
Every answer brings you closer to your feline soulmate.', NULL);
