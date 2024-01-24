-- CREATE SEQUENCE id_seq START 1;
-- CREATE TABLE "User"(ID NUMERIC DEFAULT nextval('id_seq') PRIMARY KEY,password TEXT,email TEXT UNIQUE);
CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255), -- Store hashed passwords (can be NULL for OAuth users)
    OAuthProvider VARCHAR(50), -- Store the OAuth provider (e.g., Google, Facebook)
    OAuthID VARCHAR(100), -- Store the user's ID from the OAuth provider
    UNIQUE (OAuthProvider, OAuthID)
);
-- INSERT INTO "User"(username, password, email) VALUES('nandi','password','snandi@pw.com');
CREATE TABLE "USERVISITOR"(ID NUMERIC DEFAULT nextval('id_seq') PRIMARY KEY NOT NULL,USERID INT references "User" (ID),URL TEXT NOT NULL);
