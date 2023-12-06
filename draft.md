CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
)

CREATE TABLE decks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  total_cards INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
)

CREATE TABLE cards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  deck_id UUID,
  front_text TEXT NOT NULL,
  back_text TEXT NOT NULL,
  FOREIGN KEY (deck_id) REFERENCES decks(id)
)

CREATE TABLE ReviewRecords (
    review_id INT PRIMARY KEY,
    user_id INT,
    card_id INT,
    review_date TIMESTAMP NOT NULL,
    next_review_date TIMESTAMP NOT NULL,
    ease FLOAT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (card_id) REFERENCES Cards(card_id),
    -- Outros campos
);

SELECT
    Cards.card_id,
    Cards.front_text,
    Cards.back_text,
    Reviews.next_review_date
FROM
    Cards
JOIN
    Reviews ON Cards.card_id = Reviews.card_id
WHERE
    Reviews.next_review_date <= NOW()
    AND Reviews.user_id = [ID_DO_USUARIO];
