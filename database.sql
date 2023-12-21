CREATE TABLE "User"(ID SERIAL PRIMARY KEY,password TEXT,email TEXT UNIQUE);
-- INSERT INTO "User"(username, password, email) VALUES('nandi','password','snandi@pw.com');
CREATE TABLE "USERVISITOR"(ID SERIAL PRIMARY KEY NOT NULL,USERID INT references "User" (ID),URL TEXT NOT NULL);
